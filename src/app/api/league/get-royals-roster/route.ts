/**
 * @swagger
 * /api/league/get-royals-roster:
 *   get:
 *     summary: Scrape ECHL transactions, persist new ones, and optionally trigger push notifications
 *     tags:
 *       - League
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Success (may still indicate no changes or no new rows).
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Unable to complete request
 *       500:
 *         description: Server error
 *
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Deterministic hash ID for the transaction.
 *         player:
 *           type: string
 *         team:
 *           type: string
 *         detail:
 *           type: string
 *         date:
 *           type: string
 *         seenAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - id
 *         - player
 *         - team
 *         - detail
 *         - date
 *         - seenAt
 */

import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { Player } from "@/app/lib/types";
import { countryToAlpha2, countryToAlpha3 } from "country-to-iso";

type ServerMemo = {
    serverMemo: {
        data: {
            goalies: PlayerBucket,
            defenders: PlayerBucket,
            forwards: PlayerBucket
        }
    },
};

type PlayerBucket = Record<string, PlayerResponse>;

type PlayerResponse = {
    id: string
    person_id: string,
    active: string,
    first_name: string,
    last_name: string,
    phonetic_name: string | null,
    shoots: "L" | "R" | null,
    catches: "L" | "R" | null,
    hometown: string | null,
    homeprov: string | null,
    homecntry: string | null,
    homeplace: string | null,
    birthtown: string | null,
    birthprov: string | null,
    birthcntry: string | null,
    birthplace: string | null,
    height: string | null,
    weight: string | null,
    birthdate: string | null,
    team_name: "Reading Royals" | string | null,
    tp_jersey_number: string | null,
    position: "D" | "F" | "G",
    nhlteam: string | null,
    player_image: string
};

const ENDPOINT = "https://royalshockey.com/team/roster";
const CANADIAN_PROVINCES = ["AB", "BC", "MB", "NB", "NL", "NS", "NT", "NU", "ON", "PE", "QC", "SK", "YT"];
const AMERICAN_STATES = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

export async function GET(req: NextRequest) {
    try {
        const apiKey = req.headers.get("x-api-key");

        if (apiKey !== process.env.INTERNAL_API_KEY) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        /* ---------------------------------------
            Fetch page
        ---------------------------------------- */
        const res = await fetch(ENDPOINT, {
            headers: { "user-agent": "royals-hq-bot/1.0" },
        });

        if (!res.ok) {
            return NextResponse.json(
                { error: `Fetch failed ${res.status}` },
                { status: 502 }
            );
        }

        const html = await res.text();

        /* ---------------------------------------
            Parse players
        ---------------------------------------- */
        const parsedData: ServerMemo = await parsePlayers(html);

        const defenders = recordToArray(parsedData.serverMemo.data.defenders);
        const forwards = recordToArray(parsedData.serverMemo.data.forwards);
        const goalies = recordToArray(parsedData.serverMemo.data.goalies);

        const combinedData = [...defenders, ...forwards, ...goalies];

        const players: Player[] = [];

        combinedData.forEach(p => {
            let playerAge: Player["age"];
            if (p.birthdate) {
                const today = new Date();
                const birth = new Date(p.birthdate);

                let age = today.getUTCFullYear() - birth.getUTCFullYear();

                const monthDiff = today.getUTCMonth() - birth.getUTCMonth();
                const dayDiff = today.getUTCDate() - birth.getUTCDate();

                if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                    age--;
                }

                playerAge = age;
            } else {
                playerAge = null;
            }

            let birthplace: Player["birthplace"];
            if (parseString(p.birthtown) && parseString(p.birthprov) && parseString(p.birthcntry)) {
                birthplace = {
                    town: p.birthtown,
                    state: p.birthprov,
                    country: countryToAlpha3(p.birthcntry!)
                };
            } else if (parseString(p.birthtown) && parseString(p.birthprov) && !parseString(p.birthcntry)) {
                const isAmerican = AMERICAN_STATES.includes(p.birthprov!.trim());
                const isCanadian = CANADIAN_PROVINCES.includes(p.birthprov!.trim());

                birthplace = {
                    town: p.birthtown,
                    state: isAmerican || isCanadian ? p.birthprov : null,
                    country: isAmerican ? "USA" : isCanadian ? "CAN" : p.birthprov!
                };
            } else if (parseString(p.birthtown) && !parseString(p.birthprov) && parseString(p.birthcntry)) {
                birthplace = {
                    town: p.birthtown,
                    state: null,
                    country: countryToAlpha3(p.birthcntry!)
                };
            } else if (parseString(p.birthplace)) {
                birthplace = {
                    town: p.birthplace,
                    state: null,
                    country: null
                };
            } else {
                birthplace = {
                    town: null,
                    state: null,
                    country: null
                };
            }

            let nhl: Player["nhlRights"];
            if (!p.nhlteam || p.nhlteam === "")
                nhl = null;
            else nhl = {
                team: {
                    logo: {
                        small: "https://files.eliteprospects.com/layout/logos/f94048fe-37aa-4e7e-9419-a861f83c50ee_small.png",
                        medium: "https://files.eliteprospects.com/layout/logos/f94048fe-37aa-4e7e-9419-a861f83c50ee_medium.png",
                    },
                    name: p.nhlteam
                }
            };

            players.push({
                id: p.id,
                jerseyNumber: p.tp_jersey_number ? +p.tp_jersey_number : null,
                active: p.active,
                firstName: p.first_name,
                lastName: p.last_name,
                name: p.first_name + " " + p.last_name,
                phoneticName: p.phonetic_name,
                position: p.position as any === "C" ? "F" : p.position,
                shoots: p.shoots,
                catches: p.catches,
                dateOfBirth: p.birthdate,
                age: playerAge,
                birthplace: birthplace,
                hometown: {
                    town: p.hometown,
                    state: p.homeprov,
                    country: p.homecntry
                },
                nationality: countryToAlpha2(birthplace.country!),
                height: p.height,
                weight: p.weight ? +p.weight : null,
                nhlRights: nhl,
                imageUrl: p.player_image
            });
        });

        return NextResponse.json(
            players,
            { status: 200 }
        );
    } catch (e: unknown) {
        console.error("ERROR:", e);
        return new NextResponse(String(e), {
            status: 500,
            headers: { "content-type": "text/plain; charset=utf-8" },
        });
    }
}

async function parsePlayers(html: string) {
    const $ = cheerio.load(html);
    const el = $("[wire\\:initial-data]").first();
    if (!el.length) throw new Error("Livewire root element not found");

    const encoded = el.attr("wire:initial-data");
    if (!encoded) throw new Error("wire:initial-data missing");

    const decoded = htmlEntityDecode(encoded);

    try {
        return JSON.parse(decoded);
    } catch {
        throw new Error("Failed to parse Livewire JSON");
    }
}

function parseString(value?: string | null): string | null {
    if (!value) return null;
    const trimmed = value.trim();
    return trimmed === "" ? null : trimmed;
}

function htmlEntityDecode(s: string) {
    return (s || "")
        .replace(/&quot;/g, "\"")
        .replace(/&#039;/g, "'")
        .replace(/&apos;/g, "'")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");
}

function recordToArray<T>(r?: Record<string, T>): T[] {
    return Object.values(r ?? {});
}
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Conference, Division, LeagueData } from "../../app/lib/types";

const CONFERENCES: Conference[] = ["Eastern", "Western"];
const DIVISIONS: Division[] = ["North", "South", "Central", "Mountain"];

export default function TeamList({ leagueData }: { leagueData: LeagueData }) {
    const [q, setQ] = useState("");
    const [selectedConf, setSelectedConf] = useState<Conference[]>(["Eastern"]);
    const [selectedDiv, setSelectedDiv] = useState<Division[]>(["North"]);

    if (!leagueData?.data?.teams) {
        return (
            <div className="mt-4 rounded-md border border-red-500/40 bg-red-950/40 p-4 text-red-300">
                No team data found
            </div>
        );
    }

    const teams = leagueData.data.teams;

    function toggleConf(k: Conference) {
        setSelectedConf((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]));
    }

    function toggleDiv(k: Division) {
        setSelectedDiv((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]));
    }

    function clearAll() {
        setQ("");
        setSelectedConf([]);
        setSelectedDiv([]);
    }

    const filteredTeams = useMemo(() => {
        const query = q.trim().toLowerCase();

        return teams.filter((team) => {
            const matchesText =
                !query ||
                team.name.toLowerCase().includes(query) ||
                team.slug.toLowerCase().includes(query);

            const teamConf = (team.conferenceDivision.conference ?? "Unknown") as Conference;
            const teamDiv = (team.conferenceDivision.division ?? "Unknown") as Division;

            const matchesConference = selectedConf.length === 0 || selectedConf.includes(teamConf);
            const matchesDivision = selectedDiv.length === 0 || selectedDiv.includes(teamDiv);

            return matchesText && matchesConference && matchesDivision;
        });
    }, [teams, q, selectedConf, selectedDiv]);

    const hasAnyFilters = q.trim() || selectedConf.length || selectedDiv.length;

    return (
        <>
            <div className="flex w-full pb-2">
                <span className="font-semibold text-left">Filter:</span>
            </div>
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col lg:flex-row flex-wrap items-start lg:items-center lg:divide-x-2 lg:divide-border gap-2 lg:gap-0">

                    <div className="flex flex-wrap gap-2 items-center lg:pr-3">
                        {CONFERENCES.map((k) => (
                            <Button
                                key={`conf-${k}`}
                                variant={selectedConf.includes(k) ? "default" : "outline"}
                                onClick={() => toggleConf(k)}
                            >
                                {k}
                            </Button>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-2 lg:px-3">
                        {DIVISIONS.map((k) => (
                            <Button
                                key={`div-${k}`}
                                variant={selectedDiv.includes(k) ? "default" : "outline"}
                                onClick={() => toggleDiv(k)}
                            >
                                {k}
                            </Button>
                        ))}
                    </div>

                    {hasAnyFilters ? (
                        <div className="flex flex-wrap gap-2 pl-3">
                            <Button variant="secondary" onClick={clearAll} className="hidden lg:block">
                                Clear
                            </Button>
                        </div>
                    ) : null}
                </div>

                <div className="w-full md:w-72">
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search teams…"
                        className="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                {filteredTeams.map((team) => (
                    <Button
                        key={team.id}
                        variant="default"
                        size="default"
                        className="flex min-h-54 flex-col items-center justify-center rounded-lg bg-black/4 p-4 text-black hover:bg-black/10 hover:text-black dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:hover:text-white"
                        asChild
                    >
                        <Link href={`/roster/${team.slug}`}>
                            <div className="relative mx-auto my-2 h-24 w-24">
                                <Image
                                    src={team.logo?.large || team.logo?.medium || "/default-player-image.png"}
                                    alt={team.name}
                                    fill
                                    sizes="64px"
                                    className="object-contain drop-shadow-[0_0_24px_rgb(0,0,0,0.35)] dark:drop-shadow-[0_0_24px_rgb(255,255,255,0.25)]"
                                />
                            </div>

                            <span className="mb-1 flex h-[68px] items-center justify-center text-wrap text-xl font-bold">
                                {team.name}
                            </span>

                            <div className="text-center text-xs uppercase opacity-60">
                                {team.conferenceDivision.conference ?? "UNKNOWN"} • {team.conferenceDivision.division ?? "UNKNOWN"}
                            </div>
                        </Link>
                    </Button>
                ))}
            </div>

            {filteredTeams.length === 0 && (<div className="mt-6 rounded-md border p-4 opacity-80"> No teams match those filters. </div>)}
        </>
    );
}

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import removeAccents from "remove-accents";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { resolvePlayerImage } from "../../app/lib/player-image-map";
import { Player } from "../../app/lib/types";
import { Button } from "../ui/button";

function formatHeight(imperial?: string | null) {
    if (!imperial) return "—";

    // Normalize separators (handles 5'11, 5-11, 5′11)
    const match = imperial.match(/(\d+)\D+(\d+)/);
    if (!match) return imperial;

    const [, feet, inches] = match;
    return `${feet}' ${inches}"`;
}

function formatDob(dob?: string | null) {
    if (!dob) return "—";
    const [y, m, d] = dob.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export function makeColumns(teamColor: string): ColumnDef<Player, unknown>[] {
    return [
        {
            id: "jerseyNumber",
            accessorFn: (row) => row.jerseyNumber ?? -1,
            sortDescFirst: false,
            header: ({ column }) => (
                <Button
                    variant="link"
                    className="cursor-pointer px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    #
                </Button>
            ),
            cell: ({ row }) => {
                const player = row.original;
                return (
                    player.jerseyNumber != null && (
                        <div className="flex items-center justify-center h-12 w-12 bg-black/5 dark:bg-white/5 rounded-full">
                            <span
                                className={"text-xl font-semibold"}
                                style={{ "color": teamColor }}
                            >{player.jerseyNumber}</span>
                        </div>
                    )
                );
            },
        },
        {
            id: "player",
            accessorFn: (row) => removeAccents(row.name),
            header: ({ column }) => (
                <Button
                    variant="link"
                    className="cursor-pointer px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Player
                </Button>
            ),
            cell: ({ row }) => {
                const player = row.original;
                const src = resolvePlayerImage(player.name, player.imageUrl);

                return (
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 px-2 md:px-0">
                        <div className="relative size-12 shrink-0 overflow-hidden rounded-full drop-shadow-md drop-shadow-black/25 dark:drop-shadow-white/10">
                            <Image
                                src={src}
                                alt={player.name}
                                fill
                                sizes="64px"
                                className="object-cover object-center"
                            />
                        </div>

                        <span className="font-bold text-wrap text-center">{player.name}</span>

                        {player.nhlRights &&
                            <div className="relative size-8 overflow-hidden">
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Image
                                            src={player.nhlRights?.team.logo?.small ?? ""}
                                            alt={player.nhlRights?.team.name ?? ""}
                                            fill
                                            sizes="64px"
                                            className="object-contain obqject-center"
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent
                                        side="top"
                                        sideOffset={12}
                                    >
                                        <span>NHL Rights: {player.nhlRights.team.name}</span>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        }
                    </div>
                );
            },
            meta: {
                className:
                    "sticky left-0 z-20 bg-card group-hover:bg-muted " +
                    "after:content-[''] after:absolute after:top-0 after:right-0 after:h-full after:w-3 " +
                    "after:bg-gradient-to-r after:from-transparent after:to-black/10 md:after:bg-none",
            },
        },
        {
            id: "position",
            accessorFn: (row) => row.position ?? "Z", // nulls sort last
            header: ({ column }) => (
                <Button
                    variant="link"
                    className="cursor-pointer px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <span className="hidden md:inline">Position</span>
                    <span className="inline md:hidden">POS</span>
                </Button>
            ),
            cell: ({ row }) => row.original.position ?? "—",
        },

        {
            id: "height",
            // Sort by inches if possible (e.g. "6'2\"" -> 74)
            accessorFn: (row) => {
                const h = row.height;
                if (!h) return -1;
                const m = h.match(/(\d+)\D+(\d+)/);
                if (!m) return -1;
                const feet = Number(m[1]);
                const inches = Number(m[2]);
                return feet * 12 + inches;
            },
            sortDescFirst: false,
            header: ({ column }) => (
                <Button
                    variant="link"
                    className="cursor-pointer px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <span className="hidden md:inline">Height</span>
                    <span className="inline md:hidden">H</span>
                </Button>
            ),
            cell: ({ row }) => formatHeight(row.original.height),
        },
        {
            id: "weight",
            accessorFn: (row) => row.weight ?? Number.MAX_SAFE_INTEGER,
            sortDescFirst: false,
            header: ({ column }) => (
                <Button
                    variant="link"
                    className="cursor-pointer px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <span className="hidden md:inline">Weight</span>
                    <span className="inline md:hidden">W</span>
                </Button>
            ),
            cell: ({ row }) => {
                const player = row.original;
                return player.weight ? `${player.weight} lbs.` : "—";
            },
        },
        {
            id: "dob",
            accessorFn: (row) => row.dateOfBirth ?? "9999-12-31",
            header: ({ column }) => (
                <Button
                    variant="link"
                    className="cursor-pointer px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <span className="hidden md:inline">Date of Birth</span>
                    <span className="inline md:hidden">DOB</span>
                </Button>
            ),
            cell: ({ row }) => {
                const player = row.original;
                return <div className="flex flex-col md:flex-row items-center justify-center gap-1">
                    <span>{formatDob(player.dateOfBirth)}</span>
                    <span className="hidden md:inline">-</span>
                    <div className="flex gap-1">
                        <span className="inline md:hidden">Age:</span>
                        <span>{player.age ?? ""}</span>
                    </div>
                </div>;
            }
        },
        {
            id: "birthplace",
            accessorFn: (row) => {
                const country =
                    row.hometown?.country ||
                    row.birthplace?.country ||
                    "";

                const state =
                    row.hometown?.state ||
                    row.birthplace?.state ||
                    "";

                const town =
                    row.hometown?.town ||
                    row.birthplace?.town ||
                    "";

                return removeAccents(
                    `${country.toUpperCase()}|${state.toUpperCase()}|${town.toUpperCase()}`
                );
            },
            header: ({ column }) => (
                <Button
                    variant="link"
                    className="cursor-pointer px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <span>Birthplace</span>
                </Button>
            ),
            cell: ({ row }) => {
                const player = row.original;
                if (!player.nationality) return "—";

                let location;
                if (player.hometown.town) {
                    location = player.hometown.town;
                    if (player.hometown.state) location += ", " + player.hometown.state;
                    if (player.hometown.country) location += ", " + player.hometown.country;
                } else if (player.birthplace.town) {
                    location = player.birthplace.town;
                    if (player.birthplace.state) location += ", " + player.birthplace.state;
                    if (player.birthplace.country) location += ", " + player.birthplace.country;
                } else {
                    location = "-";
                }

                return (
                    <div className="flex flex-row items-center gap-2">
                        <div className="relative size-8 shrink-0 overflow-hidden rounded-full drop-shadow-md drop-shadow-gay-500/50">
                            <Image
                                src={`https://flagsapi.com/${player.nationality}/flat/64.png`}
                                alt={player.nationality}
                                fill
                                sizes="64px"
                                className="object-cover object-center"
                                style={{ transform: "scale(1.6)" }}
                            />
                        </div>
                        <span>{location}</span>
                    </div>
                );
            }
        }
    ];
}

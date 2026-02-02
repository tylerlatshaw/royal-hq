"use client";

import { DataTable } from "./data-table";
import { makeColumns } from "./columns";
import type { Player } from "@/app/lib/types";

type Props = {
    players: Player[];
    teamColor: string;
};

export default function RosterTableClient({ players, teamColor }: Props) {
    if (!players || players.length === 0) {
        return <p className="mt-2 text-lg text-gray-300">No roster data found.</p>;
    }

    return (
        <div className="overflow-hidden rounded-lg">
            <div className="overflow-x-auto">
                <DataTable<Player, unknown> columns={makeColumns(teamColor)} data={players} />
            </div>
        </div>
    );
}

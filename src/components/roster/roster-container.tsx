import dayjs from "dayjs";
import type { Team, Player } from "@/app/lib/types";
import { getRoster } from "@/app/lib/get-roster";
import RosterTableClient from "./roster-table-client";

type Props = {
    teamData: Team;
    teamColor: string;
};

const positionRank: Record<string, number> = { F: 0, D: 1, G: 2 };

export default async function RosterTable({ teamData, teamColor }: Props) {
    const season =
        teamData.activeSeason?.slug ??
        `${dayjs().format("YYYY")}-${dayjs().add(1, "year").format("YYYY")}`;

    let players: Player[] = [];

    try {
        const res: Player[] = await getRoster(teamData.id, season) ?? [];

        players = res.sort((a, b) => {
            const aRank = positionRank[a.position ?? "Z"] ?? 99;
            const bRank = positionRank[b.position ?? "Z"] ?? 99;
            if (aRank !== bRank) return aRank - bRank;
            return (a.jerseyNumber ?? 999) - (b.jerseyNumber ?? 999);
        });
    } catch (e) {
        console.error("Error getting roster:", e);
        throw new Error("Error getting roster");
    }

    return <RosterTableClient players={players} teamColor={teamColor} />;
}

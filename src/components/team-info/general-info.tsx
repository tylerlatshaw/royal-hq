import type { Team } from "@/app/lib/types";
import { SectionDivider } from "../ui/section-divider";

type Props = {
    teamData: Team;
    teamColor: string;
};

export default async function TeamGeneralInfo({ teamData, teamColor }: Props) {

    return <>
        <SectionDivider teamColor={teamColor}>General Info</SectionDivider>
        {JSON.stringify(teamData)}
    </>;
}

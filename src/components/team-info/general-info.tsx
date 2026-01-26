import type { Team } from "@/app/lib/types";
import { SectionDivider } from "../ui/section-divider";
import Image from "next/image";

type Props = {
    teamData: Team;
    teamColor: string;
};

export default async function TeamGeneralInfo({ teamData, teamColor }: Props) {

    const {
        logo,
        name,
        founded,
        city
    } = teamData;

    const colors = logo?.colors;

    return <>

        <SectionDivider teamColor={teamColor}>General Info</SectionDivider>

        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex gap-1 items-center justify-center">
                <div className="relative mx-auto my-2 h-48 w-48">
                    <Image
                        src={logo?.large || logo?.medium || "/default-player-image.png"}
                        alt={name + " Logo"}
                        fill
                        sizes="64px"
                        className="object-contain drop-shadow-[0_0_24px_rgb(0,0,0,0.35)] dark:drop-shadow-[0_0_24px_rgb(255,255,255,0.25)]"
                    />
                </div>
            </div>


            <div className="flex flex-col gap-2 items-center justify-center">
                <span className="text-2xl font-semibold">{name}</span>
                <span className="text-lg font-semibold">{city}</span>
                <span className="text-lg font-semibold">Founded: {founded}</span>

                {
                    colors && <div className="flex flex-col w-fit mt-6 gap-2">
                        <span className="text-lg font-semibold self-start">Team Colors:</span>
                        <div className="flex">
                            {
                                colors.map(color => (
                                    <div key={color} className={"h-16 w-16 border border-muted-foreground first:rounded-l-md last:rounded-r-md"}
                                        style={{ "backgroundColor": color }}>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }
            </div>
        </div>



        {/* {JSON.stringify(teamData)} */}
    </>;
}

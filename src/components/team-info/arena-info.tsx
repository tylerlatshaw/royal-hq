import type { Team } from "@/app/lib/types";
import { SectionDivider } from "../ui/section-divider";
import Image from "next/image";

type Props = {
    arenaData: Team["arena"];
    teamColor: string;
};

export default async function ArenaInfo({ arenaData, teamColor }: Props) {

    if (!arenaData) return;

    const {
        name,
        location,
        yearOfConstruction,
        capacity,
        infoAsHTML,
        imageUrl
    } = arenaData;

    return <>
        <SectionDivider teamColor={teamColor}>Arena Info</SectionDivider>

        <div className="flex flex-col gap-6 mx-auto max-w-3xl">
            <div className="w-full rounded-md border bg-muted px-0 py-4">
                <div className="relative h-64 w-full">
                    <Image
                        src={imageUrl || "/arena-placeholder.png"}
                        fill
                        alt={`${name} Arena`}
                        className="object-contain"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <span className="text-2xl font-semibold">{name}</span>
                {
                    location && <span className="text-lg font-semibold">{location}</span>
                }
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="flex gap-1 items-center justify-center">
                    <span className="font-semibold">Constructed:</span>
                    <span>{yearOfConstruction || "-"}</span>
                </div>

                <div className="flex gap-1 items-center justify-center">
                    <span className="font-semibold">Capacity:</span>
                    <span>{capacity || "-"}</span>
                </div>

                {
                    infoAsHTML && <div className="col-span-2 items-center justify-center">
                        <span dangerouslySetInnerHTML={{ __html: infoAsHTML }} />
                    </div>
                }
            </div>
        </div>
    </>;
}

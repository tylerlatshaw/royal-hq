"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { getReadableTextColor } from "../../app/lib/accessible-color";
import { useTeamTheme } from "../../app/providers/team-theme-provider";

type Props = {
    teamSlug: string;
};

export default function GoBackButton({ teamSlug }: Props) {
    const { teamColor } = useTeamTheme();
    const [isHovered, setIsHovered] = useState(false);
    const hoverTextColor = getReadableTextColor(teamColor);

    return (
        <Button
            asChild
            variant={"default"}
            className="py-4 w-full md:w-fit"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link
                href={`/team/${teamSlug}/roster`}
                style={{
                    backgroundColor: isHovered ? "var(--primary)" : teamColor,
                    color: isHovered ? "var(--primary-foreground)" : hoverTextColor,
                }}

            >
                <ArrowLeft className="mr-2" /> Go Back
            </Link>
        </Button>
    );
}
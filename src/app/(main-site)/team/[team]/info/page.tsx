import TeamColorSetter from "@/components/roster/team-color-setter";
import { resolveTeamColor } from "@/app/lib/team-map";
import type { Team } from "@/app/lib/types";
import { getTeamData } from "@/app/lib/get-team-data";
import type { Metadata } from "next";
import DefaultThemeSetter from "@/components/global-components/default-theme-setter";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import TeamGeneralInfo from "@/components/team-info/general-info";
import GoBackButton from "@/components/team-info/go-back-button";
import SocialLinks from "@/components/team-info/social-links";
import ArenaInfo from "@/components/team-info/arena-info";

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { team } = await params;

  const teamData = await getTeamData(team);

  if (!teamData) {
    return {
      title: "Roster",
      description: "ECHL team roster.",
    };
  }

  const title = `${teamData.name} Roster`;
  const description = `Current ${teamData.name} roster, player stats, and team information.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: teamData.logo?.large || "/og-default.png",
          width: 1200,
          height: 630,
          alt: teamData.name,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [teamData.logo?.large || "/og-default.png"],
    },
  };
}

type Props = {
  params: Promise<{ team: string }>;
};

export default async function Page({ params }: Props) {
  const { team: teamSlug } = await params;

  if (!teamSlug) {
    return <div className="p-6 text-red-500 text-lg font-bold">Missing team parameter</div>;
  }

  const teamData: Team | null = await getTeamData(teamSlug);

  if (!teamData) {
    return <div className="p-6 text-red-500 text-lg font-bold">Invalid team name</div>;
  }

  const teamColor = resolveTeamColor(
    teamData.slug,
    teamData.logo?.colors?.[0] ?? null
  );

  return (
    <>
      <DefaultThemeSetter />

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/teams">ECHL Teams</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/team/${teamData.slug}`} className="inline md:hidden">...</BreadcrumbLink>
            <BreadcrumbLink href={`/team/${teamData.slug}`} className="hidden md:inline">{teamData.name}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Team Info</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mt-4">
        <CardHeader>
          <div className="grid grid-rows-2 md:grid-rows-1 grid-cols-2 md:grid-cols-4 items-center gap-4 md:gap-0">
            <div className="w-fit justify-self-start row-start-2 md:row-start-1">
              <GoBackButton teamSlug={teamSlug} />
            </div>
            <h1 className="text-2xl md:text-3xl col-span-2 font-bold text-center row-start-1">
              {teamData.name} Info
            </h1>
            <div className="w-fit justify-self-end row-start-2 md:row-start-1 col-start-2 md:col-start-4">
              <SocialLinks socialLinks={teamData.links} />
            </div>
          </div>
        </CardHeader>
        <CardContent>

          <TeamGeneralInfo teamData={teamData} teamColor={teamColor} />
          <ArenaInfo arenaData={teamData.arena} teamColor={teamColor} />
          
        </CardContent>
      </Card>

      <TeamColorSetter
        color={teamColor}
        logo={teamData.logo?.large || "/reading-royals-logo.svg"}
        name={teamData.name}
        url={teamData.links?.officialWebUrl || "https://royalshockey.com"}
      />
    </>
  );
}
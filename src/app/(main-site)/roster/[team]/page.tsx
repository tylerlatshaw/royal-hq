import RosterTable from "@/components/roster/roster-container";
import TeamColorSetter from "@/components/roster/team-color-setter";
import ViewMoreButton from "@/components/roster/view-more-button";
import { resolveTeamColor } from "@/app/lib/team-map";
import type { Team } from "@/app/lib/types";
import { getTeamData } from "@/app/lib/get-team-data";
import type { Metadata } from "next";
import DefaultThemeSetter from "@/components/global-components/default-theme-setter";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

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
            <BreadcrumbPage>{teamData.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mt-4">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold">{teamData.name + " Roster"}</h1>
            <ViewMoreButton />
          </div>
        </CardHeader>
        <CardContent>
          <RosterTable teamData={teamData} teamColor={teamColor} />
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
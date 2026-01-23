import { getTeams } from "../../lib/get-teams";
import DefaultThemeSetter from "./../../../components/global-components/default-theme-setter";
import TeamList from "./../../../components/teams/team-list";
import { Metadata } from "next";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Teams",
  description:
    "Browse all ECHL teams, arenas, and links in one place.",
};

export default async function Page() {

  const leagueData = await getTeams();

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
            <BreadcrumbPage>ECHL Teams</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mt-4">
        <CardHeader>
          <h1 className="text-left text-2xl md:text-3xl font-bold">ECHL Teams</h1>
        </CardHeader>
        <CardContent>
          <TeamList leagueData={leagueData} />
        </CardContent>
      </Card>
    </>
  );
}

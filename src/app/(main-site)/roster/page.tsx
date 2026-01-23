import { getTeams } from "@/app/lib/league/get-teams";
import DefaultThemeSetter from "./../../../components/global-components/default-theme-setter";
import TeamList from "./../../../components/teams/team-list";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

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
            <BreadcrumbPage>Roster</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex w-full items-center justify-center">
        <div className="text-left">
          <Alert className="border-red-600 bg-red-100 text-red-600 dark:border-red-800 dark:bg-red-950/75 dark:text-red-300">
            <AlertCircleIcon />
            <AlertTitle className="text-red-600 dark:text-red-300">Missing Team Name</AlertTitle>
            <AlertDescription className="text-red-600 dark:text-red-300">
              <p>You are missing a team selection. Please select a team from the list below.</p>
            </AlertDescription>
          </Alert>
        </div>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <h1 className="text-left text-3xl font-bold">ECHL Teams</h1>
        </CardHeader>
        <CardContent>
          <TeamList leagueData={leagueData} />
        </CardContent>
      </Card>
    </>
  );
}

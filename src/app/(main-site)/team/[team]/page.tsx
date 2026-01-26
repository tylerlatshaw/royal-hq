import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ team: string }>;
};

export default async function Page({ params }: Props) {
  const { team: teamSlug } = await params;

  redirect(`/team/${teamSlug}/roster`);
}

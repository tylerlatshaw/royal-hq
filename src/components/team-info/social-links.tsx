import type { Team } from "@/app/lib/types";
import { GlobeIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import Link from "next/link";
import XIcon from "../../../public/icons/x";
import FacebookIcon from "../../../public/icons/facebook";
import InstagramIcon from "../../../public/icons/instagram";
import YoutubeIcon from "../../../public/icons/youtube";

type Props = {
    socialLinks: Team["links"];
};

export default async function SocialLinks({ socialLinks }: Props) {

    if (!socialLinks) return;

    const {
        officialWebUrl,
        facebook,
        x,
        instagram,
        youtube
    } = socialLinks;

    return <div>
        <ButtonGroup>
            {
                officialWebUrl && <Button asChild variant="outline" size="icon">
                    <Link href={officialWebUrl} target="_blank">
                        <GlobeIcon />
                    </Link>
                </Button>
            }
            {
                facebook && <Button asChild variant="outline" size="icon">
                    <Link href={facebook} target="_blank">
                        <FacebookIcon className="text-foreground" />
                    </Link>
                </Button>
            }
            {
                x && <Button asChild variant="outline" size="icon">
                    <Link href={x} target="_blank">
                        <XIcon className="text-foreground" />
                    </Link>
                </Button>
            }
            {
                instagram && <Button asChild variant="outline" size="icon">
                    <Link href={instagram} target="_blank">
                        <InstagramIcon className="text-foreground" />
                    </Link>
                </Button>
            }
            {
                youtube && <Button asChild variant="outline" size="icon">
                    <Link href={youtube} target="_blank">
                        <YoutubeIcon className="text-foreground" />
                    </Link>
                </Button>
            }
        </ButtonGroup>
    </div>;
}

import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import DefaultThemeSetter from "./../../../components/global-components/default-theme-setter";
import SubscribeForm from "./../../../components/subscribe/subscribe-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscribe",
  description:
    "Get player transactions, sent right to your device.",
};

export default async function Page() {
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
                        <BreadcrumbPage>Subscribe</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="mt-4">
                <CardHeader>
                    <h1 className="text-left text-2xl md:text-3xl font-bold">Subscribe Now</h1>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <SubscribeForm />
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function Loading() {
    return (
        <>
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
                    <div className="h-10 w-48 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
                </CardHeader>
                <CardContent>
                    <div className="flex w-full pb-2">
                        <span className="h-6 w-12 bg-black/10 dark:bg-white/10 animate-pulse"></span>
                    </div>
                    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-col lg:flex-row flex-wrap items-start lg:items-center lg:divide-x-2 lg:divide-border gap-2 lg:gap-0">

                            <div className="flex flex-wrap gap-2 items-center lg:pr-3">
                                {Array.from({ length: 2 }).map((_, i) => (
                                    <div
                                        key={`conf-${i}`}
                                        className="h-9 w-20 rounded-lg bg-black/10 dark:bg-white/10 animate-pulse"
                                    ></div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-2 lg:px-3">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div
                                        key={`conf-${i}`}
                                        className="h-9 w-20 rounded-lg bg-black/10 dark:bg-white/10 animate-pulse"
                                    ></div>
                                ))}
                            </div>
                        </div>

                        <div className="w-full md:w-72">
                            <div className="w-full h-9 rounded-lg bg-black/10 dark:bg-white/10 animate-pulse"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                        {Array.from({ length: 30 }).map((_, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center justify-center bg-black/5 dark:bg-white/5 rounded-lg p-4"
                            >
                                <div className="h-24 w-24 rounded bg-black/10 dark:bg-white/10 animate-pulse my-2" />

                                <div className="h-5 w-32 rounded bg-black/10 dark:bg-white/10 animate-pulse mt-2" />
                                <div className="h-5 w-24 rounded bg-black/10 dark:bg-white/10 animate-pulse mt-2" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
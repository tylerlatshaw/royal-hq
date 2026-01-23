import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Loading() {
    return (<>
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href="/teams">ECHL Teams</BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>

        <Card className="mt-4">
            <CardHeader>
                <div className="h-10 w-96 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
            </CardHeader>
            <CardContent>
                <div className="rounded-md border border-black/10 dark:border-white/10">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-5%">
                                    <div className="flex items-center justify-center w-full">
                                        <div className="h-4 w-8 rounded bg-black/10 dark:bg-white/10 animate-pulse"></div>
                                    </div>
                                </TableHead>
                                <TableHead className="w-10%">
                                    <div className="flex items-center justify-center w-full">
                                        <div className="h-4 w-10 rounded bg-black/10 dark:bg-white/10 animate-pulse"></div>
                                    </div>
                                </TableHead>
                                <TableHead className="w-10%">
                                    <div className="flex items-center justify-center w-full">
                                        <div className="h-4 w-10 rounded bg-black/10 dark:bg-white/10 animate-pulse"></div>
                                    </div>
                                </TableHead>
                                <TableHead className="w-10%">
                                    <div className="flex items-center justify-center w-full">
                                        <div className="h-4 w-10 rounded bg-black/10 dark:bg-white/10 animate-pulse"></div>
                                    </div>
                                </TableHead>
                                <TableHead className="w-10%">
                                    <div className="flex items-center justify-center w-full">
                                        <div className="h-4 w-10 rounded bg-black/10 dark:bg-white/10 animate-pulse"></div>
                                    </div>
                                </TableHead>
                                <TableHead className="w-10%">
                                    <div className="flex items-center justify-center w-full">
                                        <div className="h-4 w-16 rounded bg-black/10 dark:bg-white/10 animate-pulse"></div>
                                    </div>
                                </TableHead>
                                <TableHead className="w-10%">
                                    <div className="flex items-center justify-center w-full">
                                        <div className="h-4 w-16 rounded bg-black/10 dark:bg-white/10 animate-pulse"></div>
                                    </div>
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {Array.from({ length: 20 }).map((_, i) => {
                                return <TableRow key={i}>
                                    <TableCell>
                                        <div className="flex items-center justify-center w-full py-2">
                                            <div className="h-4 w-12 rounded bg-black/10 dark:bg-white/10 animate-pulse"></div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center w-full py-2">
                                            <div className="h-4 w-72 rounded bg-black/10 dark:bg-white/10 animate-pulse"></div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center w-full py-2">
                                            <div className="h-4 w-26 rounded bg-black/10 dark:bg-white/10 animate-pulse"></div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center w-full py-2">
                                            <div className="h-4 w-20 rounded bg-black/10 dark:bg-white/10 animate-pulse"></div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center w-full py-2">
                                            <div className="h-4 w-20 rounded bg-black/10 dark:bg-white/10 animate-pulse"></div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center w-full py-2">
                                            <div className="h-4 w-36 rounded bg-black/10 dark:bg-white/10 animate-pulse"></div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center w-full py-2">
                                            <div className="h-4 w-36 rounded bg-black/10 dark:bg-white/10 animate-pulse"></div>
                                        </div>
                                    </TableCell>
                                </TableRow>;
                            })}
                        </TableBody>
                    </Table>
                </div>

            </CardContent>
        </Card>

    </>
    );
}
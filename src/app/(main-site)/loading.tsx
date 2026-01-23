import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Loading() {
    return (
        // <div className="mx-auto w-full">
        //     <div className="flex items-center mb-4">
        //         <div className="h-8 w-64 rounded bg-white/10 animate-pulse" />
        //     </div>

        //     <div className="mt-8 overflow-hidden rounded-lg border border-white/10">
        //         <div className="overflow-x-auto text-white bg-[#1a1a1a]">
        //             <div className="min-w-[720px]">
        //                 {/* Header */}
        //                 <div className="grid grid-cols-3 md:grid-cols-4 gap-4 bg-white/5 px-4 py-3">
        //                     <div className="hidden md:block h-4 w-16 rounded bg-white/10 animate-pulse" />
        //                     <div className="h-4 w-20 rounded bg-white/10 animate-pulse" />
        //                     <div className="h-4 w-20 rounded bg-white/10 animate-pulse" />
        //                     <div className="h-4 w-16 rounded bg-white/10 animate-pulse" />
        //                 </div>

        //                 {/* Rows */}
        //                 {Array.from({ length: 10 }).map((_, i) => (
        //                     <div
        //                         key={i}
        //                         className="grid grid-cols-3 md:grid-cols-4 gap-4 px-4 py-4 border-t border-white/10"
        //                     >
        //                         {/* Team (hidden on mobile) */}
        //                         <div className="hidden md:flex items-center gap-3">
        //                             <div className="h-8 w-8 rounded bg-white/10 animate-pulse" />
        //                             <div className="h-4 w-28 rounded bg-white/10 animate-pulse" />
        //                         </div>

        //                         {/* Player */}
        //                         <div className="h-4 w-40 rounded bg-white/10 animate-pulse" />

        //                         {/* Detail */}
        //                         <div className="h-4 w-56 rounded bg-white/10 animate-pulse" />

        //                         {/* Date */}
        //                         <div className="h-4 w-20 rounded bg-white/10 animate-pulse" />
        //                     </div>
        //                 ))}
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Recent Transactions</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="mt-4">
                <CardHeader>
                    <div className="h-10 w-72 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border border-black/10 dark:border-white/10">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-10%">
                                        <div className="flex items-center justify-center w-full">
                                            <div className="h-4 w-8 rounded bg-black/10 dark:bg-white/10 animate-pulse"></div>
                                        </div>
                                    </TableHead>
                                    <TableHead className="w-20%">
                                        <div className="flex items-center justify-center w-full">
                                            <div className="h-4 w-10 rounded bg-black/10 dark:bg-white/10 animate-pulse"></div>
                                        </div>
                                    </TableHead>
                                    <TableHead className="w-40%">
                                        <div className="flex items-center justify-center w-full">
                                            <div className="h-4 w-12 rounded bg-black/10 dark:bg-white/10 animate-pulse"></div>
                                        </div>
                                    </TableHead>
                                    <TableHead className="w-20%">
                                        <div className="flex items-center justify-center w-full">
                                            <div className="h-4 w-10 rounded bg-black/10 dark:bg-white/10 animate-pulse"></div>
                                        </div>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {Array.from({ length: 20 }).map((_, i) => {
                                    return <TableRow key={i}>
                                        <TableCell>
                                            <div className="flex items-center justify-center w-full py-2">
                                                <div className="h-4 w-24 rounded bg-black/10 dark:bg-white/10 animate-pulse"></div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center justify-center w-full py-2">
                                                <div className="h-4 w-32 rounded bg-black/10 dark:bg-white/10 animate-pulse"></div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center justify-center w-full py-2">
                                                <div className="h-4 w-72 rounded bg-black/10 dark:bg-white/10 animate-pulse"></div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center justify-center w-full py-2">
                                                <div className="h-4 w-28 rounded bg-black/10 dark:bg-white/10 animate-pulse"></div>
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
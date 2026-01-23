"use client";

import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ColorModePicker({
    mode
}: {
    mode: "desktop" | "mobile"
}) {
    const { theme, systemTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <div className="h-9 w-9 rounded-md border bg-neutral-200 dark:bg-neutral-800" />
        );
    }

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (mode === "desktop") {
        return (<>
            <Button
                asChild
                variant={"outline"}
                size={"icon"}
                onClick={() =>
                    setTheme(currentTheme === "dark" ? "light" : "dark")
                }
                className="p-2 cursor-pointer"
            >
                {
                    currentTheme === "dark"
                        ? <Sun />
                        : <Moon />
                }
            </Button>
        </>);
    } else {
        return (<>
            <Button
                variant={"link"}
                onClick={() =>
                    setTheme(currentTheme === "dark" ? "light" : "dark")
                }
                className="flex justify-start w-full rounded-lg px-3 py-2 no-underline hover:no-underline text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-neutral-50"
            >
                {
                    currentTheme === "dark"
                        ? <span className="flex gap-1 items-center text-sm font-normal">
                            Light Mode <Sun />
                        </span>
                        : <span className="flex gap-1 items-center text-sm font-normal">
                            Dark Mode <Moon />
                        </span>
                }
            </Button>
        </>);
    }
}
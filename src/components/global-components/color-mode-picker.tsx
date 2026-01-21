"use client";

import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ColorModePicker() {
    const { theme, systemTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <div className="h-9 w-9 rounded-md border bg-neutral-200 dark:bg-neutral-800" />
        );
    }

    const currentTheme = theme === "system" ? systemTheme : theme;

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
}
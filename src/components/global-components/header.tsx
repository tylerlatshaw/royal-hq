"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ColorModePicker from "./color-mode-picker";

const navLinks = [
    { href: "/", label: "Transactions" },
    { href: "/team/reading-royals/roster", label: "Roster" },
    { href: "/teams", label: "Teams" },
    { href: "/subscribe", label: "Subscribe" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80 shadow-lg">
            <div className="relative mx-auto flex h-24 mx-auto w-full lg:max-w-7xl px-4 lg:px-0 items-center justify-between">
                {/* Brand */}
                <Link
                    href="/"
                    className="py-4"
                    onClick={() => setOpen(false)}
                >
                    <Image
                        src={"/royal-hq-logo.svg"}
                        width={133}
                        height={80}
                        alt={"Royals HQ Logo"}
                    />
                </Link>

                {/* Desktop nav */}
                <nav className="hidden items-center gap-6 md:flex">
                    {navLinks.map((l) => (
                        <Button
                            asChild
                            key={l.href}
                            variant={"outline"}
                            size={"default"}
                            className=""
                        >
                            <Link
                                href={l.href}
                                className=""
                            >
                                {l.label}
                            </Link>

                        </Button>
                    ))}

                    <ColorModePicker mode={"desktop"} />
                </nav>

                {/* Mobile button */}
                <button
                    className="md:hidden rounded-md p-2 text-neutral-900 hover:bg-neutral-100 dark:text-neutral-50 dark:hover:bg-neutral-900 cursor-pointer"
                    aria-label="Toggle menu"
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                >
                    <span className="relative block h-5 w-6">
                        <span
                            className={`absolute top-1 left-0 h-0.5 w-6 bg-current transition ${open ? "translate-y-1.5 rotate-45" : ""
                                }`}
                        />
                        <span
                            className={`absolute top-2.5 left-0 h-0.5 w-6 bg-current transition ${open ? "opacity-0" : ""
                                }`}
                        />
                        <span
                            className={`absolute top-4 left-0 h-0.5 w-6 bg-current transition ${open ? "-translate-y-1.5 -rotate-45" : ""
                                }`}
                        />
                    </span>
                </button>

                {/* Mobile flyout (overlay) */}
                <div
                    className={`
            absolute left-0 right-0 top-full
            md:hidden
            transition-all duration-200 ease-out
            ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}
          `}
                >
                    <nav className="mx-2 mt-2 rounded-xl border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-950">
                        <div className="flex flex-col p-2">
                            {navLinks.map((l) => (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    onClick={() => setOpen(false)}
                                    className="rounded-lg px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-neutral-50"
                                >
                                    {l.label}
                                </Link>
                            ))}

                            <ColorModePicker mode={"mobile"} />
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}

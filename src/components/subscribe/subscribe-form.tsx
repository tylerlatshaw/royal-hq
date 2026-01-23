"use client";

import { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import Link from "next/link";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";

type Subscription = {
    firstName: string;
    lastName: string;
    email: string;
};

type FormState = "idle" | "loading" | "success" | "error";

function urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
    return outputArray;
}

export default function SubscribeForm() {
    const [formState, setFormState] = useState<FormState>("idle");
    const [response, setResponse] = useState<string>("");
    const [vapidKey, setVapidKey] = useState<string | null>(null);
    const [configError, setConfigError] = useState<string | null>(null);

    const form = useForm<Subscription>({
        defaultValues: { firstName: "", lastName: "", email: "" },
        mode: "onSubmit",
    });

    useEffect(() => {
        let cancelled = false;

        async function loadConfig() {
            try {
                setConfigError(null);

                const res = await fetch("/api/subscription/config", { cache: "no-store" });
                if (!res.ok) throw new Error(`Failed to load config (HTTP ${res.status})`);

                const json = await res.json().catch(() => ({} as any));
                const key = String(json?.vapidPublicKey || "").trim();

                if (!key) throw new Error("Config missing vapidPublicKey");

                if (!cancelled) setVapidKey(key);
            } catch (e) {
                console.error("Failed to load subscription config:", e);
                if (!cancelled) {
                    setVapidKey(null);
                    setConfigError("Could not load subscription configuration. Please refresh and try again.");
                }
            }
        }

        loadConfig();

        return () => {
            cancelled = true;
        };
    }, []);

    const isLoading = form.formState.isSubmitting || formState === "loading";
    const canSubmit = !!vapidKey && !configError && !isLoading;

    const onSubmit: SubmitHandler<Subscription> = async (formData) => {
        setFormState("loading");
        setResponse("");
        form.clearErrors("root");

        try {
            const firstName = String(formData.firstName || "").trim();
            const lastName = String(formData.lastName || "").trim();
            const email = String(formData.email || "").trim().toLowerCase();

            if (!firstName || !lastName || !email) {
                form.setError("root", { type: "validate", message: "Please fill out all fields." });
                setFormState("error");
                return;
            }

            if (!vapidKey) {
                form.setError("root", { type: "server", message: "Subscription configuration not loaded. Please try again." });
                setFormState("error");
                return;
            }

            if (!("serviceWorker" in navigator)) {
                form.setError("root", { type: "server", message: "Service workers are not supported in this browser." });
                setFormState("error");
                return;
            }

            const permission = await Notification.requestPermission();
            if (permission !== "granted") {
                form.setError("root", { type: "server", message: "Notifications permission was denied." });
                setFormState("error");
                return;
            }

            // Register (or reuse) service worker
            await (navigator.serviceWorker.getRegistration() ??
                navigator.serviceWorker.register("/sw.js"));

            // Ensure it's active
            const ready = await navigator.serviceWorker.ready;

            // Reuse subscription if already exists
            let subscription = await ready.pushManager.getSubscription();
            if (!subscription) {
                subscription = await ready.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(vapidKey),
                });
            }

            const res = await fetch("/api/subscription/push-subscribe", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ subscription, firstName, lastName, email }),
            });

            if (!res.ok) {
                const text = await res.text().catch(() => "");
                form.setError("root", {
                    type: "server",
                    message: "Something went wrong. Please try again later.",
                });
                setResponse(text ? text.slice(0, 200) : "");
                setFormState("error");
                return;
            }

            const json = await res.json().catch(() => ({} as any));

            setResponse(
                json.data.added
                    ? "You are now subscribed!"
                    : "You have already subscribed to notifications."
            );

            setFormState("success");
            form.reset({ firstName, lastName, email });
        } catch (e) {
            console.error("subscribe error:", e);
            form.setError("root", {
                type: "server",
                message: "Subscription failed. Please try again.",
            });
            setFormState("error");
        }
    };

    function onReset() {
        form.reset();
        form.clearErrors();
        setResponse("");
        setFormState("idle");
    }

    return (
        <Card className="mx-auto w-full max-w-xl">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-left">Receive Transaction Alerts</CardTitle>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Config error */}
                        {configError && (
                            <Alert className="border-red-600 bg-red-100 text-red-600 dark:border-red-800 dark:bg-red-950/75 dark:text-red-300">
                                <AlertCircle />
                                <AlertDescription className="text-red-600 dark:text-red-300">
                                    {configError}
                                </AlertDescription>
                            </Alert>
                        )}

                        {/* Form-level error */}
                        {form.formState.errors.root?.message && (
                            <Alert className="border-red-600 bg-red-100 text-red-600 dark:border-red-800 dark:bg-red-950/75 dark:text-red-300">
                                <AlertCircle />
                                <AlertDescription className="text-red-600 dark:text-red-300">
                                    {form.formState.errors.root.message}
                                </AlertDescription>
                            </Alert>
                        )}

                        {/* Success/info message */}
                        {response && (
                            <Alert className="border-green-600 bg-green-100 text-green-600 dark:border-green-800 dark:bg-green-950/75 dark:text-green-300">
                                <CheckCircle />
                                <AlertDescription className="text-green-600 dark:text-green-300">
                                    {response}
                                </AlertDescription>
                            </Alert>
                        )}

                        <FormField
                            control={form.control}
                            name="firstName"
                            rules={{ required: "First Name is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="First Name" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lastName"
                            rules={{ required: "Last Name is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Last Name" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            rules={{
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email address",
                                },
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="email" placeholder="you@example.com" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-3">
                            <Button type="submit" className="flex-1" disabled={!canSubmit}>
                                {isLoading ? "Subscribing…" : vapidKey ? "Subscribe" : "Loading config…"}
                            </Button>

                            <Button type="button" variant="outline" onClick={onReset} disabled={isLoading}>
                                Reset
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>

            <CardFooter className="text-xs text-muted-foreground text-left">
                <span>
                    By submitting this form, you consent to receive push notifications from this site. You may unsubscribe at any time by uninstalling the application. View our&nbsp;
                    <Link
                        href={"https://www.tylerlatshaw.com/privacy-policy"}
                        className="underline hover:text-gray-400"
                    >
                        Privacy Policy
                    </Link>.
                    This site is not affiliated with the ECHL or any professional hockey league.
                </span>
            </CardFooter>
        </Card>
    );
}
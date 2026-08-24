"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    useEffect,
    useMemo,
    useSyncExternalStore,
} from "react";

type User = {
    id: number;
    name: string;
    email: string;
    skin_type?: string | null;
    sensitivity?: string | null;
    concerns?: string | null;
    age?: number | null;
};

function subscribe() {
    return () => { };
}

function getUserSnapshot(): string {
    return localStorage.getItem("skinsense_user") || "";
}

function getServerSnapshot(): string {
    return "";
}

export default function DashboardPage() {
    const router = useRouter();

    const storedUser = useSyncExternalStore(
        subscribe,
        getUserSnapshot,
        getServerSnapshot
    );

    const user = useMemo<User | null>(() => {
        if (!storedUser) {
            return null;
        }

        try {
            return JSON.parse(storedUser) as User;
        } catch {
            return null;
        }
    }, [storedUser]);

    useEffect(() => {
        const token = localStorage.getItem("skinsense_token");

        if (!token) {
            router.replace("/login");
        }
    }, [router]);

    const logout = () => {
        localStorage.removeItem("skinsense_user");
        localStorage.removeItem("skinsense_token");
        localStorage.removeItem("skinsense_result");

        router.push("/");
    };

    if (!user) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#f6f3ec] text-[#1c1c19]">
                <div className="text-center">
                    <p className="text-3xl text-[#74806a]">✦</p>

                    <p className="mt-4">
                        Opening your SkinSense space...
                    </p>

                    <Link
                        href="/login"
                        className="mt-6 inline-flex rounded-full bg-[#20211d] px-6 py-3 text-sm font-medium text-white"
                    >
                        Go to login
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#f6f3ec] px-6 py-8 text-[#1c1c19]">
            <nav className="mx-auto flex max-w-7xl items-center justify-between">
                <Link
                    href="/"
                    className="text-xl font-semibold"
                >
                    SkinSense{" "}
                    <span className="text-[#74806a]">
                        ✦
                    </span>
                </Link>

                <div className="flex items-center gap-3">
                    <span className="hidden text-sm text-[#777166] sm:block">
                        {user.email}
                    </span>

                    <button
                        type="button"
                        onClick={logout}
                        className="rounded-full border border-[#d0cabd] bg-white/60 px-5 py-2.5 text-sm transition hover:bg-white"
                    >
                        Log out
                    </button>
                </div>
            </nav>

            <section className="mx-auto max-w-7xl pb-24 pt-16">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#78836b]">
                    your dashboard
                </p>

                <h1 className="mt-4 font-serif text-5xl sm:text-6xl">
                    Hello,{" "}
                    <span className="italic text-[#65715d]">
                        {user.name}.
                    </span>
                </h1>

                <p className="mt-5 max-w-xl text-lg leading-8 text-[#716c62]">
                    Your personal space for understanding your
                    skin, building a routine and revisiting your
                    latest recommendations.
                </p>

                <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    <Link
                        href="/assessment"
                        className="group rounded-[32px] bg-[#20211d] p-8 text-white shadow-xl transition duration-300 hover:-translate-y-3 hover:shadow-2xl"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-[#b6bc9e]">
                                01
                            </p>

                            <span className="text-xl text-[#b6bc9e]">
                                ✦
                            </span>
                        </div>

                        <h2 className="mt-20 font-serif text-4xl italic">
                            Analyze my skin
                        </h2>

                        <p className="mt-4 leading-7 text-white/60">
                            Tell SkinSense how your skin behaves and
                            generate your personalized routine.
                        </p>

                        <p className="mt-8">
                            Start assessment →
                        </p>
                    </Link>

                    <Link
                        href="/results"
                        className="group rounded-[32px] border border-[#dcd6c8] bg-white/70 p-8 transition duration-300 hover:-translate-y-3 hover:bg-white hover:shadow-xl"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-[#8c805b]">
                                02
                            </p>

                            <span className="text-xl text-[#78836b]">
                                ☼
                            </span>
                        </div>

                        <h2 className="mt-20 font-serif text-4xl italic">
                            My routine
                        </h2>

                        <p className="mt-4 leading-7 text-[#746f64]">
                            Return to your latest morning and evening
                            skincare recommendations.
                        </p>

                        <p className="mt-8">
                            View routine →
                        </p>
                    </Link>

                    <div className="rounded-[32px] border border-[#d5d9cb] bg-[#e5e9df] p-8 transition duration-300 hover:-translate-y-3 hover:shadow-xl">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-[#68735d]">
                                03
                            </p>

                            <span className="text-xl text-[#68735d]">
                                ◌
                            </span>
                        </div>

                        <h2 className="mt-20 font-serif text-4xl italic">
                            Skin profile
                        </h2>

                        <div className="mt-6 space-y-3 text-sm text-[#697064]">
                            <div className="flex justify-between gap-5 border-b border-[#cbd1c3] pb-3">
                                <span>Skin type</span>

                                <strong>
                                    {user.skin_type || "Not assessed"}
                                </strong>
                            </div>

                            <div className="flex justify-between gap-5 border-b border-[#cbd1c3] pb-3">
                                <span>Sensitivity</span>

                                <strong>
                                    {user.sensitivity || "Not assessed"}
                                </strong>
                            </div>

                            <div className="flex justify-between gap-5">
                                <span>Age</span>

                                <strong>
                                    {user.age || "—"}
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
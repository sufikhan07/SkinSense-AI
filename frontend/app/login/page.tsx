"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Unable to log in.");
            }

            localStorage.setItem("skinsense_token", data.token);
            localStorage.setItem(
                "skinsense_user",
                JSON.stringify(data.user)
            );

            router.push("/dashboard");
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#f8f5ee] px-6 py-10 text-[#302b24]">
            {/* Decorative background */}
            <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#e8dfc8]/50 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[#d8c69c]/30 blur-3xl" />

            <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between">
                <Link
                    href="/"
                    className="text-xl font-semibold tracking-tight"
                >
                    SkinSense
                    <span className="ml-1 text-[#a98b4d]">✦</span>
                </Link>

                <Link
                    href="/signup"
                    className="rounded-full border border-[#d7c9aa] bg-white/60 px-5 py-2 text-sm font-medium backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
                >
                    Create account
                </Link>
            </nav>

            <section className="relative z-10 mx-auto grid min-h-[82vh] max-w-6xl items-center gap-12 lg:grid-cols-2">
                {/* Left side */}
                <div>
                    <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-[#a98b4d]">
                        Personalized skincare
                    </p>

                    <h1 className="max-w-xl text-5xl font-medium leading-[1.08] tracking-tight sm:text-6xl">
                        Your skin deserves a routine that
                        <span className="italic text-[#9a7d43]"> understands you.</span>
                    </h1>

                    <p className="mt-7 max-w-lg text-lg leading-8 text-[#70685c]">
                        Sign in to access your saved skin profile, personalized
                        routines, ingredient guidance and previous assessments.
                    </p>

                    <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-3">
                        {[
                            ["01", "Know your skin", "Build a profile around your concerns."],
                            ["02", "Build a routine", "Receive personalized AM and PM steps."],
                            ["03", "Stay consistent", "Return to your saved recommendations."],
                        ].map(([number, title, description]) => (
                            <div
                                key={number}
                                className="rounded-3xl border border-[#e1d7c3] bg-white/55 p-5 shadow-[0_15px_45px_rgba(91,76,50,0.06)] backdrop-blur transition duration-300 hover:-translate-y-2 hover:shadow-[0_20px_55px_rgba(91,76,50,0.12)]"
                            >
                                <span className="text-xs font-semibold text-[#b09254]">
                                    {number}
                                </span>

                                <h3 className="mt-5 font-semibold">{title}</h3>

                                <p className="mt-2 text-sm leading-6 text-[#81786b]">
                                    {description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Login card */}
                <div className="mx-auto w-full max-w-md">
                    <div className="rounded-[2rem] border border-white/80 bg-white/75 p-8 shadow-[0_30px_90px_rgba(73,61,41,0.13)] backdrop-blur-xl sm:p-10">
                        <div className="mb-8">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eee5d2] text-[#9a7d43]">
                                ✦
                            </div>

                            <h2 className="text-3xl font-semibold tracking-tight">
                                Welcome back
                            </h2>

                            <p className="mt-3 leading-7 text-[#786f62]">
                                Your personalized skincare space is waiting for you.
                            </p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Email address
                                </label>

                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full rounded-2xl border border-[#ddd3c0] bg-[#fcfaf6] px-4 py-3.5 outline-none transition focus:border-[#b79b62] focus:ring-4 focus:ring-[#d8c69c]/20"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full rounded-2xl border border-[#ddd3c0] bg-[#fcfaf6] px-4 py-3.5 outline-none transition focus:border-[#b79b62] focus:ring-4 focus:ring-[#d8c69c]/20"
                                />
                            </div>

                            {error && (
                                <div className="rounded-2xl border border-[#e4c9b8] bg-[#fff8f3] px-4 py-3 text-sm text-[#865c49]">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-2xl bg-[#342f28] px-5 py-4 font-medium text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#4a4237] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Opening your space..." : "Sign in to SkinSense →"}
                            </button>
                        </form>

                        <div className="my-7 flex items-center gap-4">
                            <div className="h-px flex-1 bg-[#e8dfcf]" />
                            <span className="text-xs uppercase tracking-widest text-[#a49a8c]">
                                SkinSense
                            </span>
                            <div className="h-px flex-1 bg-[#e8dfcf]" />
                        </div>

                        <p className="text-center text-sm text-[#786f62]">
                            New here?{" "}
                            <Link
                                href="/signup"
                                className="font-semibold text-[#91743d] hover:underline"
                            >
                                Create your skin profile
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
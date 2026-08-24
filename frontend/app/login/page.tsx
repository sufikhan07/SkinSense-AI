"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = "https://skinsense-ai-f7o6.onrender.com";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                `${API_URL}/api/auth/login`,
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
                throw new Error(
                    data.detail || "Invalid email or password."
                );
            }

            localStorage.setItem(
                "skinsense_token",
                data.token
            );

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
        <main className="min-h-screen bg-[#f6f3ec] px-6 py-10 text-[#1b1b18]">
            <nav className="mx-auto flex max-w-6xl items-center justify-between">
                <Link href="/" className="text-xl font-semibold">
                    SkinSense <span className="text-[#74806a]">✦</span>
                </Link>

                <Link
                    href="/signup"
                    className="rounded-full border border-[#d1cbbe] bg-white/60 px-5 py-2.5 text-sm font-medium"
                >
                    Create account
                </Link>
            </nav>

            <section className="mx-auto grid min-h-[82vh] max-w-6xl items-center gap-12 lg:grid-cols-2">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#7c866f]">
                        welcome back
                    </p>

                    <h1 className="mt-5 max-w-xl font-serif text-6xl leading-[1.02]">
                        Your skin space is
                        <span className="italic text-[#687461]">
                            {" "}waiting.
                        </span>
                    </h1>

                    <p className="mt-7 max-w-lg text-lg leading-8 text-[#706b61]">
                        Return to your dashboard, retake your skin assessment and continue
                        building a routine around your skin.
                    </p>
                </div>

                <div className="mx-auto w-full max-w-md rounded-[32px] border border-white/80 bg-white/75 p-8 shadow-[0_30px_90px_rgba(63,60,49,0.12)]">
                    <h2 className="text-3xl font-semibold">
                        Log in
                    </h2>

                    <form
                        onSubmit={handleLogin}
                        className="mt-8 space-y-5"
                    >
                        <input
                            required
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            placeholder="Email address"
                            className="w-full rounded-2xl border border-[#ddd7cb] bg-[#fbfaf6] px-4 py-4 outline-none focus:border-[#7a856c]"
                        />

                        <input
                            required
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="Password"
                            className="w-full rounded-2xl border border-[#ddd7cb] bg-[#fbfaf6] px-4 py-4 outline-none focus:border-[#7a856c]"
                        />

                        {error && (
                            <p className="rounded-2xl bg-[#fff8ef] px-4 py-3 text-sm text-[#795e44]">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-2xl bg-[#1e1f1b] px-5 py-4 font-medium text-white transition hover:-translate-y-1 disabled:opacity-60"
                        >
                            {loading
                                ? "Opening your dashboard..."
                                : "Log in →"}
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
}
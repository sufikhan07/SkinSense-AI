"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function SignupPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                `${API_URL}/api/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.detail || "Unable to create your account."
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
                    href="/login"
                    className="rounded-full border border-[#d1cbbe] bg-white/60 px-5 py-2.5 text-sm font-medium"
                >
                    Log in
                </Link>
            </nav>

            <section className="mx-auto grid min-h-[82vh] max-w-6xl items-center gap-12 lg:grid-cols-2">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#7c866f]">
                        create your skin space
                    </p>

                    <h1 className="mt-5 max-w-xl font-serif text-6xl leading-[1.02]">
                        A routine that
                        <span className="italic text-[#687461]">
                            {" "}remembers you.
                        </span>
                    </h1>

                    <p className="mt-7 max-w-lg text-lg leading-8 text-[#706b61]">
                        Create your SkinSense profile, complete your assessment and return
                        anytime to your personalized routine.
                    </p>
                </div>

                <div className="mx-auto w-full max-w-md rounded-[32px] border border-white/80 bg-white/75 p-8 shadow-[0_30px_90px_rgba(63,60,49,0.12)] backdrop-blur-xl">
                    <p className="text-sm text-[#7d776b]">SkinSense ✦</p>

                    <h2 className="mt-3 text-3xl font-semibold">
                        Create account
                    </h2>

                    <form
                        onSubmit={handleSignup}
                        className="mt-8 space-y-5"
                    >
                        <input
                            required
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            placeholder="Your name"
                            className="w-full rounded-2xl border border-[#ddd7cb] bg-[#fbfaf6] px-4 py-4 outline-none focus:border-[#7a856c]"
                        />

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
                            minLength={6}
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
                                ? "Creating your profile..."
                                : "Create my SkinSense profile →"}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-[#777166]">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-[#687461]"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    );
}
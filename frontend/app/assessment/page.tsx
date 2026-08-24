"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

const skinTypes = [
    {
        name: "Oily",
        description:
            "Shine develops quickly and pores may feel more visible.",
        icon: "◉",
    },
    {
        name: "Dry",
        description:
            "Skin often feels tight, rough or in need of richer hydration.",
        icon: "◇",
    },
    {
        name: "Combination",
        description:
            "Some areas feel oily while others feel normal or dry.",
        icon: "◐",
    },
    {
        name: "Normal",
        description:
            "Skin generally feels balanced without persistent dryness or oil.",
        icon: "○",
    },
];

const concerns = [
    "Acne",
    "Dark spots",
    "Dryness",
    "Redness",
    "Dullness",
    "Fine lines",
];

const sensitivityOptions = [
    "Low",
    "Medium",
    "High",
];

const frequencyOptions = [
    "Rarely",
    "Sometimes",
    "Often",
    "Very often",
];

const sunscreenOptions = [
    "Never",
    "Rarely",
    "Most days",
    "Every day",
];

function OptionButton({
    active,
    onClick,
    children,
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-[26px] border p-5 text-left transition duration-300 ${active
                    ? "border-[#69745F] bg-[#E3E8DC] shadow-[0_15px_40px_rgba(75,84,65,0.13)]"
                    : "border-[#DDD7CA] bg-white/70 hover:-translate-y-1 hover:border-[#ACA492] hover:bg-white"
                }`}
        >
            <div className="flex items-center justify-between gap-4">
                <span className="font-medium">
                    {children}
                </span>

                <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs ${active
                            ? "border-[#66705A] bg-[#66705A] text-white"
                            : "border-[#C9C2B3]"
                        }`}
                >
                    {active ? "✓" : ""}
                </span>
            </div>
        </button>
    );
}

export default function AssessmentPage() {
    const router = useRouter();

    const [skinType, setSkinType] =
        useState("");

    const [
        selectedConcerns,
        setSelectedConcerns,
    ] = useState<string[]>([]);

    const [sensitivity, setSensitivity] =
        useState("");

    const [
        acneFrequency,
        setAcneFrequency,
    ] = useState("");

    const [
        rashFrequency,
        setRashFrequency,
    ] = useState("");

    const [
        sunscreenUse,
        setSunscreenUse,
    ] = useState("");

    const [age, setAge] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const toggleConcern = (
        concern: string
    ) => {
        setSelectedConcerns(
            (current) =>
                current.includes(concern)
                    ? current.filter(
                        (item) =>
                            item !== concern
                    )
                    : [
                        ...current,
                        concern,
                    ]
        );
    };

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");

        if (
            !skinType ||
            selectedConcerns.length === 0 ||
            !sensitivity ||
            !acneFrequency ||
            !rashFrequency ||
            !sunscreenUse ||
            !age
        ) {
            setError(
                "Complete every section so SkinSense can build your profile."
            );

            return;
        }

        const numericAge =
            Number(age);

        if (
            numericAge < 13 ||
            numericAge > 100
        ) {
            setError(
                "Please enter a valid age."
            );

            return;
        }

        setLoading(true);

        const assessmentData = {
            skinType,
            concerns:
                selectedConcerns,
            sensitivity,
            acneFrequency,
            rashFrequency,
            sunscreenUse,
            age: numericAge,
        };

        try {
            const response =
                await fetch(
                    `${API_URL}/api/assessment`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        body: JSON.stringify(
                            assessmentData
                        ),
                    }
                );

            if (!response.ok) {
                throw new Error(
                    "Assessment request failed."
                );
            }

            const data =
                await response.json();

            localStorage.setItem(
                "skinsense_result",
                JSON.stringify(data)
            );

            const token =
                localStorage.getItem(
                    "skinsense_token"
                );

            if (token) {
                const profileResponse =
                    await fetch(
                        `${API_URL}/api/profile/assessment`,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type":
                                    "application/json",
                                Authorization:
                                    `Bearer ${token}`,
                            },
                            body: JSON.stringify(
                                assessmentData
                            ),
                        }
                    );

                if (
                    profileResponse.ok
                ) {
                    const profileData =
                        await profileResponse.json();

                    localStorage.setItem(
                        "skinsense_user",
                        JSON.stringify(
                            profileData.user
                        )
                    );
                }
            }

            router.push(
                "/results"
            );
        } catch (
        requestError
        ) {
            console.error(
                requestError
            );

            setError(
                "SkinSense could not reach the analysis service. Make sure the backend is running."
            );

            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#F5F2EA] text-[#1C1C19]">
            {/* NAVBAR */}
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7 lg:px-10">
                <Link
                    href="/"
                    className="text-xl font-semibold"
                >
                    SkinSense{" "}
                    <span className="text-[#74806A]">
                        ✦
                    </span>
                </Link>

                <div className="flex items-center gap-3">
                    <span className="hidden text-sm text-[#777166] md:block">
                        Your skin assessment
                    </span>

                    <Link
                        href="/dashboard"
                        className="rounded-full border border-[#D0CABC] bg-white/60 px-5 py-2.5 text-sm font-medium transition hover:bg-white"
                    >
                        Dashboard
                    </Link>
                </div>
            </nav>

            {/* HERO */}
            <section className="border-y border-[#DDD7CA] bg-[#E5E9DF]">
                <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1fr_0.6fr] lg:px-10">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#64705B]">
                            SkinSense assessment
                        </p>

                        <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-tight sm:text-7xl">
                            Tell us how your skin
                            <span className="italic text-[#687461]">
                                {" "}actually behaves.
                            </span>
                        </h1>
                    </div>

                    <div className="flex items-end">
                        <p className="max-w-lg text-lg leading-8 text-[#656A5F]">
                            This assessment looks beyond skin type.
                            We consider breakouts, sensitivity,
                            irritation, concerns and sunscreen
                            habits to build a clearer routine.
                        </p>
                    </div>
                </div>
            </section>

            <form
                onSubmit={handleSubmit}
            >
                {/* 01 SKIN TYPE */}
                <section className="border-b border-[#DDD7CA]">
                    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.35fr_1fr] lg:px-10">
                        <div>
                            <p className="text-sm font-semibold text-[#78836B]">
                                01
                            </p>

                            <h2 className="mt-3 font-serif text-3xl italic">
                                Skin type
                            </h2>

                            <p className="mt-4 text-sm leading-6 text-[#787268]">
                                Choose what feels closest to your skin on most days.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {skinTypes.map(
                                (option) => (
                                    <button
                                        key={
                                            option.name
                                        }
                                        type="button"
                                        onClick={() =>
                                            setSkinType(
                                                option.name
                                            )
                                        }
                                        className={`min-h-[180px] rounded-[30px] border p-6 text-left transition duration-300 ${skinType ===
                                                option.name
                                                ? "border-[#65715D] bg-[#E1E7DA] shadow-xl"
                                                : "border-[#DDD7CA] bg-white/65 hover:-translate-y-2 hover:bg-white hover:shadow-lg"
                                            }`}
                                    >
                                        <div className="flex justify-between">
                                            <span className="text-3xl text-[#687461]">
                                                {
                                                    option.icon
                                                }
                                            </span>

                                            <span>
                                                {skinType ===
                                                    option.name
                                                    ? "✓"
                                                    : ""}
                                            </span>
                                        </div>

                                        <h3 className="mt-8 text-xl font-semibold">
                                            {
                                                option.name
                                            }
                                        </h3>

                                        <p className="mt-3 text-sm leading-6 text-[#746F65]">
                                            {
                                                option.description
                                            }
                                        </p>
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                </section>

                {/* 02 CONCERNS */}
                <section className="border-b border-[#DDD7CA] bg-white/30">
                    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.35fr_1fr] lg:px-10">
                        <div>
                            <p className="text-sm font-semibold text-[#8C805A]">
                                02
                            </p>

                            <h2 className="mt-3 font-serif text-3xl italic">
                                Your concerns
                            </h2>

                            <p className="mt-4 text-sm leading-6 text-[#787268]">
                                Choose more than one if needed.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {concerns.map(
                                (concern) => (
                                    <OptionButton
                                        key={
                                            concern
                                        }
                                        active={selectedConcerns.includes(
                                            concern
                                        )}
                                        onClick={() =>
                                            toggleConcern(
                                                concern
                                            )
                                        }
                                    >
                                        {
                                            concern
                                        }
                                    </OptionButton>
                                )
                            )}
                        </div>
                    </div>
                </section>

                {/* 03 SENSITIVITY */}
                <section className="border-b border-[#DDD7CA]">
                    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.35fr_1fr] lg:px-10">
                        <div>
                            <p className="text-sm font-semibold text-[#78836B]">
                                03
                            </p>

                            <h2 className="mt-3 font-serif text-3xl italic">
                                Sensitivity
                            </h2>

                            <p className="mt-4 text-sm leading-6 text-[#787268]">
                                How reactive does your skin feel to new products or weather changes?
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            {sensitivityOptions.map(
                                (option) => (
                                    <OptionButton
                                        key={
                                            option
                                        }
                                        active={
                                            sensitivity ===
                                            option
                                        }
                                        onClick={() =>
                                            setSensitivity(
                                                option
                                            )
                                        }
                                    >
                                        {
                                            option
                                        }
                                    </OptionButton>
                                )
                            )}
                        </div>
                    </div>
                </section>

                {/* 04 BREAKOUTS */}
                <section className="border-b border-[#DDD7CA] bg-[#E7EBDD]/55">
                    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.35fr_1fr] lg:px-10">
                        <div>
                            <p className="text-sm font-semibold text-[#65715D]">
                                04
                            </p>

                            <h2 className="mt-3 font-serif text-3xl italic">
                                Breakouts
                            </h2>

                            <p className="mt-4 text-sm leading-6 text-[#687064]">
                                How often do acne or breakouts appear?
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {frequencyOptions.map(
                                (option) => (
                                    <OptionButton
                                        key={
                                            option
                                        }
                                        active={
                                            acneFrequency ===
                                            option
                                        }
                                        onClick={() =>
                                            setAcneFrequency(
                                                option
                                            )
                                        }
                                    >
                                        {
                                            option
                                        }
                                    </OptionButton>
                                )
                            )}
                        </div>
                    </div>
                </section>

                {/* 05 IRRITATION */}
                <section className="border-b border-[#DDD7CA]">
                    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.35fr_1fr] lg:px-10">
                        <div>
                            <p className="text-sm font-semibold text-[#8C805A]">
                                05
                            </p>

                            <h2 className="mt-3 font-serif text-3xl italic">
                                Irritation
                            </h2>

                            <p className="mt-4 text-sm leading-6 text-[#787268]">
                                How often do redness, irritation or rashes occur?
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {frequencyOptions.map(
                                (option) => (
                                    <OptionButton
                                        key={
                                            option
                                        }
                                        active={
                                            rashFrequency ===
                                            option
                                        }
                                        onClick={() =>
                                            setRashFrequency(
                                                option
                                            )
                                        }
                                    >
                                        {
                                            option
                                        }
                                    </OptionButton>
                                )
                            )}
                        </div>
                    </div>
                </section>

                {/* 06 SUNSCREEN */}
                <section className="border-b border-[#DDD7CA] bg-[#E8DFC8]/45">
                    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.35fr_1fr] lg:px-10">
                        <div>
                            <p className="text-sm font-semibold text-[#8C805A]">
                                06
                            </p>

                            <h2 className="mt-3 font-serif text-3xl italic">
                                Sun protection
                            </h2>

                            <p className="mt-4 text-sm leading-6 text-[#787268]">
                                How often is sunscreen part of your morning routine?
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {sunscreenOptions.map(
                                (option) => (
                                    <OptionButton
                                        key={
                                            option
                                        }
                                        active={
                                            sunscreenUse ===
                                            option
                                        }
                                        onClick={() =>
                                            setSunscreenUse(
                                                option
                                            )
                                        }
                                    >
                                        {
                                            option
                                        }
                                    </OptionButton>
                                )
                            )}
                        </div>
                    </div>
                </section>

                {/* 07 AGE */}
                <section>
                    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.35fr_1fr] lg:px-10">
                        <div>
                            <p className="text-sm font-semibold text-[#78836B]">
                                07
                            </p>

                            <h2 className="mt-3 font-serif text-3xl italic">
                                Your age
                            </h2>

                            <p className="mt-4 text-sm leading-6 text-[#787268]">
                                Age helps SkinSense keep recommendations age-appropriate.
                            </p>
                        </div>

                        <div>
                            <input
                                type="number"
                                value={
                                    age
                                }
                                onChange={(
                                    event
                                ) =>
                                    setAge(
                                        event.target
                                            .value
                                    )
                                }
                                min="13"
                                max="100"
                                placeholder="Enter your age"
                                className="w-full max-w-md rounded-[26px] border border-[#D7D0C2] bg-white/80 px-6 py-5 text-xl outline-none transition focus:border-[#69745F] focus:ring-4 focus:ring-[#BBC5AC]/25"
                            />

                            {error && (
                                <p className="mt-6 max-w-xl rounded-[22px] bg-[#FFF8EE] px-5 py-4 text-sm text-[#765F45]">
                                    {
                                        error
                                    }
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={
                                    loading
                                }
                                className="mt-8 w-full max-w-xl rounded-[26px] bg-[#20211D] px-8 py-5 text-lg font-medium text-white shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading
                                    ? "Building your SkinSense routine..."
                                    : "Reveal my SkinSense routine →"}
                            </button>
                        </div>
                    </div>
                </section>
            </form>

            {/* FOOTER */}
            <footer className="border-t border-[#DDD7CA] bg-[#E5E9DF]">
                <div className="mx-auto max-w-7xl px-6 py-10 text-sm leading-7 text-[#697064] lg:px-10">
                    SkinSense provides general skincare guidance and is not a substitute
                    for medical diagnosis or professional dermatologist care.
                </div>
            </footer>
        </main>
    );
}
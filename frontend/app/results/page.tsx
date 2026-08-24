"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";

type RoutineStep = {
    step: string;
    title: string;
    detail: string;
    ingredient: string;
};

type Ingredient = {
    name: string;
    tag: string;
    description: string;
};

type Product = {
    name: string;
    type: string;
    actives: string;
    note: string;
};

type ResultData = {
    success: boolean;

    assessment: {
        skinType: string;
        concerns: string[];
        sensitivity: string;
        acneFrequency: string;
        rashFrequency: string;
        sunscreenUse: string;
        age: number;
    };

    analysis: {
        profileSummary: string;
        focusAreas: string[];
        morning: RoutineStep[];
        evening: RoutineStep[];
        ingredients: Ingredient[];
        products: Product[];
        sensitivityNote: string;
        sunscreenNote: string;
    };
};

function subscribe() {
    return () => { };
}

function getResultSnapshot(): string {
    return localStorage.getItem("skinsense_result") || "";
}

function getServerSnapshot(): string {
    return "";
}

function RoutineCard({
    step,
}: {
    step: RoutineStep;
}) {
    return (
        <article className="group rounded-[30px] border border-[#d8d3c7] bg-white/80 p-6 shadow-[0_14px_45px_rgba(55,53,45,0.05)] transition duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-[0_24px_60px_rgba(55,53,45,0.1)]">
            <div className="flex items-center justify-between gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#dfe5d8] text-sm font-semibold text-[#56624f]">
                    {step.step}
                </span>

                <span className="rounded-full bg-[#e8ecdf] px-4 py-2 text-sm font-semibold text-[#56624f]">
                    {step.ingredient}
                </span>
            </div>

            <h3 className="mt-8 font-serif text-4xl font-medium tracking-tight text-[#20211d]">
                {step.title}
            </h3>

            <p className="mt-5 text-lg leading-8 text-[#4f514a]">
                {step.detail}
            </p>
        </article>
    );
}

function RoutineSection({
    title,
    subtitle,
    icon,
    steps,
}: {
    title: string;
    subtitle: string;
    icon: string;
    steps: RoutineStep[];
}) {
    return (
        <section className="mt-20">
            <div className="grid gap-5 md:grid-cols-[0.55fr_1fr] md:items-end">
                <div>
                    <p className="text-2xl text-[#67735f]">
                        {icon}
                    </p>

                    <h2 className="mt-3 font-serif text-5xl italic sm:text-6xl">
                        {title}
                    </h2>
                </div>

                <div className="md:text-right">
                    <p className="text-base leading-7 text-[#6f6b61]">
                        {subtitle}
                    </p>

                    <p className="mt-2 text-sm font-medium text-[#8b846f]">
                        {steps.length} recommended steps
                    </p>
                </div>
            </div>

            <div
                className={`mt-8 grid gap-5 ${steps.length === 4
                        ? "md:grid-cols-2 xl:grid-cols-4"
                        : "md:grid-cols-3"
                    }`}
            >
                {steps.map((step) => (
                    <RoutineCard
                        key={`${title}-${step.step}`}
                        step={step}
                    />
                ))}
            </div>
        </section>
    );
}

export default function ResultsPage() {
    const storedResult = useSyncExternalStore(
        subscribe,
        getResultSnapshot,
        getServerSnapshot
    );

    const result = useMemo<ResultData | null>(() => {
        if (!storedResult) {
            return null;
        }

        try {
            return JSON.parse(
                storedResult
            ) as ResultData;
        } catch {
            return null;
        }
    }, [storedResult]);

    if (!result) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#f5f2ea] px-6 text-[#1c1c19]">
                <div className="max-w-lg text-center">
                    <p className="text-5xl text-[#74806a]">
                        ✦
                    </p>

                    <h1 className="mt-7 font-serif text-5xl italic sm:text-6xl">
                        Your routine is waiting.
                    </h1>

                    <p className="mt-5 text-lg leading-8 text-[#716c62]">
                        Complete your SkinSense assessment
                        first and your personalized skincare
                        dashboard will appear here.
                    </p>

                    <Link
                        href="/assessment"
                        className="mt-9 inline-flex rounded-full bg-[#20211d] px-7 py-4 font-medium text-white transition hover:-translate-y-1"
                    >
                        Take my assessment →
                    </Link>
                </div>
            </main>
        );
    }

    const {
        assessment,
        analysis,
    } = result;

    return (
        <main className="min-h-screen bg-[#f5f2ea] text-[#1c1c19]">
            {/* NAV */}
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7 lg:px-10">
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
                    <Link
                        href="/dashboard"
                        className="rounded-full border border-[#d0cabd] bg-white/60 px-5 py-2.5 text-sm font-medium transition hover:bg-white"
                    >
                        Dashboard
                    </Link>

                    <Link
                        href="/assessment"
                        className="rounded-full bg-[#20211d] px-5 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5"
                    >
                        Re-analyze
                    </Link>
                </div>
            </nav>

            {/* HERO */}
            <section className="border-y border-[#dad4c7] bg-[#e3e8dc]">
                <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1fr_0.7fr] lg:px-10">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#65715d]">
                            your SkinSense results
                        </p>

                        <h1 className="mt-6 font-serif text-5xl leading-[1.02] sm:text-7xl">
                            Your skin,
                            <span className="italic text-[#66725e]">
                                {" "}decoded.
                            </span>
                        </h1>
                    </div>

                    <div className="flex items-end">
                        <div>
                            <p className="text-xl leading-9 text-[#4f554b]">
                                {analysis.profileSummary}
                            </p>

                            <p className="mt-4 text-sm text-[#747a6d]">
                                Built from your skin type,
                                concerns, sensitivity and daily
                                habits.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="mx-auto max-w-7xl px-6 pb-24 pt-12 lg:px-10">
                {/* PROFILE */}
                <section>
                    <div className="mb-6 flex items-end justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#778269]">
                                your profile
                            </p>

                            <h2 className="mt-3 font-serif text-4xl italic">
                                Skin at a glance
                            </h2>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            [
                                "Skin type",
                                assessment.skinType,
                                "◌",
                            ],
                            [
                                "Sensitivity",
                                assessment.sensitivity,
                                "◇",
                            ],
                            [
                                "Age",
                                String(assessment.age),
                                "○",
                            ],
                            [
                                "Main concern",
                                assessment.concerns[0] ||
                                "Maintenance",
                                "✦",
                            ],
                        ].map(
                            ([label, value, icon]) => (
                                <article
                                    key={label}
                                    className="rounded-[28px] border border-[#d9d4c8] bg-white/75 p-6 transition duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-lg"
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#8c8679]">
                                            {label}
                                        </p>

                                        <span className="text-xl text-[#74806a]">
                                            {icon}
                                        </span>
                                    </div>

                                    <p className="mt-8 font-serif text-3xl italic text-[#25251f]">
                                        {value}
                                    </p>
                                </article>
                            )
                        )}
                    </div>
                </section>

                {/* STRATEGY */}
                <section className="mt-6 rounded-[34px] bg-[#20211d] p-8 text-white sm:p-10">
                    <div className="grid gap-8 lg:grid-cols-[0.5fr_1fr]">
                        <div>
                            <p className="text-xs uppercase tracking-[0.25em] text-[#b7bf9f]">
                                your routine strategy
                            </p>

                            <h2 className="mt-4 font-serif text-4xl italic sm:text-5xl">
                                What we&apos;re targeting
                            </h2>
                        </div>

                        <div>
                            <div className="flex flex-wrap gap-3">
                                {analysis.focusAreas.map(
                                    (focus) => (
                                        <span
                                            key={focus}
                                            className="rounded-full border border-white/10 bg-white/[0.08] px-4 py-2.5 text-sm font-medium"
                                        >
                                            {focus}
                                        </span>
                                    )
                                )}
                            </div>

                            <p className="mt-7 text-base leading-8 text-white/70">
                                {analysis.sensitivityNote}
                            </p>

                            <p className="mt-3 text-base leading-8 text-white/70">
                                {analysis.sunscreenNote}
                            </p>
                        </div>
                    </div>
                </section>

                {/* ROUTINES */}
                <RoutineSection
                    title="Morning ritual"
                    subtitle="Keep mornings simple: prepare the skin, support it, moisturize and protect."
                    icon="☼"
                    steps={analysis.morning}
                />

                <RoutineSection
                    title="Evening ritual"
                    subtitle="Your evening routine focuses on cleansing, targeted treatment and barrier recovery."
                    icon="☾"
                    steps={analysis.evening}
                />

                {/* INGREDIENTS */}
                <section className="mt-24">
                    <div className="grid gap-6 lg:grid-cols-[1fr_0.55fr] lg:items-end">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#78836b]">
                                ingredient recommendations
                            </p>

                            <h2 className="mt-4 max-w-4xl font-serif text-5xl leading-tight sm:text-6xl">
                                Know what your skin
                                <span className="italic text-[#65715d]">
                                    {" "}may benefit from.
                                </span>
                            </h2>
                        </div>

                        <p className="text-base leading-7 text-[#716c62]">
                            These ingredients are selected from
                            your assessment profile. Introduce new
                            actives gradually rather than adding
                            everything at once.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-5 md:grid-cols-2">
                        {analysis.ingredients.map(
                            (ingredient) => (
                                <article
                                    key={ingredient.name}
                                    className="rounded-[30px] border border-[#d8d3c7] bg-white/75 p-7 transition duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-xl"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="rounded-full bg-[#e1e7da] px-4 py-2 text-sm font-semibold text-[#596451]">
                                            {ingredient.tag}
                                        </span>

                                        <span className="text-xl text-[#8c805a]">
                                            ✦
                                        </span>
                                    </div>

                                    <h3 className="mt-10 font-serif text-4xl italic text-[#23231f]">
                                        {ingredient.name}
                                    </h3>

                                    <p className="mt-5 text-lg leading-8 text-[#505149]">
                                        {ingredient.description}
                                    </p>
                                </article>
                            )
                        )}
                    </div>
                </section>

                {/* PRODUCTS */}
                <section className="mt-24">
                    <div className="grid gap-6 lg:grid-cols-[1fr_0.55fr] lg:items-end">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8c805a]">
                                product examples
                            </p>

                            <h2 className="mt-4 font-serif text-5xl leading-tight sm:text-6xl">
                                Products that fit your
                                <span className="italic text-[#65715d]">
                                    {" "}routine logic.
                                </span>
                            </h2>
                        </div>

                        <p className="text-base leading-7 text-[#716c62]">
                            These are examples, not mandatory
                            purchases. Focus first on the type of
                            product and active ingredients you need.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        {analysis.products.map(
                            (product) => (
                                <article
                                    key={product.name}
                                    className="flex min-h-[360px] flex-col rounded-[32px] border border-[#d8d0bb] bg-[#e8dfc8]/65 p-7 transition duration-300 hover:-translate-y-3 hover:bg-[#e8dfc8] hover:shadow-xl"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#796e52]">
                                            {product.type}
                                        </span>

                                        <span className="text-xl text-[#796e52]">
                                            ◇
                                        </span>
                                    </div>

                                    <h3 className="mt-9 text-2xl font-semibold leading-8 text-[#25231d]">
                                        {product.name}
                                    </h3>

                                    <div className="mt-6 rounded-[20px] bg-white/60 p-5">
                                        <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#8a8068]">
                                            Key actives
                                        </p>

                                        <p className="mt-3 text-base font-semibold text-[#3d3c35]">
                                            {product.actives}
                                        </p>
                                    </div>

                                    <p className="mt-auto pt-7 text-base leading-7 text-[#5c574a]">
                                        {product.note}
                                    </p>
                                </article>
                            )
                        )}
                    </div>
                </section>

                {/* SUMMARY */}
                <section className="mt-20 grid gap-5 md:grid-cols-2">
                    <div className="rounded-[30px] bg-[#e2e7dc] p-8">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#65715d]">
                            remember
                        </p>

                        <h3 className="mt-4 font-serif text-3xl italic">
                            Consistency beats complexity.
                        </h3>

                        <p className="mt-5 text-base leading-8 text-[#555b51]">
                            You do not need every active ingredient
                            at once. Start with cleanser,
                            moisturizer and sunscreen, then introduce
                            targeted treatments gradually.
                        </p>
                    </div>

                    <div className="rounded-[30px] border border-[#d7d1c4] bg-white/60 p-8">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8c805a]">
                            medical note
                        </p>

                        <h3 className="mt-4 font-serif text-3xl italic">
                            Know when skincare isn&apos;t enough.
                        </h3>

                        <p className="mt-5 text-base leading-8 text-[#69645b]">
                            Persistent acne, painful breakouts,
                            severe rashes, swelling or ongoing
                            irritation should be evaluated by a
                            qualified dermatologist or healthcare
                            professional.
                        </p>
                    </div>
                </section>

                {/* CTA */}
                <section className="mt-20 rounded-[36px] bg-[#20211d] px-8 py-12 text-center text-white sm:px-12">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b6bd9e]">
                        your routine can evolve
                    </p>

                    <h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl italic sm:text-5xl">
                        Skin changes. Your routine can too.
                    </h2>

                    <p className="mx-auto mt-5 max-w-xl leading-7 text-white/60">
                        Retake the assessment whenever your skin
                        behaviour, sensitivity or concerns change.
                    </p>

                    <Link
                        href="/assessment"
                        className="mt-8 inline-flex rounded-full bg-[#eee6d2] px-7 py-4 font-medium text-[#20211d] transition hover:-translate-y-1"
                    >
                        Re-analyze my skin →
                    </Link>
                </section>
            </div>

            {/* FOOTER */}
            <footer className="bg-[#191a17] text-white">
                <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-6 py-12 sm:flex-row lg:px-10">
                    <div>
                        <p className="text-xl font-semibold">
                            SkinSense{" "}
                            <span className="text-[#b5bd9f]">
                                ✦
                            </span>
                        </p>

                        <p className="mt-3 text-sm text-white/45">
                            Personalized skincare guidance.
                        </p>
                    </div>

                    <div className="flex gap-5 text-sm text-white/60">
                        <Link href="/dashboard">
                            Dashboard
                        </Link>

                        <Link href="/assessment">
                            Assessment
                        </Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}
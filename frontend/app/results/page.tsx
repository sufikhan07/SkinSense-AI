"use client";

import { useSearchParams } from "next/navigation";

export default function ResultsPage() {
    const searchParams = useSearchParams();

    const skinType = searchParams.get("skinType");
    const concern = searchParams.get("concern");
    const sensitivity = searchParams.get("sensitivity");

    const recommendationsParam = searchParams.get("recommendations");

    let recommendations: string[] = [];

    if (recommendationsParam) {
        try {
            recommendations = JSON.parse(
                decodeURIComponent(recommendationsParam)
            );
        } catch {
            recommendations = [];
        }
    }

    return (
        <main className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-900">
            <div className="mx-auto max-w-4xl">

                {/* Header */}
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
                        SkinSense AI
                    </p>

                    <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                        Your Skin Analysis
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl text-zinc-600">
                        Based on the information you provided, here are
                        personalized recommendations for your skincare routine.
                    </p>
                </div>

                {/* Profile */}
                <section className="mt-10">
                    <h2 className="text-xl font-semibold">
                        Your Skin Profile
                    </h2>

                    <div className="mt-4 grid gap-4 sm:grid-cols-3">

                        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                            <p className="text-sm text-zinc-500">
                                Skin Type
                            </p>

                            <p className="mt-2 text-2xl font-semibold capitalize">
                                {skinType || "Not provided"}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                            <p className="text-sm text-zinc-500">
                                Main Concern
                            </p>

                            <p className="mt-2 text-2xl font-semibold capitalize">
                                {concern
                                    ? concern.replace("-", " ")
                                    : "Not provided"}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                            <p className="text-sm text-zinc-500">
                                Sensitivity
                            </p>

                            <p className="mt-2 text-2xl font-semibold capitalize">
                                {sensitivity || "Not provided"}
                            </p>
                        </div>

                    </div>
                </section>

                {/* Recommendations */}
                <section className="mt-10 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">

                    <div>
                        <p className="text-sm font-medium text-rose-500">
                            AI-Powered Recommendations
                        </p>

                        <h2 className="mt-2 text-2xl font-semibold">
                            Your Personalized Routine
                        </h2>
                    </div>

                    <div className="mt-8 space-y-4">

                        {recommendations.length > 0 ? (
                            recommendations.map((recommendation, index) => (
                                <div
                                    key={index}
                                    className="rounded-2xl border border-zinc-100 bg-zinc-50 p-5"
                                >
                                    <div className="flex gap-4">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-100 text-sm font-semibold text-rose-600">
                                            {index + 1}
                                        </div>

                                        <div>
                                            <p className="leading-7 text-zinc-700">
                                                {recommendation}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-zinc-500">
                                No recommendations are available.
                            </p>
                        )}

                    </div>
                </section>

                {/* Disclaimer */}
                <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                    <p className="text-sm leading-6 text-amber-800">
                        SkinSense AI provides general skincare information and
                        is not a substitute for professional medical advice.
                        If you have persistent or severe skin concerns,
                        consult a qualified dermatologist.
                    </p>
                </div>

                {/* Footer */}
                <footer className="py-10 text-center text-sm text-zinc-400">
                    SkinSense AI · Personalized skincare recommendations
                </footer>

            </div>
        </main>
    );
}
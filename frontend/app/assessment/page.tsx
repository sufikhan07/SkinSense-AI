"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AssessmentPage() {
    const [skinType, setSkinType] = useState("");
    const [concern, setConcern] = useState("");
    const [sensitivity, setSensitivity] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async () => {
        setError("");

        if (!skinType || !concern || !sensitivity || !age) {
            setError("Please complete all fields before continuing.");
            return;
        }

        const numericAge = Number(age);

        if (numericAge < 13 || numericAge > 100) {
            setError("Please enter a valid age.");
            return;
        }

        const assessmentData = {
            skinType,
            concern,
            sensitivity,
            age: numericAge,
        };
        setLoading(true);

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/assessment",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(assessmentData),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to analyze assessment.");
            }

            const data = await response.json();

            console.log("Backend response:", data);

            const recommendations = encodeURIComponent(
                JSON.stringify(data.recommendations)
            );

            router.push(
                `/results?skinType=${skinType}&concern=${concern}&sensitivity=${sensitivity}&recommendations=${recommendations}`
            );
        } catch (error) {
            console.error(error);
            setLoading(false);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <main className="min-h-screen bg-white px-6 py-16 text-zinc-900">
            <div className="mx-auto max-w-3xl">
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-rose-500">
                    SkinSense AI
                </p>

                <h1 className="mt-4 text-4xl font-semibold">
                    Let&apos;s understand your skin.
                </h1>

                <p className="mt-4 text-zinc-600">
                    Tell us about your skin so we can personalize your
                    recommendations.
                </p>

                <div className="mt-10 space-y-8">
                    {/* Skin type */}
                    <div>
                        <label className="text-sm font-medium">
                            What is your skin type?
                        </label>

                        <select
                            value={skinType}
                            onChange={(event) =>
                                setSkinType(event.target.value)
                            }
                            className="mt-3 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3"
                        >
                            <option value="">Select your skin type</option>
                            <option value="oily">Oily</option>
                            <option value="dry">Dry</option>
                            <option value="combination">Combination</option>
                            <option value="normal">Normal</option>
                        </select>
                    </div>

                    {/* Main concern */}
                    <div>
                        <label className="text-sm font-medium">
                            What is your main skin concern?
                        </label>

                        <select
                            value={concern}
                            onChange={(event) =>
                                setConcern(event.target.value)
                            }
                            className="mt-3 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3"
                        >
                            <option value="">
                                Select your main concern
                            </option>
                            <option value="acne">Acne</option>
                            <option value="dark-spots">Dark spots</option>
                            <option value="dryness">Dryness</option>
                            <option value="redness">Redness</option>
                            <option value="fine-lines">Fine lines</option>
                        </select>
                    </div>

                    {/* Sensitivity */}
                    <div>
                        <label className="text-sm font-medium">
                            How sensitive is your skin?
                        </label>

                        <select
                            value={sensitivity}
                            onChange={(event) =>
                                setSensitivity(event.target.value)
                            }
                            className="mt-3 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3"
                        >
                            <option value="">
                                Select sensitivity
                            </option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    {/* Age */}
                    <div>
                        <label className="text-sm font-medium">
                            What is your age?
                        </label>

                        <input
                            type="number"
                            value={age}
                            onChange={(event) =>
                                setAge(event.target.value)
                            }
                            placeholder="Enter your age"
                            className="mt-3 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3"
                        />
                    </div>

                    {error && (
                        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full rounded-xl bg-zinc-900 px-6 py-4 font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Analyzing your skin..." : "Analyze My Skin"}
                    </button>
                </div>
            </div>
        </main>
    );
}
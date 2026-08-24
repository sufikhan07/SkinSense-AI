import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen bg-white
   text-zinc-900">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-rose-500">
          SkinSense AI
        </p>

        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl">
          Your skin deserves personalized care.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
          Get personalized skincare recommendations based on your unique skin
          profile and concerns.
        </p>

        <Link
          href="/assessment"
          className="mt-8 rounded-full bg-zinc-900 px-7 py-3 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          Start Skin Assessment
        </Link>
      </section>
    </main>
  );
}
import Link from "next/link";

const features = [
  {
    number: "01",
    title: "Understand your skin",
    text: "Tell SkinSense how your skin behaves — not just whether it feels oily or dry.",
  },
  {
    number: "02",
    title: "Build your routine",
    text: "Turn your concerns, sensitivity and habits into an easy morning and evening routine.",
  },
  {
    number: "03",
    title: "Know your ingredients",
    text: "Understand why ingredients such as niacinamide, ceramides and salicylic acid may appear in your routine.",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#F5F2EA] text-[#181816]">
      {/* NAVBAR */}
      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-7 lg:px-10">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          SkinSense <span className="text-[#74806A]">✦</span>
        </Link>

        <div className="hidden items-center gap-8 text-sm text-[#68655D] md:flex">
          <a href="#about" className="transition hover:text-black">
            About
          </a>

          <a href="#how" className="transition hover:text-black">
            How it works
          </a>

          <a href="#features" className="transition hover:text-black">
            Features
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-full border border-[#CBC5B7] bg-white/60 px-5 py-2.5 text-sm font-medium transition hover:bg-white"
          >
            Log in
          </Link>

          <Link
            href="/signup"
            className="rounded-full bg-[#20211D] px-5 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-black"
          >
            Create account
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative">
        <div className="absolute -left-40 top-20 h-[430px] w-[430px] rounded-full bg-[#DDE3D4]/80 blur-3xl" />
        <div className="absolute -right-36 top-40 h-[430px] w-[430px] rounded-full bg-[#E4D8BC]/55 blur-3xl" />

        <div className="relative mx-auto grid min-h-[82vh] max-w-7xl items-center gap-16 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#CFC8B8] bg-white/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#6F775F] backdrop-blur">
              ✦ personal skincare intelligence
            </div>

            <h1 className="mt-8 max-w-4xl font-serif text-6xl leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-[92px]">
              Your skin,
              <br />
              <span className="italic font-normal text-[#65715D]">
                understood.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-[#6E695F]">
              SkinSense learns how your skin behaves and turns your answers
              into a personalized skincare routine you can actually understand.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="rounded-full bg-[#20211D] px-7 py-4 font-medium text-white shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-black"
              >
                Create my SkinSense profile →
              </Link>

              <Link
                href="/assessment"
                className="rounded-full border border-[#C9C2B3] bg-white/65 px-7 py-4 font-medium transition hover:bg-white"
              >
                Try the assessment
              </Link>
            </div>
          </div>

          {/* DASHBOARD MOCK */}
          <div className="relative mx-auto h-[560px] w-full max-w-[520px]">
            <div className="absolute left-0 top-12 w-[82%] rounded-[38px] border border-white/80 bg-white/80 p-7 shadow-[0_35px_100px_rgba(61,58,48,0.13)] backdrop-blur-xl transition duration-500 hover:-translate-y-3">
              <div className="flex justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#908979]">
                    Your skin profile
                  </p>

                  <h2 className="mt-3 font-serif text-3xl italic">
                    Built around you.
                  </h2>
                </div>

                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E4E9DD] text-xl text-[#65715D]">
                  ◌
                </span>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  ["Skin type", "Combination"],
                  ["Sensitivity", "Medium"],
                  ["Concern", "Breakouts"],
                  ["Routine", "7 steps"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl bg-[#F4F2EB] p-4 transition hover:-translate-y-1"
                  >
                    <p className="text-xs text-[#928C7F]">{label}</p>
                    <p className="mt-2 font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-12 right-0 w-[68%] rounded-[32px] bg-[#20211D] p-7 text-white shadow-2xl transition duration-500 hover:-translate-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-[#B6BD9E]">
                Morning ritual ☼
              </p>

              <div className="mt-7 space-y-3">
                {["Cleanse", "Treat", "Hydrate", "Protect"].map(
                  (step, index) => (
                    <div
                      key={step}
                      className="flex items-center justify-between border-b border-white/10 pb-3"
                    >
                      <span className="text-white/50">0{index + 1}</span>
                      <span className="font-serif text-xl italic">{step}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="absolute bottom-4 left-2 rounded-[24px] bg-[#E3D9BF] px-6 py-5 shadow-xl transition hover:-translate-y-2">
              <p className="text-xs uppercase tracking-[0.16em] text-[#786E54]">
                Ingredient focus
              </p>

              <p className="mt-2 font-serif text-2xl italic">Niacinamide</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-y border-[#DED8CA] bg-white/45">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#778269]">
              about SkinSense
            </p>

            <h2 className="mt-5 max-w-xl font-serif text-5xl leading-tight sm:text-6xl">
              Skincare without the
              <span className="italic text-[#65715D]"> confusion.</span>
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-[#716C62]">
            <p>
              Skincare recommendations often start with products. SkinSense
              starts with you.
            </p>

            <p>
              Your skin type, breakouts, irritation, concerns, sunscreen habits
              and sensitivity are analyzed together to create a routine that is
              easier to understand and follow.
            </p>

            <p>
              The goal is not to overwhelm you with products. It is to explain
              what your routine needs and why each step exists.
            </p>
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#778269]">
          how it works
        </p>

        <h2 className="mt-5 max-w-3xl font-serif text-5xl sm:text-6xl">
          Three steps to a routine that
          <span className="italic text-[#65715D]"> makes sense.</span>
        </h2>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.number}
              className="rounded-[34px] border border-[#DED8CA] bg-white/65 p-8 transition duration-300 hover:-translate-y-3 hover:bg-white hover:shadow-[0_25px_70px_rgba(63,60,49,0.1)]"
            >
              <p className="text-sm font-semibold text-[#78836B]">
                {feature.number}
              </p>

              <h3 className="mt-20 text-2xl font-semibold">{feature.title}</h3>

              <p className="mt-4 leading-7 text-[#746E63]">{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-[#20211D] text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B4BB9D]">
            your SkinSense space
          </p>

          <h2 className="mt-5 max-w-4xl font-serif text-5xl sm:text-6xl">
            Everything lives in one
            <span className="italic text-[#D3C79D]"> personal dashboard.</span>
          </h2>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["◌", "Skin profile"],
              ["☼", "Morning routine"],
              ["☾", "Evening routine"],
              ["✦", "Ingredients + products"],
            ].map(([icon, label]) => (
              <div
                key={label}
                className="rounded-[30px] border border-white/10 bg-white/[0.05] p-7 transition duration-300 hover:-translate-y-3 hover:bg-white/[0.09]"
              >
                <span className="text-2xl text-[#B5BD9F]">{icon}</span>

                <p className="mt-24 font-serif text-2xl italic">{label}</p>
              </div>
            ))}
          </div>

          <Link
            href="/signup"
            className="mt-14 inline-flex rounded-full bg-[#EEE6D2] px-7 py-4 font-medium text-[#20211D] transition hover:-translate-y-1"
          >
            Start my SkinSense journey →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#181916] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:px-10">
          <div>
            <p className="text-xl font-semibold">
              SkinSense <span className="text-[#ABB496]">✦</span>
            </p>

            <p className="mt-4 max-w-md text-sm leading-7 text-white/50">
              Personalized skincare guidance built around your skin profile,
              concerns and habits.
            </p>
          </div>

          <div className="sm:text-right">
            <Link href="/login" className="text-sm text-white/70">
              Log in
            </Link>

            <span className="mx-3 text-white/20">•</span>

            <Link href="/signup" className="text-sm text-white/70">
              Create account
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
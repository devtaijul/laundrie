import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Closed",
  description: "This website is no longer available.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_hsl(201_66%_39%_/_0.18),_transparent_40%),linear-gradient(180deg,_#f8fbfd_0%,_#eef5f8_100%)] px-6 py-10 text-slate-950 sm:px-10 lg:px-16">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,_transparent_0%,_rgba(255,255,255,0.55)_45%,_transparent_100%)]" />
      <div className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center">
        <section className="w-full max-w-2xl rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-[0_24px_90px_-30px_rgba(15,23,42,0.28)] backdrop-blur md:p-12">
          <div className="inline-flex items-center rounded-full border border-sky-100 bg-sky-50 px-4 py-1 text-sm font-medium text-sky-700">
            Site notice
          </div>

          <h1 className="mt-6 max-w-xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            This website is no longer available.
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            The live service has been shut down, so all visits are being sent to
            this notice page.
          </p>

          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Ei website ekhon bondho. Jara site e asben, tara ei page-i dekhben.
          </p>
        </section>
      </div>
    </main>
  );
}

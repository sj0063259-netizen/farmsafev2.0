export default function TeamHeader() {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <div className="inline-flex items-center rounded-full border border-green-500/20 bg-green-500/10 px-5 py-2 backdrop-blur-md">
        <span className="text-sm font-semibold uppercase tracking-[0.25em] text-green-400">
          Team
        </span>
      </div>

      <h2 className="mt-8 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
        Meet the Team
        <br />
        <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent">
          Behind FarmSafe
        </span>
      </h2>

      <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-400">
        FarmSafe is built through collaboration between passionate engineering
        students specializing in embedded systems, IoT, CAD design, and web
        development. Together, we aim to create smarter and safer solutions for
        rural communities.
      </p>
    </div>
  );
}
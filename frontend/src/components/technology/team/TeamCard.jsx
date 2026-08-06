import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function TeamCard({
  initials,
  name,
  role,
  description,
  skills,
  github,
  linkedin,
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-green-500/40 hover:shadow-[0_0_35px_rgba(34,197,94,0.15)]">

      {/* Background Glow */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-green-500/10 blur-3xl"></div>
      </div>

      {/* Avatar */}
      <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-green-500/20 bg-gradient-to-br from-green-500 to-cyan-500 text-3xl font-black text-white">
        {initials}
      </div>

      {/* Name */}
      <h3 className="relative mt-6 text-center text-2xl font-bold text-white">
        {name}
      </h3>

      {/* Role */}
      <p className="relative mt-2 text-center font-medium text-green-400">
        {role}
      </p>

      {/* Description */}
      <p className="relative mt-5 text-center leading-7 text-slate-400">
        {description}
      </p>

      {/* Skills */}
      <div className="relative mt-6 flex flex-wrap justify-center gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-300"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Social Links */}
      <div className="relative mt-8 flex justify-center gap-5">
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-slate-700 p-3 text-slate-400 transition hover:border-green-500 hover:text-green-400"
        >
          <FaGithub size={20} />
        </a>

        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-slate-700 p-3 text-slate-400 transition hover:border-cyan-500 hover:text-cyan-400"
        >
          <FaLinkedin size={20} />
        </a>
      </div>
    </div>
  );
}
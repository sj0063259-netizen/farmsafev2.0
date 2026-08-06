import { CONTAINER } from "../../layouts/layout";

import TeamHeader from "./TeamHeader";
import TeamGrid from "./TeamGrid";

export default function Team() {
  return (
    <section
      id="team"
      className="relative overflow-hidden bg-[#0F172A] py-28"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-green-500/10 blur-[180px]" />

        <div className="absolute left-0 bottom-0 h-80 w-80 rounded-full bg-cyan-500/5 blur-[170px]" />

        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-green-500/5 blur-[170px]" />
      </div>

      <div className={CONTAINER}>
        <TeamHeader />

        <TeamGrid />
      </div>
    </section>
  );
}
import TeamCard from "./TeamCard";

const teamMembers = [
  {
    initials: "AC",
    name: "Aman Chaudhary",
    role: "Project Lead & Embedded Systems Engineer",
    description:
      "Leads the FarmSafe project while developing the ESP32-based embedded system, integrating sensors, and managing hardware communication.",

    skills: ["ESP32", "Embedded C", "IoT", "Sensors"],

    github: "https://github.com/amanchaudhary63067-cmd",
    linkedin: "https://www.linkedin.com/in/aman-chaudhary-839206380/",
  },

  {
    initials: "SJ",
    name: "Satyam Kumar Jha",
    role: "CAD Designer & Web Developer",
    description:
      "Designs the mechanical structure of FarmSafe and develops the responsive web platform, dashboard, and user experience.",

    skills: ["React", "Tailwind CSS", "CAD", "UI/UX"],

    github: "https://github.com/sj0063259-netizen",
    linkedin: "https://www.linkedin.com/in/satyam-kumar005/",
  },

  {
    initials: "HP",
    name: "Himanshu Prajapati",
    role: "IoT Systems Engineer",
    description:
      "Assists in ESP32 programming, sensor integration, and hardware testing for reliable environmental monitoring.",

    skills: ["ESP32", "IoT", "Sensors", "Testing"],

    github: "https://github.com/himanshu-027",
    linkedin: "https://www.linkedin.com/in/himanshu-prajapati-883612376/",
  },

  {
    initials: "AV",
    name: "Aryan Verma",
    role: "Embedded Systems Engineer",
    description:
      "Supports circuit assembly, sensor deployment, and embedded hardware implementation for the FarmSafe platform.",

    skills: ["Embedded", "PCB", "Electronics", "IoT"],

    github: "https://github.com/aryanverma-017",
    linkedin: "https://www.linkedin.com/in/aryan-verma-704b1a386/",
  },
];

export default function TeamGrid() {
  return (
    <div className="mt-20">
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {teamMembers.map((member) => (
          <TeamCard
            key={member.name}
            {...member}
          />
        ))}
      </div>
    </div>
  );
}
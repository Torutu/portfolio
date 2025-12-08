import { icons } from "../components/icons";

// Skills data structure
interface Skill {
  name: string;
  icon: keyof typeof icons;
}

const SKILLS: Skill[] = [
  { name: "TypeScript", icon: "TypeScriptLogo" },
  { name: "React", icon: "ReactLogo" },
  { name: "HTML", icon: "HtmlLogo" },
  { name: "CSS", icon: "CssLogo" },
  { name: "Go", icon: "GoLogo" },
  { name: "Prisma", icon: "PrismaLogo" },
  { name: "Tailwind CSS", icon: "TailwindcssLogo" },
  { name: "Three.js", icon: "ThreejsLogo" },
  { name: "Godot", icon: "GodotLogo" },
  { name: "JSON", icon: "JsonLogo" },
];

export function LeftSkillsText() {
  return (
    <div className="skills-grid">
      {SKILLS.map((skill) => {
        const IconComponent = icons[skill.icon];
        return (
          <div key={skill.name} className="skill-item">
            <div className="skill-item__icon">
              <IconComponent />
            </div>
            <p className="skill-item__name">{skill.name}</p>
          </div>
        );
      })}
    </div>
  );
}

export const rightSkillsText = "skills.tsx";

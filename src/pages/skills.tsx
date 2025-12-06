import { PORTFOLIO_CONFIG } from "../config/portfolioConfig";

export function LeftSkillsText() {
  return (
    <p className="leftSide__p">
      {PORTFOLIO_CONFIG.skillsLeft}
    </p>
  );
}

export const rightSkillsText = "skills.tsx";

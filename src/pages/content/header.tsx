import { usePage } from "../../utils/pageContext";
import { LeftAboutMeText } from "../aboutMe";
import { LeftProjectsText } from "../projects";
import { LeftSkillsText } from "../skills";
import { PORTFOLIO_CONFIG } from "../../config/portfolioConfig";

const lineBreak = (
  <svg width="100%" height="2">
    <rect width="100%" height="2" fill="var(--hover-color)"/>
  </svg>
);

export function Header() {
  const { page } = usePage();

  let navContent =
    page === "aboutMe"
      ? <LeftAboutMeText />
      : page === "projects"
      ? <LeftProjectsText />
      : page === "skills"
      ? <LeftSkillsText />
      : "";

  return (
    <header className="leftSide">
      <div className="leftSide__inner">
          <h1 className="leftSide__h">
            <span className="typing">
            {PORTFOLIO_CONFIG.introText}
            <strong>{PORTFOLIO_CONFIG.introText2}</strong>
            </span>
          </h1>
          {lineBreak}
          <nav className="leftSide__nav">
            {navContent}
          </nav>
      </div>
    </header>
  );
}

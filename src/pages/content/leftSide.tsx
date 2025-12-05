import { usePage } from "../../utils/pageContext";
import { leftAboutMeText } from "../aboutMe";
import { LeftProjectsText } from "../projects";
import { leftSkillsText } from "../skills";
import { PORTFOLIO_CONFIG } from "../../config/portfolioConfig";

const lineBreak = (
  <svg width="100%" height="4">
    <rect width="100%" height="4" fill="#52cbbe67" />
  </svg>
);

export function LeftSide() {
  const { page, setPage } = usePage();

  let pContent =
    page === "aboutMe"
      ? leftAboutMeText
      : page === "projects"
      ? <LeftProjectsText />
      : page === "skills"
      ? leftSkillsText
      : "";

  return (
    <div className="leftSide">
      <div className="leftSide__inner">
        <div className="leftSide__inner_upper">
          <h1 className="leftSide__h">
            {PORTFOLIO_CONFIG.introText}
            <strong>{PORTFOLIO_CONFIG.introText2}</strong>
          </h1>
          {lineBreak}
          {pContent}
        </div>
      </div>
    </div>
  );
}

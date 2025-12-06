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

const verticalText = `
#include <unistd.h>

void ft_putchar(char c)
{
    write(1, &c, 1);
}
`;

const horizontalText = `42 Hive Helsinki`;

export function LeftSide() {
  const { page } = usePage();

  let pContent =
    page === "aboutMe"
      ? <LeftAboutMeText />
      : page === "projects"
      ? <LeftProjectsText />
      : page === "skills"
      ? <LeftSkillsText />
      : "";

  return (
    <div className="leftSide">
      <span className="leftSide__verticalText">{verticalText}</span>
      <span className="topSide__horizontalText">{horizontalText}</span>
      <div className="leftSide__inner">
        <div className="leftSide__inner_upper">
          <h1 className="leftSide__h">
            <span className="typing">
            {PORTFOLIO_CONFIG.introText}
            <strong>{PORTFOLIO_CONFIG.introText2}</strong>
            </span>
          </h1>
          {lineBreak}
          {pContent}
        </div>
      </div>
    </div>
  );
}

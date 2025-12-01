import { usePage } from "../utils/pageContext";
import { leftAboutMeText } from "../aboutMe";
import { LeftProjectsText } from "../projects";
import { leftSkillsText } from "../skills";
const introText = `Hello! I'm Waleed, a passionate`;
const introText2 = ` software developer.`;
const lineBreak = <svg width="100%" height="4">
  <rect width="100%" height="4" fill="#52cbbe67" />
</svg>;

export function LeftSide() {  
    const { page, setPage } = usePage();

  let pContent =
    page === "aboutMe"
      ? leftAboutMeText
      : page === "projects"
      ? <LeftProjectsText/>
      : page === "skills"
      ? leftSkillsText
      : "";

  return (
    <div className="leftSide">
        <div className="leftSide__inner">
            <div className="leftSide__inner_upper">
            <h1 className="leftSide__h">{introText}<strong>{introText2}</strong></h1>
            {lineBreak}
            {/* this part of the each page changes */}
            {pContent}
            {/* until here */}
          </div>
          <div className="leftSide__inner_lower">
            <button className="leftSide__btn" onClick={() => setPage("aboutMe")}>About me</button>
            <button className="leftSide__btn" onClick={() => setPage("projects")}>Projects</button>
            <button className="leftSide__btn" onClick={() => setPage("skills")}>Skills</button>
          </div>
        </div>
    </div>
  );
}

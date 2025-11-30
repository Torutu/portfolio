import { useState } from "react";
import { aboutMeText } from "../aboutMe";
const introText = `Hello! I'm Waleed, a passionate`;
const introText2 = ` software developer.`;
const lineBreak = <svg width="100%" height="4">
  <rect width="100%" height="4" fill="#52cbbe67" />
</svg>;

export function LeftSide() {
  const [page, setPage] = useState("aboutMe");
  let pContent;
  if (page === "aboutMe") {
    pContent = aboutMeText;
  } else if (page === "projects") {
    pContent = "Projects";
  } else if (page === "skills") {
    pContent = "Skills";
  }
  return (
    <div className="leftSide">
        <div className="leftSide__inner">
            <div className="leftSide__inner_upper">
            <h1 className="leftSide__h">{introText}<strong>{introText2}</strong></h1>
            {lineBreak}
            <p className="leftSide__p">{pContent}</p>
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

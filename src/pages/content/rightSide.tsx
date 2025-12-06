import { usePage } from "../../utils/pageContext";
import { projectContent } from "../projects";
import { ReactNode } from "react";

export function RightSide() {
  const { page, selectedProject } = usePage();

  let pContent: ReactNode = "";

  if (page === "aboutMe") {
    pContent = "";
  } else if (page === "projects") {
    pContent = selectedProject
      ? projectContent[selectedProject as keyof typeof projectContent]
      : "";
  } else if (page === "skills") {
    pContent = "";
  }

  return (
    <div className="rightSide">
      <div className={`rightSide__inner 
        ${page === 'aboutMe' ? 'no-bg' : ''}
        ${page === 'projects' ? 'projects-anim' : ''}
        `
        }>{pContent}</div>
    </div>
  );
}

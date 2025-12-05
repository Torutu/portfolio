import { usePage } from "../../utils/pageContext";
import { projectContent } from "../projects";
import { ReactNode } from "react";

export function RightSide() {
  const { page, selectedProject } = usePage();

  let pContent: ReactNode = "";

  if (page === "aboutMe") {
    pContent = "About me content";
  } else if (page === "projects") {
    pContent = selectedProject
      ? projectContent[selectedProject as keyof typeof projectContent]
      : "Select a project";
  } else if (page === "skills") {
    pContent = "Skills content";
  }

  return (
    <div className="rightSide">
      <div className="rightSide__inner">{pContent}</div>
    </div>
  );
}

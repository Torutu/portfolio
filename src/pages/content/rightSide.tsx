import { usePage } from "../utils/pageContext";

export function RightSide() {
  const { page, selectedProject } = usePage();

  let pContent = "";
  if (page === "aboutMe") pContent = "About me content";
  else if (page === "projects") {
    pContent = selectedProject ? `${selectedProject}`: "Select a project";
  } else if (page === "skills") pContent = "Skills content";

  return (
    <div className="rightSide">
      <div className="rightSide__inner">
        <h1 className="rightSide__h">{pContent}</h1>
      </div>
    </div>
  );
}

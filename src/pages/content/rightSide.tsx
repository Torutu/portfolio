import { usePage } from "../../utils/pageContext";
import { projectContent } from "../projects";
import { ReactNode } from "react";

const verticalText = `
#include <unistd.h>

void ft_putchar(char c)
{
    write(1, &c, 1);
}
`;

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
      <span className="rightSide__verticalText">{verticalText}</span>
      <div className={`rightSide__inner 
        ${page === 'aboutMe' ? 'no-bg' : ''}
        ${page === 'projects' ? 'projects-anim' : ''}
        `
        }>{pContent}</div>
    </div>
  );
}

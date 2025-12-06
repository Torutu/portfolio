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

export function Main() {
  const { page, selectedProject } = usePage();

  let pageContent: ReactNode = "";

  if (page === "aboutMe") {
    pageContent = (
      <section className="rightSide__section aboutMe-section">
        {/* About me content handled by parent */}
      </section>
    );
  } else if (page === "projects") {
    pageContent = selectedProject ? (
      <article className="rightSide__article">
        {projectContent[selectedProject as keyof typeof projectContent]}
      </article>
    ) : null;
  } else if (page === "skills") {
    pageContent = (
      <section className="rightSide__section skills-section">
        {/* Skills content handled by parent */}
      </section>
    );
  }

  return (
    <main className="rightSide">
      <span className="rightSide__verticalText">{verticalText}</span>
      <div className={`rightSide__inner 
        ${page === 'aboutMe' ? 'no-bg' : ''}
        ${page === 'projects' ? 'projects-anim' : ''}
        `
        }>{pageContent}</div>
    </main>
  );
}

import { usePage } from "../../utils/pageContext";
import { projectContent } from "../projects";
import { LeftAboutMeText } from "../aboutMe";
import { LeftProjectsText } from "../projects";
import { LeftSkillsText } from "../skills";
import { ReactNode } from "react";

const verticalText = `
#include <unistd.h>

void ft_putchar(char c)
{
    write(1, &c, 1);
}
`;

const horizontalText = `42 Hive Helsinki`;

export function Main() {
  const { page, selectedProject, setSelectedProject } = usePage();

  let pageContent: ReactNode = "";
  let mobileNavContent: ReactNode = "";

  if (page === "aboutMe") {
    pageContent = (
      <section className="rightSide__section aboutMe-section">
        {/* About me content handled by parent */}
      </section>
    );
    mobileNavContent = <LeftAboutMeText />;
  } else if (page === "projects") {
    if (selectedProject) {
      // When viewing a project, show it in both desktop and mobile
      pageContent = (
        <article className="rightSide__article">
          {projectContent[selectedProject as keyof typeof projectContent]}
        </article>
      );
      mobileNavContent = null; // Don't show project list when viewing a project
    } else {
      // When no project selected, desktop shows nothing, mobile shows list
      pageContent = null;
      mobileNavContent = <LeftProjectsText />;
    }
  } else if (page === "skills") {
    pageContent = (
      <section className="rightSide__section skills-section">
        {/* Skills content handled by parent */}
      </section>
    );
    mobileNavContent = <LeftSkillsText />;
  }

  return (
    <main className="rightSide">
      <span className="leftSide__verticalText">{verticalText}</span>
      <span className="topSide__horizontalText">{horizontalText}</span>
      <span className="rightSide__verticalText">{verticalText}</span>
      <div key={page} className={`rightSide__inner 
        ${page === 'aboutMe' ? 'no-bg' : ''}
        ${page === 'projects' ? 'projects-anim' : ''}
        ${page === 'skills' ? 'skills-anim' : ''}
        ${selectedProject ? 'viewing-project' : ''}
        `
        }>
        {/* Back to Projects button - only visible on mobile when on projects page AND viewing a project */}
        {page === "projects" && selectedProject && (
          <button 
            className="mobile-back-btn"
            onClick={() => setSelectedProject("")}
          >
            ← Back to Projects
          </button>
        )}
        
        {/* Mobile-only navigation content */}
        <div className="mobile-nav-content">
          {mobileNavContent}
        </div>
        {/* Desktop content (also shown on mobile when viewing project) */}
        <div className="desktop-content">
          {pageContent}
        </div>
      </div>
    </main>
  );
}

import { JSX } from "react";
import { usePage } from "../utils/pageContext";
import { daggerforgeContent } from "./content/daggerforge";
import { PROJECTS_CONFIG, PORTFOLIO_CONFIG } from "../config/portfolioConfig";

export function LeftProjectsText() {
  const { setSelectedProject } = usePage();

  return (
    <>
      <p className="leftSide__p">
        {PORTFOLIO_CONFIG.projectsIntro}
      </p>
      <div className="leftSide__menu">
        {PROJECTS_CONFIG.map((project) => (
          <div
            key={project.id}
            className="leftSide__menu_item"
            onClick={() => setSelectedProject(project.id)}
          >
            <div className="leftSide__menu_item_name">{project.name}</div>
            <div className="leftSide__menu_item_description">{project.description}</div>
            <div className="leftSide__menu_item_badges">{project.badges}</div>
          </div>
        ))}
      </div>
    </>
  );  
}

export const projectContent: Record<string, JSX.Element> = {
  daggerforge: daggerforgeContent,
  rulebookparser: (
    <>
      <h1>Rulebook parser</h1>
      <p>Some info about project 2.</p>
    </>
  ),
  pingpong: (
    <>
      <h1>Ping Pong</h1>
      <p>Project 3 description...</p>
    </>
  ),
  dithernator: (
    <>
      <h1>Dithernator</h1>
      <p>Project 4 description...</p>
    </>
  ),
  minishell: (
    <>
      <h1>Minishell</h1>
      <p>Project 5 description...</p>
    </>
  ),
  project6: (
    <>
      <h1>Project 6</h1>
      <p>Project 6 description...</p>
    </>
  ),
  project7: (
    <>
      <h1>Project 7</h1>
      <p>Project 7 description...</p>
    </>
  ),
  project8: (
    <>
      <h1>Project 8</h1>
      <p>Project 8 description...</p>
    </>
  ),
  project9: (
    <>
      <h1>Project 9</h1>
      <p>Project 9 description...</p>
    </>
  ),
  project10: (
    <>
      <h1>Project 10</h1>
      <p>Project 10 description...</p>
    </>
  ),
};

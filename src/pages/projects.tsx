import { JSX } from "react";
import { usePage } from "./utils/pageContext";

const projects = [
  { id: "daggerforge", name: "Daggerforge", description: "A tool that helps dungeon masters build session content fast.", badges: "Badges" },
  { id: "rulebookparser", name: "Rulebook parser", description: "Convert plain text rulebook to a structured json format", badges: "Badges" },
  { id: "pingpong", name: "Ping Pong", description: "3D Ping Pong game", badges: "Badges" },
  { id: "dithernator", name: "Dithernator", description: "Add a dithering effect to an image", badges: "Badges" },
  { id: "minishell", name: "Minishell", description: "A simple shell", badges: "Badges" },
  { id: "project6", name: "Project 6", description: "Description", badges: "Badges" },
  { id: "project7", name: "Project 7", description: "Description", badges: "Badges" },
  { id: "project8", name: "Project 8", description: "Description", badges: "Badges" },
  { id: "project9", name: "Project 9", description: "Description", badges: "Badges" },
  { id: "project10", name: "Project 10", description: "Description", badges: "Badges" },
];

export function LeftProjectsText() {
  const { setSelectedProject } = usePage();

  return (
    <>
      <p className="leftSide__p">
        I use my skills to feed my hobbies and help my friends with their
        projects, I enjoy pushing forward and learn along the way
      </p>
      <div className="leftSide__menu">
        {projects.map((project) => (
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

const daggerforgeContent = (
    <>
      <h1>Daggerforge</h1>
      <p>This is my Daggerforge project description.</p>
    </>
  );

export const projectContent: Record<string, JSX.Element> = {
  daggerforge: (
    daggerforgeContent
  ),
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

import { usePage } from "./utils/pageContext";

const projects = [
  { id: "project1", name: "Project 1", description: "Description", badges: "Badges" },
  { id: "project2", name: "Project 2", description: "Description", badges: "Badges" },
  { id: "project3", name: "Project 3", description: "Description", badges: "Badges" },
  { id: "project4", name: "Project 4", description: "Description", badges: "Badges" },
  { id: "project5", name: "Project 5", description: "Description", badges: "Badges" },
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

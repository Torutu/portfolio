import { usePage } from "./utils/pageContext";

export function LeftProjectsText() {
  const { setSelectedProject } = usePage();

  return (
    <>
      <p className="leftSide__p">
        I use my skills to feed my hobbies and help my friends with their
        projects, I enjoy pushing forward and learn along the way
      </p>
      <div className="leftSide__menu">
        <div className="leftSide__menu_item" onClick={() => setSelectedProject("project1")}>Project 1</div>
        <div className="leftSide__menu_item" onClick={() => setSelectedProject("project2")}>Project 2</div>
        <div className="leftSide__menu_item" onClick={() => setSelectedProject("project3")}>Project 3</div>
        <div className="leftSide__menu_item" onClick={() => setSelectedProject("project4")}>Project 4</div>
        <div className="leftSide__menu_item" onClick={() => setSelectedProject("project5")}>Project 5</div>
        <div className="leftSide__menu_item" onClick={() => setSelectedProject("project6")}>Project 6</div>
        <div className="leftSide__menu_item" onClick={() => setSelectedProject("project7")}>Project 7</div>
        <div className="leftSide__menu_item" onClick={() => setSelectedProject("project8")}>Project 8</div>
        <div className="leftSide__menu_item" onClick={() => setSelectedProject("project9")}>Project 9</div>
        <div className="leftSide__menu_item" onClick={() => setSelectedProject("project10")}>Project 10</div>
      </div>
    </>
  );
}

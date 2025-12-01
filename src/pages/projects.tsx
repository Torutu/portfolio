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
        <div className="leftSide__menu_item" onClick={() => setSelectedProject("project1")}>
            <div className="leftSide__menu_item_name">Project 1</div>
            <div className="leftSide__menu_item_description">Description</div>
            <div className="leftSide__menu_item_badges">Badges</div>
        </div>
        <div className="leftSide__menu_item" onClick={() => setSelectedProject("project2")}>
            <div className="leftSide__menu_item_name">Project 2</div>
            <div className="leftSide__menu_item_description">Description</div>
            <div className="leftSide__menu_item_badges">Badges</div>
        </div>
        <div className="leftSide__menu_item" onClick={() => setSelectedProject("project3")}>
            <div className="leftSide__menu_item_name">Project 3</div>
            <div className="leftSide__menu_item_description">Description</div>
            <div className="leftSide__menu_item_badges">Badges</div>
        </div>
        <div className="leftSide__menu_item" onClick={() => setSelectedProject("project4")}>
            <div className="leftSide__menu_item_name">Project 4</div>
            <div className="leftSide__menu_item_description">Description</div>
            <div className="leftSide__menu_item_badges">Badges</div>
        </div>
        <div className="leftSide__menu_item" onClick={() => setSelectedProject("project5")}>
            <div className="leftSide__menu_item_name">Project 5</div>
            <div className="leftSide__menu_item_description">Description</div>
            <div className="leftSide__menu_item_badges">Badges</div>
        </div>
        <div className="leftSide__menu_item" onClick={() => setSelectedProject("project6")}>
            <div className="leftSide__menu_item_name">Project 6</div>
            <div className="leftSide__menu_item_description">Description</div>
            <div className="leftSide__menu_item_badges">Badges</div>
        </div>
        <div className="leftSide__menu_item" onClick={() => setSelectedProject("project7")}>
            <div className="leftSide__menu_item_name">Project 7</div>
            <div className="leftSide__menu_item_description">Description</div>
            <div className="leftSide__menu_item_badges">Badges</div>
        </div>
        <div className="leftSide__menu_item" onClick={() => setSelectedProject("project8")}>
            <div className="leftSide__menu_item_name">Project 8</div>
            <div className="leftSide__menu_item_description">Description</div>
            <div className="leftSide__menu_item_badges">Badges</div>
        </div>
        <div className="leftSide__menu_item" onClick={() => setSelectedProject("project9")}>
            <div className="leftSide__menu_item_name">Project 9</div>
            <div className="leftSide__menu_item_description">Description</div>
            <div className="leftSide__menu_item_badges">Badges</div>
        </div>
        <div className="leftSide__menu_item" onClick={() => setSelectedProject("project10")}>
            <div className="leftSide__menu_item_name">Project 10</div>
            <div className="leftSide__menu_item_description">Description</div>
            <div className="leftSide__menu_item_badges">Badges</div>
        </div>
      </div>
    </>
  );
}

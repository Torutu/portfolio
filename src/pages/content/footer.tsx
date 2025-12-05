import { usePage } from "../../utils/pageContext";

export function Footer() {
  const { setPage } = usePage();
  return (
    <div className="footer">
      <div className="footer__inner">
        <div className="leftSide__inner_lower">
          <button className="leftSide__btn" onClick={() => setPage("aboutMe")}>
            About me
          </button>
          <button className="leftSide__btn" onClick={() => setPage("projects")}>
            Projects
          </button>
          <button className="leftSide__btn" onClick={() => setPage("skills")}>
            Skills
          </button>
        </div>
        <h1 className="footer__h">Footer</h1>
      </div>
    </div>
  );
}

import { usePage } from "../../utils/pageContext";

export function Footer() {
  const { setPage } = usePage();
  return (
    <footer className="footer">
      <div className="footer__inner">
        <nav className="footer__nav">
          <button className="leftSide__btn" onClick={() => setPage("aboutMe")}>
            About me
          </button>
          <button className="leftSide__btn" onClick={() => setPage("projects")}>
            Projects
          </button>
          <button className="leftSide__btn" onClick={() => setPage("skills")}>
            Skills
          </button>
        </nav>
        <h1 className="footer__h">42 Helsinki</h1>
      </div>
    </footer>
  );
}

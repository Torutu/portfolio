import { usePage } from "../../utils/pageContext";
import { icons } from "../../components/icons";

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
        <h1 className="footer__h">
        <a className="footer__a" href="https://github.com/torutu" target="_blank" rel="noopener noreferrer">
          <icons.GithubLogo />
        </a>
        <a className="footer__a" href="https://linkedin.com/in/walnaimi" target="_blank" rel="noopener noreferrer">
          <icons.LinkedinLogo />
        </a>
        </h1>
      </div>
    </footer>
  );
}

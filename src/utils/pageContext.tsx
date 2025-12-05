import { createContext, useContext, useState, ReactNode } from "react";
import { PageType } from "../types/portfolio";

interface PageContextType {
  page: string;
  setPage: (page: string) => void;
  selectedProject: string;
  setSelectedProject: (project: string) => void;
}

const PageContext = createContext<PageContextType>({
  page: "aboutMe",
  setPage: () => {},
  selectedProject: "",
  setSelectedProject: () => {},
});

// See: docs/functions/PageProvider.md
export const PageProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState("aboutMe");
  const [selectedProject, setSelectedProject] = useState("");

  return (
    <PageContext.Provider value={{ page, setPage, selectedProject, setSelectedProject }}>
      <div className="App">
        <div className="layout">
          {children}
        </div>
      </div>
    </PageContext.Provider>
  );
}

// See: docs/functions/CollapsibleSection.md
export function CollapsibleSection({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="collapsibleSection">
      <button
        className="collapsibleButton"
        onClick={() => setOpen(!open)}
      >
        {open ? <span className="collapsibleButton__arrow">▲</span> : <span className="collapsibleButton__arrow">▼</span>} {title}
      </button>

      {open && (
        <div className="collapsibleContent">
          {children}
        </div>
      )}
    </div>
  );
}

export const usePage = () => useContext(PageContext);

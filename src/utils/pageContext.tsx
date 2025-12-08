import { createContext, useContext, useState, ReactNode } from "react";
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

export const PageProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState("aboutMe");
  const [selectedProject, setSelectedProject] = useState("");

  // Custom setPage that clears selectedProject when leaving projects page
  const handleSetPage = (newPage: string) => {
    setPage(newPage);
    // Clear selected project when navigating away from projects page
    if (newPage !== "projects") {
      setSelectedProject("");
    }
  };

  return (
    <PageContext.Provider value={{ page, setPage: handleSetPage, selectedProject, setSelectedProject }}>
      <div className="App">
        <div className="layout">
          {children}
        </div>
      </div>
    </PageContext.Provider>
  );
}

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

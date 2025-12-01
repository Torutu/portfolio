import { createContext, useContext, useState } from "react";

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

export const PageProvider = ({ children }: any) => {
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

export const usePage = () => useContext(PageContext);

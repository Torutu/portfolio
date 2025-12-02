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
  const [animating, setAnimating] = useState(false);

  const changePage = (newPage: string) => {
    if (page === newPage) return;
    // setAnimating(true);

    setTimeout(() => {
      setPage(newPage);
      setAnimating(false);
    }, 500); // match CSS duration
  };

  return (
    <PageContext.Provider 
      value={{ 
        page, 
        setPage: changePage,
        selectedProject, 
        setSelectedProject 
      }}
    >
      <div className={`App ${animating ? "page-transition" : ""}`}>
        <div className="layout">{children}</div>
      </div>
    </PageContext.Provider>
  );
};

export const usePage = () => useContext(PageContext);

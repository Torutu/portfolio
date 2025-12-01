import { createContext, useContext, useState, useEffect } from "react";

const PageContext = createContext<any>(null);

export function PageProvider({ children }: any) {
  const [page, setPage] = useState(() => {
    return localStorage.getItem("page") || "aboutMe";
  });

  useEffect(() => {
    localStorage.setItem("page", page);
  }, [page]);

  return (
    <PageContext.Provider value={{ page, setPage }}>
    <div className="App">
      <div className="layout">
      {children}
      </div>
    </div>
    </PageContext.Provider>
  );
}

export function usePage() {
  return useContext<any>(PageContext);
}

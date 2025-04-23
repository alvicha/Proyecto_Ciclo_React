import { createContext, useState } from 'react';

const ScreensContext = createContext();

export const ScreensProvider = ({ children }) => {
  const [context, setContext] = useState(null);
  const [alert, setAlert] = useState(null);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [visibleActionButton, setVisibleActionButton] = useState(false);
  const [contextsList, setContextsList] = useState([]);
  const [listLanguages, setListLanguages] = useState([]);
  const [placeholdersList, setPlaceholdersList] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rows, setRows] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  return (
    <ScreensContext.Provider value={{
      context, setContext, alert, setAlert, visibleAlert, setVisibleAlert, visibleActionButton, setVisibleActionButton, contextsList, setContextsList,
      placeholdersList, setPlaceholdersList, templates, setTemplates, currentPage, setCurrentPage, rows, setRows, 
      listLanguages, setListLanguages, totalPages, setTotalPages
    }}>
      {children}
    </ScreensContext.Provider>
  );
};

export default ScreensContext;

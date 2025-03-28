import { createContext, useState } from 'react';

const ScreensContext = createContext();

export const ScreensProvider = ({ children }) => {
  const [context, setContext] = useState(null);
  const [alert, setAlert] = useState(null);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [visibleActionButton, setVisibleActionButton] = useState(false);

  return (
    <ScreensContext.Provider value={{ context, setContext, alert, setAlert, visibleAlert, setVisibleAlert, visibleActionButton, setVisibleActionButton }}>
      {children}
    </ScreensContext.Provider>
  );
};

export default ScreensContext;

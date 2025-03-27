import { createContext, useState } from 'react';

const ScreensContext = createContext();

export const ScreensProvider = ({ children }) => {
  const [context, setContext] = useState(null);
  const [alert, setAlert] = useState(null);

  return (
    <ScreensContext.Provider value={{ context, setContext, alert, setAlert }}>
      {children}
    </ScreensContext.Provider>
  );
};

export default ScreensContext;

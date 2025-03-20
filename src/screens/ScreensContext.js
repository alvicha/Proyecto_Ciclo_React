import { createContext, useState } from 'react';

const ScreensContext = createContext();

export const ScreensProvider = ({ children }) => {
  const [context, setContext] = useState(null);

  return (
    <ScreensContext.Provider value={{ context, setContext }}>
      {children}
    </ScreensContext.Provider>
  );
};

export default ScreensContext;

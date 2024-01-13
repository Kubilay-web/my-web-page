import React, { createContext, useContext, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ColorModeContext = createContext();

export const useColorMode = () => {
  return useContext(ColorModeContext);
};

export const ColorModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const preferredDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedDarkMode = localStorage.getItem('darkMode');

    if (preferredDarkMode || storedDarkMode === 'true') {
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());

    const modeMessage = newDarkMode ? 'Karanlık moda geçildi' : 'Açık moda geçildi';
    toast.info(modeMessage, {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: true,
    });
  };

  const contextValue = {
    darkMode,
    toggleDarkMode,
  };

  return (
    <ColorModeContext.Provider value={contextValue}>
      {children}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </ColorModeContext.Provider>
  );
};

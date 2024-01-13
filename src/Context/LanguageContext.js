import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import Data from '../Api/Data';

const LanguageContext = createContext();

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem('language') ||
    (navigator.languages.includes('tr') ? 'tr' : 'en')
  );

  const toggleLanguage = async () => {
    const newLanguage = currentLanguage === 'tr' ? 'en' : 'tr';
    setCurrentLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);

    try {
      const response = await axios.post(
        'https://reqres.in/api/workintech',
        { language: newLanguage }
      );
      console.log(response.data)
      console.log(Data[newLanguage]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}







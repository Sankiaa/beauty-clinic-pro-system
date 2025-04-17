
import React, { createContext, useContext, useEffect, useState } from "react";

type LanguageContextType = {
  language: "ar" | "en";
  direction: "rtl" | "ltr";
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<"ar" | "en">("ar"); // Default to Arabic
  const [direction, setDirection] = useState<"rtl" | "ltr">("rtl");

  // Initialize language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as "ar" | "en" | null;
    
    if (savedLanguage) {
      setLanguage(savedLanguage);
      setDirection(savedLanguage === "ar" ? "rtl" : "ltr");
      document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = savedLanguage;
      document.body.classList.toggle("rtl", savedLanguage === "ar");
      document.body.classList.toggle("ltr", savedLanguage === "en");
    } else {
      // Default to Arabic
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
      document.body.classList.add("rtl");
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === "ar" ? "en" : "ar";
    const newDirection = newLanguage === "ar" ? "rtl" : "ltr";
    
    setLanguage(newLanguage);
    setDirection(newDirection);
    
    localStorage.setItem("language", newLanguage);
    document.documentElement.dir = newDirection;
    document.documentElement.lang = newLanguage;
    
    document.body.classList.toggle("rtl", newLanguage === "ar");
    document.body.classList.toggle("ltr", newLanguage === "en");
  };

  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

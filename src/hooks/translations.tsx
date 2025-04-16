import { useState, useEffect } from "react";

const defaultLanguage = "pt-br";

export const useTranslation = () => {
  const [language, setLanguage] = useState(defaultLanguage);
  const [translations, setTranslations] = useState<any>(null);

  // Função para carregar as traduções dinamicamente com base no idioma
  const loadTranslations = async (lang: string) => {
    try {
      let translations;
      switch (lang) {
        case "en":
          translations = await import("@/translations/en.json");
          break;
        case "pt-br":
          translations = await import("@/translations/pt.json");
          break;
        case "es":
          translations = await import("@/translations/es.json");
          break;
        default:
          translations = await import("@/translations/pt.json");
          break;
      }
      setTranslations(translations.default); // Acessa as traduções
    } catch (error) {
      console.error("Erro ao carregar traduções:", error);
    }
  };

  // Carregar idioma salvo do localStorage (persistência)
  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = localStorage.getItem("language") || defaultLanguage;
      setLanguage(savedLanguage);
      loadTranslations(savedLanguage); // Carrega as traduções do idioma salvo
    };
    loadLanguage();
  }, []);

  const changeLanguage = async (lang: string) => {
    if (lang !== language) {
      setLanguage(lang);
      localStorage.setItem("language", lang); // Persistir idioma escolhido
      loadTranslations(lang); // Carregar as traduções ao mudar o idioma
    }
  };

  const t = (key: string) => {
    if (!translations) return key;
    return key.split(".").reduce((obj, i) => (obj ? obj[i] : key), translations);
  };

  const avaliableLanguages = [
    { name: "Português - Brasil", id: "pt-br" },
    { name: "English", id: "en" },
    { name: "Español", id: "es" },
  ];

  return { t, changeLanguage, language, avaliableLanguages };
};

export const getLang = async () => {
  const savedLanguage = localStorage.getItem("language") || defaultLanguage;
  return savedLanguage;
};

export const setLang = async (lang: string) => {
  localStorage.setItem("language", lang);
};

export const removeLang = async () => {
  localStorage.removeItem("language");
};

export const useLang = () => {
  const [lang, setLang] = useState(defaultLanguage);
  useEffect(() => {
    getLang().then((lang) => {
      setLang(lang);
    });
  }, []);
  return { lang, setLang };
};

export const listLangs = () => {
  return [
    { name: "Português - Brasil", id: "pt-br" },
    { name: "English", id: "en" },
    { name: "Español", id: "es" },
  ];
};

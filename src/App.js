import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Si vas a GH Pages, usa HashRouter:
// import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Modelo from "./components/modelo/modelo";
import VistaMision1 from "./components/vistaMision1/VistaMision1";
import VistaMision2 from "./components/vistaMision2/VistaMision2";
import GrupoDescripcion from "./components/Grupo_descripcion";

import { IntlProvider } from "react-intl";
import localeEsMessages from "./locales/es";
import localeEnMessages from "./locales/en";

function App() {

  const [locale, setLocale] = useState("es-ES");
  const [messages, setMessages] = useState(localeEsMessages);

  useEffect(() => {
    const browserLanguage = navigator.language || "es";
    if (browserLanguage.toLowerCase().startsWith("es")) {
      setLocale("es-ES");
      setMessages(localeEsMessages);
    } else {
      setLocale("en-US");
      setMessages(localeEnMessages);
    }
  }, []);

  return (
    <div className="App">
      <IntlProvider key={locale} locale={locale} messages={messages}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/modelo" element={<Modelo  />} />
            <Route path="/mision1" element={<VistaMision1  />} />
            <Route path="/mision2" element={<VistaMision2  />} />
            <Route path="/descripcion" element={<GrupoDescripcion />} />
            <Route path="*" element={<Home />} /> {/* 404 -> Home */}
          </Routes>
        </BrowserRouter>
      </IntlProvider>
    </div>
  );
}

export default App;

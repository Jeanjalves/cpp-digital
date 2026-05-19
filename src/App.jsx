import { useEffect, useState } from "react";
import DocumentCard from "./components/DocumentCard";

function App() {

  const [busca, setBusca] = useState("");

  const documentos = [

    {
      titulo: "Diretriz N° PM3-001/02/20",
      categoria: "Anexo B à diretriz",
      arquivo: "https://pub-f3c80dfbc246456c95d9390ae9f2f2e0.r2.dev/diretriz.pdf"
    },

    {
      titulo: "CPP 40X20",
      categoria: "CPP Operações",
      arquivo: "https://pub-f3c80dfbc246456c95d9390ae9f2f2e0.r2.dev/cppoperacoes.pdf"
    },

    {
      titulo: "CPP 1",
      categoria: "Subsetores 01 ao 05",
      arquivo: "https://pub-f3c80dfbc246456c95d9390ae9f2f2e0.r2.dev/cpp1.pdf"
    },

    {
      titulo: "CPP 2",
      categoria: "Subsetores 06 ao 08",
      arquivo: "https://pub-f3c80dfbc246456c95d9390ae9f2f2e0.r2.dev/cpp2.pdf"
    },

    {
      titulo: "CPP 3",
      categoria: "Subsetores 09 ao 13",
      arquivo: "https://pub-f3c80dfbc246456c95d9390ae9f2f2e0.r2.dev/cpp3.pdf"
    },

    {
      titulo: "CPP POP",
      categoria: "Patrulhamento ostensivo apé",
      arquivo: "https://pub-f3c80dfbc246456c95d9390ae9f2f2e0.r2.dev/cpp-pop.pdf"
    },

    {
      titulo: "R.E VESPERTINO",
      categoria: "Subsetores 01 ao 13",
      arquivo: "https://pub-f3c80dfbc246456c95d9390ae9f2f2e0.r2.dev/re-vespertino.pdf"
    },

    {
      titulo: "R.E MATUTINO",
      categoria: "Subsetores 01 ao 13",
      arquivo: "https://pub-f3c80dfbc246456c95d9390ae9f2f2e0.r2.dev/re-matutino.pdf"
    },

    {
      titulo: "CPP TÁTICO",
      categoria: "Subsetores 01 ao 13",
      arquivo: "https://pub-f3c80dfbc246456c95d9390ae9f2f2e0.r2.dev/cpp-tatico.pdf"
    }

  ];

  // ===== FILTRO =====
  const documentosFiltrados = documentos.filter((doc) =>
    doc.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    doc.categoria.toLowerCase().includes(busca.toLowerCase())
  );

  // ===== SPLASH =====
  useEffect(() => {

    const splash = document.getElementById("splash");

    const splashJaMostrado =
      sessionStorage.getItem("splash");

    if (splashJaMostrado) {

      splash.style.display = "none";

    } else {

      sessionStorage.setItem("splash", "true");

      setTimeout(() => {

        splash.style.opacity = "0";
        splash.style.visibility = "hidden";

      }, 4000);

    }

  }, []);

  // ===== ATUALIZAR APP =====
  const atualizarApp = async () => {

    // remove caches
    const cacheNames = await caches.keys();

    await Promise.all(
      cacheNames.map((cache) =>
        caches.delete(cache)
      )
    );

    // remove service workers
    const registrations =
      await navigator.serviceWorker.getRegistrations();

    for (let registration of registrations) {

      await registration.unregister();

    }

    // limpa storage
    localStorage.clear();
    sessionStorage.clear();

    // recarrega app
    window.location.reload(true);

  };

  return (
    <div className="app">

      {/* SPLASH */}
      <div id="splash">

        <div className="splash-logo">
          🛡️
        </div>

        <h1>CPP Digital</h1>

        <p className="assinatura">
          Developed by J. Alves
        </p>

      </div>

      {/* HEADER */}
      <header>

        <div className="header-top">

          <h1>CPP Digital</h1>

          <button
            className="update-btn"
            onClick={atualizarApp}
          >
            Atualizar documentos
          </button>

        </div>

        <input
          type="text"
          placeholder="Buscar documento..."
          className="busca"
          value={busca}
          onChange={(e) =>
            setBusca(e.target.value)
          }
        />

      </header>

      {/* DOCUMENTOS */}
      <main className="documentos">

        {documentosFiltrados.map((doc, index) => (

          <DocumentCard
            key={index}
            titulo={doc.titulo}
            categoria={doc.categoria}
            arquivo={doc.arquivo}
          />

        ))}

      </main>

    </div>
  );
}

export default App;
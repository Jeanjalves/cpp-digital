import {
  useNavigate,
  useLocation
} from "react-router-dom";

function PDFViewer() {

  const navigate = useNavigate();
  const location = useLocation();

  const { titulo, arquivo } =
    location.state || {};

  // ===== DOWNLOAD =====
  const baixarPDF = () => {

    const link = document.createElement("a");

    link.href = arquivo;

    link.download = titulo + ".pdf";

    link.click();

  };

  // ===== COMPARTILHAR =====
  const compartilharPDF = async () => {

    try {

      await navigator.share({
        title: titulo,
        text: titulo,
        url: window.location.href
      });

    } catch (err) {

      console.log("Compartilhamento cancelado");

    }

  };

  return (
    <div className="viewer">

      {/* HEADER */}
      <div className="viewer-header">

        {/* ESQUERDA */}
        <div className="viewer-left">

          <button
            className="voltar"
            onClick={() => navigate("/")}
          >
            ←
          </button>

          <h2>{titulo}</h2>

        </div>

        {/* DIREITA */}
<div className="viewer-actions">

  <button
    className="viewer-btn"
    onClick={compartilharPDF}
  >
    Compartilhar
  </button>

  <button
    className="viewer-btn"
    onClick={baixarPDF}
  >
    Baixar
  </button>

</div>

      </div>

      {/* PDF */}
      <iframe
        src={arquivo}
        title={titulo}
        className="pdf-frame"
      />

    </div>
  );
}

export default PDFViewer;
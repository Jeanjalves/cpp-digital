import { useNavigate } from "react-router-dom";

function DocumentCard({ titulo, categoria, arquivo }) {

  const navigate = useNavigate();

  const abrirPDF = () => {

    navigate("/viewer", {
      state: {
        titulo,
        arquivo
      }
    });

  };

  return (
    <div className="card" onClick={abrirPDF}>

      <div className="card-icon">
        📄
      </div>

      <div className="card-info">
        <h2>{titulo}</h2>
        <p>{categoria}</p>
      </div>

    </div>
  );
}

export default DocumentCard;
import { useEffect, useState } from "react";

export function History() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("history") || "[]");
    setHistory(data);
  }, []);
//ver error//
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Historial de peticiones</h1>
      {history.length === 0 ? (
        <p>No hay historial aún.</p>
      ) : (
        <ul className="space-y-2">
          {history.map((item, index) => (
            <li key={index} className="p-2 border rounded bg-white shadow">
              <p><strong>Predicción:</strong> {item.prediction}</p>
              <p><strong>Precisión:</strong> {item.accuracy}</p>
              <p><strong>Tiempo:</strong> {item.process_time}</p>
              <p><em>{new Date(item.date).toLocaleString()}</em></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

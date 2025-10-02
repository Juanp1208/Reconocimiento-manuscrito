import { useState } from "react";
import { useApi } from "../hooks/useApi";
import { ResultCard } from "./Resultado";

export function UploadForm() {
  const { sendImage, loading, error } = useApi();
  const [file, setFile] = useState<File | null>(null);
  const [invert, setInvert] = useState("false");
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Sube una imagen, porfaaaaaa.");
      return;
    }

    const data = await sendImage(file, invert);
    if (data) setResult(data);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-2xl rounded-2xl border border-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Subir Imagen para Procesar
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <label className="block">
          <span className="sr-only">Seleccionar Archivo</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="
              block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-teal-50 file:text-teal-700
              hover:file:bg-teal-100 cursor-pointer
              transition duration-200
            "
          />
          {file && <p className="text-sm text-gray-500 mt-2">Archivo seleccionado: <span className="font-medium text-teal-600">{file.name}</span></p>}
        </label>
        <select
          value={invert}
          onChange={(e) => setInvert(e.target.value)}
          className="
            border border-gray-300 p-3 rounded-lg 
            focus:border-teal-500 focus:ring-1 focus:ring-teal-500
            transition duration-200
          "
        >
          <option value="false">Negro sobre blanco</option>
          <option value="true">Blanco sobre negro (Invertir)</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className={`
            py-3 rounded-lg font-semibold text-white transition duration-300 shadow-md
            ${loading 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-teal-600 hover:bg-teal-700 active:bg-teal-800"
            }
          `}
        >
          {loading ? "Procesando..." : "Enviar Imagen"}
        </button>
      </form>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded mt-5">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}
      {result && <ResultCard result={result} />}
    </div>
  );
}
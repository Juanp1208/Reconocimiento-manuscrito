import type { ImageRecognitionResponse } from "../types/api";

interface Props {
  result: ImageRecognitionResponse;
}

export function ResultCard({ result }: Props) {
  // Las clases 'md:flex' y 'md:justify-around' lo hacen responsive
  return (
    <div className="
      mt-6 p-5 border-2 rounded-xl shadow-lg bg-white 
      text-gray-800 font-sans transition duration-300
      md:max-w-xl md:mx-auto
    ">
      
      {/* TÍTULO PRINCIPAL: Predicción */}
      <h2 className="text-2xl font-extrabold text-teal-600 mb-4 border-b pb-2">
        Predicción: {result.prediction}
      </h2>

      {/* MÉTRICAS SECUNDARIAS: Precision y Tiempo de proceso */}
      <div className="
        flex flex-col space-y-3 
        md:flex-row md:space-y-0 md:justify-around
      ">
        
        {/* Precisión */}
        <div className="flex justify-between md:flex-col md:text-center p-2 rounded-lg bg-teal-50">
          <p className="font-bold text-lg text-gray-700">Precisión:</p>
          <span className="text-xl font-mono text-teal-700">{result.accuracy}</span>
        </div>

        {/* Tiempo de proceso */}
        <div className="flex justify-between md:flex-col md:text-center p-2 rounded-lg bg-teal-50">
          <p className="font-bold text-lg text-gray-700">Tiempo de proceso:</p>
          <span className="text-xl font-mono text-teal-700">{result.process_time}</span>
        </div>
        
      </div>
    </div>
  );
}
import { useState } from "react";
import type { ImageRecognitionResponse } from "../types/api";

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendImage = async (file: File, invert: string): Promise<ImageRecognitionResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("invert", invert);

      const response = await fetch("http://ec2-54-81-142-28.compute-1.amazonaws.com:8080/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error, maaal");
      }

      const data: ImageRecognitionResponse = await response.json();

      // Guardar en localStorage
      const history = JSON.parse(localStorage.getItem("history") || "[]");
      history.push({ ...data, date: new Date().toISOString() });
      localStorage.setItem("history", JSON.stringify(history));

      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { sendImage, loading, error };
}

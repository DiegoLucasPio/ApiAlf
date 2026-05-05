import { useState } from "react";
import { useNavigate } from "react-router";
import { useReport } from "../contexts/ReportContext";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const questions = [
  {
    text: "O QUE MARIANA SEGURA NA SUA MÃO DIREITA?",
    options: ["Bola de futebol", "Chuteiras", "Nada"],
    correctAnswer: "Bola de futebol",
  },
  {
    text: "O QUE MARIANA SEGURA NA SUA MÃO ESQUERDA?",
    options: ["Bola de futebol", "Chuteiras", "Nada"],
    correctAnswer: "Chuteiras",
  },
];

export function Phase15() {
  const navigate = useNavigate();
  const { addAnswer } = useReport();
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState("");

  const q = questions[idx];

  const handleNext = () => {
    addAnswer({
      phase: "Fase 15 - Lateralidade",
      question: idx + 1,
      answer: answer || "(vazio)",
      correctAnswer: q.correctAnswer,
    });
    setAnswer("");
    if (idx < questions.length - 1) {
      setIdx(p => p + 1);
    } else {
      navigate("/fase16");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-200 via-green-200 to-emerald-200 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={() => navigate("/")} variant="outline" className="bg-white hover:bg-gray-100">
            <ArrowLeft className="mr-2" /> Voltar
          </Button>
          <div className="bg-white px-6 py-2 rounded-full shadow-lg">
            <span className="font-bold text-lg">Fase 15 - Lateralidade</span>
          </div>
          <div className="w-24" />
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
            OBSERVE A IMAGEM
          </h2>
          {/* Mariana illustration */}
          <div className="flex justify-center mb-6">
            <div className="relative bg-amber-50 rounded-2xl p-8 border-2 border-amber-200 w-64 flex flex-col items-center">
              <div className="text-8xl mb-2">👧</div>
              <div className="flex items-center gap-8 text-center">
                <div className="flex flex-col items-center">
                  <span className="text-4xl">⚽</span>
                  <span className="text-xs font-bold text-gray-600 mt-1">Mão Direita</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-4xl">👟</span>
                  <span className="text-xs font-bold text-gray-600 mt-1">Mão Esquerda</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-3 text-center">Mariana usa camiseta nº 6</p>
            </div>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-200 text-center">
            <p className="text-lg font-bold text-green-800">{idx === 0 ? "A)" : "B)"} {q.text}</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
          <div className="flex flex-col gap-3">
            {q.options.map(opt => (
              <button
                key={opt}
                onClick={() => setAnswer(opt)}
                className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left ${
                  answer === opt
                    ? "border-green-500 bg-green-50 shadow-md"
                    : "border-gray-200 hover:border-green-400"
                }`}
              >
                <span className="text-3xl">
                  {opt === "Bola de futebol" ? "⚽" : opt === "Chuteiras" ? "👟" : "✋"}
                </span>
                <span className="text-xl font-bold text-gray-800">{opt}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleNext}
            disabled={!answer}
            className="px-8 py-6 text-xl font-bold bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg disabled:opacity-50 flex items-center gap-2"
          >
            {idx < questions.length - 1 ? "Próxima" : "Finalizar"}
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

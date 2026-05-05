import { useState } from "react";
import { useNavigate } from "react-router";
import { useReport } from "../contexts/ReportContext";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const operations = [
  { id: "a", label: "A) 176 + 268 =", correctAnswer: "444" },
  { id: "b", label: "B) 203 - 185 =", correctAnswer: "18" },
  { id: "c", label: "C) 221 × 5 =", correctAnswer: "1105" },
  { id: "d", label: "D) 135 ÷ 5 =", correctAnswer: "27" },
];

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export function Phase9() {
  const navigate = useNavigate();
  const { addAnswer } = useReport();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const op = operations[current];
  const answer = answers[op.id] || "";
  const setAnswer = (val: string) => setAnswers(prev => ({ ...prev, [op.id]: val }));

  const handleDigit = (d: string) => setAnswer(answer + d);
  const handleDelete = () => setAnswer(answer.slice(0, -1));

  const handleNext = () => {
    addAnswer({
      phase: "Fase 9 - Operações Matemáticas",
      question: current + 1,
      answer: answer || "(vazio)",
      correctAnswer: op.correctAnswer,
    });
    if (current < operations.length - 1) {
      setCurrent(p => p + 1);
    } else {
      navigate("/fase10");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-200 via-teal-200 to-cyan-200 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={() => navigate("/")} variant="outline" className="bg-white hover:bg-gray-100">
            <ArrowLeft className="mr-2" /> Voltar
          </Button>
          <div className="bg-white px-6 py-2 rounded-full shadow-lg">
            <span className="font-bold text-lg">Fase 9 - Operação {current + 1}/{operations.length}</span>
          </div>
          <div className="w-24" />
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-teal-700 mb-2">
            RESOLVA AS OPERAÇÕES
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <div className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
            {op.label}
          </div>
          <div className="bg-teal-50 rounded-2xl p-6 text-center border-2 border-teal-300 min-h-[80px] flex items-center justify-center">
            <span className="text-4xl font-bold text-teal-800 tracking-widest">
              {answer || <span className="text-gray-400 text-2xl font-normal">_____</span>}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
          <div className="grid grid-cols-5 gap-3 mb-4">
            {digits.map(d => (
              <button
                key={d}
                onClick={() => handleDigit(d)}
                className="aspect-square text-3xl font-bold bg-gradient-to-br from-teal-300 to-emerald-400 text-white rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                {d}
              </button>
            ))}
          </div>
          <div className="flex gap-3 justify-center">
            <Button onClick={handleDelete} disabled={!answer} className="px-6 py-4 text-lg font-bold bg-red-500 hover:bg-red-600 text-white rounded-xl disabled:opacity-50">
              Apagar
            </Button>
            <Button onClick={handleNext} className="px-8 py-4 text-lg font-bold bg-green-500 hover:bg-green-600 text-white rounded-xl flex items-center gap-2">
              {current < operations.length - 1 ? "Próxima" : "Finalizar"}
              <ArrowRight />
            </Button>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2">
          {operations.map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${i === current ? "bg-teal-600" : i < current ? "bg-teal-300" : "bg-gray-300"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

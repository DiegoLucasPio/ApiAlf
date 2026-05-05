import { useState } from "react";
import { useNavigate } from "react-router";
import { useReport } from "../contexts/ReportContext";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const problems = [
  {
    id: "a",
    text: "Elaine tem 4 figurinhas de natação e Cecília tem 2 figurinhas de judô. Quantas figurinhas de esportes elas têm juntas?",
    correctAnswer: "6",
    emoji: "🏊‍♀️🥋",
  },
  {
    id: "b",
    text: "Na classe de Vitor, há 22 estudantes. Hoje faltaram 5. Quantos estudantes estão hoje na sala?",
    correctAnswer: "17",
    emoji: "🏫👦",
  },
  {
    id: "c",
    text: "Cada coelho tem 4 patas. Quantas patas de coelho há na imagem? (8 coelhos)",
    correctAnswer: "32",
    emoji: "🐰🐰🐰🐰🐰🐰🐰🐰",
  },
  {
    id: "d",
    text: "Julia tem 12 bolinhas e está colocando em 2 caixas com a mesma quantidade. Quantas bolinhas ficarão em cada caixa?",
    correctAnswer: "6",
    emoji: "📦📦",
  },
];

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export function Phase11() {
  const navigate = useNavigate();
  const { addAnswer } = useReport();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const problem = problems[current];
  const answer = answers[problem.id] || "";
  const setAnswer = (v: string) => setAnswers(prev => ({ ...prev, [problem.id]: v }));

  const handleDigit = (d: string) => setAnswer(answer + d);
  const handleDelete = () => setAnswer(answer.slice(0, -1));

  const handleNext = () => {
    addAnswer({
      phase: "Fase 11 - Situações-Problema",
      question: current + 1,
      answer: answer || "(vazio)",
      correctAnswer: problem.correctAnswer,
    });
    if (current < problems.length - 1) {
      setCurrent(p => p + 1);
    } else {
      navigate("/fase12");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-200 via-blue-200 to-sky-200 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={() => navigate("/")} variant="outline" className="bg-white hover:bg-gray-100">
            <ArrowLeft className="mr-2" /> Voltar
          </Button>
          <div className="bg-white px-6 py-2 rounded-full shadow-lg">
            <span className="font-bold text-lg">Fase 11 - Problema {current + 1}/{problems.length}</span>
          </div>
          <div className="w-24" />
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
            SITUAÇÃO-PROBLEMA {problem.id.toUpperCase()})
          </h2>
          <div className="text-center text-5xl mb-4">{problem.emoji}</div>
          <p className="text-xl text-gray-800 text-center leading-relaxed">
            {problem.text}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <p className="text-center text-gray-600 mb-4 font-semibold">Sua resposta:</p>
          <div className="bg-blue-50 rounded-2xl p-6 text-center border-2 border-blue-300 min-h-[80px] flex items-center justify-center">
            <span className="text-4xl font-bold text-blue-800 tracking-widest">
              {answer || <span className="text-gray-400 text-2xl font-normal">___</span>}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
          <div className="grid grid-cols-5 gap-3 mb-4">
            {digits.map(d => (
              <button
                key={d}
                onClick={() => handleDigit(d)}
                className="aspect-square text-3xl font-bold bg-gradient-to-br from-blue-300 to-sky-400 text-white rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all"
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
              {current < problems.length - 1 ? "Próxima" : "Finalizar"}
              <ArrowRight />
            </Button>
          </div>
        </div>

        <div className="flex justify-center gap-2">
          {problems.map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${i === current ? "bg-blue-600" : i < current ? "bg-blue-300" : "bg-gray-300"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router";
import { useReport } from "../contexts/ReportContext";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Pedro: 20 + 20 + 1 + 1 = 42
// Vitória: 20 + 20 + 10 = 50
// Ana: 20 + 20 + 1 + 1 + 2 = 44

const people = [
  {
    name: "Pedro",
    emoji: "👦",
    money: [
      { value: 20, label: "R$20", color: "bg-yellow-400" },
      { value: 20, label: "R$20", color: "bg-yellow-400" },
      { value: 1, label: "R$1", color: "bg-yellow-200 text-xs" },
      { value: 1, label: "R$1", color: "bg-yellow-200 text-xs" },
    ],
    total: 42,
  },
  {
    name: "Vitória",
    emoji: "👧",
    money: [
      { value: 20, label: "R$20", color: "bg-yellow-400" },
      { value: 20, label: "R$20", color: "bg-yellow-400" },
      { value: 10, label: "R$10", color: "bg-blue-400 text-white" },
    ],
    total: 50,
  },
  {
    name: "Ana",
    emoji: "👩",
    money: [
      { value: 20, label: "R$20", color: "bg-yellow-400" },
      { value: 20, label: "R$20", color: "bg-yellow-400" },
      { value: 1, label: "R$1", color: "bg-yellow-200 text-xs" },
      { value: 1, label: "R$1", color: "bg-yellow-200 text-xs" },
      { value: 2, label: "R$2", color: "bg-blue-200 text-xs" },
    ],
    total: 44,
  },
];

const questions = [
  { text: "Quem tem MAIS dinheiro?", type: "person", correctAnswer: "Vitória (R$50,00)" },
  { text: "Quantos reais Ana tem?", type: "number", correctAnswer: "44" },
];

export function Phase14() {
  const navigate = useNavigate();
  const { addAnswer } = useReport();
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answer, setAnswer] = useState("");

  const question = questions[questionIdx];
  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const handleNext = () => {
    addAnswer({
      phase: "Fase 14 - Dinheiro",
      question: questionIdx + 1,
      answer: answer || "(vazio)",
      correctAnswer: question.correctAnswer,
    });
    setAnswer("");
    if (questionIdx < questions.length - 1) {
      setQuestionIdx(p => p + 1);
    } else {
      navigate("/fase15");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-amber-200 to-orange-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={() => navigate("/")} variant="outline" className="bg-white hover:bg-gray-100">
            <ArrowLeft className="mr-2" /> Voltar
          </Button>
          <div className="bg-white px-6 py-2 rounded-full shadow-lg">
            <span className="font-bold text-lg">Fase 14 - Dinheiro</span>
          </div>
          <div className="w-24" />
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-center text-amber-700 mb-6">
            OBSERVE A QUANTIA QUE PEDRO, VITÓRIA E ANA TÊM
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {people.map(person => (
              <div key={person.name} className="border-2 border-amber-300 rounded-2xl p-4 bg-amber-50 flex flex-col items-center">
                <span className="text-4xl mb-2">{person.emoji}</span>
                <span className="text-xl font-bold text-gray-800 mb-3">{person.name}</span>
                <div className="flex flex-wrap gap-1 justify-center mb-3">
                  {person.money.map((m, i) => (
                    <div
                      key={i}
                      className={`${m.color} border border-gray-300 rounded px-2 py-1 font-bold text-sm min-w-[40px] text-center shadow`}
                    >
                      {m.label}
                    </div>
                  ))}
                </div>
                <div className="text-lg font-bold text-amber-800">
                  Total: R$ {person.total},00
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-center text-amber-700 mb-6">
            {questionIdx === 0 ? "A)" : "B)"} {question.text}
          </h3>

          {question.type === "person" ? (
            <div className="flex flex-col gap-3">
              {people.map(person => (
                <button
                  key={person.name}
                  onClick={() => setAnswer(`${person.name} (R$${person.total},00)`)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                    answer.startsWith(person.name)
                      ? "border-green-500 bg-green-50 shadow-md"
                      : "border-gray-200 hover:border-amber-400"
                  }`}
                >
                  <span className="text-3xl">{person.emoji}</span>
                  <span className="text-xl font-bold text-gray-800">{person.name}</span>
                  <span className="ml-auto font-bold text-amber-700">R$ {person.total},00</span>
                </button>
              ))}
            </div>
          ) : (
            <>
              <div className="bg-amber-50 rounded-2xl p-6 text-center border-2 border-amber-300 min-h-[80px] flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-amber-800 tracking-widest">
                  {answer ? `R$ ${answer},00` : <span className="text-gray-400 text-2xl font-normal">___</span>}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2 mb-3">
                {digits.map(d => (
                  <button
                    key={d}
                    onClick={() => setAnswer(prev => prev + d)}
                    className="aspect-square text-2xl font-bold bg-gradient-to-br from-amber-300 to-orange-400 text-white rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all"
                  >
                    {d}
                  </button>
                ))}
              </div>
              <div className="flex justify-center">
                <Button onClick={() => setAnswer(p => p.slice(0, -1))} className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl">
                  Apagar
                </Button>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleNext}
            disabled={!answer}
            className="px-8 py-6 text-xl font-bold bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg disabled:opacity-50 flex items-center gap-2"
          >
            {questionIdx < questions.length - 1 ? "Próxima" : "Finalizar"}
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

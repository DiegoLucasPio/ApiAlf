import { useState } from "react";
import { useNavigate } from "react-router";
import { useReport } from "../contexts/ReportContext";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

// 1 red, 3 blue, 13 green = 17 total
// Chance of red is very small (1/17)
const options = [
  { id: "impossivel", label: "IMPOSSÍVEL", description: "Não tem chance nenhuma" },
  { id: "grande", label: "GRANDE", description: "Tem muitas bolas vermelhas" },
  { id: "pequena", label: "PEQUENA", description: "Poucas bolas vermelhas", correct: true },
  { id: "media", label: "MÉDIA", description: "Algumas bolas vermelhas" },
];

export function Phase16() {
  const navigate = useNavigate();
  const { addAnswer } = useReport();
  const [selected, setSelected] = useState<string>("");

  const handleFinish = () => {
    const choice = options.find(o => o.id === selected);
    addAnswer({
      phase: "Fase 16 - Probabilidade",
      question: 1,
      answer: choice?.label || "(vazio)",
      correctAnswer: "PEQUENA (1 bola vermelha em 17)",
    });
    navigate("/fase17");
  };

  // Ball display: 1 red, 3 blue, 13 green
  const balls = [
    { color: "bg-red-500", count: 1 },
    { color: "bg-blue-400", count: 3 },
    { color: "bg-green-500", count: 13 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-orange-100 to-yellow-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={() => navigate("/")} variant="outline" className="bg-white hover:bg-gray-100">
            <ArrowLeft className="mr-2" /> Voltar
          </Button>
          <div className="bg-white px-6 py-2 rounded-full shadow-lg">
            <span className="font-bold text-lg">Fase 16 - Probabilidade</span>
          </div>
          <div className="w-24" />
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-center text-red-700 mb-6">
            OBSERVE A IMAGEM E MARQUE A OPÇÃO CORRETA
          </h2>

          {/* Balls display */}
          <div className="bg-amber-50 rounded-2xl p-6 border-2 border-amber-200 mb-6">
            <div className="flex flex-wrap gap-3 justify-center mb-4">
              {balls.flatMap(({ color, count }) =>
                Array.from({ length: count }, (_, i) => (
                  <div
                    key={`${color}-${i}`}
                    className={`w-12 h-12 rounded-full ${color} shadow-md border-2 border-white`}
                  />
                ))
              )}
            </div>
            <div className="flex justify-center gap-6 text-sm font-bold text-gray-600">
              <span className="flex items-center gap-1"><div className="w-4 h-4 rounded-full bg-red-500" /> 1 vermelha</span>
              <span className="flex items-center gap-1"><div className="w-4 h-4 rounded-full bg-blue-400" /> 3 azuis</span>
              <span className="flex items-center gap-1"><div className="w-4 h-4 rounded-full bg-green-500" /> 13 verdes</span>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-4 mb-4 text-center">
            <span className="text-4xl">📦</span>
            <p className="text-white font-bold mt-2">Caixa com todas as bolinhas</p>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <p className="text-lg font-bold text-blue-800 text-center leading-relaxed">
              Se colocarmos todas as bolinhas na caixa, agitarmos bem, fecharmos os olhos e pegarmos uma bolinha, a chance de sair uma bolinha <span className="text-red-600">VERMELHA</span> é:
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
          <div className="flex flex-col gap-3">
            {options.map(opt => (
              <button
                key={opt.id}
                onClick={() => setSelected(opt.id)}
                className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left ${
                  selected === opt.id
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selected === opt.id ? "border-blue-500 bg-blue-500" : "border-gray-400"}`}>
                  {selected === opt.id && <div className="w-3 h-3 rounded-full bg-white" />}
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-800">( ) {opt.label}</div>
                  <div className="text-sm text-gray-500">{opt.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleFinish}
            disabled={!selected}
            className="px-8 py-6 text-xl font-bold bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg disabled:opacity-50 flex items-center gap-2"
          >
            Finalizar Fase 16
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

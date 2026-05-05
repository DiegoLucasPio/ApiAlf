import { useState } from "react";
import { useNavigate } from "react-router";
import { useReport } from "../contexts/ReportContext";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const toys = [
  { id: "bola", name: "Bola", emoji: "⚽", count: 6 },
  { id: "boneca", name: "Boneca", emoji: "🪆", count: 4 },
  { id: "carrinho", name: "Carrinho", emoji: "🚗", count: 3 },
  { id: "blocos", name: "Blocos", emoji: "🧱", count: 4 },
];

const questions = [
  { id: "b", text: "Qual foi o brinquedo MAIS votado?", type: "select", correctAnswer: "Bola (6 votos)" },
  { id: "c", text: "Qual foi o brinquedo MENOS votado?", type: "select", correctAnswer: "Carrinho (3 votos)" },
  { id: "d", text: "Quantas crianças preferiram a Boneca?", type: "number", correctAnswer: "4" },
  { id: "e", text: "Quantas crianças participaram da pesquisa?", type: "number", correctAnswer: "17" },
];

const maxCount = 6;

export function Phase13() {
  const navigate = useNavigate();
  const { addAnswer } = useReport();
  const [screen, setScreen] = useState(0); // 0 = gráfico, 1 = questões
  const [filledBars, setFilledBars] = useState<Record<string, number>>({});
  const [questionIdx, setQuestionIdx] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");

  const handleBarClick = (toyId: string, level: number) => {
    setFilledBars(prev => {
      const current = prev[toyId] || 0;
      return { ...prev, [toyId]: current === level ? level - 1 : level };
    });
  };

  const handleSaveChart = () => {
    toys.forEach(toy => {
      addAnswer({
        phase: "Fase 13 - Brinquedos Favoritos",
        question: toys.indexOf(toy) + 1,
        answer: `${toy.name} = ${filledBars[toy.id] || 0} (gráfico)`,
        correctAnswer: `${toy.name} = ${toy.count}`,
      });
    });
    setScreen(1);
  };

  const handleNextQuestion = () => {
    const q = questions[questionIdx];
    addAnswer({
      phase: "Fase 13 - Brinquedos Favoritos",
      question: toys.length + questionIdx + 1,
      answer: currentAnswer || "(vazio)",
      correctAnswer: q.correctAnswer,
    });
    setCurrentAnswer("");
    if (questionIdx < questions.length - 1) {
      setQuestionIdx(p => p + 1);
    } else {
      navigate("/fase14");
    }
  };

  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-emerald-200 to-teal-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={() => navigate("/")} variant="outline" className="bg-white hover:bg-gray-100">
            <ArrowLeft className="mr-2" /> Voltar
          </Button>
          <div className="bg-white px-6 py-2 rounded-full shadow-lg">
            <span className="font-bold text-lg">Fase 13 - Brinquedos Favoritos</span>
          </div>
          <div className="w-24" />
        </div>

        {screen === 0 && (
          <>
            <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
                A) PINTE O GRÁFICO DE ACORDO COM A TABELA
              </h2>

              {/* Tabela de dados */}
              <div className="bg-yellow-50 rounded-xl p-4 mb-6 border border-yellow-200">
                <h3 className="text-lg font-bold text-center mb-3">BRINQUEDOS FAVORITOS</h3>
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-2 px-4">Brinquedo</th>
                      <th className="text-center py-2 px-4">Crianças</th>
                    </tr>
                  </thead>
                  <tbody>
                    {toys.map(toy => (
                      <tr key={toy.id} className="border-b border-gray-200">
                        <td className="py-2 px-4 flex items-center gap-2">
                          <span className="text-2xl">{toy.emoji}</span>
                          <span>{toy.name}</span>
                        </td>
                        <td className="py-2 px-4 text-center font-bold text-lg">{toy.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Gráfico interativo */}
              <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                <h3 className="text-lg font-bold text-center mb-4">CLIQUE PARA PREENCHER AS BARRAS</h3>
                <div className="flex items-end gap-4 justify-center">
                  {/* Eixo Y */}
                  <div className="flex flex-col-reverse gap-0 mr-2">
                    {Array.from({ length: maxCount + 1 }, (_, i) => (
                      <div key={i} className="h-10 flex items-center justify-end pr-2 text-sm font-bold text-gray-600">{i}</div>
                    ))}
                  </div>

                  {/* Barras */}
                  {toys.map(toy => (
                    <div key={toy.id} className="flex flex-col items-center gap-1">
                      <div className="flex flex-col-reverse gap-0">
                        {Array.from({ length: maxCount }, (_, i) => {
                          const level = i + 1;
                          const filled = (filledBars[toy.id] || 0) >= level;
                          return (
                            <button
                              key={level}
                              onClick={() => handleBarClick(toy.id, level)}
                              className={`w-14 h-10 border border-white transition-all hover:opacity-90 ${
                                filled ? "bg-red-500" : "bg-gray-100 hover:bg-red-200"
                              }`}
                            />
                          );
                        })}
                      </div>
                      <span className="text-3xl mt-1">{toy.emoji}</span>
                      <span className="text-xs font-bold text-gray-600 text-center w-14">{toy.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button onClick={handleSaveChart} className="px-8 py-6 text-xl font-bold bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg flex items-center gap-2">
                Continuar para Perguntas
                <ArrowRight />
              </Button>
            </div>
          </>
        )}

        {screen === 1 && (
          <>
            <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
              <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
                {questions[questionIdx].id.toUpperCase()}) {questions[questionIdx].text}
              </h2>

              {questions[questionIdx].type === "select" ? (
                <div className="flex flex-col gap-3">
                  {toys.map(toy => (
                    <button
                      key={toy.id}
                      onClick={() => setCurrentAnswer(`${toy.name} (${toy.count} votos)`)}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                        currentAnswer.startsWith(toy.name)
                          ? "border-green-500 bg-green-50 shadow-md"
                          : "border-gray-200 hover:border-green-300"
                      }`}
                    >
                      <span className="text-3xl">{toy.emoji}</span>
                      <span className="text-xl font-bold text-gray-800">{toy.name}</span>
                      <span className="ml-auto font-bold text-gray-500">{toy.count} votos</span>
                    </button>
                  ))}
                </div>
              ) : (
                <>
                  <div className="bg-green-50 rounded-2xl p-6 text-center border-2 border-green-300 min-h-[80px] flex items-center justify-center mb-4">
                    <span className="text-4xl font-bold text-green-800 tracking-widest">
                      {currentAnswer || <span className="text-gray-400 text-2xl font-normal">___</span>}
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-2 mb-3">
                    {digits.map(d => (
                      <button
                        key={d}
                        onClick={() => setCurrentAnswer(prev => prev + d)}
                        className="aspect-square text-2xl font-bold bg-gradient-to-br from-green-300 to-emerald-400 text-white rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all"
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-center">
                    <Button onClick={() => setCurrentAnswer(p => p.slice(0, -1))} className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl">
                      Apagar
                    </Button>
                  </div>
                </>
              )}
            </div>
            <div className="flex justify-center">
              <Button
                onClick={handleNextQuestion}
                disabled={!currentAnswer}
                className="px-8 py-6 text-xl font-bold bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg disabled:opacity-50 flex items-center gap-2"
              >
                {questionIdx < questions.length - 1 ? "Próxima" : "Finalizar"}
                <ArrowRight />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

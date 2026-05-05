import { useState } from "react";
import { useNavigate } from "react-router";
import { useReport } from "../contexts/ReportContext";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Candy table: row by row, columns 0..9
// Row 0: cake(99), 98, 97, 96, icecream(95), 94, 93, 92, 91, 90
// Row 1: lollipop(89), 88, 87, 86, 85, 84, truffle(83), 82, 81, 80
// Row 2: 79, candy(78), 77, 76, 75, 74, 73, 72, pudding(71), 70

const candyItems = [
  { emoji: "🎂", name: "Bolo", hiddenNumber: 99 },
  { emoji: "🍦", name: "Sorvete", hiddenNumber: 95 },
  { emoji: "🍭", name: "Pirulito", hiddenNumber: 89 },
  { emoji: "🍫", name: "Trufa", hiddenNumber: 83 },
  { emoji: "🍬", name: "Bala", hiddenNumber: 78 },
  { emoji: "🍮", name: "Pudim", hiddenNumber: 71 },
];

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export function Phase10() {
  const navigate = useNavigate();
  const { addAnswer } = useReport();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [activeCandy, setActiveCandy] = useState<number | null>(null);

  const handleDigit = (d: string) => {
    if (activeCandy === null) return;
    setAnswers(prev => ({ ...prev, [activeCandy]: (prev[activeCandy] || "") + d }));
  };

  const handleDelete = () => {
    if (activeCandy === null) return;
    setAnswers(prev => ({ ...prev, [activeCandy]: (prev[activeCandy] || "").slice(0, -1) }));
  };

  const handleFinish = () => {
    candyItems.forEach(item => {
      addAnswer({
        phase: "Fase 10 - Números Escondidos",
        question: candyItems.indexOf(item) + 1,
        answer: `${item.name} = ${answers[item.hiddenNumber] || "(vazio)"}`,
        correctAnswer: `${item.name} = ${item.hiddenNumber}`,
      });
    });
    navigate("/fase11");
  };

  const tableRows = [
    [{ type: "candy", idx: 0 }, 98, 97, 96, { type: "candy", idx: 1 }, 94, 93, 92, 91, 90],
    [{ type: "candy", idx: 2 }, 88, 87, 86, 85, 84, { type: "candy", idx: 3 }, 82, 81, 80],
    [79, { type: "candy", idx: 4 }, 77, 76, 75, 74, 73, 72, { type: "candy", idx: 5 }, 70],
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-rose-200 to-red-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={() => navigate("/")} variant="outline" className="bg-white hover:bg-gray-100">
            <ArrowLeft className="mr-2" /> Voltar
          </Button>
          <div className="bg-white px-6 py-2 rounded-full shadow-lg">
            <span className="font-bold text-lg">Fase 10 - Números Escondidos</span>
          </div>
          <div className="w-24" />
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-rose-700 mb-2">
            QUAL É O NÚMERO ESCONDIDO?
          </h2>
          <p className="text-center text-gray-600">Clique em um docinho e depois escreva o número que está no lugar dele</p>
        </div>

        {/* Tabela de números */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                {tableRows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => {
                      if (typeof cell === "object" && cell.type === "candy") {
                        const item = candyItems[cell.idx];
                        const isActive = activeCandy === item.hiddenNumber;
                        return (
                          <td key={ci} className="p-1">
                            <button
                              onClick={() => setActiveCandy(isActive ? null : item.hiddenNumber)}
                              className={`w-full aspect-square flex items-center justify-center text-2xl rounded-lg border-2 transition-all ${
                                isActive ? "border-rose-500 bg-rose-100 scale-110 shadow-lg" : "border-dashed border-gray-400 hover:border-rose-400 hover:bg-rose-50"
                              }`}
                              title={item.name}
                            >
                              {item.emoji}
                            </button>
                          </td>
                        );
                      }
                      return (
                        <td key={ci} className="p-1 text-center font-bold text-lg bg-gray-50 rounded-lg border border-gray-200">
                          {cell as number}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Resposta para cada docinho */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
          <h3 className="text-lg font-bold text-center text-rose-700 mb-4">Escreva os números:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {candyItems.map(item => (
              <button
                key={item.hiddenNumber}
                onClick={() => setActiveCandy(activeCandy === item.hiddenNumber ? null : item.hiddenNumber)}
                className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                  activeCandy === item.hiddenNumber ? "border-rose-500 bg-rose-50 shadow-md" : "border-gray-200 hover:border-rose-300"
                }`}
              >
                <span className="text-3xl">{item.emoji}</span>
                <div className="text-left">
                  <div className="text-sm text-gray-500">{item.name}</div>
                  <div className="text-xl font-bold text-rose-700">
                    {answers[item.hiddenNumber] || "___"}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {activeCandy !== null && (
            <>
              <p className="text-center text-rose-600 font-semibold mb-3">
                Digitando para: {candyItems.find(c => c.hiddenNumber === activeCandy)?.emoji} {candyItems.find(c => c.hiddenNumber === activeCandy)?.name}
              </p>
              <div className="grid grid-cols-5 gap-2 mb-3">
                {digits.map(d => (
                  <button
                    key={d}
                    onClick={() => handleDigit(d)}
                    className="aspect-square text-2xl font-bold bg-gradient-to-br from-rose-300 to-pink-400 text-white rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all"
                  >
                    {d}
                  </button>
                ))}
              </div>
              <div className="flex justify-center">
                <Button onClick={handleDelete} className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl">
                  Apagar
                </Button>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-center">
          <Button onClick={handleFinish} className="px-8 py-6 text-xl font-bold bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg flex items-center gap-2">
            Finalizar Fase 10
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

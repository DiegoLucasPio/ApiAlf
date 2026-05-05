import { useState } from "react";
import { useNavigate } from "react-router";
import { useReport } from "../contexts/ReportContext";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

const fable = `A CIGARRA E A FORMIGA

Era uma vez uma cigarra que passava o verão todo cantando e se divertindo, enquanto as formigas trabalhavam duro, guardando comida para o inverno.

Quando o inverno chegou, a cigarra ficou com fome e foi pedir comida às formigas. A formiga respondeu: "O que você fez durante o verão?" A cigarra disse que ficou cantando. A formiga então disse: "Se você cantou o verão todo, agora dance no inverno!"

A moral da história: É importante trabalhar e se preparar para o futuro.`;

export function Phase6() {
  const navigate = useNavigate();
  const { addAnswer } = useReport();
  const [screen, setScreen] = useState(0); // 0 = ouvir fábula, 1 = escrever
  const [userText, setUserText] = useState("");

  const alphabet = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I",
    "J", "K", "L", "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W", "X", "Y", "Z", "Ç"
  ];

  const handleLetter = (l: string) => setUserText(p => p + l);
  const handleSpace = () => setUserText(p => p + " ");
  const handleEnter = () => setUserText(p => p + "\n");
  const handleDelete = () => setUserText(p => p.slice(0, -1));

  const handleFinish = () => {
    addAnswer({
      phase: "Fase 6 - Reescrita da Fábula",
      question: 1,
      answer: userText || "(vazio)",
      correctAnswer: "",
    });
    navigate("/fase7");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-200 via-orange-200 to-yellow-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={() => navigate("/")} variant="outline" className="bg-white hover:bg-gray-100">
            <ArrowLeft className="mr-2" /> Voltar
          </Button>
          <div className="bg-white px-6 py-2 rounded-full shadow-lg">
            <span className="font-bold text-lg">Fase 6 - Fábula</span>
          </div>
          <div className="w-24" />
        </div>

        {screen === 0 && (
          <>
            <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
              <div className="flex justify-center mb-6">
                <div className="text-8xl">🐜🦗</div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-center text-amber-700 mb-6">
                LEIA A FÁBULA COM ATENÇÃO
              </h2>
              <div className="bg-amber-50 rounded-2xl p-6 border-2 border-amber-200">
                <pre className="font-sans whitespace-pre-wrap text-lg text-gray-800 leading-relaxed">{fable}</pre>
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
              <h3 className="text-xl font-bold text-amber-700 mb-3">O que você deve fazer:</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Reescreva a fábula com suas próprias palavras. Lembre-se de usar pontuação e prestar atenção na escrita das palavras.
              </p>
            </div>
            <div className="flex justify-center">
              <Button onClick={() => setScreen(1)} className="px-8 py-6 text-xl font-bold bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-lg">
                Começar a Escrever
              </Button>
            </div>
          </>
        )}

        {screen === 1 && (
          <>
            <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-center text-amber-700 mb-4">
                REESCREVA A FÁBULA COM SUAS PALAVRAS
              </h2>
              <div className="bg-amber-50 rounded-xl p-4 min-h-[200px] border-2 border-amber-300 mb-2">
                <pre className="font-sans text-lg text-gray-900 whitespace-pre-wrap break-words">
                  {userText || <span className="text-gray-400 italic font-sans">Comece a escrever aqui...</span>}
                </pre>
              </div>
              <p className="text-sm text-gray-500 text-right">{userText.length} caracteres</p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
              <div className="grid grid-cols-9 gap-2 mb-3">
                {alphabet.map(l => (
                  <button
                    key={l}
                    onClick={() => handleLetter(l)}
                    className="aspect-square bg-gradient-to-br from-amber-300 to-orange-400 text-white font-bold text-lg rounded-lg shadow-md hover:scale-105 active:scale-95 transition-all"
                  >
                    {l}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-2">
                <button onClick={handleSpace} className="py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg shadow">Espaço</button>
                <button onClick={handleEnter} className="py-3 bg-blue-200 hover:bg-blue-300 text-blue-800 font-bold rounded-lg shadow">Enter</button>
                <button onClick={handleDelete} className="py-3 bg-red-400 hover:bg-red-500 text-white font-bold rounded-lg shadow">Apagar</button>
                <button
                  onClick={handleFinish}
                  className="py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow"
                >
                  Finalizar
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

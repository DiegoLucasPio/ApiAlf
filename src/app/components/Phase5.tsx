import { useState } from "react";
import { useNavigate } from "react-router";
import { useReport } from "../contexts/ReportContext";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import bgImage from "../../imports/5.png";

const alphabet = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I",
  "J", "K", "L", "M", "N", "O", "P", "Q", "R",
  "S", "T", "U", "V", "W", "X", "Y", "Z", "Ç"
];

export function Phase5() {
  const navigate = useNavigate();
  const { addAnswer } = useReport();
  const [userAnswer, setUserAnswer] = useState("");

  const handleLetterClick = (letter: string) => {
    setUserAnswer(prev => prev + letter);
  };

  const handleSpace = () => {
    setUserAnswer(prev => prev + " ");
  };

  const handleDelete = () => {
    setUserAnswer(prev => prev.slice(0, -1));
  };

  const handleFinish = () => {
    addAnswer({
      phase: "Fase 5 - Interpretação de Tirinha",
      question: 1,
      answer: userAnswer || "(vazio)",
      correctAnswer: "",
    });
    navigate("/relatorio");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-pink-300 to-yellow-300 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="bg-white hover:bg-gray-100"
          >
            <ArrowLeft className="mr-2" />
            Voltar
          </Button>
          <div className="bg-white px-6 py-2 rounded-full shadow-lg">
            <span className="font-bold text-lg">Fase 5</span>
          </div>
          <div className="w-24" /> {/* Espaçador */}
        </div>

        {/* Enunciado */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-700 mb-2">
            OBSERVE A TIRINHA
          </h2>
        </div>

        {/* Imagem da tirinha */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
          <img
            src={bgImage}
            alt="Tirinha"
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Pergunta */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-center text-pink-700 mb-6">
            POR QUE O HOMEM ESTÁ SEGURANDO A REDE NO ÚLTIMO QUADRO?
          </h3>

          {/* Campo de resposta */}
          <div className="bg-blue-50 rounded-xl p-4 mb-6 min-h-[120px] border-2 border-blue-300">
            <div className="text-xl md:text-2xl text-blue-900 font-semibold break-words whitespace-pre-wrap">
              {userAnswer || <span className="text-gray-400 italic">Clique nas letras para escrever...</span>}
            </div>
          </div>

          {/* Teclado Virtual */}
          <div className="space-y-3">
            {/* Letras do alfabeto */}
            <div className="grid grid-cols-9 gap-2">
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  onClick={() => handleLetterClick(letter)}
                  className="
                    aspect-square bg-gradient-to-br from-blue-400 to-blue-600 
                    text-white font-bold text-xl md:text-2xl rounded-lg 
                    shadow-lg hover:scale-105 active:scale-95 
                    transition-all duration-150
                  "
                >
                  {letter}
                </button>
              ))}
            </div>

            {/* Botões especiais */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleSpace}
                className="
                  py-4 bg-gradient-to-br from-gray-300 to-gray-500 
                  text-gray-800 font-bold text-lg md:text-xl rounded-lg 
                  shadow-lg hover:scale-105 active:scale-95 
                  transition-all duration-150
                "
              >
                ESPAÇO
              </button>
              <button
                onClick={handleDelete}
                className="
                  py-4 bg-gradient-to-br from-red-400 to-red-600 
                  text-white font-bold text-lg md:text-xl rounded-lg 
                  shadow-lg hover:scale-105 active:scale-95 
                  transition-all duration-150
                "
              >
                APAGAR
              </button>
            </div>
          </div>
        </div>

        {/* Botão Finalizar */}
        <div className="flex justify-center">
          <Button
            onClick={handleFinish}
            className="px-8 py-6 text-xl font-bold bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg"
          >
            Finalizar Fase 5
          </Button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router";
import { useReport } from "../contexts/ReportContext";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import img2A from "../../imports/Alf-pt1_2A.png";
import img2B from "../../imports/alf-pt1_2B.png";
import img2C from "../../imports/alf-pt1_2C.png";

const exercises = [
  { image: img2A, answer: "CAMISA" },
  { image: img2B, answer: "CALÇA" },
  { image: img2C, answer: "SAPATO" },
];

const alphabet = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I",
  "J", "K", "L", "M", "N", "O", "P", "Q", "R",
  "S", "T", "U", "V", "W", "X", "Y", "Z"
];

export function Phase2() {
  const navigate = useNavigate();
  const { addAnswer } = useReport();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");

  const exercise = exercises[currentExercise];

  const handleLetterClick = (letter: string) => {
    setUserAnswer(prev => prev + letter);
  };

  const handleDelete = () => {
    setUserAnswer(prev => prev.slice(0, -1));
  };

  const handleNext = () => {
    // Registrar a resposta
    addAnswer({
      phase: "Fase 2 - Peças de Vestuário",
      question: currentExercise + 1,
      answer: userAnswer,
      correctAnswer: exercise.answer,
    });

    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
      setUserAnswer("");
    } else {
      // Última questão - ir para o relatório
      navigate("/relatorio");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
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
            <span className="font-bold text-lg">
              {currentExercise + 1} / {exercises.length}
            </span>
          </div>
        </div>

        {/* Título */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-purple-700 mb-2">
            ESCREVA O NOME DAS PEÇAS DE VESTUÁRIO
          </h1>
        </div>

        {/* Imagem */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6 flex justify-center">
          <img
            src={exercise.image}
            alt={`Peça de vestuário ${currentExercise + 1}`}
            className="max-h-64 object-contain"
          />
        </div>

        {/* Área de resposta */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 rounded-2xl px-8 py-6 min-w-[300px] text-center">
              <div className="text-4xl font-bold text-blue-800 tracking-widest min-h-[50px] flex items-center justify-center">
                {userAnswer || "_____"}
              </div>
            </div>
          </div>
        </div>

        {/* Teclado */}
        <div className="bg-white rounded-3xl shadow-2xl p-6">
          <div className="grid grid-cols-9 gap-2 mb-4">
            {alphabet.map((letter) => (
              <Button
                key={letter}
                onClick={() => handleLetterClick(letter)}
                className="aspect-square text-xl font-bold bg-gradient-to-br from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-purple-800 rounded-xl shadow-md transform transition-all hover:scale-110"
              >
                {letter}
              </Button>
            ))}
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={handleDelete}
              disabled={userAnswer.length === 0}
              className="px-8 py-6 text-xl font-bold bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-lg disabled:opacity-50"
            >
              Apagar
            </Button>
            <Button
              onClick={handleNext}
              className="px-8 py-6 text-xl font-bold bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg flex items-center gap-2"
            >
              {currentExercise < exercises.length - 1 ? "Próxima" : "Finalizar"}
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

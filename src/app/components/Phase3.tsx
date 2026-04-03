import { useState } from "react";
import { useNavigate } from "react-router";
import { useReport } from "../contexts/ReportContext";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const poem = `A BAILARINA

Esta menina
tão pequenina
quer ser bailarina.
Não conhece nem dó nem ré
mas sabe ficar na ponta do pé.

Não conhece nem mi nem fá
Mas inclina o corpo para cá e para lá

Não conhece nem lá nem si,
mas fecha os olhos e sorri.

Roda, roda, roda, com os bracinhos no ar
e não fica tonta nem sai do lugar.

Põe no cabelo uma estrela e um véu
e diz que caiu do céu.

Esta menina
tão pequenina
quer ser bailarina.

Mas depois esquece todas as danças,
e também quer dormir como as outras crianças.`;

// Palavras que rimam - cada array é um grupo de rimas
const rhymeGroups = [
  ["menina", "pequenina", "bailarina"],
  ["ré", "pé"],
  ["fá", "cá", "lá"],
  ["si", "sorri"],
  ["ar", "lugar"],
  ["véu", "céu"],
  ["danças", "crianças"],
];

const questions = [
  { id: "a", text: "QUAL O TÍTULO DO POEMA?", answer: "A BAILARINA" },
  { id: "b", text: "QUAL O NOME DO AUTOR?", answer: "CECÍLIA MEIRELES" },
  { id: "c", text: "O QUE A BAILARINA TEM NO CABELO?", answer: "ESTRELA E VÉU" },
];

const alphabet = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I",
  "J", "K", "L", "M", "N", "O", "P", "Q", "R",
  "S", "T", "U", "V", "W", "X", "Y", "Z", "Ç"
];

export function Phase3() {
  const navigate = useNavigate();
  const { addAnswer } = useReport();
  const [currentQuestion, setCurrentQuestion] = useState<number>(-1); // -1 = mostra poema
  const [userAnswer, setUserAnswer] = useState("");
  const [selectedWords, setSelectedWords] = useState<Set<string>>(new Set());

  const handleLetterClick = (letter: string) => {
    setUserAnswer(prev => prev + letter);
  };

  const handleSpace = () => {
    setUserAnswer(prev => prev + " ");
  };

  const handleDelete = () => {
    setUserAnswer(prev => prev.slice(0, -1));
  };

  const handleNext = () => {
    if (currentQuestion === -1) {
      // Avançar do poema para a primeira questão
      setCurrentQuestion(0);
    } else if (currentQuestion < 3) {
      // Questões a, b, c - salvar resposta
      const question = questions[currentQuestion];
      addAnswer({
        phase: "Fase 3 - A Bailarina",
        question: currentQuestion + 1,
        answer: userAnswer,
        correctAnswer: question.answer,
      });
      setUserAnswer("");
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Questão d - salvar palavras selecionadas
      addAnswer({
        phase: "Fase 3 - A Bailarina",
        question: 4,
        answer: Array.from(selectedWords).join(", "),
        correctAnswer: "Palavras com rima coloridas",
      });
      // Ir para próxima fase ou relatório
      navigate("/relatorio");
    }
  };

  const toggleWordSelection = (word: string) => {
    setSelectedWords(prev => {
      const newSet = new Set(prev);
      if (newSet.has(word)) {
        newSet.delete(word);
      } else {
        newSet.add(word);
      }
      return newSet;
    });
  };

  // Renderizar poema com palavras clicáveis
  const renderPoemWithClickableWords = () => {
    const words = poem.split(/(\s+)/);
    return (
      <div className="text-left whitespace-pre-wrap leading-relaxed">
        {words.map((word, index) => {
          const cleanWord = word.trim().toLowerCase().replace(/[,.:;!?]/g, "");
          const isSelected = selectedWords.has(cleanWord);
          
          // Todas as palavras são clicáveis (exceto espaços vazios)
          if (cleanWord.length > 0) {
            return (
              <span
                key={index}
                onClick={() => toggleWordSelection(cleanWord)}
                className={`cursor-pointer transition-all ${
                  isSelected 
                    ? "bg-yellow-300 text-purple-800 font-bold px-1 rounded" 
                    : "hover:bg-yellow-100"
                }`}
              >
                {word}
              </span>
            );
          }
          return <span key={index}>{word}</span>;
        })}
      </div>
    );
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
              Fase 3 {currentQuestion >= 0 && `- Questão ${currentQuestion + 1}/4`}
            </span>
          </div>
        </div>

        {/* Mostrar o poema inicialmente */}
        {currentQuestion === -1 && (
          <>
            <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-center text-purple-700 mb-8">
                Leia o Poema
              </h1>
              <div className="bg-blue-50 rounded-2xl p-8 text-lg text-gray-800">
                <pre className="font-sans whitespace-pre-wrap">{poem}</pre>
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                onClick={handleNext}
                className="px-8 py-6 text-xl font-bold bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg flex items-center gap-2"
              >
                Continuar para as Questões
                <ArrowRight />
              </Button>
            </div>
          </>
        )}

        {/* Questões a, b, c - com teclado */}
        {currentQuestion >= 0 && currentQuestion < 3 && (
          <>
            <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-700 mb-4">
                {questions[currentQuestion].id.toUpperCase()}) {questions[currentQuestion].text}
              </h2>
            </div>

            {/* Área de resposta */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 rounded-2xl px-8 py-6 min-w-[300px] text-center">
                  <div className="text-2xl font-bold text-blue-800 min-h-[50px] flex items-center justify-center break-words">
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

              <div className="flex gap-4 justify-center flex-wrap">
                <Button
                  onClick={handleSpace}
                  className="px-8 py-6 text-xl font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-lg"
                >
                  Espaço
                </Button>
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
                  Próxima
                  <ArrowRight />
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Questão d - colorir rimas */}
        {currentQuestion === 3 && (
          <>
            <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-700 mb-4">
                D) COLORIR AS PALAVRAS QUE RIMAM
              </h2>
              <p className="text-center text-gray-600 mb-4">
                Clique nas palavras que rimam para colori-las
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
              <div className="bg-blue-50 rounded-2xl p-8 text-lg text-gray-800">
                {renderPoemWithClickableWords()}
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleNext}
                className="px-8 py-6 text-xl font-bold bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg flex items-center gap-2"
              >
                Finalizar
                <ArrowRight />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
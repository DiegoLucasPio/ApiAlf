import { useState } from "react";
import { useNavigate } from "react-router";
import { useReport } from "../contexts/ReportContext";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import calendarImage from "../../imports/7.png";

const weekDays = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];

// Estrutura do calendário - Abril 2026 (exemplo)
// Vou criar um grid 7x6 para representar o calendário
// Domingo a Sábado, 6 semanas
const calendarDays = [
  // Semana 1
  [null, null, null, 1, 2, 3, 4],
  // Semana 2
  [5, 6, 7, 8, 9, 10, 11],
  // Semana 3
  [12, 13, 14, 15, 16, 17, 18],
  // Semana 4
  [19, 20, 21, 22, 23, 24, 25],
  // Semana 5
  [26, 27, 28, 29, 30, null, null],
];

export function Phase7() {
  const navigate = useNavigate();
  const { addAnswer } = useReport();
  const [currentScreen, setCurrentScreen] = useState(0); // 0, 1, 2 para diferentes perguntas
  const [selectedDay1, setSelectedDay1] = useState<number | null>(null); // Segundo domingo
  const [selectedDay2, setSelectedDay2] = useState<number | null>(null); // Último sábado
  const [tiradentesDay, setTiradentesDay] = useState<string>(""); // Dia da semana de Tiradentes

  const handleDayClick = (day: number | null) => {
    if (day === null) return;
    
    if (currentScreen === 0) {
      setSelectedDay1(day);
    } else if (currentScreen === 1) {
      setSelectedDay2(day);
    }
  };

  const handleNext = () => {
    if (currentScreen === 0) {
      // Salvar resposta do segundo domingo
      addAnswer({
        phase: "Fase 7 - Calendário",
        question: 1,
        answer: selectedDay1 ? `Dia ${selectedDay1}` : "(não selecionado)",
        correctAnswer: "Dia 12 (segundo domingo)",
      });
      setCurrentScreen(1);
    } else if (currentScreen === 1) {
      // Salvar resposta do último sábado
      addAnswer({
        phase: "Fase 7 - Calendário",
        question: 2,
        answer: selectedDay2 ? `Dia ${selectedDay2}` : "(não selecionado)",
        correctAnswer: "Dia 25 (último sábado)",
      });
      setCurrentScreen(2);
    } else if (currentScreen === 2) {
      // Salvar resposta do dia da semana de Tiradentes
      addAnswer({
        phase: "Fase 7 - Calendário",
        question: 3,
        answer: tiradentesDay || "(não selecionado)",
        correctAnswer: "Terça-feira (21 de Abril)",
      });
      navigate("/relatorio");
    }
  };

  const handleBack = () => {
    if (currentScreen > 0) {
      setCurrentScreen(prev => prev - 1);
    }
  };

  const canProceed = () => {
    if (currentScreen === 0) return selectedDay1 !== null;
    if (currentScreen === 1) return selectedDay2 !== null;
    if (currentScreen === 2) return tiradentesDay !== "";
    return false;
  };

  const getQuestionText = () => {
    switch (currentScreen) {
      case 0:
        return "CLIQUE NO SEGUNDO DOMINGO DO MÊS";
      case 1:
        return "CLIQUE NO ÚLTIMO SÁBADO DO MÊS";
      case 2:
        return "EM QUE DIA DA SEMANA CAI O FERIADO DE TIRADENTES?";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-cyan-300 to-teal-300 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
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
            <span className="font-bold text-lg">Fase 7 - Pergunta {currentScreen + 1}/3</span>
          </div>
          <div className="w-24" /> {/* Espaçador */}
        </div>

        {/* Enunciado */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-center text-blue-700 mb-2">
            {getQuestionText()}
          </h2>
          {currentScreen < 2 && (
            <p className="text-center text-gray-600 text-sm">
              Clique no dia correto no calendário abaixo
            </p>
          )}
        </div>

        {/* Calendário Interativo */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
          {/* Imagem de fundo do calendário */}
          <div className="relative w-full">
            <img
              src={calendarImage}
              alt="Calendário"
              className="w-full h-auto rounded-lg"
            />
            
            {/* Grid overlay para cliques nos dias */}
            {currentScreen < 2 && (
              <div className="absolute inset-0 grid grid-rows-5 gap-1 p-[8%] pt-[20%]">
                {calendarDays.map((week, weekIndex) => (
                  <div key={weekIndex} className="grid grid-cols-7 gap-1">
                    {week.map((day, dayIndex) => (
                      <button
                        key={`${weekIndex}-${dayIndex}`}
                        onClick={() => handleDayClick(day)}
                        disabled={day === null}
                        className={`
                          aspect-square rounded-lg transition-all
                          flex items-center justify-center text-xl font-bold
                          ${day === null ? 'cursor-default' : 'cursor-pointer hover:bg-blue-200/50'}
                          ${
                            (currentScreen === 0 && selectedDay1 === day) ||
                            (currentScreen === 1 && selectedDay2 === day)
                              ? 'bg-green-400 ring-4 ring-green-600 text-white shadow-lg scale-110'
                              : 'bg-transparent hover:bg-blue-100/30'
                          }
                        `}
                      >
                        {day && (
                          <span className={
                            (currentScreen === 0 && selectedDay1 === day) ||
                            (currentScreen === 1 && selectedDay2 === day)
                              ? 'text-white'
                              : 'text-transparent'
                          }>
                            {day}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dropdown para pergunta de Tiradentes */}
          {currentScreen === 2 && (
            <div className="mt-6">
              <label className="block text-center text-lg font-semibold text-gray-700 mb-4">
                Escolha o dia da semana:
              </label>
              <select
                value={tiradentesDay}
                onChange={(e) => setTiradentesDay(e.target.value)}
                className="
                  w-full max-w-md mx-auto block px-6 py-4 text-xl font-semibold
                  border-2 border-blue-400 rounded-xl
                  bg-blue-50 text-blue-900
                  focus:outline-none focus:ring-4 focus:ring-blue-300
                  cursor-pointer
                "
              >
                <option value="">Selecione...</option>
                {weekDays.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
              
              {tiradentesDay && (
                <div className="mt-4 text-center">
                  <p className="text-lg text-gray-600">
                    Você selecionou: <span className="font-bold text-blue-700">{tiradentesDay}</span>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Botões de navegação */}
        <div className="flex justify-between items-center">
          {currentScreen > 0 ? (
            <Button
              onClick={handleBack}
              className="px-6 py-4 text-lg font-bold bg-gray-400 hover:bg-gray-500 text-white rounded-xl shadow-lg"
            >
              <ArrowLeft className="mr-2" />
              Anterior
            </Button>
          ) : (
            <div /> // Espaçador
          )}

          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`
              px-6 py-4 text-lg font-bold rounded-xl shadow-lg
              ${canProceed() 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {currentScreen === 2 ? "Finalizar Fase 7" : "Próxima"}
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

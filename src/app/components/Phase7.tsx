import { useState } from "react";
import { useNavigate } from "react-router";
import { useReport } from "../contexts/ReportContext";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import calendarImage from "../../imports/7.png";

const weekDays = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];

const calendarDays = [
  [null, null, null, 1, 2, 3, 4],
  [5, 6, 7, 8, 9, 10, 11],
  [12, 13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24, 25],
  [26, 27, 28, 29, 30, null, null],
];

export function Phase7() {
  const navigate = useNavigate();
  const { addAnswer } = useReport();
  const [currentScreen, setCurrentScreen] = useState(0); // 0=dias abril, 1=segundo domingo, 2=último sábado, 3=tiradentes
  const [daysAnswer, setDaysAnswer] = useState<string>("");
  const [selectedDay1, setSelectedDay1] = useState<number | null>(null);
  const [selectedDay2, setSelectedDay2] = useState<number | null>(null);
  const [tiradentesDay, setTiradentesDay] = useState<string>("");

  const handleDayClick = (day: number | null) => {
    if (day === null) return;
    if (currentScreen === 1) setSelectedDay1(day);
    else if (currentScreen === 2) setSelectedDay2(day);
  };

  const handleNext = () => {
    if (currentScreen === 0) {
      addAnswer({
        phase: "Fase 7 - Calendário",
        question: 1,
        answer: daysAnswer || "(não respondido)",
        correctAnswer: "30",
      });
      setCurrentScreen(1);
    } else if (currentScreen === 1) {
      addAnswer({
        phase: "Fase 7 - Calendário",
        question: 2,
        answer: selectedDay1 ? `Dia ${selectedDay1}` : "(não selecionado)",
        correctAnswer: "Dia 12 (segundo domingo)",
      });
      setCurrentScreen(2);
    } else if (currentScreen === 2) {
      addAnswer({
        phase: "Fase 7 - Calendário",
        question: 3,
        answer: selectedDay2 ? `Dia ${selectedDay2}` : "(não selecionado)",
        correctAnswer: "Dia 25 (último sábado)",
      });
      setCurrentScreen(3);
    } else if (currentScreen === 3) {
      addAnswer({
        phase: "Fase 7 - Calendário",
        question: 4,
        answer: tiradentesDay || "(não selecionado)",
        correctAnswer: "Terça-feira (21 de Abril)",
      });
      navigate("/fase8");
    }
  };

  const handleBack = () => {
    if (currentScreen > 0) setCurrentScreen(p => p - 1);
  };

  const canProceed = () => {
    if (currentScreen === 0) return daysAnswer !== "";
    if (currentScreen === 1) return selectedDay1 !== null;
    if (currentScreen === 2) return selectedDay2 !== null;
    if (currentScreen === 3) return tiradentesDay !== "";
    return false;
  };

  const getQuestionText = () => {
    switch (currentScreen) {
      case 0: return "A) QUANTOS DIAS TEM O MÊS DE ABRIL?";
      case 1: return "C) CLIQUE NO SEGUNDO DOMINGO DO MÊS";
      case 2: return "D) CLIQUE NO ÚLTIMO SÁBADO DO MÊS";
      case 3: return "B) EM QUE DIA DA SEMANA CAI O FERIADO DE TIRADENTES?";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-cyan-300 to-teal-300 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={() => navigate("/")} variant="outline" className="bg-white hover:bg-gray-100">
            <ArrowLeft className="mr-2" /> Voltar
          </Button>
          <div className="bg-white px-6 py-2 rounded-full shadow-lg">
            <span className="font-bold text-lg">Fase 7 - Pergunta {currentScreen + 1}/4</span>
          </div>
          <div className="w-24" />
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-center text-blue-700 mb-2">
            {getQuestionText()}
          </h2>
          {currentScreen >= 1 && currentScreen <= 2 && (
            <p className="text-center text-gray-600 text-sm">Clique no dia correto no calendário abaixo</p>
          )}
        </div>

        {/* Questão A: Quantos dias */}
        {currentScreen === 0 && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
            <div className="mb-6">
              <img src={calendarImage} alt="Calendário Abril 2026" className="w-full h-auto rounded-lg mb-6" />
            </div>
            <div className="flex flex-col items-center gap-4">
              <p className="text-lg text-gray-600">Clique no número correto:</p>
              <div className="flex gap-4 flex-wrap justify-center">
                {["28", "29", "30", "31"].map(n => (
                  <button
                    key={n}
                    onClick={() => setDaysAnswer(n)}
                    className={`w-20 h-20 text-3xl font-bold rounded-2xl border-4 transition-all transform hover:scale-105 ${
                      daysAnswer === n
                        ? "bg-green-400 border-green-600 text-white shadow-lg scale-110"
                        : "bg-white border-gray-300 text-gray-700 hover:border-blue-400"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              {daysAnswer && (
                <p className="text-lg font-semibold text-blue-700">Sua resposta: {daysAnswer} dias</p>
              )}
            </div>
          </div>
        )}

        {/* Calendário interativo para questões B e C */}
        {(currentScreen === 1 || currentScreen === 2) && (
          <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
            <div className="relative w-full">
              <img src={calendarImage} alt="Calendário" className="w-full h-auto rounded-lg" />
              <div className="absolute inset-0 grid grid-rows-5 gap-1 p-[8%] pt-[20%]">
                {calendarDays.map((week, weekIndex) => (
                  <div key={weekIndex} className="grid grid-cols-7 gap-1">
                    {week.map((day, dayIndex) => (
                      <button
                        key={`${weekIndex}-${dayIndex}`}
                        onClick={() => handleDayClick(day)}
                        disabled={day === null}
                        className={`
                          aspect-square rounded-lg transition-all flex items-center justify-center
                          ${day === null ? "cursor-default" : "cursor-pointer hover:bg-blue-200/50"}
                          ${(currentScreen === 1 && selectedDay1 === day) || (currentScreen === 2 && selectedDay2 === day)
                            ? "bg-green-400 ring-4 ring-green-600 text-white shadow-lg scale-110"
                            : "bg-transparent"}
                        `}
                      >
                        {day && (
                          <span className={
                            (currentScreen === 1 && selectedDay1 === day) || (currentScreen === 2 && selectedDay2 === day)
                              ? "text-white font-bold"
                              : "text-transparent"
                          }>
                            {day}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Questão D: Tiradentes */}
        {currentScreen === 3 && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
            <img src={calendarImage} alt="Calendário" className="w-full h-auto rounded-lg mb-6" />
            <label className="block text-center text-lg font-semibold text-gray-700 mb-4">
              Escolha o dia da semana:
            </label>
            <select
              value={tiradentesDay}
              onChange={e => setTiradentesDay(e.target.value)}
              className="w-full max-w-md mx-auto block px-6 py-4 text-xl font-semibold border-2 border-blue-400 rounded-xl bg-blue-50 text-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer"
            >
              <option value="">Selecione...</option>
              {weekDays.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            {tiradentesDay && (
              <p className="mt-4 text-center text-lg text-gray-600">
                Você selecionou: <span className="font-bold text-blue-700">{tiradentesDay}</span>
              </p>
            )}
          </div>
        )}

        <div className="flex justify-between items-center">
          {currentScreen > 0 ? (
            <Button onClick={handleBack} className="px-6 py-4 text-lg font-bold bg-gray-400 hover:bg-gray-500 text-white rounded-xl shadow-lg">
              <ArrowLeft className="mr-2" /> Anterior
            </Button>
          ) : <div />}
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`px-6 py-4 text-lg font-bold rounded-xl shadow-lg ${canProceed() ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
          >
            {currentScreen === 3 ? "Finalizar Fase 7" : "Próxima"}
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

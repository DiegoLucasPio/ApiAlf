import { useState } from "react";
import { useNavigate } from "react-router";
import { useReport } from "../contexts/ReportContext";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight, CircleCheck as CheckCircle } from "lucide-react";

const events = [
  { id: "almoco", label: "Almoçar", emoji: "🍽️", correctTime: "12:00" },
  { id: "dormir", label: "Dormir", emoji: "😴", correctTime: "21:00" },
  { id: "acordar", label: "Acordar", emoji: "☀️", correctTime: "6:00" },
];

const times = ["6:00", "12:00", "21:00"];

export function Phase12() {
  const navigate = useNavigate();
  const { addAnswer } = useReport();
  const [connections, setConnections] = useState<Record<string, string>>({});
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const handleEventClick = (eventId: string) => {
    setSelectedEvent(selectedEvent === eventId ? null : eventId);
  };

  const handleTimeClick = (time: string) => {
    if (!selectedEvent) return;
    setConnections(prev => ({ ...prev, [selectedEvent]: time }));
    setSelectedEvent(null);
  };

  const handleRemove = (eventId: string) => {
    setConnections(prev => {
      const next = { ...prev };
      delete next[eventId];
      return next;
    });
  };

  const handleFinish = () => {
    events.forEach(ev => {
      addAnswer({
        phase: "Fase 12 - Relacionar Horas",
        question: events.indexOf(ev) + 1,
        answer: `${ev.label} → ${connections[ev.id] || "(não conectado)"}`,
        correctAnswer: `${ev.label} → ${ev.correctTime}`,
      });
    });
    navigate("/fase13");
  };

  const usedTimes = new Set(Object.values(connections));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-blue-200 to-indigo-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={() => navigate("/")} variant="outline" className="bg-white hover:bg-gray-100">
            <ArrowLeft className="mr-2" /> Voltar
          </Button>
          <div className="bg-white px-6 py-2 rounded-full shadow-lg">
            <span className="font-bold text-lg">Fase 12 - Relacionar Horas</span>
          </div>
          <div className="w-24" />
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-700 mb-2">
            RELACIONE OS ACONTECIMENTOS COM A HORA CORRESPONDENTE
          </h2>
          <p className="text-center text-gray-600">
            Clique em um acontecimento (fica destacado) e depois clique na hora correspondente
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
            {/* Eventos */}
            <div className="flex flex-col gap-4 items-center flex-1">
              <h3 className="text-lg font-bold text-gray-600 mb-2">ACONTECIMENTOS</h3>
              {events.map(ev => {
                const connected = connections[ev.id];
                return (
                  <div key={ev.id} className="flex items-center gap-2 w-full max-w-xs">
                    {connected && (
                      <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded-lg whitespace-nowrap">
                        {connected}
                      </span>
                    )}
                    <button
                      onClick={() => connected ? handleRemove(ev.id) : handleEventClick(ev.id)}
                      className={`flex items-center gap-3 px-4 py-4 rounded-2xl border-4 transition-all w-full ${
                        selectedEvent === ev.id
                          ? "border-blue-500 bg-blue-50 scale-105 shadow-lg"
                          : connected
                            ? "border-green-500 bg-green-50"
                            : "border-gray-300 hover:border-blue-300"
                      }`}
                    >
                      <span className="text-4xl">{ev.emoji}</span>
                      <span className="text-lg font-bold text-gray-800">{ev.label}</span>
                      {connected && <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />}
                    </button>
                  </div>
                );
              })}
              {selectedEvent && (
                <p className="text-blue-600 font-semibold text-sm animate-pulse mt-2">
                  Agora clique na hora correta →
                </p>
              )}
            </div>

            <div className="hidden md:block w-px bg-gray-200 self-stretch mx-4" />

            {/* Horas */}
            <div className="flex flex-col gap-4 items-center flex-1">
              <h3 className="text-lg font-bold text-gray-600 mb-2">HORAS</h3>
              {times.map(time => {
                const isUsed = usedTimes.has(time);
                return (
                  <button
                    key={time}
                    onClick={() => handleTimeClick(time)}
                    disabled={isUsed && !selectedEvent}
                    className={`px-8 py-5 rounded-2xl border-4 font-mono text-3xl font-bold transition-all w-full max-w-xs ${
                      isUsed
                        ? "border-green-400 bg-green-50 text-green-700"
                        : selectedEvent
                          ? "border-orange-400 bg-orange-50 hover:bg-orange-100 cursor-pointer text-gray-800 hover:scale-105"
                          : "border-gray-300 bg-gray-800 text-green-400 font-mono"
                    }`}
                    style={{ fontFamily: "monospace" }}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button onClick={handleFinish} className="px-8 py-6 text-xl font-bold bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg flex items-center gap-2">
            Finalizar Fase 12
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

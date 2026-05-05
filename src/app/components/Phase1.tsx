import { useState } from "react";
import { useNavigate } from "react-router";
import { useReport } from "../contexts/ReportContext";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const keyboardRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ç"],
  ["Z", "X", "C", "V", "B", "N", "M"]
];

export function Phase1() {
  const navigate = useNavigate();
  const { addAnswer } = useReport();
  const [screen, setScreen] = useState(0); // 0 = nome, 1 = nascimento
  const [nome, setNome] = useState("");
  const [nascimento, setNascimento] = useState("");

  const current = screen === 0 ? nome : nascimento;
  const setCurrent = screen === 0 ? setNome : setNascimento;

  const handleLetter = (l: string) => setCurrent(p => p + l);
  const handleSpace = () => setCurrent(p => p + " ");
  const handleDelete = () => setCurrent(p => p.slice(0, -1));

  const handleNext = () => {
    if (screen === 0) {
      addAnswer({
        phase: "Fase 1 - Identificação",
        question: 1,
        answer: nome || "(vazio)",
        correctAnswer: "",
      });
      setScreen(1);
    } else {
      addAnswer({
        phase: "Fase 1 - Identificação",
        question: 2,
        answer: nascimento || "(vazio)",
        correctAnswer: "",
      });
      navigate("/fase2");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-blue-200 to-teal-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={() => navigate("/")} variant="outline" className="bg-white hover:bg-gray-100">
            <ArrowLeft className="mr-2" /> Voltar
          </Button>
          <div className="bg-white px-6 py-2 rounded-full shadow-lg">
            <span className="font-bold text-lg">Questão 1 - {screen === 0 ? "Nome" : "Nascimento"}</span>
          </div>
          <div className="w-24" />
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-2">
            {screen === 0 ? "ESCREVA O SEU NOME COMPLETO" : "ESCREVA DIA, MÊS E ANO DO SEU NASCIMENTO"}
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <div className="bg-blue-50 rounded-xl px-8 py-6 min-h-[80px] border-2 border-blue-300 flex items-center">
            <span className="text-2xl font-bold text-blue-800 tracking-wide break-words">
              {current || <span className="text-gray-400 italic font-normal text-lg">Clique nas letras para escrever...</span>}
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-b from-gray-700 to-gray-900 rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto">
          <div className="space-y-3 mb-8">
            {keyboardRows.map((row, idx) => (
              <div key={idx} className={`flex gap-3 justify-center ${idx === 1 ? 'pl-12' : idx === 2 ? 'pl-20' : ''}`}>
                {row.map(l => (
                  <button
                    key={l}
                    onClick={() => handleLetter(l)}
                    className="w-20 h-20 text-3xl font-bold bg-gradient-to-b from-gray-200 to-gray-100 hover:from-gray-300 hover:to-gray-200 text-gray-900 rounded-lg shadow-lg border-b-4 border-gray-400 transform transition-all hover:shadow-xl active:shadow-inner active:translate-y-1 active:border-b-2"
                  >
                    {l}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button onClick={handleSpace} className="px-6 py-4 text-lg font-bold bg-gray-400 hover:bg-gray-500 text-white rounded-xl shadow-lg">
              Espaço
            </Button>
            <Button onClick={handleDelete} disabled={current.length === 0} className="px-6 py-4 text-lg font-bold bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-lg disabled:opacity-50">
              Apagar
            </Button>
            <Button onClick={handleNext} className="px-6 py-4 text-lg font-bold bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg flex items-center gap-2">
              {screen === 0 ? "Próximo" : "Continuar para Questão 2"}
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

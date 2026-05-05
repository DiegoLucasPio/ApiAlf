import { useState } from "react";
import { useNavigate } from "react-router";
import { useReport } from "../contexts/ReportContext";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

// Pizza 1: divided in 4, 1 slice highlighted → 1/4
// Pizza 2: divided in 3, 1 slice highlighted → 1/3
const fractionQuestions = [
  {
    description: "Pizza dividida em 4 partes, 1 parte destacada",
    slices: 4,
    highlighted: 1,
    options: [
      { num: 1, den: 1, label: "1/1" },
      { num: 1, den: 4, label: "1/4", correct: true },
      { num: 1, den: 3, label: "1/3" },
    ],
  },
  {
    description: "Pizza dividida em 3 partes, 1 parte destacada",
    slices: 3,
    highlighted: 1,
    options: [
      { num: 1, den: 3, label: "1/3", correct: true },
      { num: 3, den: 2, label: "3/2" },
      { num: 3, den: 1, label: "3/1" },
    ],
  },
];

function PizzaSlices({ slices, highlighted }: { slices: number; highlighted: number }) {
  const radius = 80;
  const cx = 100;
  const cy = 100;
  const angleStep = (2 * Math.PI) / slices;
  const startOffset = -Math.PI / 2;

  const paths = Array.from({ length: slices }, (_, i) => {
    const startAngle = startOffset + i * angleStep;
    const endAngle = startOffset + (i + 1) * angleStep;
    const x1 = cx + radius * Math.cos(startAngle);
    const y1 = cy + radius * Math.sin(startAngle);
    const x2 = cx + radius * Math.cos(endAngle);
    const y2 = cy + radius * Math.sin(endAngle);
    const largeArc = angleStep > Math.PI ? 1 : 0;
    const d = `M ${cx},${cy} L ${x1},${y1} A ${radius},${radius} 0 ${largeArc} 1 ${x2},${y2} Z`;
    return { d, isHighlighted: i < highlighted };
  });

  return (
    <svg viewBox="0 0 200 200" className="w-40 h-40">
      {paths.map((path, i) => (
        <path
          key={i}
          d={path.d}
          fill={path.isHighlighted ? "#f97316" : "#fef3c7"}
          stroke="#92400e"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}

export function Phase17() {
  const navigate = useNavigate();
  const { addAnswer } = useReport();
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleSelect = (qIdx: number, label: string) => {
    setAnswers(prev => ({ ...prev, [qIdx]: label }));
  };

  const allAnswered = fractionQuestions.every((_, i) => answers[i]);

  const handleFinish = () => {
    fractionQuestions.forEach((q, i) => {
      const correctOpt = q.options.find(o => o.correct);
      addAnswer({
        phase: "Fase 17 - Frações",
        question: i + 1,
        answer: answers[i] || "(vazio)",
        correctAnswer: correctOpt?.label || "",
      });
    });
    navigate("/relatorio");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-red-100 to-pink-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={() => navigate("/")} variant="outline" className="bg-white hover:bg-gray-100">
            <ArrowLeft className="mr-2" /> Voltar
          </Button>
          <div className="bg-white px-6 py-2 rounded-full shadow-lg">
            <span className="font-bold text-lg">Fase 17 - Frações</span>
          </div>
          <div className="w-24" />
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-center text-orange-700 mb-2">
            OBSERVE E MARQUE A FRAÇÃO CORRETA
          </h2>
          <p className="text-center text-gray-600">Clique na fração que representa a parte destacada da pizza</p>
        </div>

        {fractionQuestions.map((q, qIdx) => (
          <div key={qIdx} className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex flex-col items-center">
                <PizzaSlices slices={q.slices} highlighted={q.highlighted} />
                <p className="text-sm text-gray-500 mt-2 text-center">{q.description}</p>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                <p className="text-lg font-bold text-gray-700 mb-2">Qual fração está representada?</p>
                {q.options.map(opt => (
                  <button
                    key={opt.label}
                    onClick={() => handleSelect(qIdx, opt.label)}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                      answers[qIdx] === opt.label
                        ? "border-orange-500 bg-orange-50 shadow-md"
                        : "border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${answers[qIdx] === opt.label ? "border-orange-500 bg-orange-500" : "border-gray-400"}`}>
                      {answers[qIdx] === opt.label && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                    </div>
                    <span className="text-2xl font-bold text-gray-800">
                      ( ) <sup>{opt.num}</sup>/<sub>{opt.den}</sub>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center">
          <Button
            onClick={handleFinish}
            disabled={!allAnswered}
            className="px-8 py-6 text-xl font-bold bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg disabled:opacity-50"
          >
            Finalizar Avaliação
          </Button>
        </div>
      </div>
    </div>
  );
}

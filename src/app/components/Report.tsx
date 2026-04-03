import { useReport } from "../contexts/ReportContext";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

export function Report() {
  const { answers, clearAnswers } = useReport();
  const navigate = useNavigate();

  const handleNewTest = () => {
    clearAnswers();
    navigate("/");
  };

  // Agrupar respostas por fase
  const answersByPhase = answers.reduce((acc, answer) => {
    if (!acc[answer.phase]) {
      acc[answer.phase] = [];
    }
    acc[answer.phase].push(answer);
    return acc;
  }, {} as Record<string, typeof answers>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="bg-white hover:bg-gray-100"
          >
            <ArrowLeft className="mr-2" />
            Menu Inicial
          </Button>
        </div>

        {/* Título */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <h1 className="text-4xl font-bold text-center text-purple-700 mb-2">
            Relatório Final
          </h1>
          <p className="text-center text-gray-600">
            Registro de todas as respostas da avaliação
          </p>
        </div>

        {/* Respostas */}
        {Object.entries(answersByPhase).map(([phase, phaseAnswers]) => (
          <div key={phase} className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">
              {phase}
            </h2>
            <div className="space-y-4">
              {phaseAnswers.map((answer, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-gray-600 font-medium">
                        Questão {answer.question}:
                      </span>
                      {answer.correctAnswer && (
                        <span className="text-sm text-gray-500 ml-2">
                          (Esperado: {answer.correctAnswer})
                        </span>
                      )}
                    </div>
                    <div className="text-xl font-bold text-blue-700">
                      {answer.answer || "(sem resposta)"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {answers.length === 0 && (
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
            <p className="text-gray-500 text-xl">
              Nenhuma resposta registrada ainda.
            </p>
          </div>
        )}

        {/* Botão Nova Avaliação */}
        {answers.length > 0 && (
          <div className="flex justify-center">
            <Button
              onClick={handleNewTest}
              className="px-8 py-6 text-xl font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-2xl shadow-lg"
            >
              Nova Avaliação
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

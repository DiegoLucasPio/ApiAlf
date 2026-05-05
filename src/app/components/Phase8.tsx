import { useState } from "react";
import { useNavigate } from "react-router";
import { useReport } from "../contexts/ReportContext";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight, CircleCheck as CheckCircle } from "lucide-react";

const solids = [
  { id: "cilindro", name: "Cilindro", shape: "⬤", color: "bg-orange-400" },
  { id: "piramide", name: "Pirâmide", shape: "▲", color: "bg-yellow-400" },
  { id: "cubo", name: "Cubo", shape: "■", color: "bg-orange-600" },
];

const objects = [
  { id: "cuboRubik", name: "Cubo de Rubik", correctSolid: "cubo", emoji: "🎲" },
  { id: "latinha", name: "Latinha", correctSolid: "cilindro", emoji: "🥫" },
  { id: "piramideEgipto", name: "Pirâmide do Egito", correctSolid: "piramide", emoji: "🏔️" },
];

export function Phase8() {
  const navigate = useNavigate();
  const { addAnswer } = useReport();
  const [connections, setConnections] = useState<Record<string, string>>({});
  const [selectedSolid, setSelectedSolid] = useState<string | null>(null);

  const handleSolidClick = (solidId: string) => {
    setSelectedSolid(selectedSolid === solidId ? null : solidId);
  };

  const handleObjectClick = (objectId: string) => {
    if (!selectedSolid) return;
    setConnections(prev => ({ ...prev, [objectId]: selectedSolid }));
    setSelectedSolid(null);
  };

  const handleRemoveConnection = (objectId: string) => {
    setConnections(prev => {
      const next = { ...prev };
      delete next[objectId];
      return next;
    });
  };

  const handleFinish = () => {
    objects.forEach(obj => {
      const matched = connections[obj.id] || "(não conectado)";
      const solidName = solids.find(s => s.id === matched)?.name || matched;
      addAnswer({
        phase: "Fase 8 - Sólidos Geométricos",
        question: objects.indexOf(obj) + 1,
        answer: `${obj.name} → ${solidName}`,
        correctAnswer: `${obj.name} → ${solids.find(s => s.id === obj.correctSolid)?.name}`,
      });
    });
    navigate("/fase9");
  };

  const allConnected = objects.every(o => connections[o.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-amber-200 to-yellow-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={() => navigate("/")} variant="outline" className="bg-white hover:bg-gray-100">
            <ArrowLeft className="mr-2" /> Voltar
          </Button>
          <div className="bg-white px-6 py-2 rounded-full shadow-lg">
            <span className="font-bold text-lg">Fase 8 - Sólidos Geométricos</span>
          </div>
          <div className="w-24" />
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-amber-700 mb-2">
            RELACIONE AS FIGURAS AOS SÓLIDOS GEOMÉTRICOS
          </h2>
          <p className="text-center text-gray-600">
            Clique em um sólido (fica destacado) e depois clique no objeto correspondente
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
            {/* Sólidos geométricos */}
            <div className="flex flex-col gap-4 items-center">
              <h3 className="text-lg font-bold text-gray-600 mb-2">SÓLIDOS</h3>
              {solids.map(solid => (
                <button
                  key={solid.id}
                  onClick={() => handleSolidClick(solid.id)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl border-4 transition-all text-xl font-bold w-48 ${
                    selectedSolid === solid.id
                      ? "border-blue-500 bg-blue-100 scale-105 shadow-lg"
                      : "border-gray-300 bg-white hover:border-orange-400"
                  }`}
                >
                  <span className={`w-10 h-10 ${solid.color} rounded flex items-center justify-center text-white text-2xl`}>
                    {solid.shape}
                  </span>
                  <span className="text-gray-800">{solid.name}</span>
                </button>
              ))}
              {selectedSolid && (
                <p className="text-blue-600 font-semibold text-sm animate-pulse">
                  Agora clique no objeto correspondente →
                </p>
              )}
            </div>

            {/* Linha divisória */}
            <div className="hidden md:block w-px bg-gray-200 self-stretch mx-4" />

            {/* Objetos reais */}
            <div className="flex flex-col gap-4 items-center">
              <h3 className="text-lg font-bold text-gray-600 mb-2">OBJETOS</h3>
              {objects.map(obj => {
                const connectedSolid = connections[obj.id] ? solids.find(s => s.id === connections[obj.id]) : null;
                return (
                  <div key={obj.id} className="flex items-center gap-3 w-full">
                    {connectedSolid && (
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${connectedSolid.color} text-white text-sm font-bold`}>
                        <CheckCircle className="w-4 h-4" />
                        {connectedSolid.name}
                      </div>
                    )}
                    <button
                      onClick={() => connectedSolid ? handleRemoveConnection(obj.id) : handleObjectClick(obj.id)}
                      className={`flex items-center gap-3 px-6 py-4 rounded-2xl border-4 transition-all text-xl font-bold flex-1 ${
                        connectedSolid
                          ? "border-green-500 bg-green-50"
                          : selectedSolid
                            ? "border-orange-400 bg-orange-50 hover:bg-orange-100 cursor-pointer"
                            : "border-gray-300 bg-white"
                      }`}
                    >
                      <span className="text-4xl">{obj.emoji}</span>
                      <span className="text-gray-800 text-lg">{obj.name}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleFinish}
            className="px-8 py-6 text-xl font-bold bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg flex items-center gap-2"
          >
            Finalizar Fase 8
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useReport } from "../contexts/ReportContext";
import { Button } from "./ui/button";
import { ArrowLeft, RotateCcw, Lock, Unlock, Eye, X } from "lucide-react";
import bgImage from "../../imports/4.png";
import lacunasImage from "../../imports/4_lacunas.png";

const WORDS = ["evaporação", "transpiração", "condensação", "infiltração", "precipitação"];

// Definir as posições iniciais das lacunas
// Para ajustar as posições, altere temporariamente SHOW_CONFIG_MODE para true
const SHOW_CONFIG_MODE = false; // Mude para true apenas durante desenvolvimento

const INITIAL_GAPS = [
  { id: 1, name: "precipitação", x: 39.54, y: 36.24 },
  { id: 2, name: "condensação", x: 73.09, y: 19.68 },
  { id: 3, name: "evaporação", x: 74.78, y: 47.48 },
  { id: 4, name: "transpiração", x: 48.54, y: 56.23 },
  { id: 5, name: "infiltração", x: 30.55, y: 87.78 },
];

interface DraggableWordProps {
  word: string;
  isPlaced: boolean;
  onClick?: () => void;
}

function DraggableWord({ word, isPlaced, onClick }: DraggableWordProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "word",
    item: { word },
    canDrag: !isPlaced,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  if (isPlaced) {
    return null;
  }

  return (
    <div
      ref={drag}
      onClick={onClick}
      className={`
        px-6 py-3 bg-gradient-to-br from-blue-400 to-blue-600 
        text-white font-bold rounded-xl shadow-lg cursor-pointer
        transform transition-all hover:scale-105
        ${isDragging ? "opacity-50" : "opacity-100"}
      `}
    >
      {word}
    </div>
  );
}

interface DraggableGapProps {
  gapId: number;
  gapName: string;
  x: number;
  y: number;
}

function DraggableGap({ gapId, gapName, x, y }: DraggableGapProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "gap",
    item: { gapId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [gapId]);

  return (
    <div
      ref={drag}
      className={`
        absolute 
        px-4 py-2 min-w-[150px] 
        rounded-lg border-2 border-dashed
        flex items-center justify-center text-center
        cursor-move
        transition-all
        ${isDragging ? "opacity-50 scale-110" : "opacity-100"}
        bg-white/90 border-blue-500 shadow-lg
      `}
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
    >
      <span className="text-blue-700 font-bold text-sm">{gapName}</span>
    </div>
  );
}

interface ImageDropContainerProps {
  configMode: boolean;
  gapPositions: Array<{ id: number; x: number; y: number }>;
  onGapDrop: (gapId: number, x: number, y: number) => void;
  children: React.ReactNode;
}

function ImageDropContainer({ configMode, onGapDrop, children }: ImageDropContainerProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "gap",
    drop: (item: { gapId: number }, monitor) => {
      const container = document.getElementById('image-container');
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const clientOffset = monitor.getClientOffset();
        
        if (clientOffset) {
          const x = ((clientOffset.x - containerRect.left) / containerRect.width) * 100;
          const y = ((clientOffset.y - containerRect.top) / containerRect.height) * 100;
          
          onGapDrop(item.gapId, Math.max(0, Math.min(100, x)), Math.max(0, Math.min(100, y)));
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [onGapDrop]);

  if (!configMode) {
    return <>{children}</>;
  }

  return (
    <div ref={drop} className={isOver ? "opacity-90" : ""}>
      {children}
    </div>
  );
}

interface DropZoneProps {
  gapId: number;
  gapName: string;
  x: number;
  y: number;
  placedWord: string | null;
  onDrop: (gapId: number, word: string) => void;
  onRemove: (gapId: number) => void;
  isSelected?: boolean;
  onClick?: () => void;
}

function DropZone({ gapId, gapName, x, y, placedWord, onDrop, onRemove, isSelected, onClick }: DropZoneProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "word",
    drop: (item: { word: string }) => {
      onDrop(gapId, item.word);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      onClick={onClick}
      className={`
        absolute 
        px-4 py-2 min-w-[150px] 
        rounded-lg border-2 border-dashed
        flex items-center justify-center text-center
        transition-all cursor-pointer
        ${isOver ? "bg-yellow-200 border-yellow-500" : "bg-white/80 border-blue-400"}
        ${placedWord ? "bg-green-100 border-green-500" : ""}
        ${isSelected ? "ring-4 ring-orange-400 border-orange-500 bg-orange-50" : ""}
      `}
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
    >
      {placedWord ? (
        <div className="flex items-center gap-2">
          <span className="font-bold text-blue-800">{placedWord}</span>
        </div>
      ) : (
        <span className="text-transparent select-none">⠀</span>
      )}
    </div>
  );
}

export function Phase4() {
  const navigate = useNavigate();
  const { addAnswer } = useReport();
  const [placements, setPlacements] = useState<Record<number, string>>({});
  const [configMode, setConfigMode] = useState(SHOW_CONFIG_MODE); // Modo de configuração ativo
  const [gapPositions, setGapPositions] = useState(INITIAL_GAPS);
  const [showReference, setShowReference] = useState(false); // Mostrar imagem de referência
  const [selectedGap, setSelectedGap] = useState<number | null>(null); // Lacuna selecionada para clique

  const handleGapMove = (gapId: number, x: number, y: number) => {
    setGapPositions(prev => 
      prev.map(gap => gap.id === gapId ? { ...gap, x, y } : gap)
    );
  };

  const handleLockPositions = () => {
    console.log("=== COPIE ESTAS COORDENADAS ===");
    console.log("const INITIAL_GAPS = [");
    gapPositions.forEach(gap => {
      console.log(`  { id: ${gap.id}, name: "${gap.name}", x: ${gap.x.toFixed(2)}, y: ${gap.y.toFixed(2)} },`);
    });
    console.log("];");
    console.log("==============================");
    setConfigMode(false);
  };

  const handleUnlockPositions = () => {
    setConfigMode(true);
    setPlacements({}); // Limpar palavras ao desbloquear
  };

  const handleDrop = (gapId: number, word: string) => {
    // Simplesmente coloca a palavra na lacuna
    // Se a lacuna já tinha uma palavra, ela será substituída (voltará ao banco)
    setPlacements(prev => ({ ...prev, [gapId]: word }));
    setSelectedGap(null); // Deselecionar após preencher
  };

  const handleRemove = (gapId: number) => {
    const newPlacements = { ...placements };
    delete newPlacements[gapId];
    setPlacements(newPlacements);
    setSelectedGap(null); // Deselecionar após remover
  };

  const handleGapClick = (gapId: number) => {
    // Se a lacuna já está preenchida, esvazia
    if (placements[gapId]) {
      handleRemove(gapId);
    } else {
      // Se está vazia, seleciona
      setSelectedGap(selectedGap === gapId ? null : gapId);
    }
  };

  const handleWordClick = (word: string) => {
    // Se há uma lacuna selecionada, coloca a palavra nela
    if (selectedGap !== null) {
      handleDrop(selectedGap, word);
    }
  };

  const handleReset = () => {
    setPlacements({});
  };

  const handleFinish = () => {
    gapPositions.forEach((gap) => {
      const placedWord = placements[gap.id] || "(vazio)";
      addAnswer({
        phase: "Fase 4 - Ciclo da Água",
        question: gap.id,
        answer: placedWord,
        correctAnswer: gap.name,
      });
    });
    navigate("/relatorio");
  };

  const placedWords = new Set(Object.values(placements));

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-blue-300 to-indigo-300 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
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
              <span className="font-bold text-lg">Fase 4 - Ciclo da Água</span>
            </div>
            {/* Botão de configuração apenas quando SHOW_CONFIG_MODE está ativo */}
            {SHOW_CONFIG_MODE && (
              <>
                {configMode ? (
                  <Button
                    onClick={handleLockPositions}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Lock className="mr-2" />
                    Travar Posições
                  </Button>
                ) : (
                  <Button
                    onClick={handleUnlockPositions}
                    variant="outline"
                    className="bg-white hover:bg-gray-100"
                  >
                    <Unlock className="mr-2" />
                    Ajustar Lacunas
                  </Button>
                )}
              </>
            )}
            {!SHOW_CONFIG_MODE && <div className="w-32" />} {/* Espaçador para manter layout */}
          </div>

          {/* Instruções */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
            {configMode ? (
              <>
                <h2 className="text-2xl md:text-3xl font-bold text-center text-orange-600 mb-2">
                  MODO CONFIGURAÇÃO: Posicione as Lacunas
                </h2>
                <p className="text-center text-gray-600">
                  Arraste cada lacuna para a posição correta na imagem. Quando terminar, clique em "Travar Posições"
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-2">
                  Complete o ciclo da água
                </h2>
                <p className="text-center text-gray-600 mb-2">
                  <strong>Arraste</strong> as palavras para as lacunas OU <strong>clique na lacuna vazia</strong> (fica laranja) e depois <strong>clique na palavra</strong>
                </p>
                <p className="text-center text-gray-600 text-sm">
                  💡 Clique em uma lacuna já preenchida para esvaziar
                </p>
              </>
            )}
          </div>

          {/* Área principal com a imagem */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
            <ImageDropContainer 
              configMode={configMode} 
              gapPositions={gapPositions}
              onGapDrop={handleGapMove}
            >
              <div id="image-container" className="relative w-full" style={{ paddingBottom: "60%" }}>
                {/* Imagem de fundo */}
                <img
                  src={bgImage}
                  alt="Ciclo da água"
                  className="absolute inset-0 w-full h-full object-contain"
                />
                {/* Imagem com lacunas sobreposta */}
                <img
                  src={lacunasImage}
                  alt="Lacunas"
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                />
                
                {/* Modo configuração: lacunas arrastáveis */}
                {configMode && gapPositions.map((gap) => (
                  <DraggableGap
                    key={gap.id}
                    gapId={gap.id}
                    gapName={gap.name}
                    x={gap.x}
                    y={gap.y}
                  />
                ))}
                
                {/* Modo normal: zonas de drop */}
                {!configMode && gapPositions.map((gap) => (
                  <DropZone
                    key={gap.id}
                    gapId={gap.id}
                    gapName={gap.name}
                    x={gap.x}
                    y={gap.y}
                    placedWord={placements[gap.id] || null}
                    onDrop={handleDrop}
                    onRemove={handleRemove}
                    isSelected={selectedGap === gap.id}
                    onClick={() => handleGapClick(gap.id)}
                  />
                ))}
              </div>
            </ImageDropContainer>
          </div>

          {/* Banco de palavras - apenas no modo normal */}
          {!configMode && (
            <>
              {/* Botão de Referência */}
              <div className="flex justify-center mb-6">
                <Button
                  onClick={() => setShowReference(!showReference)}
                  className="px-8 py-4 text-lg font-bold bg-purple-500 hover:bg-purple-600 text-white rounded-xl shadow-lg"
                >
                  <Eye className="mr-2" />
                  {showReference ? "Esconder Referência" : "Ver Imagem Completa"}
                </Button>
              </div>

              {/* Modal/Overlay com Imagem de Referência */}
              {showReference && (
                <div 
                  className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
                  onClick={() => setShowReference(false)}
                >
                  <div 
                    className="bg-white rounded-3xl shadow-2xl p-6 max-w-5xl w-full relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setShowReference(false)}
                      className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg"
                      title="Fechar"
                    >
                      <X className="w-6 h-6" />
                    </button>
                    <h3 className="text-2xl font-bold text-center text-blue-700 mb-4">
                      Imagem Completa do Ciclo da Água
                    </h3>
                    <div className="relative w-full" style={{ paddingBottom: "60%" }}>
                      <img
                        src={bgImage}
                        alt="Ciclo da água completo"
                        className="absolute inset-0 w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-center text-blue-700 mb-4">
                  Banco de Palavras
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {WORDS.map((word) => (
                    <DraggableWord
                      key={word}
                      word={word}
                      isPlaced={placedWords.has(word)}
                      onClick={() => handleWordClick(word)}
                    />
                  ))}
                </div>
              </div>

              {/* Botões de ação */}
              <div className="flex justify-center gap-4">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="px-8 py-6 text-xl font-bold bg-white hover:bg-gray-100 rounded-xl shadow-lg"
                >
                  <RotateCcw className="mr-2" />
                  Recomeçar
                </Button>
                <Button
                  onClick={handleFinish}
                  className="px-8 py-6 text-xl font-bold bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg"
                >
                  Finalizar Fase 4
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </DndProvider>
  );
}
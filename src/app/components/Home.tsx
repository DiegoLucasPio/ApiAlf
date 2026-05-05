import { Link } from "react-router";
import { Button } from "./ui/button";
import { FileText, BookOpen } from "lucide-react";

const phases = [
  { path: "/fase1", num: 1, title: "Identificação", subtitle: "Nome e Nascimento", gradient: "from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600" },
  { path: "/fase2", num: 2, title: "Vestuário", subtitle: "Peças de Roupa", gradient: "from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600" },
  { path: "/fase3", num: 3, title: "A Bailarina", subtitle: "Poema e Questões", gradient: "from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600" },
  { path: "/fase4", num: 4, title: "Ciclo da Água", subtitle: "Arrastar e Soltar", gradient: "from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600" },
  { path: "/fase5", num: 5, title: "Tirinha", subtitle: "Interpretação", gradient: "from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600" },
  { path: "/fase6", num: 6, title: "Fábula", subtitle: "Reescrita", gradient: "from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600" },
  { path: "/fase7", num: 7, title: "Calendário", subtitle: "Abril 2026", gradient: "from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600" },
  { path: "/fase8", num: 8, title: "Sólidos", subtitle: "Figuras Geométricas", gradient: "from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600" },
  { path: "/fase9", num: 9, title: "Operações", subtitle: "Matemática Básica", gradient: "from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600" },
  { path: "/fase10", num: 10, title: "Docinhos", subtitle: "Números Escondidos", gradient: "from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600" },
  { path: "/fase11", num: 11, title: "Problemas", subtitle: "Situações-Problema", gradient: "from-blue-400 to-sky-500 hover:from-blue-500 hover:to-sky-600" },
  { path: "/fase12", num: 12, title: "Horas", subtitle: "Relógio Digital", gradient: "from-slate-400 to-gray-500 hover:from-slate-500 hover:to-gray-600" },
  { path: "/fase13", num: 13, title: "Brinquedos", subtitle: "Gráfico de Barras", gradient: "from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600" },
  { path: "/fase14", num: 14, title: "Dinheiro", subtitle: "Quantias em Reais", gradient: "from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600" },
  { path: "/fase15", num: 15, title: "Lateralidade", subtitle: "Direita e Esquerda", gradient: "from-lime-400 to-green-500 hover:from-lime-500 hover:to-green-600" },
  { path: "/fase16", num: 16, title: "Probabilidade", subtitle: "Chance com Bolinhas", gradient: "from-red-400 to-orange-500 hover:from-red-500 hover:to-orange-600" },
  { path: "/fase17", num: 17, title: "Frações", subtitle: "Partes da Pizza", gradient: "from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600" },
];

const portuguesePhases = phases.slice(0, 6);
const mathPhases = phases.slice(6);

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-teal-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Avaliação Pedagógica Inicial/Final
          </h1>
          <p className="text-gray-500 text-lg">A.E.E. (PT1) — Escolha uma questão para começar</p>
        </div>

        {/* Língua Portuguesa */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-0.5 flex-1 bg-blue-300 rounded" />
            <h2 className="text-xl font-bold text-blue-700 whitespace-nowrap px-2">LÍNGUA PORTUGUESA</h2>
            <div className="h-0.5 flex-1 bg-blue-300 rounded" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {portuguesePhases.map(phase => (
              <Link to={phase.path} key={phase.path}>
                <div className={`bg-gradient-to-br ${phase.gradient} text-white rounded-2xl shadow-lg transform transition-all hover:scale-105 hover:shadow-xl flex flex-col items-center justify-center gap-1 p-4 h-28 cursor-pointer`}>
                  <span className="text-3xl font-extrabold opacity-90">{phase.num}</span>
                  <span className="text-sm font-bold leading-tight text-center">{phase.title}</span>
                  <span className="text-xs opacity-80 text-center leading-tight">{phase.subtitle}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Matemática */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-0.5 flex-1 bg-teal-300 rounded" />
            <h2 className="text-xl font-bold text-teal-700 whitespace-nowrap px-2">MATEMÁTICA</h2>
            <div className="h-0.5 flex-1 bg-teal-300 rounded" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {mathPhases.map(phase => (
              <Link to={phase.path} key={phase.path}>
                <div className={`bg-gradient-to-br ${phase.gradient} text-white rounded-2xl shadow-lg transform transition-all hover:scale-105 hover:shadow-xl flex flex-col items-center justify-center gap-1 p-4 h-28 cursor-pointer`}>
                  <span className="text-3xl font-extrabold opacity-90">{phase.num}</span>
                  <span className="text-sm font-bold leading-tight text-center">{phase.title}</span>
                  <span className="text-xs opacity-80 text-center leading-tight">{phase.subtitle}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Iniciar sequência */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-lg font-bold text-gray-700">Iniciar avaliação completa em sequência</p>
            <p className="text-gray-500 text-sm">Começa pela Questão 1 e avança automaticamente</p>
          </div>
          <Link to="/fase1">
            <Button className="px-8 py-4 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg whitespace-nowrap">
              Iniciar do Início
            </Button>
          </Link>
        </div>

        {/* Relatório */}
        <div className="flex justify-center">
          <Link to="/relatorio">
            <Button className="px-8 py-4 text-xl font-bold bg-gray-700 hover:bg-gray-800 text-white rounded-2xl shadow-lg flex items-center gap-3">
              <FileText className="w-6 h-6" />
              Ver Relatório Final
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

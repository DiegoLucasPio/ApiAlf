import { Link } from "react-router";
import { Button } from "./ui/button";
import { FileText } from "lucide-react";

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-12">
          <h1 className="text-5xl font-bold text-center mb-4 text-purple-700">
            Avaliação de Alfabetização
          </h1>
          <p className="text-center text-gray-600 mb-12 text-xl">
            Escolha uma fase para começar
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Link to="/fase2">
              <Button 
                className="w-full h-32 text-2xl font-bold bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white rounded-2xl shadow-lg transform transition-all hover:scale-105"
              >
                Fase 2
                <div className="text-sm font-normal mt-2">Peças de Vestuário</div>
              </Button>
            </Link>
            
            <Link to="/fase3">
              <Button 
                className="w-full h-32 text-2xl font-bold bg-gradient-to-br from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white rounded-2xl shadow-lg transform transition-all hover:scale-105"
              >
                Fase 3
                <div className="text-sm font-normal mt-2">A Bailarina</div>
              </Button>
            </Link>
            
            <Link to="/fase4">
              <Button 
                className="w-full h-32 text-2xl font-bold bg-gradient-to-br from-cyan-400 to-indigo-500 hover:from-cyan-500 hover:to-indigo-600 text-white rounded-2xl shadow-lg transform transition-all hover:scale-105"
              >
                Fase 4
                <div className="text-sm font-normal mt-2">Ciclo da Água</div>
              </Button>
            </Link>
            
            <Link to="/fase5">
              <Button 
                className="w-full h-32 text-2xl font-bold bg-gradient-to-br from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white rounded-2xl shadow-lg transform transition-all hover:scale-105"
              >
                Fase 5
                <div className="text-sm font-normal mt-2">Interpretação de Tirinha</div>
              </Button>
            </Link>

            <Link to="/fase7">
              <Button 
                className="w-full h-32 text-2xl font-bold bg-gradient-to-br from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white rounded-2xl shadow-lg transform transition-all hover:scale-105"
              >
                Fase 7
                <div className="text-sm font-normal mt-2">Calendário</div>
              </Button>
            </Link>
          </div>

          {/* Botão Relatório */}
          <div className="flex justify-center mt-8 pt-8 border-t border-gray-200">
            <Link to="/relatorio">
              <Button
                className="px-8 py-4 text-xl font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-2xl shadow-lg flex items-center gap-3"
              >
                <FileText className="w-6 h-6" />
                Ver Relatório Final
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
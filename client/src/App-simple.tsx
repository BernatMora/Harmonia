import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

function SimpleApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Teoria Musical</h1>
          <p className="text-xl text-gray-300">Aplicació carregada correctament!</p>
          <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => console.log('Button clicked!')}
            >
              Test Button 1
            </button>
            <button 
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              onClick={() => alert('Button works!')}
            >
              Test Button 2
            </button>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default SimpleApp;
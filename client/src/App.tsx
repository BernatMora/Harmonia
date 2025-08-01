import { QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { queryClient } from "@/lib/queryClient";
import HomePage from "./pages/HomePage";
import TheoryPage from "./pages/TheoryPage";
import GamePage from "./pages/GamePage";
import { GameProvider } from "./contexts/GameContext";

function App() {
  console.log('App component loaded');
  
  return (
    <QueryClientProvider client={queryClient}>
      <GameProvider>
        <Router base="">
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Switch>
              <Route path="/" component={HomePage} />
              <Route path="/theory" component={TheoryPage} />
              <Route path="/game/:gameMode" component={GamePage} />
              <Route>
                <div className="flex items-center justify-center min-h-screen text-white">
                  <div className="text-center">
                    <h1 className="text-2xl mb-4">Pàgina no trobada</h1>
                    <a href="/" className="text-blue-400 hover:text-blue-300">Tornar a l'inici</a>
                  </div>
                </div>
              </Route>
            </Switch>
          </div>
        </Router>
      </GameProvider>
    </QueryClientProvider>
  );
}

export default App;
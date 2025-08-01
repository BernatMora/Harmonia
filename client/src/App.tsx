import { QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { queryClient } from "@/lib/queryClient";
import HomePage from "./pages/HomePage.js";
import TheoryPage from "./pages/TheoryPage.js";
import GamePage from "./pages/GamePage.js";
import { GameProvider } from "./contexts/GameContext";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GameProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Switch>
              <Route path="/" component={HomePage} />
              <Route path="/theory" component={TheoryPage} />
              <Route path="/game/:gameMode" component={GamePage} />
              <Route>
                <HomePage />
              </Route>
            </Switch>
          </div>
        </Router>
      </GameProvider>
    </QueryClientProvider>
  );
}

export default App;
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SearchProvider } from "./contexts/SearchContext";
import Home from "./pages/Home";
import Architecture from "./pages/Architecture";
import Modules from "./pages/Modules";
import StrategicAnalysis from "./pages/StrategicAnalysis";
import Installation from "./pages/Installation";
import PAEEngine from "./pages/PAEEngine";
import APIDocumentation from "./pages/APIDocumentation";
import Statistics from "./pages/Statistics";
import GettingStarted from "./pages/GettingStarted";
import Navigation from "./components/Navigation";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/architecture"} component={Architecture} />
         <Route path={"/pae"} component={PAEEngine} />
      <Route path={"/analysis"} component={StrategicAnalysis} />
      <Route path={"/installation"} component={Installation} />
      <Route path={"/api"} component={APIDocumentation} />
      <Route path={"/statistics"} component={Statistics} />
      <Route path={"/getting-started"} component={GettingStarted} />
      <Route path={"/404"} component={NotFound} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <SearchProvider>
          <TooltipProvider>
            <Toaster />
            <Navigation />
            <SearchBar />
            <Router />
            <Footer />
          </TooltipProvider>
        </SearchProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

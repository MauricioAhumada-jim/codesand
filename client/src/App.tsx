import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Terms from "@/pages/terms";
import NotFound from "@/pages/not-found";
import { PremiumProvider } from "@/contexts/PremiumContext";
import { PremiumModal } from "@/components/monetization/PremiumModal";
import { InterstitialAd } from "@/components/monetization/InterstitialAd";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/terminos" component={Terms} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PremiumProvider>
        <TooltipProvider>
          <InterstitialAd />
          <PremiumModal />
          <Toaster />
          <Router />
        </TooltipProvider>
      </PremiumProvider>
    </QueryClientProvider>
  );
}

export default App;

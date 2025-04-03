import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import { useEffect, useState } from "react";
import { detectUserLanguage } from "./lib/i18n";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "./components/ThemeProvider";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Detect and set user language on initial load
    const userLang = detectUserLanguage();
    i18n.changeLanguage(userLang).then(() => {
      setIsLoading(false);
    });
  }, [i18n]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <Router />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;

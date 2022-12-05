import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { HideKeyboard } from "./components/HideKeyboard";

import useCachedResources from "./hooks/useCachedResources";
import { ExpensesProvider } from "./hooks/useExpenses";
import Navigation from "./navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ExpensesProvider>
          <Navigation />
        </ExpensesProvider>

        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

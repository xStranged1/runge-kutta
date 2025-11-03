import { Route, Switch } from "wouter"
import { Navbar } from "./components/NavBar";
import { ThemeProvider } from "@/components/theme-provider"
import { Footer } from "./components/Footer";
import IndexScreen from "./screens";
import Presentations from "./screens/Presentation";
import CompareScreen from './screens/CompareScreen';
export default function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="bg-background">
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" />
          <Switch>
            <Route path="/runge-kutta" component={IndexScreen} />
            <Route path="/runge-kutta/compare" component={CompareScreen} />
            <Route path="/runge-kutta/presentacion" component={Presentations} />
            <Route>404: No such page!</Route>
          </Switch>
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
}
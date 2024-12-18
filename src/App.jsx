import "./App.css";
import Games from "./components/Games";
import GameDetails from "./components/GameDetails";
import Favorites from "./components/Favorites";
import NavigationMenu from "./components/NavigationMenu";
import Header from "./components/Header";
import Lists from "./components/Lists";
import ListDetails from "./components/ListDetails";
import Settings from "./components/Settings";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Games />} />
        <Route path="/game/:id" element={<GameDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/lists" element={<Lists />} />
        <Route path="/lists/:listName" element={<ListDetails />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<p>404 Not Found</p>} />
      </Routes>
      <NavigationMenu />
    </>
  );
}

export default App;

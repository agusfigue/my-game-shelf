/* 
QUIERO SABER INCORPORARLO DSP:
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

<a href="https://vite.dev" target="_blank">
  <img src={viteLogo} className="logo" alt="Vite logo" />
</a>
<a href="https://react.dev" target="_blank">
  <img src={reactLogo} className="logo react" alt="React logo" />
</a>
*/

//

import "./App.css";
import Games from "./components/Games";
import GameDetails from "./components/GameDetails";
import Favorites from "./components/Favorites";
import Menu from "./components/Menu";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Lists from "./components/Lists";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Games />} />
        <Route path="/game/:id" element={<GameDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/lists" element={<Lists />} />
        <Route path="*" element={<p>404 Not Found</p>} />
      </Routes>
      <Menu />
    </>
  );
}

export default App;

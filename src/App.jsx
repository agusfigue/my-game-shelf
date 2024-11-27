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
//import { DetalleJuego } from "./components/DetalleJuego";
import Games from "./components/Games";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Games />} />
        {/* <Route path="/juego/:id" element={<DetalleJuego />} /> */}
        <Route path="*" element={<p>404 Not Found</p>} />
      </Routes>
    </>
  );
}

export default App;

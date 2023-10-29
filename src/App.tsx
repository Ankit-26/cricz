import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import CricketBody from "./components/CricketBody";
import Header from "./components/Header";
import PlayerDetails from "./components/PlayerDetails";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
function App() {
  return (
    <>
      {" "}
      <Header />
      <main className="bg-hero-pattern overflow-scroll h-[calc(100vh-64px)] pb-10">
        <Routes>
          <Route path="/" element={<CricketBody />} />
          <Route path="/player-detail/:id" element={<PlayerDetails />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

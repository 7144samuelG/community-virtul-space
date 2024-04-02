import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./pages/welcome";
import HomePage from "./pages/Home";
import MainChartPage from "./pages/Chart";
import { useEffect } from "react";
import { initJuno } from "@junobuild/core";
import { AuthContextProvider } from "./stores/authcontext";
import Communities from "./pages/Communities";
import Events from "./pages/Events";
function App() {
  useEffect(() => {
    (async () =>
      await initJuno({
        satelliteId: "2aqvj-kiaaa-aaaal-ai4ga-cai",
      }))();
  }, []);
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/chart" element={<MainChartPage />}>
            <Route path=":key" element={<MainChartPage />} >
              <Route path=":key" element={<MainChartPage/>}/>
            </Route>
          </Route>
          <Route path="/communities" element={<Communities/>}></Route>
          <Route path="/events" element={<Events/>}></Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;

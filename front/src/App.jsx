import { Route, Routes } from "react-router-dom";
import { Diagrams } from "./components/Diagrams";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { LandingPage } from "./components/LandingPage";
import { Select } from "./components/Select";
import { SelectTable } from "./components/SelectTable";
import { Tables } from "./components/Tables";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/egeoge"
          element={
            <>
              <div className="container__landing">
                <Select />
              </div>
              
            </>
          }
        />
        <Route
          path="/ballsystem"
          element={
            <>
              <div className="container__landing">
                <SelectTable />
              </div>
              <Tables />
            </>
          }
        />
        <Route path="/" element={<LandingPage />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;

import { Route, Routes } from "react-router-dom";
import { Diagrams } from "./components/Diagrams";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { LandingPage } from "./components/LandingPage";
import { Select } from "./components/Select";

const App = () => {
  return (
    <>
      <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="container__landing">
                  <Select />
                </div>
                <Diagrams />
              </>
            }
          />
          <Route path="/landingpage" element={<LandingPage />} />
        </Routes>


      <Footer />
    </>
  );
};

export default App;

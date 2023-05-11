import "./App.css";
import HeaderComponent from "./components/header/Header";
import SearchBar from "./components/searchbar/Search";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";
import Loader from "./loaders";
import { useEffect, useState } from "react";

function App() {
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="App">
      {loading ? (
        <Loader> </Loader>
      ) : (
        <div>
          <HeaderComponent></HeaderComponent>
          <SearchBar></SearchBar>
          <Main></Main>
          <Footer></Footer>
        </div>
      )}
    </div>
  );
}

export default App;

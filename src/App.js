import logo from './logo.svg';
import './App.css';
import HeaderComponent from './components/header/Header';
import SearchBar from './components/searchbar/Search';
import Main from './components/main/Main';
import Footer from './components/footer/Footer';

function App() {
  
  return (
    <div className="App">
     <HeaderComponent></HeaderComponent>
     <SearchBar ></SearchBar>
     <Main></Main>
     <Footer></Footer>
    </div>
  );
}

export default App;

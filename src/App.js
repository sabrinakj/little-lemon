import Header from "./components/Header"; // Import the Header component
import Main from "./components/Main";
import Footer from "./components/Footer";
import "./App.css";
import { BrowserRouter as Router} from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Main />
      <Footer />
    </Router>
  );
}

export default App;

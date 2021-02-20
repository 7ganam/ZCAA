import { LoginContextProvider, LoginContext } from "./contexts/loginContext"
import { useContext } from "react";
import './App.css';
import MainComponent from "./mainComponent"
function App() {
  return (
    <div className="App">
      <LoginContextProvider>
        <MainComponent />
      </LoginContextProvider>

    </div>
  );
}

export default App;

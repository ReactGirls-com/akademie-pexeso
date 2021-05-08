import "./App.css";
import Board from "./components/Board";

function App() {
  return (
    <div className="App">
      <Board title="Hra číslo 1" cardCount={2} />
    </div>
  );
}

export default App;

import React, { useState } from "react";
import "./App.css";
import Board from "./components/Board";

function App() {
  const [cardCount, setCardCount] = useState(3 * 3);
  return (
    <div className="App">
      <Board
        key={cardCount}
        title={`Počet karet: ${cardCount}`}
        cardCount={cardCount}
        onFinished={() => {
          setCardCount(cardCount + 1);
        }}
      />
    </div>
  );
}

export default App;

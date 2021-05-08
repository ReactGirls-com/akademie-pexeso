import React, { useState, useEffect } from "react";
import "./styles.css";
import Card from "../Card";

function useDogs(count) {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random/" + count)
      .then((response) => response.json())
      .then((json) => {
        setDogs(json.message);
      });
  }, [count]);

  return dogs;
}

export default function Board(props) {
  const images = useDogs(props.cardCount);
  const cards = [...images, ...images];
  const [openCards, setOpenCards] = useState([]);

  return (
    <React.Fragment>
      <h1>{props.title}</h1>
      <div className="board">
        {cards.map((url, index) => {
          return (
            <Card
              imageUrl={url}
              flipped={openCards.includes(index)}
              onClick={() => {
                setOpenCards([...openCards, index]);
              }}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
}

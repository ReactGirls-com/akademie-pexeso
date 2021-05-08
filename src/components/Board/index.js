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
  const [foundCards, setFoundCards] = useState([]);

  useEffect(() => {
    const foundCouple = openCards.map((index) => cards[index]);
    if (foundCouple.length === 2) {
      if (foundCouple[0] === foundCouple[1]) {
        // we got a match!
        setOpenCards([]);
        setFoundCards([...foundCards, ...openCards]);
      } else {
        // no match!
        setTimeout(() => {
          setOpenCards([]);
        }, 3000);
      }
    }
  });

  return (
    <React.Fragment>
      <h1>{props.title}</h1>
      <div className="board">
        {cards.map((url, index) => {
          return (
            <Card
              imageUrl={url}
              flipped={openCards.includes(index) || foundCards.includes(index)}
              onClick={() => {
                if (openCards.length < 2) {
                  setOpenCards([...openCards, index]);
                }
              }}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
}

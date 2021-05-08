import React, { useState, useEffect, useMemo } from "react";
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

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default function Board(props) {
  const images = useDogs(props.cardCount);
  const cards = useMemo(() => shuffle([...images, ...images]), [images]);
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

    const gameIsFinished =
      foundCards.length === cards.length && cards.length !== 0;
    if (gameIsFinished) {
      setTimeout(() => {
        props.onFinished();
      }, 3000);
    }
  });

  const oneDim = Math.ceil(Math.sqrt(props.cardCount));

  return (
    <React.Fragment>
      <h1>{props.title}</h1>
      <div
        className="board"
        style={{
          gridTemplate: `repeat(${oneDim}, 1fr) / repeat(${oneDim}, 1fr)`,
        }}
      >
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

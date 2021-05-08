import React from "react";
import "./styles.css";

export default function Card(props) {
  return (
    <div
      className={props.flipped ? "flip-card flipped" : "flip-card"}
      onClick={props.onClick}
    >
      <div className="flip-card-inner">
        <div
          className="flip-card-front"
          style={{
            backgroundImage: `url(${props.imageUrl})`,
          }}
        ></div>
        <div className="flip-card-back"></div>
      </div>
    </div>
  );
}

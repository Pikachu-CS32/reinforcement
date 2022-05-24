import React from "react";


const Cards = (props) => {
  const cardsList = []
  for (let i = 0; i < props.cards.length; i++){
    cardsList.push(
      <li>
        <a href="#">
        <h2>Title</h2>
        <p>{props.cards[i].body}</p>
       </a>
    </li>
    )
  }
  return (
    <div>
      <ul style={{listStyleType: "none"}} >{cardsList}</ul>
    </div>
  )
}

export default Cards;
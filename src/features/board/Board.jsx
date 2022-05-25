
import React, { useState, useEffect } from 'react';
import Cards from '../Card';

const initialState = {
  userId: '1',
  boardId: '1',
  boardName: '',
  board: {
    pending: [],
    inProgress: [],
    completed: [],
  },
  cards: {
    cardId: 0,
    cardBody: '',
  },
};


function Board() {
  const [pending, setPending] = useState(initialState.board.pending);
  const [inProgress, setInProgress] = useState(initialState.board.inProgress);
  const [completed, setCompleted] = useState(initialState.board.completed);

  // resetBoard = (e) => {
  //   //logic to reset the cards
  //   setPending(board.pending)
  //   setInProgress('')
  //   setCompleted('')
  //   //logic to create new state with cards all in pending
  //   //update back end card statuses
  //   //create new state object, pass to dispatch
  //   dispatch(resetBoard, )
  // }

  useEffect(() => {
    const getCards = async () => {
      try {
        let cards = await fetch('/api/1');
        cards = await cards.json();
        const pendingArr = [];
        const inProgressArr = [];
        const completedArr = [];
        cards.forEach((card) => {
          console.log(card);
          if (card.status === 0) {
            pendingArr.push(card);
          } else if (card.status === 1) {
            inProgressArr.push(card);
          } else if (card.status === 2) {
            completedArr.push(card);
          }
          setPending(pendingArr);
          setInProgress(inProgressArr);
          setCompleted(completedArr);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getCards();
  }, []);

  const addCard = async () => {
    try {
      const body = {};
      body.board = board.boardId;
      body.user = board.userId;
      body.body = '';
      let card = await fetch('/', {method: 'POST', body: body});
    }
    catch (err) {
      console.log(err);
    }
    const body = {};
    body.boardId = board.boardId;
    body.userId = board.userId;
    body.text = '';
    const card = await fetch('/api', { method: 'POST', body });
  };

  return (

    <div>
      <div className="board" id="board" style={{ display: 'grid' }}>
        <div className="column" id="pending">
          <h3>Pending</h3>
          <Cards cards={pending} />
          <ul>
            <li onDoubleClick={() => addCard()}>
              <a href="#">
                <p>New</p>
                <p>add text here</p>
              </a>
            </li>
          </ul>
        </div>
        <div className="column" id="inProgress">
          <h3>In Progress</h3>
          <Cards cards={inProgress} />
        </div>
        <div className="column" id="completed">
          <h3>Completed</h3>
          <Cards cards={completed} />
        </div>
      </div>
      <div>
        <button onClick={() => resetBoard()}>Reset Board</button>
      </div>
    </div>
  );
}

export default Board;

import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { renameBoard, resetBoard, moveCardTo, moveCardFrom, addCard, modifyCard, deleteCard, initialState } from './boardSlice'
import Cards from '../Card';

function Board () {
   
  const [ pending, setPending ] = useState(initialState.board.pending)
  const [ inProgress, setInProgress ] = useState(initialState.board.inProgress)
  const [ completed, setCompleted ] = useState(initialState.board.completed)
  const board = useSelector((state) => state);
  const dispatch = useDispatch();

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
  
  const getCards = async () => {
    try {
      let cards = await fetch('getCards');
      cards = cards.json();
      const pending = [];
      const inProgress = [];
      const completed = [];
      cards.forEach(card => {
        if (card.status === 'pending') {
          pending.push(card)
          dispatch(moveCardTo('pending', card));
        }
        else if (card.status == 'inProgress') {
          inProgress.push(card)
          dispatch(moveCardTo('inProgress', card));
        }
        else if (card.status = 'completed') {
          completed.push(card)
          dispatch(moveCard('completed', card));
        }
      })
    }
    catch (err) {

    }
  }

  const addCard = async () => {
    const body = {};
    body.boardId = board.boardId;
    body.userId = board.userId;
    body.text = '';
    let card = await fetch('addCard', {method: 'POST', body: body});

  }

  return (
    <div>
      <div className='board' id='board' style={{display: "grid"}}>
        <div className='column' id='pending'>
          <h3>Pending</h3>
          <Cards cards={pending} />
          <ul>
           <li onDoubleClick={() => addCard()}>
            <a href="#">
              <p >New</p>
              <p>add text here</p>
              </a>
           </li>
          </ul>
        </div>
        <div className='column' id='inProgress'>
          <h3>In Progress</h3>
          <Cards cards={inProgress}/>
        </div>
        <div className='column' id='completed'>
          <h3>Completed</h3>
          <Cards cards={completed} />
        </div>
      </div>
      <div>
        <button onClick={() => resetBoard()} >Reset Board</button>
      </div>
    </div>
  )
}


export default Board;
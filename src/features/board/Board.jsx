import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { renameBoard, resetBoard, moveCardTo, moveCardFrom, addCard, modifyCard, deleteCard, initialState } from './boardSlice'
//import Cards from '../Card';
import Cards from '../dnd/container'

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
      let cards = await fetch('/');
      cards = cards.json();
      const pending = [];
      const inProgress = [];
      const completed = [];
      cards.forEach(card => {
        if (card.status === '0') {
          pending.push(card)
          dispatch(moveCardTo('pending', card));
        }
        else if (card.status == '1') {
          inProgress.push(card)
          dispatch(moveCardTo('inProgress', card));
        }
        else if (card.status = '2') {
          completed.push(card)
          dispatch(moveCard('completed', card));
        }
      })
    }
    catch (err) {

    }
  }

  const addCard = async () => {
    try {
      const body = {};
      body.board = board.boardId;
      body.user = board.userId;
      body.body = '';
      let card = await fetch('/', {method: 'POST', body: body});
      dispatch(moveCardTo('pending', card));
    }
    catch (err) {

    }
    
  }

  const modifyCard = async () => {
    try {
      const body = {}
      body.board = board.boardId;
      body.user = board.userId;
      body.body = cards.cardBody;
    }
    catch {

    }
  }
  return (
    <Cards />
  )

  // return (
  //   <div>
  //     <div className='board' id='board' style={{display: "grid"}}>
  //       <div className='column' id='pending'>
  //         <h3>Pending</h3>
  //         <Cards cards={pending} />
  //         <ul>
  //         <li >
  //           <a href="#">
  //             <p >Existing</p>
  //             <p>whatever</p>
  //             </a>
  //          </li>
  //          <li onDoubleClick={() => addCard()}>
  //           <a href="#">
  //             <p >New</p>
  //             <p>add text here</p>
  //             </a>
  //          </li>
  //         </ul>
  //       </div>
  //       <div className='column' id='inProgress'>
  //         <h3>In Progress</h3>
  //         <Cards cards={inProgress}/>
  //       </div>
  //       <div className='column' id='completed'>
  //         <h3>Completed</h3>
  //         <Cards cards={completed} />
  //       </div>
  //     </div>
  //     <div>
  //       <button onClick={() => resetBoard()} >Reset Board</button>
  //     </div>
  //   </div>
  // )
}


export default Board;
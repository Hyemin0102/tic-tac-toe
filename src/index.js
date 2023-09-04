import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

//버튼 컴포넌트 렌더링
function Square (props) {

    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}
/* onClick 함수 전달 시 콜백함수로 필수 사용 
        setState 호출하면 리액트는 자동으로 컴포넌트 내부의 자식 컴포넌트 역시 업데이트.
        버튼 클릭할 때 setState 호출해 Square가 다시 렌더링해야한다고 알려줌
  */

//9개의 사각형, Square의 부모 컴포넌트
//각 Square에 state를 요청하는 것이 아니라 부모 컴포넌트에 상태 저장하고 자식 컴포넌트로 다시 전달함(리팩토링 위해)
//자식 컴포넌트의 state를 부모 컴포넌트로 끌어올리는 방식 흔히 사용함
function Board () {
  const [squares, setSquares] = useState(Array(9).fill(null)); //초기값: null값인 9개 아이템담긴 배열 
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    if(calculateWinner(squares) || squares[i]){
      return; //winner가 있거나 square가 채워진 경우
    }
    squares[i] = xIsNext ? 'X' : 'O';

    setSquares(squares);
    setXIsNext(!xIsNext)
  }

  function renderSquare(i) {
    //Square에 X,O,null 값 prop으로 보냄
    return (
    <Square value={squares[i]} onClick={()=>handleClick(i)}
    />
    )
  }


    //const status = 'Next player: ' + (this.state.xIsNext ? 'X' :'O');
    const Winner = calculateWinner(squares);
    let status;
    if(Winner){
      status = "Winner: " + Winner;
    }else{
      status = 'Next player: ' + (xIsNext ? 'X' :'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    );
}

//게임판 렌더링
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}



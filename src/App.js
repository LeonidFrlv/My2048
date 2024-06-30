import styles from './App.module.css';
import GameField from "./components/GameField/GameField";
import {useEffect, useState} from "react";
import {countRows, gameOver, randomSpawn} from "./scripts";

const emptyCells = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]

const keyboardUp = { "w": true, "W": true, "ArrowUp": true };
const keyboardRight = { "d": true, "D": true, "ArrowRight": true };
const keyboardDown = { "s": true, "S": true, "ArrowDown": true };
const keyboardLeft = { "a": true, "A": true, "ArrowLeft": true };

const Header = () => ( //тут цвет текста просто чёрный - поменяй
  <header className={styles.appHeader}>
    <h1>Simple 2048</h1>
    <h3>by s1queence</h3>
  </header>
)

const Button = ({setCells, setGame}) => {
  const onClick = () => { //вот этот онклик будет переиспользоваться потом
    setCells(emptyCells);
    setGame(true);
    randomSpawn(setCells);
    randomSpawn(setCells);
  }

  return (
    <button onClick={onClick}>
      <h1>НОВАЯ ИГРА</h1>
    </button>
  )
}

function App() {
  const [cells, setCells] = useState(emptyCells);
  const [game, setGame] = useState(false);

  const getDirection = (key) => {
    if (keyboardUp[key]) return "up";
    if (keyboardRight[key]) return "right";
    if (keyboardDown[key]) return "down";
    if (keyboardLeft[key]) return "left";
  }

  useEffect(() => {
    document.onkeyup = (e) => {
      if (!game) return;
      countRows(getDirection(e.key), setCells, cells);
      setGame(gameOver(cells)); // вызывается когда игра ещё не проиграна. Должно вызываться когда игра не изменяется вообще, то есть иметь, таймаут?
    }
  });

  return (
    <div className={styles.appContainer}>
      <Header />
      <GameField cells={cells}/>
      {!game && <Button setCells={setCells} setGame={setGame} />}
    </div>
  );
}

export default App;
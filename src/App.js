import styles from './App.module.css';
import GameField from "./components/GameField/GameField";
import {useEffect, useState} from "react";
import {countRows, gameOver, copyArr} from "./scripts";
import {emptyCells, keyboardDown, keyboardLeft, keyboardRight, keyboardUp} from "./constants";
import StartButton from "./components/StartButton/StartButton";

const Header = () => (
  <header className={styles.appHeader}>
    <h1>Simple 2048</h1>
    <h3>by s1queence</h3>
  </header>
)

function App() {
  const [cells, setCells] = useState(copyArr(emptyCells));
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
      setGame(gameOver(cells)); // вызывается когда игра ещё не проиграна, потому что сюда передаются старые cells. Должно вызываться когда игра не изменяется вообще, то есть иметь, таймаут?
    }
  });

  return (
    <div className={styles.appContainer}>
      <Header />
      <GameField cells={cells}/>
      <StartButton game={game} setGame={setGame} setCells={setCells} />
    </div>
  );
}

export default App;
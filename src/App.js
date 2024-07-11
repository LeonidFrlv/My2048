import styles from './App.module.css';
import GameField from "./components/GameField/GameField";
import {useEffect, useState} from "react";
import {countRows, isGameOver, copyArr, isGameWin} from "./scripts";
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
  const [win, setWin] = useState(false);

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
    }
  });

  useEffect(() => {
    if (!game) return;
    if (isGameWin(cells)) {
      setWin(true);
      setGame(false);
      return;
    }

    if (isGameOver(cells)) setGame(false);


  }, [game, cells])

  return (
    <div className={styles.appContainer}>
      <Header />
      <GameField cells={cells}/>
      {win && <h1>Вы победили!</h1>}
      <StartButton game={game} setGame={setGame} setCells={setCells} setWin={setWin} />
    </div>
  );
}

export default App;
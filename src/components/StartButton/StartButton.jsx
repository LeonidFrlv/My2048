import {copyArr, randomSpawn} from "../../scripts";
import {emptyCells} from "../../constants";
import styles from "./StartButton.module.css";

const StartButton = ({game, setGame, setCells, setWin, setSpawnIndex}) => {
	const startNewGame = () => {
		setCells(copyArr(emptyCells));
		setGame(true);
		randomSpawn(setCells, setSpawnIndex);
		randomSpawn(setCells, setSpawnIndex);
		setWin(false)
	}

	 return (
    	<button className={styles.btn} onClick={startNewGame}>{game ? "⟳" : "Новая игра"} </button>
	 )
};

export default StartButton;
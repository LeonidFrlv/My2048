import {copyArr, randomSpawn} from "../../scripts";
import {emptyCells} from "../../constants";
import styles from "./StartButton.module.css";

const StartButton = ({game, setGame, setCells}) => {
	const startNewGame = () => {
		setCells(copyArr(emptyCells));
		setGame(true);
		randomSpawn(setCells);
		randomSpawn(setCells);
	}

	 return (
    	<button className={styles.btn} onClick={startNewGame}>{game ? "⟳" : "Новая игра"} </button>
	 )
};

export default StartButton;
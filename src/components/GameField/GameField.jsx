import styles from "./GameField.module.css";
import GameCell from "../GameCell/GameCell";

const GameField = ({cells}) => {
 return (
  <div className={styles.gameField}>
		{cells.map((row, index) => (
			row.map((value, cellIndex) => (
				<GameCell key={index + cellIndex} value={value} />
			))
		))}
  </div>
 );
};

export default GameField;
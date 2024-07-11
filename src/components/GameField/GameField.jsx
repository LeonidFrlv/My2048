import styles from "./GameField.module.css";
import GameCell from "../GameCell/GameCell";

const GameField = ({ cells, spawnIndex }) => {
 return (
  <div className={styles.gameField}>
		{cells.map((row, y) => (
			row.map((value, x) => {
				return spawnIndex.y === y && spawnIndex.x === x ? <GameCell key={y + "_" + x} value={value} isJustSpawned={true} /> : <GameCell key={y + "_" + x} value={value} />
			})
		))}
  </div>
 );
};

export default GameField;
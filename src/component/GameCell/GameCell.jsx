import styles from './GameCell.module.css';
import cx from 'classnames';


const GameCell = ({value}) => (
	  <div className={
				cx(
					styles.gameCell,
					value === 0 ? styles.emptyColor :
					value === 2 ? styles.color2 :
					value === 4 ? styles.color4 :
					value === 8 ? styles.color8 :
					value === 16 ? styles.color16 :
					value === 32 ? styles.color32 :
					value === 64 ? styles.color64 :
					styles.bigIntColor
				)}
		>
			{value}
    </div>
)

export default GameCell;
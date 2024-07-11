import {WIN_NUM, MAX_ROW_LENGTH} from "../constants";

const countY = (dir, arr) => {
	let columns = [[], [], [], []];

	arr.forEach(row => {
		row.forEach((item, x) => {
			columns[x].push(item);
		})
	})

	columns = countX(dir === "up" ? "left" : "right", columns);

	const buffer = [[], [], [], []]; //какие два цикла, придумай чёт с этим

	columns.forEach(row => {
		row.forEach((item, x) => {
			buffer[x].push(item);
		})
	})

	return buffer;
}

const countX = (dir, arr) => {
	const isRight = dir === "right";

	return arr.map(row => {
		row = row.filter(item => item !== 0);

		let [start, end, step] = isRight ? [row.length - 1, -1, -1] : [0, row.length, 1];

		for (let i = start; isRight ? i > end : i < end; i += step) {
			if (row[i] !== row[i + 1]) continue;
			row[i + 1] = row[i] + row[i + 1];
			row.splice(i, 1);
			end = row.length;
		}

		const emptyCellsAmount = MAX_ROW_LENGTH - row.length;

		row.splice(isRight ? 0 : row.length, 0, ...Array(emptyCellsAmount).fill(0));

		return row;
	})
}

const getRandomIndex = (cells) => {
	const emptyIndexes = [];

	cells.forEach((row, y) => {
		row.forEach((cell, x) => {
			if (cells[y][x] === 0) emptyIndexes.push({ y: y, x: x });
		})
	})

	return emptyIndexes.length && emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
}

const randomSpawn = (setCells, setSpawnIndex) => {
	const value = Math.random() > 0.7 ? 4 : 2;

	setCells(prevCells => {
		const randomItemIndex = getRandomIndex(prevCells);
		if (!randomItemIndex) return prevCells;

		setSpawnIndex(randomItemIndex);

		const newCells = [...prevCells];
		newCells[randomItemIndex.y][randomItemIndex.x] = value;
		return newCells;
	});
}

const isGameWin = (cells) => {
	for (let i = 0; i < cells.length; i++) {
		if (cells[i].includes(WIN_NUM)) return true;
	}

	return false;
}

const isGameOver = (cells) => { // не очень оптимизировано, но работает, хы
	let cellsCopy = copyArr(cells);

	cellsCopy = countY("up", cellsCopy);
	if (isCellsChanged(cells, cellsCopy)) return false;
	cellsCopy = countY("down", cellsCopy);
	if (isCellsChanged(cells, cellsCopy)) return false;
	cellsCopy = countX("right", cellsCopy);
	if (isCellsChanged(cells, cellsCopy)) return false;
	cellsCopy = countX("left", cellsCopy);

	return !isCellsChanged(cells, cellsCopy);
}

const isCellsChanged = (oldCells, cells) => {
	return JSON.stringify(oldCells) !== JSON.stringify(cells);
}

const copyArr = (arr) => {
	return JSON.parse(JSON.stringify(arr));
}

const countRows = (dir, setCells, cells, setSpawnIndex) => {
	const oldCells = copyArr(cells);

	setCells(prevCells => {
		if (dir === "up" || dir === "down") prevCells = countY(dir, [...prevCells]);
		if (dir === "right" || dir === "left") prevCells = countX(dir, [...prevCells]);

		if (isCellsChanged(oldCells, prevCells)) randomSpawn(setCells, setSpawnIndex);

		return prevCells;
	});
}

export {countRows, randomSpawn, isGameOver, copyArr, isGameWin};
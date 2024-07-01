const MAX_ROW_LENGTH = 4;

const countY = (dir, arr) => {
	let columns = [[], [], [], []];

	arr.forEach(row => {
		row.forEach((item, x) => {
			columns[x].push(item);
		})
	})

	columns = columns.map((row) => countX(dir === "up" ? "left" : "right", row));

	const buffer = [[], [], [], []]; //какие нафик два цикла, придумай чёт с этим

	columns.forEach(row => {
		row.forEach((item, x) => {
			buffer[x].push(item);
		})
	})

	return buffer;
}

const countX = (dir, row) => { // сюда должен не row передаваться, а arr и дальше с ним мутить всё, чтобы кода выше и ниже было меньше (лишние .map).
	row = row.filter(item => item !== 0);

	const isRight = dir === "right";

	let [start, end, step] = isRight ? [row.length - 1, -1, -1] : [0, row.length, 1]; // надо это переделать потому что непонятно что на экране вообще

	for (let i = start; isRight ? i > end : i < end; i += step) {
		if (row[i] !== row[i + 1]) continue;
		row[i + 1] = row[i] + row[i + 1];
		row.splice(i, 1);
		end = row.length;
	}

	const emptyCellsAmount = MAX_ROW_LENGTH - row.length;

	row.splice(isRight ? 0 : row.length, 0, ...Array(emptyCellsAmount).fill(0));

	return row;
}

const getRandomIndex = (cells) => {
	const emptyIndexes = [];
	if (!cells) return false;

	cells.forEach((row, y) => {
		row.forEach((cell, x) => {
			if (cells[y][x] === 0) emptyIndexes.push({ y: y, x: x });
		})
	})

	return emptyIndexes.length && emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
}

const randomSpawn = (setCells) => {
	const value = Math.random() > 0.7 ? 4 : 2;

	setCells(prevCells => {
		const randomItemIndex = getRandomIndex(prevCells);
		if (!randomItemIndex) return;

		const newCells = [...prevCells];
		newCells[randomItemIndex.y][randomItemIndex.x] = value;
		return newCells;
	});
}

const gameOver = (cells) => {
	return getRandomIndex(cells);
}

const isCellsChanged = (oldCells, cells) => {
	return JSON.stringify(oldCells) !== JSON.stringify(cells);
}

const copyArr = (arr) => {
	return JSON.parse(JSON.stringify(arr));
}

const countRows = (dir, setCells, cells) => {
	const oldCells = copyArr(cells);

	setCells(prevCells => {
		if (dir === "up" || dir === "down") prevCells = countY(dir, [...prevCells]);
		if (dir === "right" || dir === "left") prevCells = prevCells.map((row) => countX(dir, row));

		if (isCellsChanged(oldCells, prevCells)) randomSpawn(setCells);

		return prevCells;
	});
}

export {countRows, randomSpawn, gameOver, copyArr};
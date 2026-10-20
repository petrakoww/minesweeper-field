const columnsCount = process.argv[2] // x
const rowsCount = process.argv[3] // y
// const cellsCount = columnsCount * rowsCount
const minesCount = process.argv[4] // z

if (isNaN(columnsCount) || isNaN(rowsCount) || isNaN(minesCount)) {
	throw new Error('Columns, rows and mines count should be numbers')
} else if (!columnsCount || !rowsCount || !minesCount) {
	throw new Error('Columns, rows and mines count should be greater than 0')
} else if (columnsCount * rowsCount <= minesCount) {
	throw new Error('Mines count should be less than total cells count')
}

const mineGenerator = (rowsCount, columnsCount, minesCount) => {
	const mineIndexesSet = new Set()

	while (mineIndexesSet.size < minesCount) {
		//start from one
		const mineIndex = Math.floor(Math.random() * (columnsCount * rowsCount)) + 1
		const rowIndex = Math.ceil(mineIndex / columnsCount)
		const columnIndex = mineIndex - ((rowIndex - 1) * columnsCount)
		// console.log('mineIndex', mineIndex, 'rowIndex', rowIndex, 'columnIndex', columnIndex)
		mineIndexesSet.add(`${rowIndex}-${columnIndex}`)
	}
	// console.log('mineIndexesSet', mineIndexesSet)
	return mineIndexesSet
}
const minesConfig= mineGenerator(rowsCount, columnsCount, minesCount)

const checkForMinesAroundWithSet = (rowIndex, columnIndex) => {
	let totalMinesAround = 0

	//top left
	minesConfig.has(`${rowIndex-1}-${columnIndex-1}`)&& totalMinesAround++
	//top
	minesConfig.has(`${rowIndex-1}-${columnIndex}`)&& totalMinesAround++
	//top right
	minesConfig.has(`${rowIndex-1}-${columnIndex+1}`)&& totalMinesAround++

	//left
	minesConfig.has(`${rowIndex}-${columnIndex-1}`)&& totalMinesAround++
	// right
	minesConfig.has(`${rowIndex}-${columnIndex+1}`)&& totalMinesAround++

	// bottom left
	minesConfig.has(`${rowIndex+1}-${columnIndex-1}`)&& totalMinesAround++
	// bottom
	minesConfig.has(`${rowIndex+1}-${columnIndex}`)&& totalMinesAround++
	// bottom right
	minesConfig.has(`${rowIndex+1}-${columnIndex+1}`)&& totalMinesAround++

	// console.log('rowIndex', rowIndex, 'columnIndex', columnIndex)
	// if (false && rowIndex === 1 && columnIndex === 2) {
	// 	const key = ((rowIndex-1)*columnsCount)+columnIndex
	//
	// 	console.log('config', rowIndex, columnIndex-1, minesConfigSet)
	// 	console.log('totalMinesAround', totalMinesAround)
	// 	console.log('top left', minesConfigSet.has(`${rowIndex-1}-${columnIndex-1}`), rowIndex-1, columnIndex-1)
	// 	console.log('top', minesConfigSet.has(`${rowIndex-1}-${columnIndex}`), rowIndex-1, columnIndex)
	// 	console.log('top right', minesConfigSet.has(`${rowIndex-1}-${columnIndex+1}`), rowIndex-1, columnIndex+1)
	// 	console.log('left', minesConfigSet.has(`${rowIndex}-${columnIndex-1}`), rowIndex, columnIndex-1)
	// 	console.log('right', minesConfigSet.has(`${rowIndex}-${columnIndex+1}`), rowIndex, columnIndex+1)
	// 	console.log('bottom left', minesConfigSet.has(`${rowIndex+1}-${columnIndex-1}`),`${rowIndex+1}-${(rowIndex*columnIndex)+columnIndex}`)
	// 	console.log('bottom', minesConfigSet.has(`${rowIndex+1}-${columnIndex}`), `${rowIndex+1}-${columnIndex}`)
	// 	console.log('bottom right', minesConfigSet.has(`${rowIndex+1}-${columnIndex+1}`), `${rowIndex+1}-${columnIndex+1}`)
	// }

	return totalMinesAround
}

// one level object 1-1, 1-2...
const generateFieldConfig = (rowsCount, columnsCount) => {
	const gameFieldConfig = {}
	for (let rowIndex = 1; rowIndex <= rowsCount; rowIndex++) {
		for (let columnIndex = 1; columnIndex <= columnsCount; columnIndex++) {
			const isMine = minesConfig.has(`${rowIndex}-${columnIndex}`)
			const numberOfMinesAround = checkForMinesAroundWithSet(rowIndex, columnIndex)
			const value = isMine ? '#' : numberOfMinesAround || '_'

			gameFieldConfig[`${rowIndex}-${columnIndex}`] = {
				isMine,
				numberOfMinesAround,
				value
			}
		}
	}
	return gameFieldConfig
}

// generate and visualize can be in the same function; separated for clarity
const visualizeGameField = (rowsCount, columnsCount)=>{
	const gameFieldConfig = generateFieldConfig(rowsCount, columnsCount)
	let row = ''

	Object.entries(gameFieldConfig).forEach(([key, cellConfig])=>{
		const [_, columnIndex] = key.split('-')

		row += `| ${cellConfig.value} `;

		if (!(+columnIndex % columnsCount)) {
			row += '|';
			console.log(row);
			row = '';
		}

		// in case console.log in not mandatory
		// process.stdout.write(`| ${cellConfig.value} `)
		//
		// if (!(+columnIndex % columnsCount)) {
		// 	process.stdout.write('|')
		// 	process.stdout.write('\n')
		// }
	})
}

// print
visualizeGameField(rowsCount, columnsCount)

// playground

// const obj = {
// 	1:{1:{}, 2:{}, 3:{}},
// 	2:{4:{}, 5:{}, 6:{}},
// 	3:{7:{}, 8:{}, 9:{}}
// }
//
// // minesConfigSet.add('2-5')
// const minesConfig= {}//mineGenerator(rowsCount, columnsCount, minesCount)
//
// const checkForMinesAroundWithObject = (rowIndex, columnIndex) => {
// 	let totalMinesAround = 0
//
// 	//top left
// 	minesConfig[rowIndex-1]?.[columnIndex-1]&& totalMinesAround++
// 	//top
// 	minesConfig[rowIndex-1]?.[columnIndex]&& totalMinesAround++
// 	//top right
// 	minesConfig[rowIndex-1]?.[columnIndex+1]&& totalMinesAround++
//
// 	//left
// 	minesConfig[rowIndex]?.[columnIndex-1]&& totalMinesAround++
// 	// right
// 	minesConfig[rowIndex]?.[columnIndex+1]&& totalMinesAround++
//
// 	// bottom left
// 	minesConfig[rowIndex+1]?.[columnIndex-1]&& totalMinesAround++
// 	// bottom
// 	minesConfig[rowIndex+1]?.[columnIndex]&& totalMinesAround++
// 	// bottom right
// 	minesConfig[rowIndex+1]?.[columnIndex+1]&& totalMinesAround++
//
// 	if (rowIndex === 1 && columnIndex === 2) {
// 		console.log('asdasd', rowIndex, columnIndex-1, minesConfig)
// 		console.log('totalMinesAround', totalMinesAround)
// 		console.log('top left', minesConfig[rowIndex-1]?.[columnIndex-1])
// 		console.log('top', minesConfig[rowIndex-1]?.[columnIndex])
// 		console.log('top right', minesConfig[rowIndex-1]?.[columnIndex+1])
// 		console.log('left', minesConfig[rowIndex]?.[columnIndex-1])
// 		console.log('right', minesConfig[rowIndex]?.[columnIndex+1], rowIndex, columnIndex+1)
// 		console.log('bottom left', minesConfig[rowIndex+1]?.[columnIndex-1])
// 		console.log('bottom', minesConfig[rowIndex+1]?.[columnIndex])
// 		console.log('bottom right', minesConfig[rowIndex+1]?.[columnIndex+1])
// 	}
// 	return totalMinesAround
// }
// const obj2 = {}
//
// const generateFieldConfig2 = (rowsCount, columnsCount) => {
// 	for (let rowIndex = 1; rowIndex <= rowsCount; rowIndex++) {
// 		obj2[rowIndex] = {}
// 		for (let columnIndex = 1; columnIndex <= columnsCount; columnIndex++) {
// 			// const key = ((rowIndex-1)*columnsCount)+columnIndex
// 			obj2[rowIndex][columnIndex] = {
// 				isMine:minesConfigSet.has(`${rowIndex}-${columnIndex}`),
// 				// minesAround: checkForMinesAroundWithSet(rowIndex, columnIndex)
// 				minesAround: checkForMinesAroundWithSet(rowIndex, columnIndex)
// 			}
// 		}
// 	}
// }
//
//
// old
//
// const generateMineIndexes = (minesCount)=>{
// 	// use set to avoid duplicates and unnecessary array checks like includes in case of multiple same random numbers
// 	const mineIndexesSet = new Set()
//
// 	while (mineIndexesSet.size < minesCount) {
// 		const mineIndex = Math.floor(Math.random() * (columnsCount * rowsCount))
// 		mineIndexesSet.add(mineIndex)
// 	}
// 	return mineIndexesSet
// }
// const minesConfig = generateMineIndexes(minesCount)
// console.log('minesLength', minesConfig)
//
// //
// const checkForMinesAround = (cellIndex, minesConfig) => {
// 	// index of left = cellIndex - 1
// 	// index of right = cellIndex + 1
//
// 	let totalMinesAround = 0
// 	const isFirstRow = cellIndex < columnsCount
// 	const isLastRow = cellIndex >= cellsCount - columnsCount
// 	const isFirstColumn = cellIndex % columnsCount === 0
// 	const isLastColumn = (cellIndex + 1) % columnsCount === 0
//
// 	// check top left, top, top right,
// 	// left, right,
// 	// bottom left, bottom, bottom right
//
// 	if (!isFirstColumn){
// 		// left
// 		if(minesConfig.has(cellIndex - 1)){
// 			totalMinesAround++
// 		}
// 		// top left
// 		// bottom left
// 	}
//
// 	// right
// 	if (!isLastColumn && minesConfig.has(cellIndex + 1)){
// 		totalMinesAround++
// 	}
//
// 	return totalMinesAround
// }
// //
//
// const gameConfig = {}
// console.log('cellsCount', cellsCount)
// for (let i = 0; i < cellsCount; i++) {
// 	const isMine = i===3//minesConfig.has(i)
// 	const numberOfMinesAround = checkForMinesAround(i, minesConfig)
// 	const value = isMine ? '#' : numberOfMinesAround || ''
//
// 	const cellConfig = {
// 		isMine,
// 		value,
// 		minesAround: numberOfMinesAround,
// 	}
//
// 	gameConfig[i] = cellConfig
// }
//
// console.log(gameConfig)
//
// // is creating a set and pushing better than array and check if contains?
// //
//
// // console.log(minesConfig(minesCount))
//
// const fieldConfig = {}
//
// let totalMinesCount = 0
//
// for (let rowIndex = 1; rowIndex <= rowsCount; rowIndex++) {
// 	fieldConfig[rowIndex] = {}
// 	for (let columnIndex = 1; columnIndex <= columnsCount; columnIndex++) {
//
// 		const isMine = totalMinesCount <= minesCount? Math.random() < (minesCount / (columnsCount * rowsCount)) : false
//
// 		isMine && totalMinesCount++
//
// 		fieldConfig[rowIndex][columnIndex] = {isMine}
// 	}
//
// }
//
// // console.log(fieldConfig)
// // console.log(totalMinesCount)

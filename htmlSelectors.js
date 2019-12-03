// rows -> down
// col -> across

class SpreadSheet {
	constructor(rows, columns) {
		this.rows = rows;
		this.columns = columns;
		this.matrix = [];
		this.generateMatrix();
	}

	generateMatrix() {
		for (let i = 0; i < this.rows; i++) {
			this.matrix[i] = new Array(this.columns);
		}
	}

	updateCell(val, row, col) {
		this.matrix[row][col] = val;
	}

	printSpreadSheet() {
		let spreadSheetString = '';
		this.matrix.forEach((row) => {
			row.forEach((el) => {
				spreadSheetString += el + '|';
				console.log(el);
			});
			spreadSheetString += `\n`;
		});
		console.log(spreadSheetString);
	}
}

// spreadSheetString += row + ' | ';

const s = new SpreadSheet(4, 3);
s.updateCell('bob', 0, 0);
s.updateCell(10, 0, 1);
s.updateCell('foo', 0, 2);

s.updateCell('alice', 1, 0);
s.updateCell(5, 1, 1);
s.printSpreadSheet();
// debugger;

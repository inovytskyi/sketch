class Cell {
	constructor(i, j, w) {
		this.i = i;
		this.j = j;
		this.w = w;

		this.x = i * w;
		this.y = j * w;

		this.walls = { top: true, bottom: true, right: true, left: true };
		this.visited = false;
	}

	show() {
		if (this.visited) {
			stroke(150, 0, 150);
			strokeWeight(0);
			fill(150, 0, 150);
			rect(this.x, this.y, this.w, this.w);
		}
		noFill();
		stroke(255);
		strokeWeight(1);
		if (this.walls.top) {
			line(this.x, this.y, this.x + this.w, this.y);
		}
		if (this.walls.right) {
			line(this.x + this.w, this.y, this.x + this.w, this.y + this.w);
		}
		if (this.walls.bottom) {
			line(this.x + this.w, this.y + this.w, this.x, this.y + this.w);
		}
		if (this.walls.left) {
			line(this.x, this.y + this.w, this.x, this.y);
		}

		// rect(this.i * this.w, this.j * this.w, this.w, this.w);
	}
	highlight() {
		stroke(150, 0, 150);
		strokeWeight(0);
		fill(250, 0, 150);
		rect(this.x, this.y, this.w, this.w);
		noFill();
		stroke(255);
		strokeWeight(1);
		if (this.walls.top) {
			line(this.x, this.y, this.x + this.w, this.y);
		}
		if (this.walls.right) {
			line(this.x + this.w, this.y, this.x + this.w, this.y + this.w);
		}
		if (this.walls.bottom) {
			line(this.x + this.w, this.y + this.w, this.x, this.y + this.w);
		}
		if (this.walls.left) {
			line(this.x, this.y + this.w, this.x, this.y);
		}
	}
}

class Maze {
	constructor(cols, rows, w) {
		this.cols = cols;
		this.rows = rows;
		this.w = w;
		this.grid = [];
		this.stack = [];
		for (let j = 0; j < this.rows; j++) {
			for (let i = 0; i < this.cols; i++) {
				let cell = new Cell(i, j, w);
				this.grid.push(cell);
			}
		}
		this.current = this.grid[0];
	}
	index(i, j) {
		if (i < 0 || j < 0 || i > this.cols - 1 || j > this.rows - 1) {
			return -1;
		}
		return i + j * cols;
	}

	checkNeigbors(i, j) {
		let neigbors = [];

		let right = this.grid[this.index(i - 1, j)];
		let left = this.grid[this.index(i + 1, j)];
		let top = this.grid[this.index(i, j - 1)];
		let bottom = this.grid[this.index(i, j + 1)];

		if (top && !top.visited) {
			neigbors.push(top);
		}
		if (right && !right.visited) {
			neigbors.push(right);
		}
		if (bottom && !bottom.visited) {
			neigbors.push(bottom);
		}
		if (left && !left.visited) {
			neigbors.push(left);
		}
		if (neigbors.length > 0) {
			return neigbors[Math.floor(Math.random() * neigbors.length)];
		} else {
			return undefined;
		}
	}

	removeWall(first, second) {
		if (first.i < second.i) {
			first.walls.right = false;
			second.walls.left = false;
		} else if (first.i > second.i) {
			first.walls.left = false;
			second.walls.right = false;
		} else if (first.j > second.j) {
			first.walls.top = false;
			second.walls.bottom = false;
		} else if (first.j < second.j) {
			first.walls.bottom = false;
			second.walls.top = false;
		}
	}

	show() {
		background(51);
		for (let cell of this.grid) {
			cell.show();
		}
		this.current.visited = true;
		this.current.highlight();
		let next = this.checkNeigbors(this.current.i, this.current.j);
		if (next) {
			next.visited = true;
			this.removeWall(this.current, next);
			this.stack.push(this.current);
			this.current = next;
		} else if (this.stack.length > 0) {
			this.current = this.stack.pop();
		}
	}
}

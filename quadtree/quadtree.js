class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class Rectangle {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
	contains(point) {
		return (
			point.x >= this.x - this.w &&
			point.x < this.x + this.w &&
			point.y >= this.y - this.h &&
			point.y < this.y + this.h
		);
	}
	intersects(range) {
		return !(
			range.x - range.w > this.x + this.w ||
			range.x + range.w < this.x - this.w ||
			range.y - range.h > this.y + this.h ||
			range.y + range.h < this.y - this.h
		);
	}
	rect() {
		return [this.x, this.y, this.w * 2, this.h * 2];
	}
}

class QuadTree {
	constructor(boundary, n) {
		this.boundary = boundary;
		this.capacity = n;
		this.points = [];
		this.divided = false;
	}
	subdivide() {
		let x = this.boundary.x;
		let y = this.boundary.y;
		let w = this.boundary.w;
		let h = this.boundary.h;
		let ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
		let nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
		let se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
		let sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
		this.northwest = new QuadTree(nw, this.capacity);
		this.norteast = new QuadTree(ne, this.capacity);
		this.southwest = new QuadTree(sw, this.capacity);
		this.southeast = new QuadTree(se, this.capacity);
		this.divided = true;
	}
	insert(point) {
		if (!this.boundary.contains(point)) {
			return false;
		}
		if (this.points.length < this.capacity) {
			this.points.push(point);
			return true;
		} else {
			if (!this.divided) {
				this.subdivide();
			}
			if (this.northwest.insert(point)) {
				return true;
			} else if (this.norteast.insert(point)) {
				return true;
			} else if (this.southwest.insert(point)) {
				return true;
			} else if (this.southeast.insert(point)) {
				return true;
			}
		}
	}

	query(range, found) {
		if (!found) {
			found = [];
		}
		if (!this.boundary.intersects(range)) {
			return;
		} else {
			for (let p of this.points) {
				if (range.contains(p)) {
					found.push(p);
				}
			}

			if (this.divided) {
				this.northwest.query(range, found);
				this.norteast.query(range, found);
				this.southwest.query(range, found);
				this.southeast.query(range, found);
			}
		}
		return found;
	}

	show() {
		stroke(255);
		noFill();
		rectMode(CENTER);
		strokeWeight(1);
		rect(...this.boundary.rect());

		for (let p of this.points) {
			strokeWeight(8);
			point(p.x, p.y);
		}
		if (this.divided) {
			this.southeast.show();
			this.southwest.show();
			this.northwest.show();
			this.norteast.show();
		}
	}
}

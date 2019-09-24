let qt;
let range;
function setup() {
	createCanvas(windowWidth, windowHeight);
	let boundary = new Rectangle(
		windowWidth / 2,
		windowHeight / 2,
		windowWidth,
		windowHeight
	);
	qt = new QuadTree(boundary, 4);
	range = new Rectangle(windowWidth / 2, windowHeight / 2, 300, 200);

	for (let i = 0; i < 600; i++) {
		let p = new Point(
			randomGaussian(windowWidth / 2, windowWidth / 8),
			randomGaussian(windowHeight / 2, windowHeight / 8)
		);
		qt.insert(p);
	}
	cursor(CROSS);
}

function draw() {
	background(0);
	qt.show();
	stroke(0, 255, 0);
	rectMode(CENTER);
	strokeWeight(1);
	rect(...range.rect());
	let filteredPoints = qt.query(range);
	for (let p of filteredPoints) {
		strokeWeight(8);
		point(p.x, p.y);
	}
}
function mouseMoved() {
	range = new Rectangle(mouseX, mouseY, 300, 200);
}

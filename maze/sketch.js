let w = 20;
let cols, rows;
let maze;
function setup() {
	createCanvas(windowWidth, windowHeight);
	cols = floor(windowWidth / w);
	rows = floor(windowHeight / w);
	maze = new Maze(cols, rows, w);
}

function draw() {
	maze.show();
}

function windowResized() {
	setup();
}

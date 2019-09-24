// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/0jjeOYMjmDU

var angle = 0;
var slider;

function setup() {
	createCanvas(400, 400);
	slider = createSlider(0, TWO_PI, PI / 4, 0.01);
	background(51);
	stroke(255);
	translate(200, height);
	branch(100, 0);
}

function draw() {
	if (angle !== slider.value()) {
		angle = slider.value();
		background(51);
		stroke(255);
		translate(200, height);
		branch(100, 0);
	}
}

function branch(len, level) {
	strokeWeight(5 / (level + 1));
	line(0, 0, 0, -len);
	translate(0, -len);
	if (level < 11) {
		push();
		rotate(angle);
		branch(len * 0.67, level + 1);
		pop();
		push();
		rotate(-angle);
		branch(len * 0.67, level + 1);
		pop();
	}

	//line(0, 0, 0, -len * 0.67);
}

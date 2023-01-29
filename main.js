const cvs = document.querySelector('#canvas');
const c = cvs.getContext('2d');

cvs.width = 1200;
cvs.height = 576;

const gravity = 0.5;
class Player {
	constructor(position) {
		this.position = position;
		this.velocity = {
			x: 0,
			y: 1
		};
		this.height = 100;
		this.width = 100;
	}

	draw() {
		c.fillStyle = 'red';
		c.fillRect(this.position.x, this.position.y, this.height, this.height);
	}

	update() {
		this.draw();
		this.position.y += this.velocity.y;
		if (this.position.y + this.height + this.velocity.y < cvs.height) {
			this.velocity.y += gravity;
		} else {
			this.velocity.y = 0;
		}
	}
}

const player = new Player({
	x: 0,
	y: 0
});

function animate() {
	requestAnimationFrame(animate);

	c.fillStyle = 'white';
	c.fillRect(0, 0, cvs.width, cvs.height);

	player.update();
}

animate();
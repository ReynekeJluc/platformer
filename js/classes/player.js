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

		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		if (this.position.y + this.height + this.velocity.y < cvs.height) {
			this.velocity.y += gravity;
		} else {
			this.velocity.y = 0;
		}

		if (this.position.y + this.height + this.velocity.y < cvs.height - 15) {
			keys.w.pressed = false;
			keys.W.pressed = false;
			keys.ц.pressed = false;
			keys.Ц.pressed = false;
		}
	}
}
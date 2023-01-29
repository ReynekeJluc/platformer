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

const player = new Player({
	x: 0,
	y: 0
});

const keys = {
	d: {
		pressed: false,
	},
	D: {
		pressed: false,
	},
	a: {
		pressed: false,
	},
	A: {
		pressed: false,
	},
	w: {
		pressed: false,
	},
	W: {
		pressed: false,
	},

	в: {
		pressed: false,
	},
	В: {
		pressed: false,
	},
	ф: {
		pressed: false,
	},
	Ф: {
		pressed: false,
	},
	ц: {
		pressed: false,
	},
	Ц: {
		pressed: false,
	},
};

function animate() {
	requestAnimationFrame(animate);

	c.fillStyle = 'white';
	c.fillRect(0, 0, cvs.width, cvs.height);

	player.update();

	player.velocity.x = 0;

	if(keys.d.pressed) player.velocity.x = 2;
	if(keys.a.pressed) player.velocity.x = -2;
	if(keys.w.pressed) player.velocity.y = -15;
	if(keys.D.pressed) player.velocity.x = 2;
	if(keys.A.pressed) player.velocity.x = -2;
	if(keys.W.pressed) player.velocity.y = -15;

	if(keys.в.pressed) player.velocity.x = 2;
	if(keys.ф.pressed) player.velocity.x = -2;
	if(keys.ц.pressed) player.velocity.y = -15;
	if(keys.В.pressed) player.velocity.x = 2;
	if(keys.Ф.pressed) player.velocity.x = -2;
	if(keys.Ц.pressed) player.velocity.y = -15;
}

animate();

document.addEventListener('keydown', (e) => {
	switch (e.key) {
		case 'd': 
			keys.d.pressed = true;
			break;
		case 'D': 
			keys.D.pressed = true;
			break;
		case 'a': 
			keys.a.pressed = true;
			break;
		case 'A': 
			keys.A.pressed = true;
			break;
		case 'w': 
			keys.w.pressed = true;
			break;
		case 'W': 
			keys.W.pressed = true;
			break;
			
		case 'в': 
			keys.в.pressed = true;
			break;
		case 'В': 
			keys.В.pressed = true;
			break;
		case 'ф': 
			keys.ф.pressed = true;
			break;
		case 'Ф': 
			keys.Ф.pressed = true;
			break;
		case 'ц': 
			keys.ц.pressed = true;
			break;
		case 'Ц': 
			keys.Ц.pressed = true;
			break;
	}
});

document.addEventListener('keyup', (e) => {
	switch (e.key) {
		case 'd': 
			keys.d.pressed = false;
			break;
		case 'D': 
			keys.D.pressed = false;
			break;
		case 'a': 
			keys.a.pressed = false;
			break;
		case 'A': 
			keys.A.pressed = false;
			break;
		case 'w': 
			keys.w.pressed = false;
			break;
		case 'W': 
			keys.W.pressed = false;
			break;

		case 'в': 
			keys.в.pressed = false;
			break;
		case 'В': 
			keys.В.pressed = false;
			break;
		case 'ф': 
			keys.ф.pressed = false;
			break;
		case 'Ф': 
			keys.Ф.pressed = false;
			break;
		case 'ц': 
			keys.ц.pressed = false;
			break;
		case 'Ц': 
			keys.Ц.pressed = false;
			break;
	}
});


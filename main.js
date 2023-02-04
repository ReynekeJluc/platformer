const cvs = document.querySelector('#canvas');
const c = cvs.getContext('2d');

cvs.width = 1280;
cvs.height = 600;

const scaledCvs = {
	height: cvs.height / 4,
	width: cvs.width / 4,
};

const gravity = 0.5;
const jump = 4;
const speedMH = 2;

const background = new Sprite({
	position: {
		x: 0,
		y: 0,
	},
	imageSrc: './img/bg1.png',
});

const floorCollision2D = [];
for(let i = 0; i < floorCollision.length; i += 30) {
	floorCollision2D.push(floorCollision.slice(i, i + 30));
}

const collisionBlock = [];
floorCollision2D.forEach((row, y) => {
	row.forEach((symbol, x) => {
		if(symbol === 794) {
			collisionBlock.push(new CollisionBlock({
				position: {
					x: x * 16,
					y: y * 16,
				},
		}));
		}
	});
});

const platformsCollision2D = [];
for(let i = 0; i < platformsCollision.length; i += 30) {
	platformsCollision2D.push(platformsCollision.slice(i, i + 30));
}

const platformsCollisionBlock = [];
platformsCollision2D.forEach((row, y) => {
	row.forEach((symbol, x) => {
		if(symbol === 794) {
			platformsCollisionBlock.push(new CollisionBlock({
				position: {
					x: x * 16,
					y: y * 16,
				},
		}));
		}
	});
});

const player = new Player({
	position: {
		x: 50,
		y: 120
	},
	collisionBlock,
	imageSrc: 'img/character/Idle.png',
	frameRate: 7,
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

	c.save();
	c.scale(4, 4);
	c.translate(0, -background.image.height + scaledCvs.height);
	background.update();

	collisionBlock.forEach(collisionBlock => {
		collisionBlock.update();
	});

	platformsCollisionBlock.forEach(block => {
		block.update();
	});

	player.update();
	player.velocity.x = 0;

	if(keys.d.pressed) player.velocity.x = speedMH;
	if(keys.a.pressed) player.velocity.x = -speedMH;
	if(keys.w.pressed) player.velocity.y = -jump;
	if(keys.D.pressed) player.velocity.x = speedMH;
	if(keys.A.pressed) player.velocity.x = -speedMH;
	if(keys.W.pressed) player.velocity.y = -jump;

	if(keys.в.pressed) player.velocity.x = speedMH;
	if(keys.ф.pressed) player.velocity.x = -speedMH;
	if(keys.ц.pressed) player.velocity.y = -jump;
	if(keys.В.pressed) player.velocity.x = speedMH;
	if(keys.Ф.pressed) player.velocity.x = -speedMH;
	if(keys.Ц.pressed) player.velocity.y = -jump;

	c.restore();
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


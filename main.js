const cvs = document.querySelector('#canvas');
const c = cvs.getContext('2d');

cvs.width = 1280;
cvs.height = 600;

const scaledCvs = {
	height: cvs.height / 3,
	width: cvs.width / 3,
};

const gravity = 0.3;
const jump = 4;
const borderJump = 13;
const speedMH = 2;

const background = new Sprite({
	position: {
		x: 0,
		y: 0,
	},
	imageSrc: './img/bg.png',
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
				height: 6,
		}));
		}
	});
});

const player = new Player({
	position: {
		x: 0,
		y: 120
	},
	collisionBlock,
	platformCollisionBlocks: platformsCollisionBlock,
	imageSrc: 'img/character/Idle.png',
	frameRate: 8,
	animations: {
		Idle: {
			imageSrc: 'img/character/Idle.png',
			frameRate: 8,
			frameBuffer: 8,
		},
		IdleLeft: {
			imageSrc: 'img/character/IdleLeft.png',
			frameRate: 8,
			frameBuffer: 8,
		},
		Run: {
			imageSrc: 'img/character/Run.png',
			frameRate: 8,
			frameBuffer: 5,
		},
		RunLeft: {
			imageSrc: 'img/character/RunLeft.png',
			frameRate: 8,
			frameBuffer: 5,
		},
		Jump: {
			imageSrc: 'img/character/Jump.png',
			frameRate: 2,
			frameBuffer: 3,
		},
		JumpLeft: {
			imageSrc: 'img/character/JumpLeft.png',
			frameRate: 2,
			frameBuffer: 3,
		},
		Fall:  {
			imageSrc: 'img/character/Fall.png',
			frameRate: 2,
			frameBuffer: 3,
		},
		FallLeft:  {
			imageSrc: 'img/character/FallLeft.png',
			frameRate: 2,
			frameBuffer: 3,
		},
	}
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

	??: {
		pressed: false,
	},
	??: {
		pressed: false,
	},
	??: {
		pressed: false,
	},
	??: {
		pressed: false,
	},
	??: {
		pressed: false,
	},
	??: {
		pressed: false,
	},
};

const bgImageHeight = 320;

const camera = {
	position: {
		x: 0,
		y: -bgImageHeight + scaledCvs.height,
	},
};

function soundBgMusic() {
	let audio = new Audio();
	audio.src = './music/bg_music.mp3';
	audio.autoplay = true;
	audio.volume = 0.5;
}

let triggerMusic = 0;

steps = document.querySelector('#step');
jumping = document.querySelector('#jump');
falling = document.querySelector('#fall');

function animate() {
	requestAnimationFrame(animate);
	c.fillStyle = 'white';
	c.fillRect(0, 0, cvs.width, cvs.height); 

	c.save();
	c.scale(4, 4);  
	c.translate(camera.position.x, camera.position.y);
	background.update();

	// collisionBlock.forEach(collisionBlock => {
	// 	collisionBlock.update();
	// });

	// platformsCollisionBlock.forEach(block => {
	// 	block.update();
	// });

	player.checkForHorizontalCanvasCollision();
	player.update();
	player.velocity.x = 0;

	if (keys.d.pressed || keys.D.pressed || keys.??.pressed || keys.??.pressed) {
		player.switchSprite('Run');
		player.velocity.x = speedMH;
		player.lastDirection = 'right';

		player.shouldPanCameraToTheLeft({cvs, camera});

		if (triggerMusic == 0) {
			soundBgMusic();
			triggerMusic = 1;
		} 
		
		steps.volume = 0.1;
		steps.play();
	} 
	if (keys.a.pressed || keys.A.pressed || keys.??.pressed || keys.??.pressed) {
		player.switchSprite('RunLeft');
		player.velocity.x = -speedMH;
		player.lastDirection = 'left';

		player.shouldPanCameraToTheRight({cvs, camera});
		if (triggerMusic == 0) {
			soundBgMusic();
			triggerMusic = 1;
		}

		steps.volume = 0.1;
		steps.play();
	}
	if (keys.w.pressed || keys.W.pressed || keys.??.pressed || keys.??.pressed) { 
		if (player.velocity.y < 5) {
			player.velocity.y = -jump;

			jumping.volume = 0.4;
			jumping.play();
		}

		if (triggerMusic == 0) {
			soundBgMusic();
			triggerMusic = 1;
		}
	}

	if(player.velocity.x === 0) {
		steps.pause();
		if (player.lastDirection == 'right') {
			player.switchSprite('Idle');
		}
		else {
			player.switchSprite('IdleLeft');
		}
	} 

	if (player.check != -1) {
		steps.pause();
	}

	if(player.velocity.y < 0) {
		player.shouldPanCameraDown({camera, cvs});
		player.check += 1; 
		if (player.lastDirection == 'right') 
			player.switchSprite('Jump');
		else player.switchSprite('JumpLeft');
	} else if (player.velocity.y > 0) {
		player.shouldPanCameraUp({camera, cvs});
		if (player.lastDirection == 'right') {
			player.switchSprite('Fall');
		}
		else player.switchSprite('FallLeft');
	}

	if (player.check > borderJump) {
		keys.w.pressed = false; 
		keys.W.pressed = false;
		keys.??.pressed = false;
		keys.??.pressed = false;

		falling.volume = 0.2;
		falling.play();
	}

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
			if (player.check === -1) keys.w.pressed = true;
			break;
		case 'W': 
			if (player.check === -1) keys.w.pressed = true;
			break;

		case '??': 
			keys.??.pressed = true;
			break;
		case '??': 
			keys.??.pressed = true;
			break;

		case '??': 
			keys.??.pressed = true;
			break;
		case '??': 
			keys.??.pressed = true;
			break;

		case '??': 
			if (player.check === -1) keys.w.pressed = true;
			break;
		case '??': 
			if (player.check === -1) keys.w.pressed = true;	
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

		case '??': 
			keys.??.pressed = false;
			break;
		case '??': 
			keys.??.pressed = false;
			break;

		case '??': 
			keys.??.pressed = false;
			break;
		case '??': 
			keys.??.pressed = false;
			break;

		case '??': 
			keys.??.pressed = false;
			break;
		case '??': 
			keys.??.pressed = false;
			break;
	}
});
class Player extends  Sprite {
	constructor({
		position, 
		collisionBlock, 
		platformCollisionBlocks, 
		imageSrc, 
		frameRate, 
		scale = 0.7, 
		animations
	}) {
		super({imageSrc, frameRate, scale});
		this.check = 0;
		this.position = position;
		this.velocity = {
			x: 0,
			y: 1,
		};
		this.collisionBlock = collisionBlock;
		this.platformCollisionBlocks = platformCollisionBlocks;
		this.hitbox = {
			position: {
				x: this.position.x,
				y: this.position.y,
			},
			width: 10,
			height: 10,
		};

		this.animations = animations;
		this.lastDirection = 'right';

		for (let key in this.animations) {
			const image = new Image();
			image.src = this.animations[key].imageSrc;

			this.animations[key].image = image;	
		}
	}

	switchSprite(key) {
		if (this.image === this.animations[key].image || !this.loaded) return;
		this.currentFrame = 0;
		this.image = this.animations[key].image;
		this.frameBuffer = this.animations[key].frameBuffer;
		this.frameRate = this.animations[key].frameRate;
	}

	update() {
		this.updateFrames();
		this.updateHitbox();

		//Показ хитбокса и бокса анимации
		// c.fillStyle = 'rgba(0, 255, 0, 0.2)';
		// c.fillRect(this.position.x, this.position.y, this.width, this.height);

		// c.fillStyle = 'rgba(255, 0, 0, 0.2)';
		// c.fillRect(
		// 	this.hitbox.position.x, 
		// 	this.hitbox.position.y, 
		// 	this.hitbox.width, 
		// 	this.hitbox.height
		// );

		this.draw();

		this.position.x += this.velocity.x;

		this.updateHitbox();
		this.checkForHorizontalCollisions();
		this.applyGravity();
		this.updateHitbox();
		this.checkForVerticalCollisions();
	}

	updateHitbox() {
		this.hitbox = {
			position: {
				x: this.position.x + 43,
				y: this.position.y + 38,
			},
			width: 22,
			height: 30,
		};
	}

	applyGravity() {
		this.velocity.y += gravity;
		this.position.y += this.velocity.y;
	}

	checkForHorizontalCollisions() {
		for (let i = 0; i < this.collisionBlock.length; i++) {
			const collisionBlocks = this.collisionBlock[i];
			if(
				collision({
					obj1: this.hitbox,
					obj2: collisionBlocks,
				})
			) {
				if(this.velocity.x > 0) {
					this.velocity.x = 0;
					
					const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;

					this.position.x = collisionBlocks.position.x - offset - 0.01;
					break;
				}
				if(this.velocity.x < 0) {
					this.velocity.x = 0;

					const offset = this.hitbox.position.x - this.position.x;

					this.position.x = collisionBlocks.position.x + collisionBlocks.width - offset + 0.01;
					break;
				}
			}
		}
	}

	checkForVerticalCollisions() {
		for (let i = 0; i < this.collisionBlock.length; i++) {
			const collisionBlocks = this.collisionBlock[i];
			if (
				collision({
					obj1: this.hitbox,
					obj2: collisionBlocks,
				})
			) {
				this.check = -1;
				if (this.velocity.y > 0) {
					this.velocity.y = 0;
					const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;

					this.position.y = collisionBlocks.position.y - offset - 0.01;
					break;
				}
				if (this.velocity.y < 0) {
					this.velocity.y = 0;
					const offset = this.hitbox.position.y - this.position.y;
					
					this.position.y = collisionBlocks.position.y + collisionBlocks.height - offset + 0.01;
					break;
				}
			}
		}

		for (let i = 0; i < this.platformCollisionBlocks.length; i++) {
			const platformCollisionBlock = this.platformCollisionBlocks[i];
			if (
				collision({
					obj1: this.hitbox,
					obj2: platformCollisionBlock,
				})
			) {
				this.check = -1;
				if (this.velocity.y > 0) {
					this.velocity.y = 0;
					const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;

					this.position.y = platformCollisionBlock.position.y - offset - 0.01;
					break;
				}
				if (this.velocity.y < 0) {
					this.velocity.y = 0;
					const offset = this.hitbox.position.y - this.position.y;
					
					this.position.y = platformCollisionBlock.position.y + platformCollisionBlock.height - offset + 0.01;
					break;
				}
			}
		}
	}
}
class Player extends  Sprite {
	constructor({position, collisionBlock, imageSrc, frameRate, scale = 0.5}) {
		super({imageSrc, frameRate, scale});
		this.position = position;
		this.velocity = {
			x: 0,
			y: 1
		};
		this.collisionBlock = collisionBlock;
		this.hitbox = {
			position: {
				x: this.position.x,
				y: this.position.y,
			},
			width: 10,
			height: 10,
		};
	}
	
	update() {
		this.updateFrames();
		this.updateHitbox();

		c.fillStyle = 'rgba(0, 255, 0, 0.2)';
		c.fillRect(this.position.x, this.position.y, this.width, this.height);

		c.fillStyle = 'rgba(255, 0, 0, 0.2)';
		c.fillRect(
			this.hitbox.position.x, 
			this.hitbox.position.y, 
			this.hitbox.width, 
			this.hitbox.height
		);

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
				x: this.position.x + 19,
				y: this.position.y + 32,
			},
			width: 13,
			height: 32,
		};
	}

	applyGravity() {
		this.position.y += this.velocity.y;
		this.velocity.y += gravity;
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

			if(
				collision({
					obj1: this.hitbox,
					obj2: collisionBlocks,
				})
			) {
				if(this.velocity.y > 0) {
					this.velocity.y = 0;

					const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;

					this.position.y = collisionBlocks.position.y - offset - 0.01;
					break;
				}
				if(this.velocity.y < 0) {
					this.velocity.y = 0;

					const offset = this.hitbox.position.y - this.position.y;

					this.position.y = collisionBlocks.position.y + collisionBlocks.height - offset + 0.01;
					break;
				}
			}
		}
	}
}
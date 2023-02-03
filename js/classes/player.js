class Player extends  Sprite {
	constructor({position, collisionBlock, imageSrc, frameRate, scale = 0.5}) {
		super({imageSrc, frameRate, scale});
		this.position = position;
		this.velocity = {
			x: 0,
			y: 1
		};
		this.collisionBlock = collisionBlock;
	}
	
	update() {
		this.updateFrames();
		c.fillStyle = 'rgba(0, 255, 0, 0.2)';
		c.fillRect(this.position.x, this.position.y, this.width, this.height);

		this.draw();

		this.position.x += this.velocity.x;

		this.checkForHorizontalCollisions();
		this.applyGravity();
		this.checkForVerticalCollisions();
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
					obj1: this,
					obj2: collisionBlocks,
				})
			) {
				if(this.velocity.x > 0) {
					this.velocity.x = 0;
					this.position.x = collisionBlocks.position.x - this.width - 0.01;
				}
				if(this.velocity.x < 0) {
					this.velocity.x = 0;
					this.position.x = collisionBlocks.position.x + collisionBlocks.width + 0.01;
				}
			}
		}
	}

	checkForVerticalCollisions() {
		for (let i = 0; i < this.collisionBlock.length; i++) {
			const collisionBlocks = this.collisionBlock[i];

			if(
				collision({
					obj1: this,
					obj2: collisionBlocks,
				})
			) {
				if(this.velocity.y > 0) {
					this.velocity.y = 0;
					this.position.y = collisionBlocks.position.y - this.height - 0.01;
				}
				if(this.velocity.y < 0) {
					this.velocity.y = 0;
					this.position.y = collisionBlocks.position.y + collisionBlocks.height + 0.01;
				}
			}
		}
	}
}
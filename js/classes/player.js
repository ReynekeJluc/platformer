class Player {
	constructor({position, collisionBlock}) {
		this.position = position;
		this.velocity = {
			x: 0,
			y: 1
		};
		this.height = 25;
		this.width = 25;
		this.collisionBlock = collisionBlock;
	}

	draw() {
		c.fillStyle = 'red';
		c.fillRect(this.position.x, this.position.y, this.height, this.height);
	}

	update() {
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
import Dino from '../objects/Dino';
import Ground from '../objects/Ground';
import Obstacle from '../objects/Obstacle';
import FpsText from '../objects/fpsText';

const Pool = new Map();

export default class MainScene extends Phaser.Scene {
	fpsText
	dino
	grounds: Ground[]= []
	groundCounter = 0
	envContainer: Phaser.GameObjects.Container
	speed = 8
	acceleration = 0.05

	constructor() {
		super({ key: 'MainScene' })
	}

	create() {
		this.dino = new Dino(this, 300, this.cameras.main.height-148)
		this.add.existing(this.dino);

		this.envContainer = this.add.container(0, 0);


		for(var i=0; i<12; i++) {
			var ground = this.createGround();
			this.addGround(ground);
		}

		this.fpsText = new FpsText(this)
	}

	createObstacle() {
		var obstacle = new Obstacle(this, 1000, this.cameras.main.height-180);

		this.physics.add.collider(this.dino, obstacle, () => {
			obstacle.destroy();
			console.log("Lose")
		});
		return obstacle;
	}

	addObstacle(obstacle:Obstacle) {
		var x = -this.envContainer.x + 3000;
		obstacle.init(x, this.cameras.main.height-150);

		this.envContainer.add(obstacle);
	}


	createGround() {
		var ground = new Ground(this, 0, 0);

		this.physics.add.collider(this.dino, ground, () => this.dino.run());
		return ground;
	}

	addGround(ground:Ground) {
		ground.init(this.groundCounter*ground.width, this.cameras.main.height-20);
		this.envContainer.add(ground);
		this.grounds.push(ground);
		this.groundCounter++;
	}

	removeGround() {
		var ground = this.grounds.shift() as Ground;
		this.envContainer.remove(ground);
	}

	update() {
		this.fpsText.update()

		var ground = this.grounds[0];
		if(ground.x + this.envContainer.x < -ground.width) {
			this.removeGround();
			this.addGround(ground);

			if(Math.random() < 0.2) {
				var obstacle = this.createObstacle();
				this.addObstacle(obstacle);
			}

			this.speed += this.acceleration;
		}

		this.envContainer.x -= this.speed;
	}
}

export default class Obstacle extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'tree')
		scene.physics.add.existing(this, false);

		var body = this.body as Phaser.Physics.Arcade.Body;
		body.setAllowGravity(false);
		this.setPushable(false);

		this.setScale(0.4, 0.5);
	}

	init(x, y) {
		this.enableBody(true, x, y, true, true);
	}
}

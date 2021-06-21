import MainScene from '../scenes/mainScene'

export default class Obstacle extends Phaser.Physics.Arcade.Sprite {
	scene: MainScene
	body: Phaser.Physics.Arcade.Body
	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y, 'tree')
		scene.physics.add.existing(this, false)

		this.setBodySize(150, 280)
		this.body.setAllowGravity(false)
		this.setPushable(false)

		this.setScale(0.4, 0.5)
	}

	preUpdate() {
		if (this.x < -this.width) {
			this.scene.removeObstacle(this)
		}
	}
}

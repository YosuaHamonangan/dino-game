import { MAX_JUMP_VELOCITY, JUMP_ACCELERATION } from '../constants'

var frames = {
	'dino-run': Array(8)
		.fill(0)
		.map((n, i) => ({ key: 'dino-run-' + (i + 1) })),
	'dino-idle': Array(10)
		.fill(0)
		.map((n, i) => ({ key: 'dino-idle-' + (i + 1) })),
	'dino-jump': Array(12)
		.fill(0)
		.map((n, i) => ({ key: 'dino-jump-' + (i + 1) }))
}

export default class Dino extends Phaser.Physics.Arcade.Sprite {
	isJumping = false

	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y, 'dino-run-1')

		this.anims.create({
			key: 'run',
			frames: frames['dino-run'],
			frameRate: 10,
			repeat: -1
		})
		this.anims.create({
			key: 'idle',
			frames: frames['dino-idle'],
			frameRate: 10,
			repeat: -1
		})
		this.anims.create({
			key: 'jump',
			frames: frames['dino-jump'],
			frameRate: 20
		})

		this.play('run')

		scene.physics.add.existing(this)

		this.setPushable(false)
		this.setBodySize(250, 395)
		this.setOffset(100, 30)
		this.setMaxVelocity(MAX_JUMP_VELOCITY)
		this.setScale(0.3)

		// this.setInteractive()
		// this.on('pointerdown', () => this.startJump())
		// this.on('pointerup', () => this.releaseJump())
	}

	startJump() {
		if (this.isJumping) return
		this.setAccelerationY(-JUMP_ACCELERATION)
		this.isJumping = true
		this.play('jump')
	}

	releaseJump() {
		this.setAccelerationY(0)
	}

	run() {
		if (this.anims.currentAnim.key == 'run') return
		this.isJumping = false
		this.play('run')
	}

	preUpdate(time, delta) {
		if (this.body.velocity.y == -MAX_JUMP_VELOCITY) {
			this.releaseJump()
		}
		super.preUpdate(time, delta)
	}
}

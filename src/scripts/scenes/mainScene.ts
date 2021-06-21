import Dino from '../objects/Dino'
import Ground from '../objects/Ground'
import Obstacle from '../objects/Obstacle'
import FpsText from '../objects/fpsText'
import randInt from '../utils/randInt'
import {
	INITITAL_SPEED,
	INITITAL_OBSTACLE,
	MIN_OBSTACLE_DISTANCE,
	MAX_OBSTACLE_DISTANCE,
	ACCELERATION
} from '../constants'

export default class MainScene extends Phaser.Scene {
	grounds: Phaser.Physics.Arcade.StaticGroup
	obstacles: Phaser.Physics.Arcade.StaticGroup
	lastGround: Ground | null
	fpsText: FpsText
	dino: Dino
	tipsText: Phaser.GameObjects.Text
	scoreText: Phaser.GameObjects.Text
	speed: number
	nextObstacle: number
	groundCounter: number
	score: number

	constructor() {
		super({ key: 'MainScene' })
	}

	create() {
		this.dino = new Dino(this, 300, this.cameras.main.height - 148)
		this.add.existing(this.dino)

		const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
		spaceKey.on('down', this.onSpaceKeyDown.bind(this))
		spaceKey.on('up', this.onSpaceKeyUp.bind(this))

		const groundsConfig: Phaser.Types.Physics.Arcade.PhysicsGroupConfig = {
			classType: Ground
		}
		this.grounds = new Phaser.Physics.Arcade.StaticGroup(this.physics.world, this, groundsConfig)
		this.add.existing(this.grounds)

		const obstaclesConfig: Phaser.Types.Physics.Arcade.PhysicsGroupConfig = {
			classType: Obstacle
		}
		this.obstacles = new Phaser.Physics.Arcade.StaticGroup(this.physics.world, this, obstaclesConfig)
		this.add.existing(this.obstacles)

		this.fpsText = new FpsText(this)

		const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
			color: 'black',
			fontSize: '28px',
			align: 'center'
		}
		this.tipsText = this.add.text(
			this.cameras.main.width / 2,
			this.cameras.main.height / 2,
			'Press SPACE to jump',
			textStyle
		)
		this.tipsText.setOrigin(0.5)

		this.scoreText = this.add.text(this.cameras.main.width - 200, 10, '', textStyle)

		this.groundCounter = 0
		this.lastGround = null
		this.nextObstacle = INITITAL_OBSTACLE
		this.setScore(0)
		this.setSpeed(0)
		for (var i = 0; i < 12; i++) {
			this.addGround()
		}
	}

	addObstacle() {
		if (!this.lastGround) throw 'Why no groud yet'

		const x = this.lastGround.x
		const y = this.cameras.main.height - 150
		const obstacle: Obstacle = this.obstacles.get(x, y)
		obstacle.setVisible(true)
		obstacle.setActive(true)
		obstacle.setVelocityX(-this.speed)

		this.physics.add.collider(this.dino, obstacle, this.onHit.bind(this))
	}

	addGround() {
		const x = this.lastGround ? this.lastGround.x + Ground.size : 0
		const y = this.cameras.main.height - 20
		const ground: Ground = this.grounds.get(x, y)
		ground.setVisible(true)
		ground.setActive(true)
		ground.setVelocityX(-this.speed)

		this.physics.add.collider(this.dino, ground, () => this.dino.run())
		this.lastGround = ground
		this.groundCounter++

		if (this.groundCounter > this.nextObstacle) {
			this.addObstacle()
			this.nextObstacle += randInt(MIN_OBSTACLE_DISTANCE, MAX_OBSTACLE_DISTANCE)
		}
	}

	removeGround(ground: Ground) {
		this.grounds.killAndHide(ground)
	}

	removeObstacle(obstacle: Obstacle) {
		this.obstacles.killAndHide(obstacle)
		this.setScore(this.score + 1)

		if (this.score % 10) {
			this.setSpeed(this.speed + ACCELERATION)
		}
	}

	onSpaceKeyDown() {
		if (!this.speed) this.setSpeed(INITITAL_SPEED)
		this.dino.startJump()
		this.tipsText.destroy()
	}

	onSpaceKeyUp() {
		this.dino.releaseJump()
	}

	onHit(dino, obstacle) {
		obstacle.destroy()
		this.scene.restart()
	}

	setScore(score: number) {
		this.score = score
		this.scoreText.setText(`Score: ${score}`)
	}

	setSpeed(speed: number) {
		this.speed = speed

		var grounds = this.grounds.getChildren() as Ground[]
		grounds.forEach((ground: Ground) => ground.setVelocityX(-speed))

		var obstacle = this.obstacles.getChildren() as Obstacle[]
		obstacle.forEach((obstacle: Obstacle) => obstacle.setVelocityX(-speed))
	}

	update() {
		if (!this.game.isRunning) return

		this.fpsText.update()

		if (this.lastGround && this.lastGround.x < this.cameras.main.width) {
			this.addGround()
		}
	}
}

var frames = {
	"dino-run" : Array(8).fill(0).map( (n,i) => ({ key: 'dino-run-'+(i+1) }) ),
	"dino-idle" : Array(10).fill(0).map( (n,i) => ({ key: 'dino-idle-'+(i+1) }) ),
	"dino-jump" : Array(12).fill(0).map( (n,i) => ({ key: 'dino-jump-'+(i+1) }) ),
}

export default class Dino extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'dino-run-1')

		this.anims.create({
			key: 'run',
			frames: frames["dino-run"],
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'idle',
			frames: frames["dino-idle"],
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'jump',
			frames: frames["dino-jump"],
			frameRate: 20,
		});

		this.play("run");

		scene.physics.add.existing(this);
		
		this.setBodySize(380,395);
		this.setOffset(30, 30);

		this.setScale(0.3);

		this.setInteractive();
		this.on('pointerdown', () => this.jump() );
	}

	jump() {
		this.setVelocityY(-2000);
		this.play("jump");
	}

	run() {
		if(this.anims.currentAnim.key == "run") return;
		this.play("run");
	}
}

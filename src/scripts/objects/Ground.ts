import MainScene from '../scenes/mainScene'

export default class Ground extends Phaser.Physics.Arcade.Sprite {
  static size = 128
  scene: MainScene
  body: Phaser.Physics.Arcade.Body

  constructor(scene: MainScene, x: number, y: number) {
    super(scene, x, y, 'ground')
    scene.physics.add.existing(this, false)

    this.body.setAllowGravity(false)
    this.setPushable(false)
  }

  preUpdate() {
    if (this.x < -this.width) {
      this.scene.removeGround(this)
    }
  }
}

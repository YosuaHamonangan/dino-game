export default class Ground extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'ground')
        scene.physics.add.existing(this, false);

        var body = this.body as Phaser.Physics.Arcade.Body;
        body.setAllowGravity(false);
        this.setPushable(false);
    }

    init(x, y) {
        this.enableBody(true, x, y, true, true);
    }
}

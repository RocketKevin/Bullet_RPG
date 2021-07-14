export class Backpack {
    constructor(scene, texture) {
        this.array = [];

        this.backpack = scene.add.image(window.innerWidth - 105 - 310, 165, texture).setScrollFactor(0);
        this.backpackContainer = scene.add.container(0, 0, [this.backpack]);

        this.backpackContainer.setScrollFactor(0);
        this.backpackContainer.setDepth(3);
        this.backpackContainer.setVisible(false);
        this.backpackContainer.setInteractive(new Phaser.Geom.Rectangle(window.innerWidth - 105 - 310 - (this.backpack.width / 2), 165 - (this.backpack.height / 2), this.backpack.width, this.backpack.height), Phaser.Geom.Rectangle.Contains);
        this.backpackContainer.setName("backpack container");
        this.backpack.setName("backpack");
        //this.backpackContainer.setSize(this.backpack.width, this.backpack.height);
        //console.log(this.backpack.width);
    }
    setVisible(state) {
        this.backpackContainer.setVisible(state);
    }
    create(scene) {
        scene.input.setDraggable(this.backpackContainer);
        scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.setX(dragX);
            gameObject.setY(dragY);

        });
    }
    addObjectToBackpack(object) {
        this.backpackContainer.add(object.image);
        this.array.push(object);
    }
}
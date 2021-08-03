import { final } from "../final.js";
import { Player } from "../obj/Player.js";
import { Hub } from "../obj/Hub.js";
import { Backpack } from "../obj/Backpack.js";
import { Gun } from "../obj/Gun.js";
import { Shop } from "../obj/Shop.js"
import { Slime } from "../obj/Slime.js"
import DialogBox from "../obj/UI/DialogBox.js";
import FloatText from "../obj/UI/FloatText.js";
import { Boss } from "../AI/EnemyAI/TestAI/Boss.js";
import { Wolf } from "../AI/EnemyAI/WolfAI/Wolf.js";
import { Goblin } from "../AI/EnemyAI/GoblinAI/Goblin.js";
export class play extends Phaser.Scene {
    constructor() {
        super({
            key: final.SCENES.PLAY
        })
    }
    preload() {
        this.load.image("Ground", "../assets/tilesets/A2_Ground.png");
        this.load.image("Nature", "../assets/tilesets/C_OutSide_Nature.png");
        this.load.tilemapTiledJSON("lab", "../assets/maps/lab.json");
        this.anims.create({
            key: "right",
            framesRate: 10,
            frames: this.anims.generateFrameNames("dude", {
                prefix: "dude",
                suffix: ".png",
                frames: [6, 7, 8, 7]
            })
        })
        this.anims.create({
            key: "left",
            framesRate: 10,
            frames: this.anims.generateFrameNames("dude", {
                prefix: "dude",
                suffix: ".png",
                frames: [5, 4, 3, 4]
            })
        })
        this.anims.create({
            key: "up",
            framesRate: 10,
            frames: this.anims.generateFrameNames("dude", {
                prefix: "dude",
                suffix: ".png",
                frames: [9, 10, 11, 10]
            })
        })
        this.anims.create({
            key: "down",
            framesRate: 3,
            frames: this.anims.generateFrameNames("dude", {
                prefix: "dude",
                suffix: ".png",
                frames: [0, 1, 2, 1]
            })
        })
        this.anims.create({
            key: "slime_up",
            framesRate: 1,
            frames: this.anims.generateFrameNames("slime", {
                prefix: "slime",
                suffix: ".png",
                frames: [10, 11, 12]
            })
        })
        this.anims.create({
            key: "slime_down",
            framesRate: 1,
            frames: this.anims.generateFrameNames("slime", {
                prefix: "slime",
                suffix: ".png",
                frames: [4, 5, 6]
            })
        })
        this.anims.create({
            key: "slime_left",
            framesRate: 1,
            frames: this.anims.generateFrameNames("slime", {
                prefix: "slime",
                suffix: ".png",
                frames: [1, 2, 3]
            })
        })
        this.anims.create({
            key: "slime_right",
            framesRate: 1,
            frames: this.anims.generateFrameNames("slime", {
                prefix: "slime",
                suffix: ".png",
                frames: [7, 8, 9]
            })
        })
        this.anims.create({
            key: "wolf_right",
            framesRate: 1,
            frames: this.anims.generateFrameNames("wolf", {
                prefix: "wolve",
                suffix: ".png",
                frames: [1, 2, 3, 4, 5, 6, 7]
            })
        })
        this.anims.create({
            key: "wolf_right_lunge",
            framesRate: 1,
            frames: this.anims.generateFrameNames("wolf", {
                prefix: "wolve",
                suffix: ".png",
                frames: [8, 9, 10, 11]
            })
        })
        this.anims.create({
            key: "goblin_pushup",
            framesRate: 1,
            frames: this.anims.generateFrameNames("goblin", {
                prefix: "",
                suffix: ".png",
                frames: [44, 45, 46, 47, 48, 47, 46, 45, 44]
            })
        })
        this.anims.create({
            key: "goblin_up",
            framesRate: 1,
            frames: this.anims.generateFrameNames("goblin", {
                prefix: "",
                suffix: ".png",
                frames: [22, 23, 24, 25, 26, 27, 28, 29]
            })
        })
        this.anims.create({
            key: "goblin_down",
            framesRate: 1,
            frames: this.anims.generateFrameNames("goblin", {
                prefix: "0",
                suffix: ".png",
                frames: [0, 1, 2, 3, 4, 5, 6, 7]
            })
        })
        this.anims.create({
            key: "goblin_left",
            framesRate: 1,
            frames: this.anims.generateFrameNames("goblin", {
                prefix: "",
                suffix: ".png",
                frames: [33, 34, 35, 36, 37, 38, 39, 40]
            })
        })
        this.anims.create({
            key: "goblin_right",
            framesRate: 1,
            frames: this.anims.generateFrameNames("goblin", {
                prefix: "",
                suffix: ".png",
                frames: [11, 12, 13, 14, 15, 16, 17, 18]
            })
        })
    }

    create() {
        var lab = this.add.tilemap("lab");
        var terrain = lab.addTilesetImage("A2_Ground", "Ground");
        var terrainTop = lab.addTilesetImage("C_OutSide_Nature", "Nature");
        var terrainPassable = lab.addTilesetImage("C_OutSide_Nature", "Nature");
        var bottomLayer = lab.createLayer("Ground", [terrain], 0, 0);
        var passableLayer = lab.createLayer("Ground2", [terrainPassable], 0, 0);
        var aboveLayer = lab.createLayer("Above", [terrainTop], 0, 0).setDepth(2);

        this.Hub = new Hub(this, "HubIcon", "Hub", "BackpackIcon", "Backpack", "ShopIcon", "Shop");
        this.Player = new Player(this, 50, 100, "dude", passableLayer, lab);
        this.Hub.button(this);

        this.textBox = new DialogBox(this, 0, 0);
        this.floatText = new FloatText(this);

        //gun/bullet
        //constructor(bulletSpeed, bulletRange, fireRate, imageName, dude, input, physics, scene)
        // this.pistol = new Gun(100, 3000, 500, 'dude', this.Player.sprite, this.input, this.physics, this)
        // this.ak = new Gun(1000, 100000, 200, 'bullet', this.Player.sprite, this.input, this.physics, this)

        //mob array
        this.mobArray = this.physics.add.group({
            classType: Slime//constructor(scene, x, y, texture)
        });

        this.mobArray1 = this.physics.add.group({
            classType: Wolf//constructor(scene, x, y, texture)
        });
        let mob1 = this.mobArray1.get(1000, 500, "wolf");

        this.mobArray2 = this.physics.add.group({
            classType: Goblin//constructor(scene, x, y, texture)
        });
        let mob2 = this.mobArray2.get(500, 1000, "slime");
        //spawn a dude mob
        // this.mobDude = this.mobArray.get(250, 250, 'slime').setScale(.75);
        //this.mobArray.add(new Mob(this, 500, 500, this.Player, 'slime'))
        //this.mobArray.get(500, 500, "slime");
        this.time.addEvent({
            delay: 3000,
            callback: () => {
                // spawn a new apple
                if (this.mobArray.getTotalUsed() < 4) { //if the total number that is active is less than 4.
                    let mob = this.mobArray.get(500, 500, "slime");
                    mob.reset();
                }
            },
            loop: true
        })
        this.Player.updateScene(this);
        //this.physics.add.overlap(this.mobArray, this.Player.gunController.getCurrentGun().getBulletArray(), this.handleBulletMobCollision, null, this);
        this.physics.add.overlap(this.mobArray, this.Player.hitbox.sprite, this.handleDamage, null, this);
        
        //this.physics.add.overlap(this.mobArray1, this.Player.gunController.getCurrentGun().getBulletArray(), this.handleBulletMobCollision, null, this);
        this.physics.add.overlap(this.mobArray1, this.Player.hitbox.sprite, this.handleDamage, null, this);

        //this.physics.add.overlap(this.mobArray2, this.ak.bullets, this.handleBulletMobCollision, null, this);
        this.physics.add.overlap(this.mobArray2, this.Player.hitbox.sprite, this.handleDamage, null, this);
    }

    handleDamage(player, monster) {
        if (this.Player.sprite.alpha == 0.5) return;
        // console.log("hello")
        if (monster.active) {
            this.Player.status.hp = this.Player.status.hp - monster.damage
            // console.log(monster)
            // console.log(player)
            if (this.Player.status.hp <= 0) {
                this.Player.killPlayer();
                this.ak = null
            }
            this.invulnerable()
        }

    }

    invulnerable() {
        this.Player.sprite.alpha = 0.5;
        this.time.addEvent({
            delay: 1000,
            callback: () => { this.Player.sprite.alpha = 1 },
            callbackScope: this,
            loop: false
        });
    }

    handleBulletMobCollision(obj1, obj2) {//obj1 is the mob obj 2 is the bullets
        // console.log(obj1)
        // console.log(obj2)
        if (obj1.active && obj2.active) {
            obj2.visible = false;
            obj2.active = false;
            obj2.destroy();
            obj1.health = obj1.health - obj2.damage;
            this.floatText.showText(obj1.x - obj1.width / 4, obj1.y - obj1.height / 2, `${obj2.damage}`);
            if (obj1.health <= 0 && obj1.getMobAlive()) {

                obj1.body.velocity.x = 0
                obj1.body.velocity.y = 0
                obj1.setMobDead();
                //obj1.setVisible(false);
                obj1.visible = false;
                obj1.active = false;
                console.log("mob killed!")
                this.textBox.showFor("mob was killed, \n good job!!!!", 1000);
                // obj1.destroy();
            }
        }
    }
    update(time, delta) {

        this.Player.update(delta);
        // if (this.ak != null) {
        //     this.ak.update(time, delta);
        // }
        // this.mobArray.children.iterate(child => {
        //     if(child.active)
        //         child.update();
        // })
    }


}
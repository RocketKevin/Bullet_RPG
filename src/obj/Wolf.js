import EnemyController from "../AI/EnemyAI/EnemyController.js";
import HealthBar from "./UI/HealthBar.js";

export class Wolf extends Phaser.Physics.Arcade.Sprite {
    defaultHealth = 1500;
    defaultSpeed = 75;

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        this.setScale(2);
        scene.add.existing(this);
        this.mobAlive = true;
        this.player = scene.Player;
        this.healthBar = new HealthBar(scene, 0, 0, this.defaultHealth);
        this.healthBar.follow(this);
        this.health = this.defaultHealth;
        this.damage = 250;
        this.speed = this.defaultSpeed;

        this.ai = new EnemyController(this, {
            player: this.player,
            animations: "",
        });
        this.cd = 4000;
        this.time = scene.time;
    }

    getMobAlive() {
        return this.mobAlive;
    }
    setMobDead() {
        this.mobAlive = false;
        this.healthBar.visible = false;
    }

    reset() {
        this.mobAlive = true;
        this.visible = true;
        this.active = true;
        this.health = this.defaultHealth;
        this.healthBar.visible = true;
        this.ai.changeState("roam");
    }

    preUpdate(time, deltaT) {
        super.preUpdate(time, deltaT);
        this.cd -= deltaT
        if ((this.cd - deltaT) <= 0) {
            this.ai.changeState("lunge")
            this.cd = 6000;
        }

        this.ai.update(deltaT);

        this.healthBar.currentHealth = this.health;
        this.healthBar.update();
        if (this.active) {
            if (this.health <= 0) {
                this.setVelocityX(0);
                this.setVelocityY(0);
                this.setVelocityX(0);
                this.setVelocityY(0);
            }
        }
    }
}

import Bullet from "./Bullet.js";
export default class Gun{
    #gunManager;//GunManager holding the gun
    #gunName;//String name of gun
    #bulletSpeed;//Speed the bullet travels at 
    #bulletRange;//Range of bullet
    #bulletDamage;//Damage of Bullet
    #fireRate;//Fire rate of gun
    #coolDown;//Shooting cool down aka fire rate
    #bulletImage;//String name for the bullet sprite
    //#bulletArray;//Array of bullets

    //this.pistol = new Gun(100, 3000, 500, 'dude', this.player, this.input, this.physics, this)
    //this.ak = new Gun(1000, 100000, 200, 'bullet', this.player, this.input, this.physics, this)
    constructor(gunName, gunManager, scene){
        this.setDefault();
        this.#gunName = gunName;
        this.#gunManager = gunManager;
        this.bulletArray = scene.physics.add.group({classType: Bullet});
        this.cursor = scene.input.mousePointer;
        this.camera = scene.cameras.main;
        this.physics = scene.physics;
        this.player = gunManager.player;
    }
    setDefault(){
        this.#gunName = "default";
        this.#bulletSpeed = "1000";
        this.#bulletRange = "1000";
        this.#bulletDamage = "100";
        this.#fireRate = "1000";
        this.#bulletImage = "bullet";
        this.#coolDown = this.#fireRate;
    }
    setCustom(gunName, bulletSpeed, bulletRange, bulletDamage, fireRate, bulletImage){
        this.#gunName = gunName;
        this.#bulletSpeed = bulletSpeed;
        this.#bulletRange = bulletRange;
        this.#bulletDamage = bulletDamage;
        this.#fireRate = fireRate;
        this.#bulletImage = bulletImage;
        this.#coolDown = this.#fireRate;
    }
    onEnter(){
        console.log("Switched to " + this.#gunName);
    }
    onExit(){
        console.log("Switching off " + this.#gunName);
    }
    getGunName(){ 
        return this.#gunName;
    }
    getGunMachine(){
        return this.#gunManager;
    }
    getBulletArray(){
        return this.bulletArray;
    }
    getBulletRange(){
        return this.#bulletRange;
    }
    update(deltaT){
        this.#coolDown = this.#coolDown - deltaT;//update fire rate cooldown
        if(this.cursor.isDown) {//if left mouse is down
            if(this.#coolDown <= 0.01) {//if fire rate cool down is finished
                var bullet = this.getBulletArray().get(this.player.x + this.player.width / 4.0, this.player.y + this.player.height / 4.0, this.#bulletImage).setScale(0.3);
                bullet.damage = this.#bulletDamage;
                bullet.visible = true;
                bullet.active = true;
                bullet.setVelocity(this.player.x, this.player.y, this.cursor.x, this.cursor.y, this.camera, this.#bulletSpeed);
                bullet.spawnX = this.player.x;
                bullet.spawnY = this.player.y;
                this.#coolDown = this.#fireRate;
            }
        }
        this.getBulletArray().children.iterate(child => {//check all the bullets
            var dx = child.x - child.spawnX;
            var dy = child.y - child.spawnY
            var dist = dx * dx + dy * dy;
            if (dist > this.getBulletRange() * this.getBulletRange()) {//if distance bullet traveled is out of bulletRange
                child.visible = false;//make it invisible
                child.active = false;//make it inactive
            }
        })
    }

}

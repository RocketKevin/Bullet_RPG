import { final } from "../final.js";
export class load extends Phaser.Scene {
    constructor() {
        super({
            key: final.SCENES.LOAD
        })
    }
    init() {

    }
    preload() {
        this.game.canvas.style = "margin: auto; display: block;";
        this.load.image("HubIcon", "../assets/HubIcon.png");
        this.load.image("Backpack", "../assets/Backpack.png");
        this.load.image("BackpackIcon", "../assets/BackpackIcon.png");
        this.load.image("Shop", "../assets/ShopIcon.png");
        this.load.image("Hub", "../assets/Hub.png");
        this.load.atlas("dude", "../assets/dude.png", "../assets/dude.json");
        this.load.atlas(
            "items", 
            "../assets/items/items.png", 
            "../assets/items/map_items.json"
        );
        this.load.atlas(
            "projectiles", 
            "../assets/projectiles/projectiles.png", 
            "../assets/projectiles/map_projectiles.json"
        );
        this.load.atlas(
            "slime", 
            "../assets/monsters/slime.png", 
            "../assets/monsters/map_slime.json"
        );
        this.load.image("menubackground", "../assets/menubackground.jpg");
        this.load.image("title", "../assets/title.png");
        this.load.image("playbutton", "../assets/playbutton.png");
        this.load.image("controlbutton", "../assets/controlbutton.png");
        this.load.image("optionbutton", "../assets/optionbutton.png");
        this.load.image("yes", "../assets/yes.png");
        this.load.image("no", "../assets/no.png");
        this.load.image("confirmation", "../assets/confirmation.png");
        this.load.image("creditsbutton", "../assets/credits.png");
        this.load.image("controlmenu", "../assets/controlmenu.png");
        this.load.image("backbutton", "../assets/back.png");
        this.load.image("okaybutton", "../assets/okay.png");
        var loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        })
        this.load.on("progress", (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
            console.log(percent);
        })
    }
    create() {
        this.scene.start(final.SCENES.MENU);
    }
}
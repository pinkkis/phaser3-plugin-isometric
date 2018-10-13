import Phaser, { Game, Scene } from 'phaser';
import IsoPlugin from '../../dist/phaser-plugin-isometric';

class IsoInteractionExample extends Scene {
  constructor() {
    const sceneConfig = {
      key: 'IsoInteractionExample',
      mapAdd: { isoPlugin: 'iso' }
    };

    super(sceneConfig);
  }

  preload() {
    this.load.image('tile', '../dist/assets/bb.png');
    this.load.scenePlugin({
      key: 'IsoPlugin',
      url: IsoPlugin,
      sceneKey: 'iso'
    });
  }

  create() {
    this.isoGroup = this.add.group();

    this.iso.projector.origin.setTo(0.5, 0.3);

    // Add some tiles to our scene
    this.spawnTiles();
  }

  spawnTiles() {
    var tile;

    for (var xx = 0; xx < 128; xx += 11) {
      for (var yy = 0; yy < 128; yy += 11) {
        tile = this.add.isoSprite(xx, yy, 0, 'tile', this.isoGroup);
        tile.setInteractive({pixelPerfect: true});
        // tile.renderDebug(true);

        tile.on('pointerover', function() {
          this.setTint(0x86bfda);
          this.isoZ += 5;
        });

        tile.on('pointerout', function() {
          this.clearTint();
          this.isoZ -= 5;
        });

        tile.on('pointerup', function() {
          this.renderDebug(!this._renderDebug);
        });
      }
    }
  }
}

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  scene: IsoInteractionExample
};

new Game(config);

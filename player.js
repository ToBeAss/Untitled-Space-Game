let shipScale = 60;
        let shipWidth = shipScale * SCALE;
        let shipHeight = shipWidth; // 0.978 ?
        let forward;
		let backward;
		let left;
		let right;
		let boosters;
		let blasters;
		let interact;

		let blastCooldown = false;

		let collisionRange = 0.66;
		let pickupRange = 1.5;

		let shipImage = new Image();
        shipImage.src = "images/ship.png";

        let ship = { // write a class instead as there is to be added different ships
            image: shipImage,
            width: shipWidth,
            height: shipHeight,
            xPos: -2500,
            yPos: -2500,
            speed: 0*GAME_SPEED/GAME_FPS,
			maxSpeed: 10*GAME_SPEED/GAME_FPS,
			acceleration: 0.25*GAME_SPEED/GAME_FPS,
			deceleration: 0.1*GAME_SPEED/GAME_FPS,
            rotation: 0,
			rotationSpeed: 0*GAME_SPEED/GAME_FPS,
			maxRotationSpeed: 5*GAME_SPEED/GAME_FPS,
			rotationAcceleration: 0.5*GAME_SPEED/GAME_FPS,
			energyRestoration: 0.2,
			energyConsumption: 0.2,
			energyStore: 1000,
			energyCapacity: 1000,
			boostConsumption: 0.5,
			boostTank: 200,
			boostCapacity: 200,
			health: 1000,
			maxHealth: 1000,
			shield: 50,
			maxShield: 50
        }

        var motionTrailLength = 10;
        var shipPositions = [];


    // MOVE
    const SCREEN_MIDDLE = {x: SCREEN_WIDTH/2-ship.width/2, y: SCREEN_HEIGHT/2-ship.height/2};

		let MAP_LEFT = SCREEN_MIDDLE.x-(MAP_SIZE/2)+ship.width/2
		let MAP_TOP = SCREEN_MIDDLE.y-(MAP_SIZE/2)+ship.height/2


		const POSITIONS = {
			screen: {
				left: 0,
				right: SCREEN_WIDTH,
				top: 0,
				bottom: SCREEN_HEIGHT,
				middleX: SCREEN_WIDTH/2,
				middleY: SCREEN_HEIGHT/2
			},
			map: {
				left: MAP_LEFT,
				right: MAP_LEFT + MAP_SIZE,
				top: MAP_TOP,
				bottom: MAP_TOP + MAP_SIZE
			}
		};
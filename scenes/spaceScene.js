export function setUpSpaceScene(sceneEntity)
{
    sceneEntity.addFixedInstruction(() => {
        // Handle input logic
        const playerIntents = inputSystem.generateIntents();
        movementSystem.processIntents(playerShip, playerIntents);
        laserSystem.processIntents(playerShip, playerIntents);

        // Move player
        movementSystem.rotateEntity(playerShip);
        movementSystem.moveEntity(playerShip);

        // Handle lasers
        laserSystem.laserArray.forEach(function(laser) {
            // Manage lifespan
            laserSystem.updateLifeSpan(laser);

            // Check collisions
            let entityArray = [playerShip, ...enemyArray, ...asteroidArray];
            laserSystem.handleCollisions(laser, entityArray);
            
            // Move laser
            movementSystem.moveEntity(laser);
        });

        // Handle asteroids
        asteroidArray.forEach(function(asteroid) {
            // Check for player collision
            let collisionResult = collisionSystem.checkCircularCollision(asteroid, playerShip);
            if (collisionResult.collision) {
                damageSystem.dealDamage(playerShip, 1);
            // Needs fixing:
                //movementSystem.bounceEntity(playerShip, collisionResult.normal);
            }

            // Check for enemy collisions
            enemyArray.forEach(function(enemy) {
                let collisionResult = collisionSystem.checkCircularCollision(asteroid, enemy);
                if (collisionResult.collision) {
                    damageSystem.dealDamage(enemy, 1);
                }
            });

            // Move asteroids
            movementSystem.rotateEntity(asteroid);
            movementSystem.moveEntity(asteroid);
        });

        // Handle enemies
        enemyArray.forEach(function(enemy) {
            // Check for player collision?

            // Handle enemy logic
            const enemyIntents = enemySystem.generateIntents();
            movementSystem.processIntents(enemy, enemyIntents);

            // Move enemies
            movementSystem.rotateEntity(enemy);
            movementSystem.moveEntity(enemy);
        });
    });

    sceneEntity.addUpdateInstruction(() => {
        // Clear canvas
        canvasSystem.resetCanvas();
        
        // Camera logic
        cameraSystem.follow(playerShip, false);

        // Render Entities
        asteroidArray.forEach(function(asteroid) {
            canvasSystem.renderEntity(asteroid, false);
        });

        laserSystem.laserArray.forEach(function(laser) {
            canvasSystem.drawLaser(laser);
        });

        enemyArray.forEach(function(enemy) {
            canvasSystem.renderEntity(enemy, false);
        });

        canvasSystem.renderEntity(playerShip, false);
    });
}
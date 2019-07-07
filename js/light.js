class Light {
    constructor(projectionPlaneWidth, pixelWidth, dis, fov, numRays, player) {
        this.player = player;
        this.fov = fov;
        this.projectionPlaneWidth = projectionPlaneWidth;
        this.pixelWidth = pixelWidth;
        this.perpdistance = dis;
        this.numRays = numRays;
        this.intersectionT = 0;
        this.blockIntersectionT = 0;
    }

    castRay() {
        var verticalPixelID = 0;
        var rayRelativeAngle_R;
        console.log(mapClone[0][2])
        var i, rayScreenPosition, rayViewDistance, rayRelativeAngle;
        console.log('light cast')
        for (i= 0; i < this.numRays; i++) {
            rayScreenPosition = (-this.numRays/2 + i) * this.pixelWidth; //check
            rayViewDistance = Math.sqrt(rayScreenPosition * rayScreenPosition + this.perpdistance * this.perpdistance);
            rayRelativeAngle = Math.asin(rayScreenPosition / rayViewDistance);
            rayRelativeAngle_R = degToRadian(rayRelativeAngle);
            this.castSingleRay(
                this.player.alpha + rayRelativeAngle_R, verticalPixelID++ //offset alpha
            );
        }
    }

    castSingleRay(rayAngle, stripIdx) {

        // first make sure the angle is between 0 and 360 degrees
        rayAngle %= DOUBLEPI;
        if (rayAngle < 0) rayAngle += DOUBLEPI;
    
        // moving right/left? up/down? Determined by which quadrant the angle is in.
        var right = (rayAngle > DOUBLEPI * 0.75 || rayAngle < DOUBLEPI * 0.25);
        var up = (rayAngle < 0 || rayAngle > Math.PI);
    
        // only do these once
        var angleSin = Math.sin(rayAngle);
        var angleCos = Math.cos(rayAngle);
    
    
        var dist = 0;	// the distance to the block we hit
        var xHit = 0; 	// the x and y coord of where the ray hit the block
        var yHit = 0;
    
        var textureX;	// the x-coord on the texture of the block, ie. what part of the texture are we going to render
        var wallX;	// the (x,y) map coords of the block
        var wallY;
    
    
        // first check against the vertical map/wall lines
        // we do this by moving to the right or left edge of the block we're standing in
        // and then moving in 1 map unit steps horizontally. The amount we have to move vertically
        // is determined by the slope of the ray, which is simply defined as sin(angle) / cos(angle).
    
        var slope = angleSin / angleCos; 	// the slope of the straight line made by the ray
        var dX = right ? 1 : -1; 	// we move either 1 map unit to the left or right
        var dY = dX * slope; 		// how much to move up or down
    
        var x = right ? Math.ceil(this.player.pos.x) : Math.floor(this.player.pos.x);	// starting horizontal position, at one of the edges of the current map block
        var y = this.player.pos.y + (x - this.player.pos.x) * slope;			// starting vertical position. We add the small horizontal step we just made, multiplied by the slope.
    
        while (x >= 0 && x < 256 && y >= 0 && y < 192) {
            var wallX = Math.floor(x + (right ? 0 : -1));
            var wallY = Math.floor(y);
    
            // is this point inside a wall block?
            if (mapClone[wallY][wallX] > 0) {
    
                var distX = x - this.player.pos.x;
                var distY = y - this.player.pos.y;
                dist = distX*distX + distY*distY;	// the distance from the player to this point, squared.
    
                textureX = y % 1;	// where exactly are we on the wall? textureX is the x coordinate on the texture that we'll use when texturing the wall.
                if (!right) textureX = 1 - textureX; // if we're looking to the left side of the map, the texture should be reversed
    
                xHit = x;	// save the coordinates of the hit. We only really use these to draw the rays on minimap.
                yHit = y;
    
                break;
            }
            x += dX;
            y += dY;
        }
    
    
    
        // now check against horizontal lines. It's basically the same, just "turned around".
        // the only difference here is that once we hit a map block,
        // we check if there we also found one in the earlier, vertical run. We'll know that if dist != 0.
        // If so, we only register this hit if this distance is smaller.
    
        var slope = angleCos / angleSin;
        var dY = up ? -1 : 1;
        var dX = dY * slope;
        var y = up ? Math.floor(this.player.pos.y) : Math.ceil(this.player.pos.y);
        var x = this.player.pos.x + (y - this.player.pos.y) * slope;
    
        while (x >= 0 && x < 256 && y >= 0 && y < 192) {
            var wallY1 = Math.floor(y + (up ? -1 : 0));
            var wallX1 = Math.floor(x);
            if (mapClone[wallY1][wallX1] > 0) {
                var distX = x - this.player.pos.x;
                var distY = y - this.player.pos.y;
                var blockDist = distX*distX + distY*distY;
                if (!dist || blockDist < dist) {
                    dist = blockDist;
                    xHit = x;
                    yHit = y;
                    textureX = x % 1;
                    if (up) textureX = 1 - textureX;
                }
                break;
            }
            x += dX;
            y += dY;
        }
    
        if (dist) {
            this.drawRay(xHit, yHit);
        }
    
    }
    

    // castSingleRay(rayAngle, stripID) {
    //     var right, up, sinTheta_value, cosTheta_value, slope, dx, x, y, dy, distX, distY, xHit, yHit, wallX, wallY;
    //     console.log(rayAngle);
    //     rayAngle %= DOUBLEPI;
    //     console.log(rayAngle);
    //     if (rayAngle > 0) { //check
    //         rayAngle += DOUBLEPI;
    //         console.log(rayAngle);
    //     }
    //     right = (rayAngle > DOUBLEPI * 0.75 || rayAngle < DOUBLEPI * 0.25);
    //     up = (rayAngle < 0 || rayAngle > Math.PI);  //check
    //     sinTheta_value = Math.sin(rayAngle);
    //     cosTheta_value = Math.cos(rayAngle);
    //     xHit = 0, yHit = 0;
    //     slope = sinTheta_value / cosTheta_value;
    //     dx = right ? 1 : -1;
    //     dy = dx * slope;
    //     x = right ? Math.ceil(this.player.pos.x): Math.floor(this.player.pos.x);
    //     y = this.player.pos.y + (x - this.player.pos.x) * slope;

    //     while( x >= 0 && x < 256 && y >= 0 && y < 192) {
    //         wallX = Math.floor(x + (right?0:-1));
    //         wallY = Math.floor(y);

    //         if (mapClone[wallY][wallX] > 0) {
    //             distX = x -this.player.pos.x;
    //             distY = y - this.player.pos.y;

    //             this.intersectionT = Math.pow(distX,2) + Math.pow(distY, 2);
    //             xHit = x;
    //             yHit = y;
    //             break;
    //         }
    //         x += dx;
    //         y += dy;
    //     }

    //     slope = cosTheta_value / sinTheta_value ;
    //     dy = up ? -1 :1;
    //     dx = dy * slope;

    //     y = up ? Math.floor(this.player.pos.y): Math.ceil(this.player.pos.y);
    //     x = this.player.pos.x + (y - this.player.pos.y) * slope;
        
    //     while (x >= 0 && x < 256 && y >= 0 && y < 192) {
    //         wallY = Math.floor(y + (up?-1:0));
    //         wallX = Math.floor(x);
    //         console.log({
    //             wallX,
    //             wallY
    //         })
    //         if (mapClone[wallY][wallX] > 0) {
    //             distX = x - this.player.pos.x;
    //             distY = y - this.player.pos.y;

    //             this.blockIntersectionT = Math.pow(distX,2) + Math.pow(distY,2);
    //             if (!this.intersectionT || this.blockIntersectionT < this.intersectionT) {
    //                 this.intersectionT = this.blockIntersectionT;
    //                 xHit = x;
    //                 yHit = y;
    //             }
    //             break;
    //         }
    //         x += dx;
    //         y += dy;
    //     }
        
    //     if (this.intersectionT) {
    //         this.drawRay(xHit, yHit);
    //     }
    // }

    drawRay(rayX, rayY) {
        this.player.rayContext.strokeStyle = "rgba(0,100,0,0.5)";
        this.player.rayContext.lineWidth = 0.5;
        this.player.rayContext.beginPath();
        this.player.rayContext.moveTo(this.player.pos.x * MAP_SCALE,
                                this.player.pos.y * MAP_SCALE   
                );
        this.player.rayContext.lineTo(
            rayX * MAP_SCALE,
            rayY * MAP_SCALE
        );
        this.player.rayContext.closePath();
        this.player.rayContext.stroke();        
    }
}



class Light {
    constructor(projectionPlaneWidth, pixelWidth, dist, numRays, player) {
        this.player = player;
        this.projectionPlaneWidth = projectionPlaneWidth;
        this.pixelWidth = pixelWidth;
        this.perpdistance = dist;
        this.numRays = numRays;
        this.mapClone = mapClone;
        this.dist = 0;
        this.wall = new Vector();
    }

    castRay() {
        var stripID = 0;
        var rayViewDist;

        for(var i=0;i<this.numRays;i++) {
            var rayPosition = (-this.numRays/2 + i) * this.pixelWidth;
            rayViewDist = Math.sqrt(rayPosition  * rayPosition + this.perpdistance * this.perpdistance);
            var rayAngle = Math.asin(rayPosition/rayViewDist);
            this.castSingleRay(
                rayAngle + this.player.alpha, stripID
            );
        }

    }

    castSingleRay(angle, stripID) {
        var sinThetaValue,cosThetaValue, anglePara;
        anglePara = normalizeAngle(angle);

        var right = (anglePara > DOUBLEPI * 0.75 || anglePara < DOUBLEPI * 0.25);
        var down = (anglePara > 0 && anglePara < Math.PI);
        var up = !down;
        
        sinThetaValue = Math.sin(anglePara);
        cosThetaValue = Math.cos(anglePara);

        var distV = 0;
        var distH = 0;
        var dist;

        var hit = new Vector();
        var wall = new Vector();
        var slope = (sinThetaValue/cosThetaValue);
        var dx = right ? 1: -1;
        var dy = dx * slope;

        var x = right ? Math.ceil(this.player.pos.x) : Math.floor(this.player.pos.x);
        var y = this.player.pos.y + (x - this.player.pos.x);
        while(x >= 0 && x < 32 && y >= 0 && y < 24) {
            wall.x = Math.floor(Math.floor(x + (right ? 0  : -1)));
            wall.y = Math.floor(y);
            if (this.mapClone[wall.y][wall.x] != 0) {
                dist = distV = Math.sqrt(Math.pow(x - this.player.pos.x,2) + Math.pow(y-this.player.pos.y,2));
                hit.x = x;
                hit.y = y;
                break;
            }

            x += dx;
            y += dy;
        }

        //horizontal

        slope = cosThetaValue/sinThetaValue;
        dy  = up?-1:1;
        dx = dy * slope;

        y = up ? Math.floor(this.player.pos.y):Math.ceil(this.player.pos.y);
        x = this.player.pos.x + ((y - this.player.pos.y) * slope);

        while (x >= 0 && x < 32 && y > 0 && y < 24) {
            wall.x = Math.floor(x);
            wall.y = Math.floor(y + (up ? -1:0));
            if(this.mapClone[wall.y][wall.x] != 0) {
                distH = Math.sqrt(Math.pow(x - this.player.pos.x,2) + Math.pow(y-this.player.pos.y,2));
                if (!distV || distH < distV) {
                    dist = distH;
                    hit.x = x;
                    hit.y = y;
                }
                break;
            }
            x += dx;
            y += dy;
        }

        if (dist) {
            dist = Math.sqrt(dist);
            var angle = this.player.alpha - anglePara;
            var fishEyeRemoveD = dist * Math.cos(angle);
            // this.renderStrip(stripID,fishEyeRemoveD);
            
            
        this.drawRay(hit, anglePara);
        }
    }

    renderStrip(stripID, dist) {
        var height  = Math.round((MAP_SCALE * dist)/VIEW_DIST);
        var topOffset = ((this.projectionPlaneHeight - height)/2);
        var leftoffset = stripID * this.pixelWidth;
        var opacity = (0.5/dist) * 6;

        this.player.rayContext.fillStyle = "rgba(255,0,0," + opacity + ")";
        this.player.rayContext.fillRect(
            leftoffset,
            topOffset,
            this.pixelWidth,
            height
        );

    };

    drawRay(ray, angle) {
        console.log("hey ray caster")
        this.player.strokeStyle = 'rgba(255,240,0,0.5)';
        this.player.rayContext.beginPath();
        this.player.rayContext.moveTo(
            this.player.pos.x * MAP_SCALE ,
            this.player.pos.y * MAP_SCALE
        );
        this.player.rayContext.lineTo(
            ray.x * MAP_SCALE, //* Math.cos(angle),
            ray.y * MAP_SCALE //* Math.sin(angle)
        );
        this.player.rayContext.closePath();
        this.player.rayContext.stroke();
    }
}

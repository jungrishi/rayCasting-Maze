class Light extends MapWorld{
    constructor(projectionPlaneWidth, pixelWidth, dist, numRays, player, context) {
        super();
        this.player = player;
        this.projectionPlaneWidth = projectionPlaneWidth;
        this.pixelWidth = pixelWidth;
        this.perpdistance = dist;
        this.numRays = numRays;
        this.dist = 0;
        this.wall = new Vector();
        this.ctx3D = context;
    }

    castRay() {
        let stripID = 0;
        let rayViewDist;

        for(let i=0;i<this.numRays;i++) {
            let rayPosition = (-this.numRays/2 + i) * this.pixelWidth;
            rayViewDist = Math.sqrt(rayPosition  * rayPosition + this.perpdistance * this.perpdistance);
            let rayAngle = Math.asin(rayPosition/rayViewDist);
            this.castSingleRay(
                rayAngle + this.player.alpha, stripID++
            );
        }
    }

    castSingleRay(angle, stripID) {
        let sinThetaValue,cosThetaValue, anglePara;
        anglePara = normalizeAngle(angle);

        let isFacingRight = (anglePara > DOUBLEPI * 0.75 || anglePara < DOUBLEPI * 0.25);
        let isFacingdown = (anglePara >= 0 && anglePara <= Math.PI);
        let isFacingUp = !isFacingdown;
        
        sinThetaValue = Math.sin(anglePara);
        cosThetaValue = Math.cos(anglePara);

        let intensity;
        let distV = 0;
        let distH = 0;
        let dist;

        let hit = new Vector();//ray hitting block coordinate
        let wall = new Vector();//block coordinate
        let slope = (sinThetaValue/cosThetaValue);
        let dx = isFacingRight ? 1: -1;//stepx
        let dy = (dx * slope) ;//stepy


//vertical grid
        let x = isFacingRight ? Math.ceil(this.player.pos.x) : Math.floor(this.player.pos.x);
        let y = this.player.pos.y + (x - this.player.pos.x) * slope;
        
        while(x >= 0 && x < this.mapWidth && y >= 0 && y < this.mapHeight) {
            wall.x = Math.floor(x + (isFacingRight ? 0  : -1));
            wall.y = Math.floor(y);
            
            if (this.map[wall.y][wall.x] != 0) {
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
        dy  = isFacingUp? -1 : 1;
        dx = dy * slope;

        y = isFacingUp ? Math.floor(this.player.pos.y):Math.ceil(this.player.pos.y);
        x = this.player.pos.x + ((y - this.player.pos.y) * slope);

        while (x >= 0 && x < this.mapWidth && y > 0 && y < this.mapHeight) {
            wall.x = Math.floor(x);
            wall.y = Math.floor(y + (isFacingUp ? -1: 0));
            if(this.map[wall.y][wall.x] > 0) {
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
            let angle = this.player.alpha - anglePara ; 
            let fishEyeRemoveD = dist * Math.cos(angle);
            this.renderStrip(stripID,fishEyeRemoveD, intensity);
            this.drawRay(hit);
        }
    }

    renderStrip(stripID, dist, intensity) {
        // console.log(distanceProjection);
        let wallStripHeight = (MAP_SCALE / dist) * VIEW_DIST;
        console.log(wallStripHeight);
        let opacity = (0.7/dist) * 1;
        let c1, c2, c3;
        // if (dist > 3){
        //     dist = dist/CANVAS_HEIGHT; 
        //     if (dist >0 && dist<0.3) {
        //         c1 = Math.random() * 256;
        //         c2 = Math.random() * 256;
        //         c3 = Math.random() * 256;
        //     }

        //     else {
        //         c1 = 0;
        //         c2 = 0;
        //         c3 = 0;

        //     }
        // }        
        // else {
            c1 = 255;
            c2 = 0;
            c3 = 0
        // }
        this.ctx3D.fillStyle = "rgba("+c1+" ,"+c2+", "+c3+", "+ opacity +")";
        this.ctx3D.fillRect(
                            stripID * this.pixelWidth + this.mapWorldWidth,
                            (PROJECTION_PLANE_HEIGHT - wallStripHeight)/2 + this.mapWorldHeight,
                            this.pixelWidth,
                            wallStripHeight
                        );
    };

    drawRay(ray) {
        // this.ctx3D.beginPath();
        this.ctx3D.lineWidth= 0.5;
        this.ctx3D.beginPath();
        this.ctx3D.fillStyle = "red";
        this.ctx3D.moveTo(
            this.player.pos.x * MAP_SCALE * SCALE_FACTOR ,
            this.player.pos.y * MAP_SCALE * SCALE_FACTOR
        );
        this.ctx3D.lineTo(
            ray.x * MAP_SCALE * SCALE_FACTOR, 
            ray.y * MAP_SCALE * SCALE_FACTOR 
        );
        this.ctx3D.closePath();
    }
}

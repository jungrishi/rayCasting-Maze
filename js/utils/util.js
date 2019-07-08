function degToRadian(deg) {
    return  (deg * Math.PI /180);
}

function normalizeAngle(angle) {
    angle %= DOUBLEPI;
    if(angle < 0) {
        angle += DOUBLEPI;
    }
    return angle; 
}

function pythDistance(x1,y1,x2,y2) {
    return Math.sqrt(distanceSquared(x1,y1,x2,y2))
}

function distanceSquared (x1,y1,x2,y2) {
    return ((x2-x1)*(x2-x1) + (y2-y1) * (y2-y1));
}
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

function inRange(x, min, max) {
    return ((x-min) * (x-max) <= 0);
}
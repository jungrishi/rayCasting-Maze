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
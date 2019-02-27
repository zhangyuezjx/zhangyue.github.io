var cbc = document.getElementById("changebc");
var x = 90,
    y = 90;
var flagx = 0;
flagy = 2;
setInterval(function () {
    cbc.style.background = "linear-gradient(" + x + "deg, #3AA17E 10%, #00537E " + y + "%)";
    if (flagx == 0) {
        x++;
        if (x == 360) {

            flagx = 1;
        }
    } else if (flagx == 1) {
        x--;
        if (x == 90) {
            flagx = 2;
            flagy = 0;
        }
    }

    if (flagy == 0) {
        y++;
        if (y == 200) {
            flagy = 1;
        }
    } else if (flagy == 1) {
        y--;
        if (y == 90) {
            flagy = 2;
            flagx = 0;
        }
    }
}, 30);
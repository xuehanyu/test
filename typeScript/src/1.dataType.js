var arr = [2, 'hello'];
var num = 1;
num = null;
function fn() {
    console.log('111');
}
var r = fn();
var Color;
(function (Color) {
    Color[Color["Red"] = 2] = "Red";
    Color[Color["Green"] = 3] = "Green";
})(Color || (Color = {}));
var c = Color.Green;
console.log(c);

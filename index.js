var canvas = document.querySelector('canvas');
var contex = canvas.getContext('2d');

canvas.resolution = 10;
canvas.width = 100;
canvas.height = 100;
var columns = canvas.width / canvas.resolution;
var rows = canvas.height / canvas.resolution;
var grid;

(function buildGrid() {
    grid = new Array(columns).fill(null)
        .map(()=> new Array(rows).fill(null));
    return grid;
})();

console.log(grid);


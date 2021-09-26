var button = document.querySelector('button');
var canvas = document.querySelector('canvas');
var ctx;
if (canvas.getContext) {
    ctx = canvas.getContext('2d');
} else {
    console.log('canvas not supported');
}
 
canvas.resolution = 10;
canvas.width = 100;
canvas.height = 100;
var columns = canvas.width / canvas.resolution;
var rows = canvas.height / canvas.resolution;
var grid;

(function buildGrid() {
    grid = new Array(columns).fill(null)
        .map(()=> new Array(rows).fill(0));
    return grid;
})();

function render(grid) {
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            var cell = grid[x][y];

            ctx.fillStyle = '#000';
            ctx.strokeRect(x*columns, y*rows, columns, rows);
        }
    }
};
$('button').on('click',()=> render(grid));


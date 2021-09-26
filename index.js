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

function buildGrid() {
    grid = new Array(columns).fill(null)
        .map(()=> new Array(rows).fill(null)
            .map(()=> Math.floor(Math.random() * 2)));
    //return grid;
};

function fillGrid(grid) {
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            var cell = grid[y][x];
            ctx.rect(x*columns, y*rows, columns, rows);
            
            if (cell == 1) {
                ctx.fillStyle = 'black';
                ctx.fillRect(x*columns, y*rows, columns, rows);  
                ctx.strokeRect(x*columns, y*rows, columns, rows);
            } else {
                ctx.fillStyle = 'white'
                ctx.fillRect(x*columns, y*rows, columns, rows);
                ctx.strokeRect(x*columns, y*rows, columns, rows);
                
            }
        }
    }
};
function showGrid () {
    buildGrid();
    fillGrid(grid);
}
$('button').on('click',()=> showGrid());

// Any live cell with two or three live neighbours survives.
// Any dead cell with three live neighbours becomes a live cell.
// All other live cells die in the next generation. Similarly, all other dead cells stay dead.
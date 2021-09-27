var button = document.querySelector('button');
var canvas = document.querySelector('canvas');
var ctx;
var newGeneration;
var grid;
if (canvas.getContext) {
    ctx = canvas.getContext('2d');
} else {
    console.log('canvas not supported');
}
 
var resolution = 10;
canvas.width = 800;
canvas.height = 800;
var columns = canvas.width / resolution;
var rows = canvas.height / resolution;

function buildGrid() {    
    grid = new Array(columns).fill(null)
        .map(()=> new Array(rows).fill(null)
            .map(()=> Math.floor(Math.random() * 2)));
    //return grid;
};
function renderGrid(grid) {
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

function evolution() {
    newGeneration = grid.map(arr => [...arr]);
    var numOfNeighbors, currentNeighbor;
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            var cell = grid[y][x];
            numOfNeighbors = 0;
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (i == 0 && j== 0 ) {
                        continue;
                    }

                    var xCell = x + i;
                    var yCell = y + i;

                    if (xCell != -1 && xCell < columns && yCell != -1 &&  yCell < rows) {
                        currentNeighbor = grid[y+i][x+j]
                        numOfNeighbors += currentNeighbor;
                    }
                }
            }
            if (cell == 1 && numOfNeighbors != 2 ||
                cell == 1 && numOfNeighbors != 3) {
                    newGeneration[y][x] = 0;
            } else if (cell == 0 && numOfNeighbors == 3) {
                    newGeneration[y][x] = 1;
            }
                    
        }
    }
    grid = newGeneration.map(arr => [...arr]);
    renderGrid(grid);
}


function updateGrid() {
    evolution();
    requestAnimationFrame(updateGrid);
}
//requestAnimationFrame(updateGrid);
function showGrid () {
    buildGrid();
    renderGrid(grid); 
}
$('#build').on('click',()=> showGrid());
$('#evolve').on('click',()=> updateGrid());

// Any live cell with two or three live neighbours survives.
// Any dead cell with three live neighbours becomes a live cell.
// All other live cells die in the next generation. Similarly, all other dead cells stay dead.
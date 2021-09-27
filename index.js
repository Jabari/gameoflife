var button = document.querySelector('button');
var canvas = document.querySelector('canvas');
var columns, ctx, grid, newGeneration, rows;

if (canvas.getContext) {
    ctx = canvas.getContext('2d');
} else {
    console.log('canvas not supported');
}
 
var resolution = 10;

function initValues(savedValues) {
    canvas.width = savedValues || $('#universe-size').val();
    canvas.height = canvas.width;   
    columns = canvas.width / resolution;
    rows = canvas.height / resolution;
}
function buildGrid() { 
    grid = new Array(columns).fill(null)
        .map(()=> new Array(rows).fill(null)
            .map(()=> Math.floor(Math.random() * 2)));
};
function renderGrid(grid) {
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            var cell = grid[y][x];
           // ctx.rect(x*columns, y*rows, columns, rows);
            ctx.strokeRect(x*resolution, y*resolution, resolution, resolution);
            if (cell == 1) {
                ctx.fillStyle = 'black';
                ctx.fillRect(x*resolution, y*resolution, resolution, resolution);  
                
            } else {
                ctx.fillStyle = 'white'
                ctx.fillRect(x*resolution, y*resolution, resolution, resolution);                
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

            if (cell == 1 && numOfNeighbors < 2) {
                newGeneration[y][x] = 0;
              } else if (cell === 1 && numOfNeighbors > 3) {
                newGeneration[y][x] = 0;
              } else if (cell === 0 && numOfNeighbors === 3) {
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
    initValues();
    buildGrid();
    renderGrid(grid);
    updateGrid() 
}

function save() {
    localStorage.setItem('gameOfLife', JSON.stringify(grid));
}
function load() {
    var savedLife = localStorage.getItem('gameOfLife');
    grid = JSON.parse(savedLife);
    initValues(grid.length * 10);
    renderGrid(grid);
    updateGrid() 
}

$('#evolve').on('click', ()=> showGrid());
$('#save').on('click', ()=> save());
$('#load').on('click', ()=> load());
// Any live cell with fewer than two live neighbours dies, as if by underpopulation.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overpopulation.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
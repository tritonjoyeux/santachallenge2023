const heightI = 100;    // number of rows
const widthI = 130;   // number of columns
let ice = new Array(widthI * heightI).fill(0); // declare and reset the array that holds the value of all the tiles

let contextI = document.getElementById('myCanvasIce').getContext('2d');
window.requestAnimationFrame(iceA);

function iceA() {
  for (let i = 0; i < widthI; i++)
    ice[i + widthI] = Math.random() * 255; // randomize the 2nd row from the bottom

  for (let y = heightI; y > 1; y--)           // every row
    for (let x = 0; x < widthI; x++) {  // every column
      let i = y * widthI + x;   // convert the x and y coordinates to the array index
      ice[i] = Math.floor((                // add the cell values:
        ice[(y - 1) * widthI + (x - 1 + widthI) % widthI] +     // below, left
        ice[(y - 1) * widthI + (x + widthI) % widthI] +     // immediately below
        ice[(y - 1) * widthI + (x + 1 + widthI) % widthI] +        // below, right
        ice[(y - 2) * widthI + (x + widthI) % widthI]        // two rows below
      ) / 4.04);
    }                        // division to lower the value as the ice goes up

  for (let i = widthI * 4; i < widthI * heightI; i++) {        // now we're drawing the ice on the screen
    contextI.beginPath();        // convert the index value i to screen coordinates and draw a box
    contextI.rect((i % widthI) * 10, (heightI - Math.floor(i / widthI)) * 10, 10, 10);
    contextI.fillStyle = 'rgb(0,0,' + ice[i] + ')'; // the red component of the RGB color is the value of the cell.
    contextI.fill();
  }
  window.requestAnimationFrame(iceA);
}

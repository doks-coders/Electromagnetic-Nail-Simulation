///Nail Section///
let animation = 0
let distanceFromNailToBa3 = 300
let nailHeadOriginX = 500
let nailYCoordinate = 120

let nailHeadOriginY = 10 + nailYCoordinate
let nailHeadWidth = 50
let nailHeadHeight = 10
let nailHeight = 200

/////Battery Section///
let batteryOriginX = nailHeadOriginX - distanceFromNailToBa3
let terminalYOrigin = nailHeight / 4 + nailHeadHeight + nailYCoordinate

let widthOfBattery = 50
let heightOfBattery = (nailHeight / 4) * 2
let terminalXOrigin = widthOfBattery / 4


let currentEntered 
let turnsNumber 
let permeability 
let permeabilityconstant 

let flux_density 

let fluxH 

let radiusOfField 
let areaOFCylinderHead
let areaOFCylinderBody

let terminalHeight = 10

function setup() {
  createCanvas(800, 400);
  noStroke();
  frameRate(30);
  background(255, 204, 0);


}
function draw() {

 currentEntered =  Number(document.getElementById('CurrentInput').value)
 turnsNumber = Number(document.getElementById('WireTurns').value) 
 permeability = Number(document.getElementById('Permeability').value)
 flux_density = Number(document.getElementById('flux_density').value)

 document.getElementById('currentValue').textContent =currentEntered 
 document.getElementById('turnsValue').textContent =turnsNumber
 document.getElementById('permeablityValue').textContent =permeability
 document.getElementById('flux_densityValue').textContent =flux_density



permeabilityconstant = 4*(pow(10,-7))

 
 

 fluxH = flux_density/(permeability*permeabilityconstant)

 

 radiusOfField = (turnsNumber* currentEntered)/ (2*PI*fluxH)
 document.getElementById('radius').textContent =radiusOfField

let radiusOfNailHead = nailHeadWidth/2
let radiusOfBody = nailHeadWidth / 4
 areaOFCylinderHead = PI * pow(radiusOfNailHead,2) * nailHeadHeight
 areaOFCylinderBody = PI * pow(radiusOfBody,2) * nailHeight

 document.getElementById('TotalMagneticFlux').textContent = (areaOFCylinderBody + areaOFCylinderBody) * flux_density

  background('#fff');
  strokeWeight(1)
  fill(100)
  stroke(0)
  drawBattery()
  drawNail()
  drawConnections()
  drawFields()
  dragObject()
  moveObjectEl()



}
function drawBattery() {
  drawNorthTerminal()
  drawBatteryCenter()
  drawSouthTerminal()
}
function drawNorthTerminal() {
  let UpdatedOriginX = terminalXOrigin + batteryOriginX
  let UpdatedWidth = terminalXOrigin * 2

  rect(UpdatedOriginX, terminalYOrigin, UpdatedWidth, terminalHeight)
}
function drawBatteryCenter() {
  let UpdatedOriginY = terminalHeight + terminalYOrigin
  fill(204, 10, 0);
  rect(batteryOriginX, UpdatedOriginY, widthOfBattery, heightOfBattery)
}
function drawSouthTerminal() {
  let UpdatedOriginX = terminalXOrigin + batteryOriginX
  let UpdatedOriginY = heightOfBattery + terminalHeight + terminalYOrigin
  let UpdatedWidth = terminalXOrigin * 2
  fill(100)
  rect(UpdatedOriginX, UpdatedOriginY, UpdatedWidth, terminalHeight)
}


function drawNail() {
  strokeWeight(1)
  
  
  let numberOFturns = turnsNumber 


  let nailUpdatedOriginY = nailHeadOriginY + nailHeadHeight
  let nailHalfSection = nailHeadWidth / 4
  let nailUpdatedWidth = (nailHalfSection) * 2
  strokeWeight(1)
  //Nail Body
  rect(nailHeadOriginX + nailHalfSection, nailHeadOriginY + nailHeadHeight, nailUpdatedWidth, nailHeight) //body


  //turns
  let sections = (nailHeight + nailHeadHeight) / numberOFturns
  /*
  
  */
  let diagonal = sqrt(pow(sections, 2) + pow(nailUpdatedWidth, 2))
  strokeWeight(4)
  stroke(204, 102, 0)
  line(nailHeadOriginX + nailHalfSection, nailUpdatedOriginY, nailHeadOriginX + nailHalfSection + nailUpdatedWidth, nailUpdatedOriginY + sections - 10);
  //x1, y1, x2, y2
  for (var i = 1; i < (numberOFturns); i++) {
    line(nailHeadOriginX + nailHalfSection, nailUpdatedOriginY + sections * i, nailHeadOriginX + nailHalfSection + nailUpdatedWidth, (nailUpdatedOriginY + sections + sections * i) - 10);

  }
  stroke(0)
  strokeWeight(1)
  //Nail Head
  rect(nailHeadOriginX, nailHeadOriginY, nailHeadWidth, nailHeadHeight) //head
}


function drawConnections() {
  strokeWeight(4)
  stroke(204, 102, 0)
  let nailHalfSection = nailHeadWidth / 4

  let NorthTerminalOriginX = terminalXOrigin + batteryOriginX + terminalXOrigin
  let SouthTerminalOriginX = terminalXOrigin + batteryOriginX + terminalXOrigin
  let NorthLength = 3
  let UpdatedOriginY = heightOfBattery + terminalHeight + terminalYOrigin + terminalHeight
  //North Terminal

  relativeTiplength = heightOfBattery / 5
  line(NorthTerminalOriginX, terminalYOrigin, NorthTerminalOriginX, terminalYOrigin - relativeTiplength);

  line(NorthTerminalOriginX, terminalYOrigin - relativeTiplength, nailHeadOriginX + nailHalfSection, terminalYOrigin - relativeTiplength);

  //South Terminal
  line(SouthTerminalOriginX, UpdatedOriginY, SouthTerminalOriginX, UpdatedOriginY + relativeTiplength);
  line(SouthTerminalOriginX, UpdatedOriginY + relativeTiplength, nailHeadOriginX + nailHalfSection, UpdatedOriginY + relativeTiplength);


  //Connecting to battery



}

let finalRadius = 0
let maxRadius = 10
let Head_widthEl = nailHeadWidth //min width of field
let Head_heightEl = nailHeadWidth //min height of field

let Bottom_widthEl = nailHeadWidth/2 //min width of field
let Bottom_heightEl = nailHeadWidth/2 //min height of field


function drawFields() {
  noFill()
  stroke(0)
  strokeWeight(1)
  maxRadius = radiusOfField
  let MaxDensityPercentage =50
  


  let MaxDensityValue = (MaxDensityPercentage * maxRadius) / 100
  let density = 0.5
  let density1 = density
  let density2 = density

  let newX = nailHeadOriginX + nailHeadWidth / 2


  for (var i = 0; i < maxRadius; i++) {
   
    if (i > MaxDensityValue) {
      arc(newX, nailHeadOriginY, Head_widthEl + density1 * i, Head_heightEl + density1 * i, animation++, 0 - animation++);
    } else {
      stroke(204, 50, 0);
      arc(newX, nailHeadOriginY, Head_widthEl + density1 * i, Head_heightEl + density1 * i, animation++, 0 - animation++);

    }
    stroke(0);
    density1++
  }

 
  for (var i = 0; i < maxRadius; i++) {
    if (i > MaxDensityValue) {
      arc(newX, nailHeadOriginY +nailHeadHeight+ nailHeight , Bottom_widthEl + density2 * i, Bottom_heightEl + density2 * i, animation++, 0 - animation++);
    } else {
      stroke(204, 50, 0);
      arc(newX, nailHeadOriginY +nailHeadHeight+ nailHeight, Bottom_widthEl + density2 * i, Bottom_heightEl + density2 * i, animation++, 0 - animation++);
    }
   // console.log(`heightEl : ${heightEl} +  density2 : ${density2} * i:${i} -> ans: ${heightEl + density2 * i}`)
    stroke(0);
    density2++
  }
 
}


//Drag and Drop Object

 
let bx = 100
let by = 50
let boxWidth = 75;
let boxHeight = 30;
let overBox = false;
let locked = false;
let xOffset = 0.0; 
let yOffset = 0.0; 
let moveObjectN = false
let moveObjectS = false



function dragObject() { 
  
  
  // Test if the cursor is over the box 
  if (mouseX > bx-boxWidth && mouseX < bx+boxWidth && 
      mouseY > by-boxHeight && mouseY < by+boxHeight) {
    overBox = true;  
    if(!locked) { 
      stroke(255); 
      fill(153);
    } 
  } else {
    stroke(153);
    fill(153);
    overBox = false;
  }
  
  // Draw the box
  rect(bx, by, boxWidth, boxHeight);
}

function mousePressed() {
  if(overBox) { 
    locked = true; 
    moveObjectN = false
    moveObjectS = false
    fill(200);
  } else {
    locked = false;
  }
  xOffset = mouseX-bx; 
  yOffset = mouseY-by; 

}

function mouseDragged() {
  if(locked) {
    bx = mouseX-xOffset; 
    by = mouseY-yOffset; 
  }
}

function mouseReleased() {

  if(radiusOfField){
  locked = false;

  let newX = nailHeadOriginX + nailHeadWidth / 2


 
  
  //-> This would give us the Length of the square that would be used for our field
  let density = 0.5 + (maxRadius-1) 

  //This equation will use nailHead as the minimum radius to set the mood
  let LengthTop = nailHeadWidth + density * (maxRadius)
  
let XofField = (newX-(LengthTop /2) )
let YofField = (nailHeadOriginY-(LengthTop /2)) 








 // rect(XofField,YofField,LengthTop, LengthTop )

  
  
  if ((bx+boxWidth > XofField && bx+boxWidth < XofField+LengthTop && 
    by+boxHeight > YofField && by+boxHeight < LengthTop+YofField)||
    (bx> XofField && bx< XofField+LengthTop && 
      by > YofField && by < LengthTop+YofField)||
      (bx> XofField && bx< XofField+LengthTop && 
        by+boxHeight > YofField && by+boxHeight < LengthTop+YofField)||
        (bx> XofField && bx< XofField+LengthTop && 
          by+boxHeight > YofField && by+boxHeight < LengthTop+YofField)||
          (bx+boxWidth> XofField && bx+boxWidth< XofField+LengthTop && 
            by > YofField && by < LengthTop+YofField))
        
    {


  overBox = true;  
  moveObjectN = true
  if(!locked) { 
    stroke(255); 
    fill(153);
  } 
} else {
  stroke(153);
  fill(153);
  overBox = false;
  moveObjectN = false
}
//  rect(nailHeadOriginX + nailHalfSection, nailHeadOriginY + nailHeadHeight, nailUpdatedWidth, nailHeight) //body

 //This equation will use nailHead as the minimum radius to set the mood
 let LengthBottom = (nailHeadWidth/2) + density * (maxRadius)

let XofFieldS = (newX-(LengthBottom )/2 )
let YofFieldS = (nailHeadOriginY +nailHeadHeight+ nailHeight)-LengthBottom/2

if ((bx+boxWidth > XofFieldS && bx+boxWidth < XofFieldS+LengthBottom && 
  by+boxHeight > YofFieldS && by+boxHeight < LengthBottom+YofFieldS)||
  (bx> XofFieldS && bx< XofFieldS+LengthBottom && 
    by > YofFieldS && by < LengthBottom+YofFieldS)||
    (bx> XofFieldS && bx< XofFieldS+LengthBottom && 
      by+boxHeight > YofFieldS && by+boxHeight < LengthBottom+YofFieldS)||
      (bx + boxWidth> XofFieldS && bx + boxWidth< XofFieldS+LengthBottom && 
        by > YofFieldS && by < LengthBottom+YofFieldS))
  {
overBox = true;  
moveObjectS = true
if(!locked) { 
  stroke(255); 
  fill(153);
} 
} else {
stroke(153);
fill(153);
overBox = false;
moveObjectS = false
}

}

}



 

let rad = 60;        // Width of the shape
let xpos = 4 ;    // Starting position of shape    
let ypos = 4
let xspeed = 20;  // Speed of the shape
let yspeed = 20;  // Speed of the shape

let xdirection = 30;  // Left or Right
let ydirection = 1;  // Top to Bottom
let width = 200
let height = 200
  xpos = width/2;
  ypos = height/2;


function moveObjectEl() 
{

  xspeed = 20

  let centerX = nailHeadOriginX + nailHeadWidth / 2

if(moveObjectN){
//This is to animate the objects to the chosen coordinates
let X = centerX-boxWidth/2
let Y = nailHeadOriginY-10
  if(X>bx){
bx = bx+xspeed 
  }
  if(X<bx){
    bx = bx -xspeed
      }

  if(bx==centerX){
bx = centerX

 }
  if(Y>by){
    by = by+xspeed
      }
      if(by==nailHeadOriginY){
        by = nailHeadOriginY
         }
      if(Y<by){
    by = by-xspeed
      }
}



if(moveObjectS){
  //This is to animate the objects to the chosen coordinates
  let X = centerX-boxWidth/2
  let Y = (nailHeadOriginY +nailHeight)-10
    if(X>bx){
  bx = bx+xspeed 
    }
    if(X<bx){
      bx = bx -xspeed
        }
  
    if(bx==centerX){
  bx = centerX
  
   }
    if(Y>by){
      by = by+xspeed
        }
        if(by==nailHeadOriginY){
          by = nailHeadOriginY
           }
        if(Y<by){
      by = by-xspeed
        }
  }

  // Draw the shape

}
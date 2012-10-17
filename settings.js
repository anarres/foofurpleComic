//  d = default
var dBgColor = "3496CF";
var dBgArt = "images/backgroundArt/bubbles.png";
var dLeftKittyUrl = "images/kitties/left/lemmling_Cartoon_cow.png";
var dRightKittyUrl= "images/kitties/right/lemmling_Cartoon_sheep.png";

var dltext = "";
var drtext = "";
var dBubbleMode = 0;

var charsPerLine = 18;
var maxLines = 9;
var maxChars = charsPerLine*maxLines;

var panelWidth = 400;
var panelHeight = 300;
var textareaWidth=185;

var printX = 20;
var printX2 = 220;
var printTop = 30;
var printLineHeight = 17;

var leftBubbleX = 10;
var rightBubbleX = 210;
var bubbleY = 9;

var kitty1X = 50;
var kitty2X = 250;
var kittyY = 200;

var borderWidth = 4;   // Canvas only for now

// Takes the index of the panel, and returns coords x0,y0,x1,y1
// pIndex is BASE ZERO
function getX0(pIndex) {
    var x0 = borderWidth;
    if (pIndex % 2 == 1) {
        x0 = panelWidth + 3*borderWidth;
    }
    return x0;
}
function getY0(pIndex) {
    var multiplier = parseInt(pIndex/2);
    var result = borderWidth + multiplier*(panelHeight + 2*borderWidth);
    return result;
}
function getCanvasWidth(numPanels) {
    var result = 2*panelWidth + 4*borderWidth;
    if (numPanels == 1) {
        result = panelWidth + 2*borderWidth;
    }
    return result;
}
function getCanvasHeight(numPanels) {

    var index = numPanels - 1;
    var multiplier = parseInt(index/2);
    var result = 2*borderWidth + panelHeight + multiplier*(panelHeight + 2*borderWidth);

    // Add 100 for metadata for now
    return result + 100;
}


/* TESTS (NB somewhat ironically, these are all broken) */
function getX0Test() {
    var result = "getX0Test... ";
    if (getX0(0) != 0) { result += "failed"; } 
    if (getX0(1) != 400) { result += "failed"; }  
    if (getX0(2) != 0) { result += "failed"; }  
    if (getX0(3) != 400) { result += "failed"; }
    return result;
}
function getY0Test() {
    var result = "getY0Test... ";
    if (getY0(0) != 0) { result += "failed"; } 
    if (getY0(1) != 0) { result += "failed"; }  
    if (getY0(2) != 300) { result += "failed"; }  
    if (getY0(3) != 300) { result += "failed"; }
    if (getY0(4) != 600) { result += "failed"; }  
    if (getY0(5) != 600) { result += "failed"; }
    return result;
}
function getCanvasWidthTest() {
    var result = "getCanvasWidthTest... ";
    if (getCanvasWidth(1) != 400) { result += "failed"; }
    if (getCanvasWidth(2) != 800) { result += "failed"; }
    if (getCanvasWidth(3) != 800) { result += "failed"; }
    if (getCanvasWidth(4) != 800) { result += "failed"; }
    return result;
}
function getCanvasHeightTest() {
    var result = "getCanvasHeightTest... ";
    if (getCanvasHeight(1) != 300) { result += "failed"; }
    if (getCanvasHeight(2) != 300) { result += "failed"; }
    if (getCanvasHeight(3) != 600) { result += "failed"; }
    if (getCanvasHeight(4) != 600) { result += "failed"; }
    if (getCanvasHeight(5) != 900) { result += "failed"; }
    return result;
}

function runTests() {
    alert(getX0Test());  
    alert(getY0Test());  
    alert(getCanvasWidthTest());
    alert(getCanvasHeightTest());
}    

//runTests();









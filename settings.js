//  d = default
var dBgColor = "3496CF";
var dBgArt = "images/backgroundArt/bubbles.png";
var dLeftKittyUrl = "images/kitties/left/lemmling_Cartoon_cow.png";
var dRightKittyUrl= "images/kitties/right/lemmling_Cartoon_sheep.png";

var dltext = "";
var drtext = "";
var dBubbleMode = 0;

var charsPerLine = 25;
var maxLines = 10;
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
    return borderWidth;
}
function getY0(pIndex) {
    var multiplier = parseInt(pIndex);
    var result = borderWidth + multiplier*(panelHeight + 2*borderWidth);
    return result;
}
function getCanvasWidth(numPanels) {
    var result = panelWidth + 2*borderWidth;
    return result;
}
function getCanvasHeight(numPanels) {
    var index = numPanels - 1;
    var multiplier = parseInt(index);
    var result = 2*borderWidth + panelHeight + multiplier*(panelHeight + 2*borderWidth);

    // Add 100 for metadata for now
    return result + 150;
}

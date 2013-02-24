//  d = default
var dBgColor = "3496CF";
var dBgArt = "images/backgroundArt/bubbles.png";
var dLeftKittyUrl = "images/kitties/left/lemmling_Cartoon_cow.png";
var dRightKittyUrl= "images/kitties/right/lemmling_Cartoon_sheep.png";

var dltext = "";
var drtext = "";
var dBubbleMode = 0;

var charsPerLine = 23;
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

var defaultImagesArray = [
{'bgColor':'FFE3A3','bgArt':'images/backgroundArt/city_skyline.png','left':'images/kitties/left/little-robo.png', 'right':'images/kitties/right/flying-things6.png'},
{'bgColor':'3496CF','bgArt':'images/backgroundArt/Farm-Landscape.jpg','left':'images/kitties/left/lemmling_Cartoon_cow.png', 'right':'images/kitties/right/lemmling_Cartoon_sheep.png'}, 
{'bgColor':'5acbed','bgArt':'images/backgroundArt/mochovka-cloudy.png','left':'images/kitties/left/kitty.png', 'right':'images/kitties/right/fox.png'},
{'bgColor':'5acbed','bgArt':'images/backgroundArt/summerCartoon.jpg','left':'images/kitties/left/kitty.png', 'right':'images/kitties/right/fox.png'},
{'bgColor':'cbcf99','bgArt':'images/backgroundArt/ufo-invasion.png','left':'images/kitties/left/shiny-octopus.png', 'right':'images/kitties/right/shiny-octopus2.png'},
{'bgColor':'f2aeb1','bgArt':'images/backgroundArt/celtic-vine-border.png','left':'images/kitties/left/phique_owl1.png', 'right':'images/kitties/right/phique_owl2.png'},
{'bgColor':'30b1fc','bgArt':'images/backgroundArt/Clue_Simple_Clouds.png','left':'images/kitties/left/critter.png', 'right':'images/kitties/right/critter2.png'}];

// pIndex is 0, 1, 2, ...

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

    // Add 150 for metadata for now
    return result + 150;
}



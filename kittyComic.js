//  d = default
var dBgColor = "3496CF";
var dBgArt = "images/backgroundArt/bubbles.png";
var dLeftKittyUrl = "images/kitties/left/lemmling_Cartoon_cow.png";
var dRightKittyUrl= "images/kitties/right/lemmling_Cartoon_cow.png";
var dltext = "Lorem ipsum sic dolor amet.";
var drtext = "Gesundheit.";

// Kitty positions
var kitty1X = 60;
var kitty1Y = 195;
var kitty2X = 240;
var kitty2Y = 195;
var dBubbleMode = 0;
var dText = "";
var charsPerLine = 18;
var maxLines = 9;
var maxChars = charsPerLine*maxLines;
var textareaWidth=185;


/* Bubble Object */
function Bubble(text, bubbleMode, leftOrRight, hasFocus) {
    this.text = text;
    this.bubbleMode = parseInt(bubbleMode);
    this.leftOrRight = parseInt(leftOrRight);
    this.hasFocus = hasFocus;
}
/* Panel Objects */
function Panel(selected, lBubbleMode, rBubbleMode) {
    this.selected = parseInt(selected);
    this.lBubbleMode = parseInt(lBubbleMode);
    this.rBubbleMode = parseInt(rBubbleMode);
    this.lBubbleHasFocus = 0;
    this.rBubbleHasFocus = 0;
    this.ltext = dltext;
    this.rtext = drtext;
    this.leftBubble = function() {
        var b = new Bubble("", this.lBubbleMode, 0, this.lBubbleHasFocus);
        return b;
    }
    this.rightBubble = function() {
        var bb = new Bubble("", this.rBubbleMode, 1, this.rBubbleHasFocus);
        return bb;
    }
    this.blab2 = function() {
        return "Panel object<br>";
    }
}
/* The state of the whole app */
function KittyComic() {
    this.bgColor = dBgColor;
    this.bgArt = dBgArt;
    this.leftKittyUrl = dLeftKittyUrl;
    this.rightKittyUrl = dRightKittyUrl;
    this.highlit = 1;
    this.panelsArray = new Array();

    this.createPanel = function() {
        var newPanelObj = new Panel(0, 0, 0);
        this.panelsArray.push( newPanelObj );
        return newPanelObj;
    }
    this.delPanel = function() {
        var index = this.highlit-1;
        this.panelsArray.pop(index);
        if (this.highlit > this.panelsArray.length) {
            this.highlit -= 1;
        }
    }
    this.numPanels = function() {
        return this.panelsArray.length;
    }
    this.setText = function(index, lr, text) {
        if (lr === 0) { this.panelsArray[index].ltext = text; }
        else { this.panelsArray[index].rtext = text; }
    }
    this.setHighlight = function(num) {
        this.highlit = parseInt(num);
    }
    this.setBgColor = function(hexColor) {
        this.bgColor = hexColor;
    }
    this.setBubbleFocus = function(panelIndex, lr) {
        for (var i=0; i<this.panelsArray.length; i++) {
            if (panelIndex === i) {
                if (lr === 0) {
                    this.panelsArray[i].lBubbleHasFocus = 1;
                    this.panelsArray[i].rBubbleHasFocus = 0;
                }
                else {
                    this.panelsArray[i].lBubbleHasFocus = 0;
                    this.panelsArray[i].rBubbleHasFocus = 1;
                } 
            }
            else {
                this.panelsArray[i].lBubbleHasFocus = 0;
                this.panelsArray[i].rBubbleHasFocus = 0;
            }
        }
    }
    this.removeBubbleFocus = function() {
        for (var i=0; i<this.panelsArray.length; i++) {
            this.panelsArray[i].lBubbleHasFocus = 0;
            this.panelsArray[i].rBubbleHasFocus = 0;
        }
    }
    this.blab = function() {
        var output = 'KittyComic object<br>num panels: ' + this.numPanels() + "<br>";
        for (var i=0; i<this.panelsArray.length; i++) {
            output += this.panelsArray[i].blab2();
        }
        output += "<br>ALL DONE :)";
        return output;
    }
}

/*
* models.js
*
* Abstract information state of Foofurple Comics.
*/



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
        this.panelsArray = removeItemFromArray(this.panelsArray, index);
        if (this.highlit > this.panelsArray.length) {
            this.highlit = 1;
        }
    }

    this.numPanels = function() {
        return this.panelsArray.length;
    }

    this.setText = function(index, lr, text) {
        if (lr == 0) { this.panelsArray[index].ltext = text; }
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
}

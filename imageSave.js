function imageDescription() {
    var d = "A comic. ";
    d += getBgDesc(theComic.bgArt);
    d += getLeftDesc(theComic.leftKittyUrl);
    d += getRightDesc(theComic.rightKittyUrl);

    for (var i=0; i<theComic.panelsArray.length; i++) {
        if (theComic.panelsArray[i].ltext != "") {
            d += " Character 1: ";
            d += theComic.panelsArray[i].ltext;
        }
        if (theComic.panelsArray[i].rtext != "") {
            d += " Character 2: ";
            d += theComic.panelsArray[i].rtext;
        }
    }
    return d;
}



// Create a canvas version of the comic
function panelToCanvas(bgImage, leftChar, rightChar, niceBorder, leftBubbles, rightBubbles) {

    var numPanels = theComic.numPanels();
    var canvas = document.getElementById('myCanvas');
    var cHeight = getCanvasHeight(numPanels);
    var cWidth = getCanvasWidth(numPanels);         // Does not incluce space for metadata

    // Get metadata
    var mData =  "CREDITS: ";
    mData += getPrintBgMetadata(theComic.bgArt);
    mData += getPrintLeftMetadata(theComic.leftKittyUrl);
    mData += getPrintRightMetadata(theComic.rightKittyUrl);
    mData += "Mashed-up at foofurple.com/comic/.  ";

    var maxLineLengthz = numPanels * 55;
    var maxNumLinesz = 8;

    var mArray = generalLinesArray(mData, maxLineLengthz, maxNumLinesz);       // Maximum 8 lines of metadata
    var metaDataHeight = 8 + mArray.length * 12;

    cWidth += metaDataHeight;

    canvas.setAttribute("width", cWidth);
    canvas.setAttribute("height", cHeight);
    var ctx = canvas.getContext('2d');
    ctx.font = "14px UbuntuMono";

    // Panel background color
    var panelBgColor = "#" + theComic.bgColor;
    
    // For each panel
    for (var i=0; i<numPanels; i++) {

        // Get panel coordinates
        var x0 = getX0(i);
        var y0 = getY0(i);

        // Create a 2px-wide border for the panel
        ctx.fillStyle = "#444";
        ctx.fillRect(x0-2,y0-2,panelWidth+4,panelHeight+4);

        // Fill in background color
        ctx.fillStyle = panelBgColor;
        ctx.fillRect(x0,y0,panelWidth,panelHeight);

        // Draw background image
        if (bgImage) {
            ctx.drawImage(bgImage, x0, y0, panelWidth, panelHeight);
        }
        // Draw characters
        ctx.drawImage(leftChar, x0 + kitty1X, y0 + kittyY);
        ctx.drawImage(rightChar, x0 + kitty2X, y0 + kittyY);

        // Get bubble text
        var ltext = theComic.panelsArray[i].ltext;
        var rtext = theComic.panelsArray[i].rtext;

        // Get bubble number of lines of text
        var lNumLines = getNumLines(ltext);
        var rNumLines = getNumLines(rtext);

        // Draw bubbles
        ctx.drawImage(leftBubbles[i], x0+leftBubbleX , y0+bubbleY);
        ctx.drawImage(rightBubbles[i], x0+rightBubbleX , y0+bubbleY);

        // Array of strings, one per line
        var lTextArray = fooLinesArray(ltext);
        var rTextArray = fooLinesArray(rtext);

        // Text style
        ctx.fillStyle = "#000";

        // Left bubble text
        for (var lx=0; lx<lTextArray.length; lx++) {
            var x = x0 + printX;
            var y = y0 + printTop + lx * printLineHeight;
            ctx.fillText(lTextArray[lx], x, y);
        }
        // Right bubble text
        for (var rx=0; rx<rTextArray.length; rx++) {
            var x = x0 + printX2;
            var y = y0 + printTop + rx * printLineHeight;
            ctx.fillText(rTextArray[rx], x, y);
        }
    }   // Closes the for each panel loop

    // Text style 
    ctx.fillStyle = "#000";
    ctx.font = "10px UbuntuMono";

    // translate context to center of canvas, then rotate
    ctx.translate(420, cHeight-10); 
    ctx.rotate(1.5*Math.PI);

    for (var m=0; m<mArray.length; m++) {
        var x = 0;
        var y = 0 + m*metadataPrintLineHeight;
        ctx.fillText(mArray[m], x, y);
    }
    return true;
}

function displayDownloadLink() {
    document.getElementById('downloadInfo').innerHTML = "<h3>Automatically generated image description:</h3> <textarea>" + imageDescription() + "</textarea>";
    var dataUrl = document.getElementById("myCanvas").toDataURL();

    document.getElementById('downloadDiv').style.visibility = "visible";
    document.getElementById("downloadLink").setAttribute('href', dataUrl);
    document.getElementById('downloadDiv').focus();
}

function downloadImage() {
    var leftBubbles = [];
    var rightBubbles = [];
    var numPanels = theComic.numPanels();

    for (var i=0; i<numPanels; i++) {

        // Determine which type of bubble
        var lBubbleMode = theComic.panelsArray[i].lBubbleMode;
        var rBubbleMode = theComic.panelsArray[i].rBubbleMode;

        // Get bubble text
        var ltext = theComic.panelsArray[i].ltext;
        var rtext = theComic.panelsArray[i].rtext;

        // Get bubble number of lines of text
        var lNumLines = getNumLines(ltext);
        var rNumLines = getNumLines(rtext);

        var num = i+1;
        var leftID = "leftBubble" + num;
        var rightID = "rightBubble" + num;

        var leftBubble = document.getElementById(leftID);
        var rightBubble = document.getElementById(rightID);

        leftBubbles.push(leftBubble);
        rightBubbles.push(rightBubble);
    }

    // Prepare images
    var kitty1Array = getElementsByClassName(document, 'kitty1');
    var leftChar = kitty1Array[0];

    var kitty2Array = getElementsByClassName(document, 'kitty2');
    var rightChar = kitty2Array[0];

    var niceBorder = new Image();
    niceBorder.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZYAAACRCAAAAADF4cFGAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfdARMNDxiBlGNaAAAB2ElEQVR42u3YMW7iUABF0eeRIypqiogqPUIiZAHeyDRZFk02wgIgSBELyBRU1KkQSJ4iASWwgP+lnFu5fke2v930UX39MUGNtZerhTGK93xzt5yMUr7Tzd2yz91fuxTt5bi/v75blhkbpmzjLK8fYttDMzdM2ebNYfuTZbvKbGiYsg1nWX25NH1y2i8PeZzapXhvrxl0ozZp+iySNDMqVbhs+iTPnyexu/HcE6yKpg/r3fF8QHYyruf90mURP18qDQsWYcEiLFiERViwCAsWYcEiLMKCRViwCAsWYREWLMKCRViEBYuwYBEWLMIiLFiEBYuwYBEWYcEiLFiEBYuwCAsWYcEiLMKCRViwCAsWYREWLMKCRViwCIuwYBEWLMIiLFiEBYuwYBEWYcEiLFiEBYuwCAsWYcEiLFiERViwCAsWYREWLMKCRViwCIuwYBEWLMKCRViEBYuwYBEWLMIiLFiE5RfUJsnLeD40RRV9rHcXluP7v9nUJBX0tumTJE2fnPbLQx65VKDymkE3aj9ZkmxXXKpQeZp8f+VPnrL5sEvh98rmrHI5iU0G/dowZVv3g8n1AbnLzjBl26X7cUBOklGOC8sUbnTzOdkapZKvyPMBWdXl50uV/QfO2EXZOtwOkwAAAABJRU5ErkJggg==";

    niceBorder.onload = function() {
        var bgImage = false;
        if (theComic.bgArt) {
            bgImage = new Image();
            bgImage.src = theComic.bgArt;
            bgImage.onload = function() {
                var result = panelToCanvas(bgImage, leftChar, rightChar, niceBorder, leftBubbles, rightBubbles);
                if (result) {
                    displayDownloadLink();
                }
            }
        }
        else {
            var result = panelToCanvas(bgImage, leftChar, rightChar, niceBorder, leftBubbles, rightBubbles);
            if (result) {
                displayDownloadLink();
            }
        }
    }
}


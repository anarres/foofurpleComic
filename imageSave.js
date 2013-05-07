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
function panelToCanvas(bgImage, leftChar, rightChar, leftBubbles, rightBubbles) {

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

    var metadataX0 = cWidth;
    cWidth += metaDataHeight;

    canvas.setAttribute("width", cWidth);
    canvas.setAttribute("height", cHeight);
    var ctx = canvas.getContext('2d');
    ctx.font = "14px UbuntuMono";

    // White background rectangle for metadata
    ctx.fillStyle = "#fff";
    ctx.fillRect(metadataX0,0,cWidth,cHeight);

    // Panel background color
    var panelBgColor = "#" + theComic.bgColor;
    
    // For each panel
    for (var i=0; i<numPanels; i++) {

        // Get panel coordinates
        var x0 = getX0(i);
        var y0 = getY0(i);

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
    ctx.fillStyle = "#575757";
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
    document.getElementById('downloadInfo').innerHTML = "<p>Automatically generated image description:</p> <textarea>" + imageDescription() + "</textarea>";
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

    var bgImage = false;
    if (theComic.bgArt) {
        bgImage = new Image();
        bgImage.src = theComic.bgArt;
        bgImage.onload = function() {
            var result = panelToCanvas(bgImage, leftChar, rightChar, leftBubbles, rightBubbles);
            if (result) {
                displayDownloadLink();
            }
        }
    }
    else {
        var result = panelToCanvas(bgImage, leftChar, rightChar, leftBubbles, rightBubbles);
        if (result) {
            displayDownloadLink();
        }
    }
}


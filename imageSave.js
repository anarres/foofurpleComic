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
function panelToCanvas() {

    var numPanels = theComic.numPanels();
    var canvas = document.getElementById('myCanvas');
    var cWidth = getCanvasWidth(numPanels);
    var cHeight = getCanvasHeight(numPanels);

    canvas.setAttribute("width", cWidth);
    canvas.setAttribute("height", cHeight);
    var ctx = canvas.getContext('2d');

    // A background rectangle
    ctx.fillStyle = "#424242";
    ctx.fillRect(0,0,cWidth,cHeight);

    // Prepare images
    var bgImage = new Image();
    bgImage.src = theComic.bgArt;

    var leftChar = new Image();
    leftChar.src = theComic.leftKittyUrl;

    var rightChar = new Image();
    rightChar.src = theComic.rightKittyUrl;

    // Write metadata to bottom of canvas
    var mData = "This comic is a mash-up made at foofurple.com using images: ";
    mData += getPrintBgMetadata(theComic.bgArt);
    mData += getPrintLeftMetadata(theComic.leftKittyUrl);
    mData += getPrintRightMetadata(theComic.rightKittyUrl);

    var mArray = generalLinesArray(mData, 120, 5);
    var mTop = cHeight - 80; // Fudge

    // Text style 
    ctx.fillStyle = "#ffffff";
    ctx.font = "12px arial;";

    for (var m=0; m<mArray.length; m++) {
        var x = 10;
        var y = mTop + m*printLineHeight;
        ctx.fillText(mArray[m], x, y);
    }
    
    // For each panel
    for (var i=0; i<numPanels; i++) {

        // Get panel coordinates
        var x0 = getX0(i);
        var y0 = getY0(i);       

        // Fill in background color
        ctx.fillRect(x0,y0,panelWidth,panelHeight);

        // Draw background image
        ctx.drawImage(bgImage, x0, y0, panelWidth, panelHeight);

        // Draw characters
        ctx.drawImage(leftChar, x0 + kitty1X, y0 + kittyY);
        ctx.drawImage(rightChar, x0 + kitty2X, y0 + kittyY);

        // Get bubble text
        var ltext = theComic.panelsArray[i].ltext;
        var rtext = theComic.panelsArray[i].rtext;

        // Get bubble number of lines of text
        var lNumLines = getNumLines(ltext);
        var rNumLines = getNumLines(rtext);

        // Determine which type of bubble
        var lBubbleMode = theComic.panelsArray[i].lBubbleMode;
        var rBubbleMode = theComic.panelsArray[i].rBubbleMode;

        // Get bubble image url
        var lBubbleUrl = getBubbleUrl(0, lNumLines, lBubbleMode);
        var rBubbleUrl = getBubbleUrl(1, rNumLines, rBubbleMode);

        // Create DOM image object
        var lBubbleImage = new Image();
        lBubbleImage.src = lBubbleUrl;
        var rBubbleImage = new Image();
        rBubbleImage.src = rBubbleUrl;

        // Draw bubbles
        ctx.drawImage(lBubbleImage, x0+leftBubbleX , y0+bubbleY);
        ctx.drawImage(rBubbleImage, x0+rightBubbleX , y0+bubbleY);

        // Array of strings, one per line
        var lTextArray = fooLinesArray(ltext);
        var rTextArray = fooLinesArray(rtext);

        // Text style
        ctx.fillStyle = "#000000";
        ctx.font = "14px arial";

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
    }
}

function downloadImage() {
    panelToCanvas();    // Create canvas object
    var canvas = document.getElementById("myCanvas");
    var dataUrl = canvas.toDataURL();
    document.getElementById("downloadLink").setAttribute('href', dataUrl);
    document.getElementById('downloadInfo').innerHTML = "<h3>Automatically generated image description:</h3> <p class='description'>" + imageDescription() + "</p>";
    document.getElementById('downloadDiv').style.visibility = "visible";
}

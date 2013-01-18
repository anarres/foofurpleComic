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
    var cWidth = getCanvasWidth(numPanels);
    var cHeight = getCanvasHeight(numPanels);

    canvas.setAttribute("width", cWidth);
    canvas.setAttribute("height", cHeight);
    var ctx = canvas.getContext('2d');

    // Panel background color
    var panelBgColor = "#" + theComic.bgColor;

    // Get metadata
    var mData = "This comic is a mash-up made at foofurple.com using images: ";
    mData += getPrintBgMetadata(theComic.bgArt);
    mData += getPrintLeftMetadata(theComic.leftKittyUrl);
    mData += getPrintRightMetadata(theComic.rightKittyUrl);

    var mArray = generalLinesArray(mData, 60, 5);
    var mTop = cHeight - 120;               // Fudge - top of metadata
    var mTopBackground = cHeight - 145;     // Fudge - top of metadata label image
    ctx.drawImage(niceBorder, 0, mTopBackground);

    // Text style 
    ctx.fillStyle = "#000";
    ctx.font = "12px arial;";

    for (var m=0; m<mArray.length; m++) {
        //var x = 10;
        var x = 20;
        var y = mTop + m*printLineHeight;
        ctx.fillText(mArray[m], x, y);
    }
    
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

    }   // Closes the for each panel loop
    return true;
}

function displayDownloadLink() {
    var canvas = document.getElementById("myCanvas");
    var dataUrl = canvas.toDataURL();
    document.getElementById("downloadLink").setAttribute('href', dataUrl);
    document.getElementById('downloadInfo').innerHTML = "<h3>Automatically generated image description:</h3> <p class='description'>" + imageDescription() + "</p>";
    document.getElementById('downloadDiv').style.visibility = "visible";
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
    niceBorder.src = "http://foofurple.com/comic/images/nice_border.png";

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


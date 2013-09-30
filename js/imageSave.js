/*
* imageSave.js
* 
* Contains the functions needed to convert Foofurple comics to a
* canvas image, then allow that image to be downloaded as a dataurl.
* Also provides an image description.
*/


function imageDescription(bgArtPartUrl, leftChar, rightChar, pArray) {
    var d = "A comic. ";
    d += getBgDesc(bgArtPartUrl);
    d += getLeftDesc(leftChar);
    d += getRightDesc(rightChar);

    for (var i=0; i<pArray.length; i++) {
        if (pArray[i].ltext != "") {
            d += " Character 1: ";
            d += pArray[i].ltext;
        }
        if (pArray[i].rtext != "") {
            d += " Character 2: ";
            d += pArray[i].rtext;
        }
    }
    return d;
}

function getComicAttribution() {
    var mData =  "CREDITS: ";
    mData += getPrintBgMetadata(theComic.bgArt);
    mData += getPrintLeftMetadata(theComic.leftKittyUrl);
    mData += getPrintRightMetadata(theComic.rightKittyUrl);
    mData += "Mashed-up at foofurple.com/comic/";
    return mData;
}

// Create a canvas version of the comic
function panelsToCanvas(bgImage, leftChar, rightChar, leftBubbles, rightBubbles, pArray, comicAttribution) {

    var numPanels = pArray.length;
    var canvas = document.getElementById('myCanvas');
    var cHeightBeforeMetadata = getCanvasHeight(numPanels);
    var cWidth = getCanvasWidth(numPanels);
    var maxLineLengthz = 65;
    var maxNumLinesz = 8;

    var mArray = generalLinesArray(comicAttribution, maxLineLengthz, maxNumLinesz);       // Maximum 8 lines of metadata
    var metaDataHeight = 15 + mArray.length * 15;
    var cHeight = cHeightBeforeMetadata + metaDataHeight;

    var metadataX0 = 10;
    var metadataY0 = cHeightBeforeMetadata + 5;

    canvas.setAttribute("width", cWidth);
    canvas.setAttribute("height", cHeight);
    var ctx = canvas.getContext('2d');

    ctx.font = "12px Helvetica";

    // White background rectangle for metadata
    ctx.fillStyle = "#fff";
    ctx.fillRect(0,metadataY0,cWidth,cHeight);


    // Metadata 
    ctx.fillStyle = "#000";
    for (var m=0; m<mArray.length; m++) {
        var x = metadataX0;
        var y = metadataY0 + 15 + m*15;
        ctx.fillText(mArray[m], x, y);
    }


    ctx.font = "14px Helvetica";

    // Panel background color
    var panelBgColor = "#" + theComic.bgColor;
    
    // For each panel
    for (var i=0; i<numPanels; i++) {

        // Get panel coordinates
        var x0 = getX0(i);
        var y0 = getY0(i);

        // Draw an outline around the panel
        ctx.fillStyle = "#000";
        ctx.moveTo(x0-1, y0-1);
        ctx.lineTo(x0+400, y0-1);
        ctx.lineTo(x0+400, y0+300);
        ctx.lineTo(x0-1, y0+300);
        ctx.lineTo(x0-1, y0-1);
        ctx.stroke();

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
        var ltext = pArray[i].ltext;
        var rtext = pArray[i].rtext;

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


    return true;
}

function displayDownloadLink(comicAsStory, comicAttribution) {

    document.getElementById('downloadInfo').innerHTML = 
        "<p>Automatically generated image description (you can add this to make your comic accessible to people with impaired vision):</p> <textarea>" + 
        comicAsStory + "</textarea>";

    document.getElementById('downloadInfo').innerHTML += 
        "<br><p>Automatically generated image credits / attribution:</p> <textarea>" + 
        comicAttribution + "</textarea>";

    var dataUrl = document.getElementById("myCanvas").toDataURL();
    document.getElementById('downloadDiv').style.visibility = "visible";
    document.getElementById("downloadLink").setAttribute('href', dataUrl);
    document.getElementById('downloadDiv').focus();
}

function downloadImage() {

    // Global variables make javascript run slow, so copy them to locals
    var leftBubbles = [];
    var rightBubbles = [];
    var numPanels = theComic.numPanels();
    var pArray = theComic.panelsArray;
    var bgArtPartUrl = theComic.bgArt;
    var leftPartUrl = theComic.leftKittyUrl;
    var rightPartUrl = theComic.rightKittyUrl;

    for (var i=0; i<numPanels; i++) {

        // Determine which type of bubble
        var lBubbleMode = pArray[i].lBubbleMode;
        var rBubbleMode = pArray[i].rBubbleMode;

        // Get bubble text
        var ltext = pArray[i].ltext;
        var rtext = pArray[i].rtext;

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
    if (bgArtPartUrl) {
        bgImage = new Image();
        bgImage.src = theComic.bgArt;
    }

    var comicAttribution = getComicAttribution();
    var result = panelsToCanvas(bgImage, leftChar, rightChar, leftBubbles, rightBubbles, pArray, comicAttribution);
    if (result) {
        var comicAsStory =  imageDescription(bgArtPartUrl, leftPartUrl, rightPartUrl, pArray);
        displayDownloadLink(comicAsStory, comicAttribution);
    }
}


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
function panelToCanvas(niceBorder) {

    var numPanels = theComic.numPanels();
    var canvas = document.getElementById('myCanvas');
    var cWidth = getCanvasWidth(numPanels);
    var cHeight = getCanvasHeight(numPanels);

    canvas.setAttribute("width", cWidth);
    canvas.setAttribute("height", cHeight);
    var ctx = canvas.getContext('2d');

    // Panel background color
    var panelBgColor = "#" + theComic.bgColor;

    // Prepare images
    if (theComic.bgArt) {
        var bgImage = new Image();
        bgImage.src = theComic.bgArt;
    }
    var leftChar = new Image();
    leftChar.src = theComic.leftKittyUrl;
    var rightChar = new Image();
    rightChar.src = theComic.rightKittyUrl;


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
        if (theComic.bgArt) {
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

function downloadImage2(niceBorder) {
    panelToCanvas(niceBorder);    
    var canvas = document.getElementById("myCanvas");
    var dataUrl = canvas.toDataURL();
    document.getElementById("downloadLink").setAttribute('href', dataUrl);
    document.getElementById('downloadInfo').innerHTML = "<h3>Automatically generated image description:</h3> <p class='description'>" + imageDescription() + "</p>";
    document.getElementById('downloadDiv').style.visibility = "visible";
    return false;
}


function downloadImage() {

    // Nice border around the metadata
    var niceBorder = new Image();
    niceBorder.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZYAAACRCAQAAABKg1YRAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfdAQoBKhvUZQN2AAACaElEQVR42u3aMVIaURzH8R8Zi3AGalspsMgVuATbYBetPQekg0YuwRG0VFtrzvDoNoWYoFkSaDLOvM+nYYcdmv/sd97bZXttG+AIX4wAxAJiAbHAJ3Z26ETPbKhUe9rKsjUxqrU9bWV5THKRJ3OjMsM85zHfTllZvicZmxzVGe+u/s5bk64/JVdp0s9LBmZHZTY5T8ldJsetLKs0SWZSoUKDzJI0Wf0rlm0ecpkmySJTc6NK0yySNLnMw4db/b1t2NvD4n5mUqFqy9yk7I7bQ7FcZJxrGzDcu2SedZ7/FotXkGFv4/WuCa+7wJHEAmIBsYBYQCwgFhALIBYQC4gFxAJiAbGAWACxgFhALCAWEAuIBRALiAXEAmIBsYBYQCyAWEAsIBYQC4gFxAJiAcQCYgGxgFhALCAWQCwgFhALiAXEAmIBsQBiAbGAWEAsIBYQCyAWEAuIBcQCYgGxgFgAsYBYQCwgFhALiAXEAogFxAJiAbGAWEAsgFhALCAWEAuIBcQCYgHEAmIBsYBYQCwgFkAsIBYQC4gFxAJiAbEAYgGxgFhALCAWEAuIBRALiAXEAmIBsYBYALGAWEAsIBYQC4gFxAKIBcQC/z+WYW6zMRWqt8lthh++67Xtr8PdZz+zTE2Lii1zk7I7brtWljYl9xml5CpL86LiVK5SMsp9yl4q71aWN6s0SRZWF6pNJbnL5I8zHbG85tLPSwYmR3X3KucpnakceBo2ySglc5OjOvOUjDpTOfjo+EeStclRnfXu6u/SuQ1LtumbG5Uq+XpKLL8fJENtDiSRs1N/ALXyuguIBcQCYoHP7CcgjFvwdN1nJwAAAABJRU5ErkJggg==";
    niceBorder.onload = downloadImage2(niceBorder);
}


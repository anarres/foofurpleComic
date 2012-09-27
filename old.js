/*
    foofurpleComic.js v0.02: a javascript and HTML5 app allowing people to create their
    own webcomics with Creative Commons or Public Domain images. Copyright (C) 2012 Anarres.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/



var images88;
//var bubbleUrls;



// GLOBALS
var N = 0;
var selectedPanel = 0;
var panelHeight = 300;
var panelWidth = 400;
var panelBorderWidth = 5;
var panelXSpace = 20;
var panelYSpace = 20;
var panelsPerRow = 2;
var printLineHeight = 15;

// For canvas text
var charsPerLine = 18;
var maxLines = 9;
var maxChars = charsPerLine * maxLines;
var lineHeight = 18;

// textareas / bubbles
var textareaWidth = 165;
var bubbleHeight = 160;
var panelBGColor = "3496CF";
var bubbleMinTop = 10;

// Kitty positions
var kitty1X = 60;
var kitty1Y = 195;
var kitty2X = 240;
var kitty2Y = 195;

// Default characters
var kitty1url = "images/kitties/left/kitty.png";
var kitty2url = "images/kitties/right/fox.png";
var backgroundArtUrl = "images/backgroundArt/road-trip.png";

function getBgDataObj(url) {
    for (var i=0; i<images88[0].bg.length; i++) {
        if (images88[0].bg[i].url === url) {
            return images88[0].bg[i];
        }
    }
}
function getLeftDataObj(url) {
    for (var i=0; i< images88[1].characters.length; i++) {
        if (images88[1].characters[i].left.url === url) {
            return images88[1].characters[i].left;  
        }
    }
}
function getRightDataObj(url) {
    for (var i=0; i< images88[1].characters.length; i++ ) {    
        if ( images88[1].characters[i].right.url === url ) {
            return images88[1].characters[i].right;
        }
    }
}
function getBgMetadataToPrint() {
    if ( backgroundArtUrl === "" ) {
        return "";
    }
    else {
        var d = getBgDataObj(backgroundArtUrl);
        return d.title + " by " + d.artist + ",  " + d.artist_website + ", "  + d.license_short +".";
    }
}
function getLeftMetadataToPrint() {
    var d = getLeftDataObj(kitty1url);
    return d.title + " by " + d.artist + ",  " + d.artist_website + ", "  + d.license_short +".";
}
function getRightMetadataToPrint() {
    var d = getRightDataObj(kitty2url);
    return d.title + " by " + d.artist + ",  " + d.artist_website + ", "  + d.license_short +".";
}
function combinePrintMetadata() {
    var metadataArray = [];
    var kitty1Metadata = getLeftMetadataToPrint();
    var kitty2Metadata = getRightMetadataToPrint();
    var bgMetadata = getBgMetadataToPrint();
    metadataArray.push('This comic is a mash-up made on foofurple.com, with images:');
    metadataArray.push(kitty1Metadata);
    metadataArray.push(kitty2Metadata);
    metadataArray.push(bgMetadata);
    return metadataArray;
}
function getDescription() {
    var desc = "A comic. ";

    // Background art description
    if ( backgroundArtUrl !== "" ) {
        var bgObj = getBgDataObj(backgroundArtUrl);
        desc += "The scene: " + bgObj.description + ". ";
    }
    // Description of the characters
    var leftObj = getLeftDataObj(kitty1url);
    var rightObj = getRightDataObj(kitty2url);
    desc += "Character 1 is a " + leftObj.description + ". ";
    desc += "Character 2 is a " + rightObj.description + ". ";

    var t1 = getElementsByClassName(document, "textarea1");
    var t2 = getElementsByClassName(document, "textarea2");

    // Dialogue
    for ( var i=0; i< N; i++ ) {
        if ( t1[i].style.visibility !== "hidden" ) {
            desc += "Char 1: " + t1[i].value + " "; 
        }
        if ( t2[i].style.visibility !== "hidden" ) {
            desc += "Char 2: " + t2[i].value + " "; 
        }
    }
    return desc;
}
function getBgMetadata(url) {
    if ( url === "" ) {
        return "";
    }
    else {
        var d = getBgDataObj(url);
        return "<p><b>" + d.title + "</b> by <a href='" + d.artist_website + "'>"  + d.artist + "</a>, <a href='" + d.license_url + "'>" + d.license_short +"</a></p>";
    }
}
function getLeftMetadata(url) {
    var d = getLeftDataObj(url);
    return "<p><b>" + d.title + "</b> by <a href='" + d.artist_website + "'>"  + d.artist + "</a>, <a href='" + d.license_url + "'>" + d.license_short +"</a></p>";
}

function getRightMetadata(url) {
    var d = getRightDataObj(url);
    return "<p><b>" + d.title + "</b> by <a href='" + d.artist_website + "'>"  + d.artist + "</a>, <a href='" + d.license_url + "'>" + d.license_short +"</a></p>";
}

function updateMetadata() {
    var bg = getBgMetadata(backgroundArtUrl);
    var left = getLeftMetadata(kitty1url);
    var right = getRightMetadata(kitty2url);
    document.getElementById('metadata').innerHTML = bg + left + right;
}

function getCanvasWidth() {
    var width = 4*panelBorderWidth + panelXSpace + 2*panelWidth;

    if (N === 1) {
        width = 2*panelBorderWidth + panelWidth;
    }
    return width;
}
function getCanvasHeight() {

    // yIndex = 1,2,3...
    var yIndex = getYIndex(N);

    // Amount of y-space taken up by panels themselves
    var y1 = yIndex * panelHeight;

    // Amount of y-space taken up by borders
    var y2 = yIndex * 2 * panelBorderWidth;

    // Amount of y-space between panel borders
    var y3 = (yIndex-1) * panelYSpace;
    
    return y1 + y2 + y3;
}

// Gives the left edge of the *panel*, not including the border
function getPanelXCoord(num) {

    var xIndex = getXIndex(num);

    if (xIndex === 1) {
        return panelBorderWidth;
    }
    else if (xIndex === 2) {

        // Amount of x-space taken up by 1st panel
        var x1 = panelWidth;

        // Amount of x-space taken up by space between panels
        var x2 = panelXSpace;

        // Amount of x-space taken up by 3 borders
        var x3 = 3 * panelBorderWidth;

        return x1 + x2 + x3;
    }
}
// Gives the top edge of the *panel*, not including the border
function getPanelYCoord(num) {

    var yIndex = getYIndex(num);

    // Amount of y-space taken up by panels themselves
    var y1 = (yIndex-1) * panelHeight;

    // Amount of y-space taken up by borders
    var y2 = ((2*yIndex)-1) * panelBorderWidth;

    // Amount of y-space between panel borders
    var y3 = (yIndex-1) * panelYSpace;

    return y1 + y2 + y3;
}
function chooseKitty() {
    var myObj = document.getElementById("chooseKitty");
    if ( myObj.style.visibility === "visible" ) {
        myObj.style.visibility = "hidden";
    }
    else {
        myObj.style.visibility = "visible";
        myObj.focus();
    }
}
function chooseBackgroundImage() {
    var myObj = document.getElementById("chooseBackgroundImage");
    if ( myObj.style.visibility === "visible" ) {
        myObj.style.visibility = "hidden";
    }
    else {
        myObj.style.visibility = "visible";
        myObj.focus();
    }
}
function selectBackgroundArt(url) {

    // Set global var
    backgroundArtUrl = url;

    // Un-highlight previously selected image
    var imgArray = getElementsByClassName(document, 'backgroundChooser');
    for ( var i=0; i<imgArray.length; i++ ) {
        (imgArray[i]).style.backgroundImage="url('clear.png')";
    }
    // Hightlight newly selected image
    if (backgroundArtUrl !== "") {
        document.getElementById(backgroundArtUrl).style.backgroundImage="url('yellow.png')";
    }
    // Get all divs of class backgroundArt and give them this bg image
    var divs = getElementsByClassName(document, "backgroundArt");
    for (var j=0; j<divs.length; j++) {
        var myObj = divs[j];
        var myCSS = "url('" + url + "')";
        myObj.style.backgroundImage = myCSS;
    }
    updateMetadata();
}

function selectKitty(num, imgUrl) {
    var myClassName = "imgChooser" + num;

    // Remove bg color from previously selected image
    var imgArray = getElementsByClassName(document, myClassName);
    for ( var i=0; i<imgArray.length; i++ ) {
        (imgArray[i]).style.backgroundImage="url('clear.png')";
    }
    // Set kitty1url (global var) and Change src of all kitty1's
    if ( num === 1 ) {
        kitty1url = imgUrl;
        var images = getElementsByClassName(document, "kitty1");
        for (var j=0; j<images.length; j++) {   
            (images[j]).setAttribute("src", imgUrl);
        }
        document.getElementById(kitty1url).style.backgroundImage="url('yellow.png')";
    }
    // Do the same if kitty2
    else if ( num === 2) {
        kitty2url = imgUrl;
        var images2 = getElementsByClassName(document, "kitty2");
        for (var k=0; k<images2.length; k++ ) {
            (images2[k]).setAttribute("src", imgUrl);
        }  
        document.getElementById(kitty2url).style.backgroundImage="url('yellow.png')";
    }
    updateMetadata();
}
function changePanelBGColor() {
    var newColor = "#" + document.getElementById("jscolor").value;
    var panelArray = getElementsByClassName(document, "panel");
    for (var n = 0; n < panelArray.length; n++) {
        (panelArray[n]).style.backgroundColor = newColor;    
    }
    panelBGColor = document.getElementById("jscolor").value;
}

// Takes a chunk, breaks into words and the reconnects them into 
// line-sized segments, and returns an array
function dealWithLongChunk(chunk) {
    var chunkyWordsInitial = chunk.split(" ");
    var chunkyWords = [];
    var lineArray = [];
    var c = 0;
    var newLine = "";
    var testLine =  "";

    // Make sure all words in chunkyWords have lenght less than charsPerLine
    for (var i=0; i<chunkyWordsInitial.length; i++) {
        if (chunkyWordsInitial[i].length <= charsPerLine) {
            chunkyWords.push(chunkyWordsInitial[i]);
        }
        else {
            var stopMe = 0;
            var longWord = chunkyWordsInitial[i];
            while (stopMe===0) {
                if (longWord.length <= charsPerLine) {
                    chunkyWords.push(longWord);
                    stopMe = 1;
                }
                else {
                    var newWord = longWord.slice(0,charsPerLine);
                    longWord = longWord.slice(charsPerLine, longWord.length);
                    chunkyWords.push(newWord);
                }
            }
        }
    }
    while (chunkyWords.length > 0) {
        if (testLine==="") {
            testLine += chunkyWords[0];
            testLine += " ";
        }
        // Test line not (yet) too long
        if (testLine.length <= (charsPerLine+1)) {
            newLine += chunkyWords.shift();

            if (chunkyWords.length===0) {
                lineArray[c] = newLine;
                c += 1;
            }
            else {
            newLine += " ";
            testLine += chunkyWords[0];
            testLine += " ";
            }
        }
        // Test line too long. 
        else {
            lineArray[c] = newLine;
            testLine = "";
            newLine = "";
            c += 1;
        }
    }
    return lineArray;
}

// Returns an array of substrings, one per line
function noNewlines(text) {

    // stringArray will hold substrings, one per line
    var stringArray = [];

    // Split input text by newline characters
    var chunks = text.split(/\n\r?/g);

    while (1===1) {

        if( (stringArray.length >= maxLines) || (chunks.length <= 0) ) { break; }

        var chunk = chunks.shift();

      // If it is short enuf, add it as a line - deal with chunk
        if ( chunk.length <= charsPerLine ) {
            stringArray.push(chunk);
        }
        // Deal with longer chunk
        else {
            var myNewArray = dealWithLongChunk(chunk);

            for( var i=0; i<myNewArray.length; i++ ) {
                stringArray.push(myNewArray[i]);
                if (stringArray.length >= maxLines) { break; }
            }
        }
    }
    return stringArray;
}
// Number of chars per line for printing metadata
function getPrintNumChars() {
    if(N===1) {
        return 65;
    }
    else {
        return 125;
    }
}
// How much extra space needed in canvas for metadata
function metadataHeight() {
    var metadataArray = combinePrintMetadata();
    var printYfoo = 10;
    while(1===1) {
        var metadataToPrint = metadataArray.shift();
        while(2===2) {
            printYfoo += printLineHeight;
            var printNumChars = getPrintNumChars();
            metadataToPrint = metadataToPrint.slice(printNumChars);
            if(metadataToPrint.length===0) {
                break;
            }
        }
        if( metadataArray.length===0 ) {
            break;
        }
    }
    return printYfoo+20;
}

// Create a canvas version of the comic
function panelToCanvas() {

    var printNumChars = getPrintNumChars();
    var canvasWidth = getCanvasWidth();
    var canvasHeight = getCanvasHeight();

    var canvas = document.getElementById('myCanvas');
    canvas.setAttribute("width", canvasWidth);

    var mdh = metadataHeight();
    var canvasHeightFoo = canvasHeight + mdh; 

    canvas.setAttribute("height", canvasHeightFoo);
    var ctx = canvas.getContext('2d');

    // A white background rectangle
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,canvasWidth,canvasHeightFoo);

    // Write metadata at the bottom of the canvas
    ctx.fillStyle = "#000000";
    ctx.font = "10pt Trebuchet MS, Helvetica, sans-serif";
    var metadataArray = combinePrintMetadata();
    var printY = canvasHeight + 10;

    while(1===1) {
        var metadataToPrint = metadataArray.shift();
        while(1===1) {
            printY += printLineHeight;
            var myText = metadataToPrint.slice(0, printNumChars);
            metadataToPrint = metadataToPrint.slice(printNumChars);
            ctx.fillText(myText,10,printY);
            if (metadataToPrint.length===0) {
                break;
            }
        }
        if( metadataArray.length===0 ) {
            break;
        }
    }
    ctx.font = "13pt Trebuchet MS, Helvetica, sans-serif";
    var M = N+1;

    // Loop over the panels
    for (var i = 1; i <= N; i++) {
        var x = getPanelXCoord(i);
        var y = getPanelYCoord(i);

        // Draw panel border
        ctx.beginPath();
        ctx.rect(x, y, panelWidth, panelHeight);
        ctx.lineWidth = panelBorderWidth;
        ctx.strokeStyle = "#9FA189";
        ctx.stroke();
        ctx.fillStyle = "#"+panelBGColor;
        ctx.fill();
    }

    // Loop over the panels again, because javascript.
   for (var j=1; j<M; j++) {

        // Get the x and y coordinates of the panel
        var xx = getPanelXCoord(j);
        var yy = getPanelYCoord(j);

        // Get background art
        if (backgroundArtUrl !== "") {
            var bg = new Image();
            bg.src = backgroundArtUrl;
            ctx.drawImage(bg, xx, yy);
        }

        // Get text
        var textareas1 = getElementsByClassName(document, "textarea1");
        var textareas2 = getElementsByClassName(document, "textarea2");

        // Get kitty images
        var kitty1 = new Image();
        kitty1.src = kitty1url;
        var kitty2 = new Image();
        kitty2.src = kitty2url;

        // Draw the characters
        ctx.drawImage(kitty1, xx + kitty1X, yy + kitty1Y); 
        ctx.drawImage(kitty2, xx + kitty2X, yy + kitty2Y);
        ctx.fillStyle = "#000000";

        // Arrays of strings
        var t1 = noNewlines(textareas1[j-1].value);
        var t2 = noNewlines(textareas2[j-1].value);

        if ( textareas1[j-1].style.visibility !== "hidden" ) {
            var myStem = new Image();
            myStem.src = "leftStem.png";
            ctx.drawImage(myStem, xx, yy);

            var numLines = t1.length;
    
            var tallness = bubbleTallness(numLines) + 20;
            ctx.fillStyle = '#ffffff';
            roundRect(ctx, 10+xx, topPos+yy-5, 180, tallness, 20, true, false);
            ctx.fillStyle = "#000000";
            var tempY = yy + FIXME + 20;
            for (var k=0; k<t1.length; k++) {
                ctx.fillText(t1[k], xx+20, tempY);
                tempY += lineHeight;
            }
        }
        if ( textareas2[j-1].style.visibility !== "hidden" ) {
            var myStem2 = new Image();
            myStem2.src = "rightStem.png";
            ctx.drawImage(myStem2, xx+200, yy);

            var numLines2 = t2.length;
  
            var tallness2 = bubbleTallness(numLines2) + 20;
            ctx.fillStyle = '#ffffff';
            roundRect(ctx, 210+xx, topPos2+yy-5, 180, tallness2, 20, true, false);
            ctx.fillStyle = "#000000";
            var tempY2 = yy + FIXME + 20;
            for (var m=0; m<t2.length; m++) {
                ctx.fillText(t2[m], xx+220, tempY2);
                tempY2 += lineHeight;
            }
        }
    }   
}
function downloadImage() {
    panelToCanvas();    // Create canvas object
    var canvas = document.getElementById("myCanvas");
    var dataUrl = canvas.toDataURL();
    document.getElementById("downloadLink").setAttribute('href', dataUrl);
    document.getElementById('downloadInfo').innerHTML = "<h3>Automatically generated image description:</h3> <p class='description'>" + getDescription() + "</p>";
    document.getElementById('downloadDiv').style.visibility = "visible";
}
function getXIndex(num) {
    var temp = parseInt(num % panelsPerRow, 10);
    if (temp === 1) {
        return 1;
    }
    else if (temp === 0) {
        return 2;
    }
}
function getYIndex(num) {
    num -= 1;
    return parseInt(num/panelsPerRow, 10) + 1;
}
// Given panel number (1,2,3...) get x coordinate of panel top left corner
function getX(num) {
    return panelXSpace + ( getXIndex(num) * (panelXSpace+panelWidth+panelXSpace) );
}
// Given panel number (1,2,3...) get y coordinate of panel top left corner
function getY(num) {
    var yIndex = getYIndex(num);
    return ( (panelYSpace * yIndex) + panelHeight ) * yIndex;
}

// Select a panel (put yellow bar over it)
function select(num) {

    // Remove old selector
    var oldObj = document.getElementById("selector");
    if (oldObj !== null) {
        oldObj.parentNode.removeChild(oldObj);
    }
    // Get the object newly-to-be-selected
    var newId = "panel" + num;
    var newObj = document.getElementById(newId);

    // Append a newly-created selector object to it
    var selector = document.createElement("div");
    selector.setAttribute("id", "selector");
    newObj.appendChild(selector);

    // Reset the global var selectedPanel
    selectedPanel = num;
}






/* *************************************************************** BUBBLES */



// Takes the number of lines of text in the textarea /
// speech bubble and returns the height of the textarea.
function bubbleTallness(numLines) {
    if (numLines === 1) {
        return 30;
    }
    else if (numLines === 2) {
        return 45;
    }
    else if (numLines === 3) {
        return 60;
    }
    else if (numLines === 4) {
        return 75;
    }
    else if (numLines === 5) {
        return 90;
    }
    else if (numLines === 6) {
        return 105;
    }
    else if (numLines === 7) {
        return 130;
    }
    else if (numLines === 8) {
        return 160;
    }
    else if (numLines === 9) {
        return 160;
    }
    else {
        return 160;
    }
}

// bubbleMode is 0 for bubble, 1 for cloud
// leftOrRight is 0 for left, 1 for right
function getBubbleUrl(bubbleMode, numLines, leftOrRight) {
    var index = numLines-1;
    return bubbleUrls[bubbleMode][index][leftOrRight];
}
function getBubbleMode(imgObj) {
    return 0; 
}
// id is of the form textarea1Panel5
function leftOrRight(id) {
    if (id.slice(0, 9) === "textarea1") { return 0; }
    else { return 1; }
}
function textareaPanel(id) {
    return parseInt( id.slice(-1) );
}

// When you click on a bubble it expands to its full height.
function textareaClick(event) {

    var textareaObj = event.target;
    textareaObj.height = "" + bubbleHeight + "px";
    var panelNum = textareaPanel( textareaObj.id );
    var imgId = "leftBubble" + panelNum;
    var lr = leftOrRight( textareaObj.id );
    if (lr === 1) { imgId = "rightBubble" + panelNum; }
    var bubbleMode = getBubbleMode( document.getElementById(imgId) );


    var flipp = getBubbleUrl(0, maxLines, lr);


    imgObj.setAttribute('src', flipp );
}

// When a textarea looses focus it changes its height
// depending on the amoung of text
function textareaBlur(event) {


    // Get the number of lines of text
    var myTextArray = noNewlines(event.target.value);
    var numLines = myTextArray.length;

    // Set the height of the textarea
    var myString = "" + bubbleTallness(numLines) + "px";
    event.target.style.height = myString;

    // Get the url of the appropriate .png, and apply it to the 
    // image object
    var panelNum = textareaPanel( event.target.id );

    var lr = leftOrRight( event.target.id ); 
    var imgId = "leftBubble" + panelNum;  
    if (lr === 1) { imgId = "rightBubble" + panelNum; }

    var imgObj = document.getElementById(imgId);
    //var bubbleMode = getBubbleMode(imgObj);
    var imgUrl = getBubbleUrl(0, numLines, lr);

    imgObj.setAttribute('src', imgUrl);
}

// Shows or hides speech bubbles (textareas) and stems
function toggleBubble(oneOrTwo) {

    if ( selectedPanel === 0 ) {
        document.getElementById('bubbleHint').style.visibility = "visible";
    }
    var textareaId = "textarea" + oneOrTwo + "Panel" + selectedPanel;
    var textarea = document.getElementById(textareaId);
    var stemImageId = "rightStem" + selectedPanel;
    var stemImageUrl = "testbubble3.png";
    var bubbleImageUrl = "testbubble3.png";
    var stemImage = document.getElementById(stemImageId);

    // If invisible, go to speech bubble
    if ( textarea.style.visibility === "hidden" ) {
        textarea.style.visibility = "visible";
        stemImage.setAttribute("src", stemImageUrl);
        stemImage.style.visibility = "visible";
    }
    // Textarea visible
    else if (stemImage.getAttribute('src') === bubbleImageUrl) {
        textarea.style.visibility = "hidden";
        stemImage.style.visibility = "hidden";
    }
    // If currently in speech mode, go to bubble mode
   else if (stemImage.style.visibility !== "hidden" ) {
        stemImage.setAttribute("src", bubbleImageUrl);
        bubbleImage.style.visibility = "visible";
    }
    else { 
        alert('snafu');
    }
}




/* ****************************************************************************************** */






function createPanel() {
    var container = document.getElementById("comicPanels");
    N += 1;

    // Rectangle for panel
    var panelDiv = document.createElement("div");
    panelDiv.setAttribute("class", "panel");
    panelDiv.style.backgroundColor = "#" + panelBGColor;
    panelDiv.setAttribute("id", "panel"+N);
    panelDiv.setAttribute("onClick", "select("+N+")");

    // If a background image is selected, we need a div behind
    var backgroundArt = document.createElement("div");
    backgroundArt.setAttribute("class","backgroundArt");
    var myCSS = "url('" + backgroundArtUrl + "')";
    backgroundArt.style.backgroundImage = myCSS;
    panelDiv.appendChild(backgroundArt);

    // Images of 2 speech bubbles 
    var bubbleDiv = document.createElement("div");
    bubbleDiv.setAttribute("class","bubbleDiv");
    bubbleDiv.setAttribute("id","bubbleDiv" + N);

    var leftBubble = document.createElement("img");
    leftBubble.setAttribute("src", bubbleUrls[0][0][0]);
    leftBubble.setAttribute("id", "leftBubble"+N);
    bubbleDiv.appendChild(leftBubble);

    var rightBubble = document.createElement("img");
    rightBubble.setAttribute("src", bubbleUrls[0][0][1]);
    rightBubble.setAttribute("id", "rightBubble"+N);
    rightBubble.setAttribute("class", "rightBubble");
    bubbleDiv.appendChild(rightBubble);

    panelDiv.appendChild(bubbleDiv);

    // Textareas for speech bubbles
    var textarea1Div = document.createElement("div");
    textarea1Div.setAttribute("class", "textareaDiv");      
    var textarea1 = document.createElement("textarea");
    textarea1.setAttribute("cols", charsPerLine);
    textarea1.setAttribute("maxlength", maxChars);

    textarea1.setAttribute("class", "textarea1");
    textarea1.setAttribute("id", "textarea1Panel"+N);
    textarea1.setAttribute("onBlur", "textareaBlur(event)");
    textarea1.setAttribute("onClick", "textareaClick(event)");
    textarea1.style.width = "" + textareaWidth + "px";
    textarea1Div.appendChild(textarea1);

    var textarea2Div = document.createElement("div");
    textarea2Div.setAttribute("class", "textareaDiv");
    textarea2Div.setAttribute("class", "textareaDiv2");
    var textarea2 = document.createElement("textarea");
    textarea2.setAttribute("cols", charsPerLine);
    textarea2.setAttribute("maxlength", maxChars);

    textarea2.setAttribute("id", "textarea2Panel"+N);
    textarea2.setAttribute("class", "textarea2");
    textarea2.setAttribute("onBlur", "textareaBlur(event)");
    textarea2.setAttribute("onClick", "textareaClick(event)");
    textarea2.style.width = "" + textareaWidth + "px";
    textarea2Div.appendChild(textarea2);

    panelDiv.appendChild(textarea1Div);
    panelDiv.appendChild(textarea2Div);

    // Kitties
    var kittyDiv = document.createElement("div");
    kittyDiv.setAttribute("class","kittyDiv");
    var kitty1 = document.createElement("img");
    kitty1.setAttribute("class", "kitty1");
    kitty1.setAttribute("src", kitty1url);
    kitty1.style.top = "" + kitty1Y + "px";
    kitty1.style.left = "" + kitty1X + "px";
    kittyDiv.appendChild(kitty1);
    var kitty2 = document.createElement("img");
    kitty2.setAttribute("class", "kitty2");
    kitty2.setAttribute("src", kitty2url);
    kitty2.style.top = "" + kitty2Y + "px";
    kitty2.style.left = "" + kitty2X + "px";
    kittyDiv.appendChild(kitty2);
    panelDiv.appendChild(kittyDiv);

    container.appendChild(panelDiv);
    updateMetadata();   // Only needed first time
}

function deletePanel() {

    // If no panel selected
    if (selectedPanel === 0) {
        document.getElementById('bubbleHint').style.visibility = "visible";
    }
    else {
        var panelId = "panel" + selectedPanel;
        var obj = document.getElementById(panelId);
        obj.parentNode.removeChild(obj);
        selectedPanel = 0;
        N -= 1;
    }
}






function loadBgImages() {
    var html = "<div id=\"removeBackgroundArt\"     onClick=\"selectBackgroundArt('')\" >       <a>Remove background art</a>     </div>";

    for( var i=0; i<images88[0].bg.length; i++ ) {
        html += "<img src='";
        html += images88[0].bg[i].url;
        html += "' id='";
        html += images88[0].bg[i].url;
        html += "' class='backgroundChooser' onClick=\"selectBackgroundArt('";
        html += images88[0].bg[i].url;
        html += "')\">";
    }
    document.getElementById("chooseBackgroundImage").innerHTML = html;
}

function loadCharacters() {

    // Load the character images
    var htmlLeft = "";
    var htmlRight = "";
    for( var i=0; i<images88[1].characters.length; i++ ) {
        htmlLeft += "<img src='";
        htmlLeft += images88[1].characters[i].left.url;
        htmlLeft += "' id='";
        htmlLeft += images88[1].characters[i].left.url;
        htmlLeft += "' class='imgChooser1' onclick=\"selectKitty(1, '";
        htmlLeft += images88[1].characters[i].left.url;
        htmlLeft += "')\">";

        htmlRight += "<img src='";
        htmlRight += images88[1].characters[i].right.url;
        htmlRight += "' id='";
        htmlRight += images88[1].characters[i].right.url;
        htmlRight += "' class='imgChooser2' onclick=\"selectKitty(2, '";
        htmlRight += images88[1].characters[i].right.url;
        htmlRight += "')\">";
    }
    document.getElementById("kittyLeft").innerHTML = htmlLeft;
    document.getElementById("kittyRight").innerHTML = htmlRight;
}

function newImage( bgLeftRight ) {

    if (bgLeftRight === 0) {
        var url = document.getElementById('newBgImageUrl').value;

        // Add the image to the metadata array
        images88[0].bg.push({
            "url": url,
            "title": "UNKNOWN",
            "description": "",
            "artist":"UNKNOWN",
            "artist_website":"",
            "license":"",
            "license_short":"",
            "license_url":""
        });

        // Reload the appropriate metadata (i.e. the list of images to select)
        // and set either bg, kitty1 or kitty2 to the new image, as appropriate
        loadBgImages();
        selectBackgroundArt(url);
    }
    else if (bgLeftRight === 1) {
        var url2 = document.getElementById('newLeftImageUrl').value;
        var urlLeft = url2 + "?lr=left";
        var urlRight = url2 + "?lr=right";

        // Add the image to the metadata array
        images88[1].characters.push(
            {
            "left":
                {            
                "url": urlLeft,
                "title": "UNKNOWN",
                "description": "",
                "artist":"UNKNOWN",
                "artist_website":"",
                "license":"",
                "license_short":"",
                "license_url":""
                },
            "right":
                {
                "url": urlRight,
                "title": "UNKNOWN",
                "description": "",
                "artist":"UNKNOWN",
                "artist_website":"",
                "license":"",
                "license_short":"",
                "license_url":""
                }
            }
        );
        loadCharacters();
        selectKitty(1, urlLeft);
        selectKitty(2, urlRight);
    }
    document.getElementById('addNewImage').style.visibility='hidden';
}

function addNewImage() {

    // hide the selectBackgroundImage() div
    document.getElementById("chooseBackgroundImage").style.visibility = 'hidden';
    document.getElementById("chooseKitty").style.visibility = 'hidden';

    // show the add new image div
    document.getElementById('addNewImage').style.visibility = "visible";
}

// Sets panel size, so this can be configurable
function getStarted() {

    // Add in some CSS
    var cssNode = document.createElement("style");
    cssNode.type = "text/css";
    cssNode.setAttribute("id", "cssFoo");

    // Set panel width and height
    var css = ".panel { width:";
    css += panelWidth;
    css += "px; height:";
    css += panelHeight;
    css += "px; }";

    // Set panel BG color
    css += "div.panel { background-color: #";
    css += panelBGColor;
    css += "; }";

    cssNode.innerHTML = css;
    document.body.appendChild(cssNode);
    createPanel();          // Create first panel
    createPanel();          // Create first panel

    // Set initial color for jscolor widget
    document.getElementById('jscolor').value = panelBGColor;

    // Load the selection of background images
    loadBgImages();

    // Highlight currently selected background
    document.getElementById(backgroundArtUrl).style.backgroundImage= "url('yellow.png')";
    loadCharacters();

    // Highlight currently selected characters
    document.getElementById(kitty1url).style.backgroundImage="url('yellow.png')";
    document.getElementById(kitty2url).style.backgroundImage="url('yellow.png')";
}


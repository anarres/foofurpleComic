var charsPerLine = 17;

/* Function getElementsByClassName(node,classname) by Dustin Diaz, found here: 
http://stackoverflow.com/questions/1933602/
how-to-getelementbyclass-instead-of-getelementbyid-with-javascript*/


function getElementsByClassName(node, classname) {
  if (node.getElementsByClassName) { // use native implementation if available
    return node.getElementsByClassName(classname);
  } else {
    return (function getElementsByClass(searchClass,node) {
        if ( node == null )
          node = document;
        var classElements = [],
            els = node.getElementsByTagName("*"),
            elsLen = els.length,
            pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)"), i, j;

        for (i = 0, j = 0; i < elsLen; i++) {
          if ( pattern.test(els[i].className) ) {
              classElements[j] = els[i];
              j++;
          }
        }
        return classElements;
    })(classname, node);
  }
}

function highlightSelectedPanel(pNum) {
    var oldArray = getElementsByClassName(document, "selected");
    if (oldArray.length > 0) {
        oldArray[0].classList.remove('selected');
    }
    var newId = "panel" + pNum;
    var newObj = document.getElementById(newId);
    newObj.classList.add('selected');
}

// Takes a chunk, breaks into words and the reconnects them into 
// line-sized segments, and returns an array
function dealWithLongChunk(chunk, charsPerLine) {
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
function fooLinesArray(text) {
    var stringArray = [];                          // stringArray will hold substrings, one per line
    var chunks = text.split(/\n\r?/g);        // Split input text by newline characters
    while (1===1) {
        if( (stringArray.length >= maxLines) || (chunks.length <= 0) ) { break; }
        var chunk = chunks.shift();
        if ( chunk.length <= charsPerLine ) {      // If it is short enuf, add it as a line - deal with chunk
            stringArray.push(chunk);
        }
        else {                                     // Deal with longer chunk
            var myNewArray = dealWithLongChunk(chunk, charsPerLine);
            for( var i=0; i<myNewArray.length; i++ ) {
                stringArray.push(myNewArray[i]);
                if (stringArray.length >= maxLines) { break; }
            }
        }
    }
    return stringArray;
}


function getNumLines(text) {
    var lines = fooLinesArray(text);
    return lines.length;
}
function getTextareaHeight(text) {
    var numLines = getNumLines(text);
    if (numLines < 2) {
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

function getBubbleUrl(lr, numLines, bubbleMode) {
    lr = parseInt(lr);
    n = parseInt(numLines);
    if (n < 2) { 
        if (lr == 0) { return "images/bubbles/leftBubble1.png"; }
        else { return "images/bubbles/rightBubble1.png"; }
    }
    else if (n == 2) { 
        if (lr == 0) { return "images/bubbles/leftBubble3.png"; }
        else { return "images/bubbles/rightBubble3.png"; }
    }
    else if (n == 3) { 
        if (lr == 0) { return "images/bubbles/leftBubble3.png"; }
        else { return "images/bubbles/rightBubble3.png"; }
    }
    else if (n == 4) { 
        if (lr == 0) { return "images/bubbles/leftBubble7.png"; }
        else { return "images/bubbles/rightBubble7.png"; }
    }
    else if (n == 5) { 
        if (lr == 0) { return "images/bubbles/leftBubble7.png"; }
        else { return "images/bubbles/rightBubble7.png"; }
    }
    else if (n == 6) { 
        if (lr == 0) { return "images/bubbles/leftBubble7.png"; }
        else { return "images/bubbles/rightBubble7.png"; }
    }
    else if (n == 7) { 
        if (lr == 0) { return "images/bubbles/leftBubble7.png"; }
        else { return "images/bubbles/rightBubble7.png"; }
    }
    else if (n == 8) { 
        if (lr == 0) { return "images/bubbles/leftBubble9.png"; }
        else { return "images/bubbles/rightBubble9.png"; }
    }
    else { 
        if (lr == 0) { return "images/bubbles/leftBubble9.png"; }
        else { return "images/bubbles/rightBubble9.png"; }
    }
}

function setBgColor(divObj, hexColor) {
    divObj.style.backgroundColor = "#" + hexColor;
}
function setBgImage(divObj, url) {
    divObj.style.backgroundImage = "url('" + url + "')";
}

function setBubbleImageUrl(imgObj, lr, text, bubbleMode) {
    var numLines = getNumLines(text);
    var url = getBubbleUrl(lr, numLines, bubbleMode);
    imgObj.setAttribute("src", url);
}

function setBubbleImageMax(imgObj, lr, bubbleMode) {
    var url = getBubbleUrl(lr, 9, bubbleMode);
    imgObj.setAttribute("src", url);
}



function setTextareaHeight(tObj, height) {
    tObj.style.height = "" + height + "px";
}
function setTextareaValue(tObj, text) {
    tObj.value = text;
    var h = getTextareaHeight(text);
    setTextareaHeight(tObj, h);
}









function displayPanel(theComic, pObj, pNum) {
    var container = document.getElementById("comicPanels");

    // Rectangle for panel
    var panelDiv = document.createElement("div");
    panelDiv.setAttribute("class", "panel");
    panelDiv.setAttribute("id", "panel"+pNum);



    // If a background image is selected, we need a div behind
    var backgroundArt = document.createElement("div");
    backgroundArt.setAttribute("class","backgroundArt");
    setBgColor(backgroundArt, theComic.bgColor);
    setBgImage(backgroundArt, theComic.bgArt);
    panelDiv.appendChild(backgroundArt);



    // Images of 2 speech bubbles
    var bubbleDiv = document.createElement("div");
    bubbleDiv.setAttribute("class","bubbleDiv");
    bubbleDiv.setAttribute("id","bubbleDiv" + pNum);



    var lBubble = document.createElement("img");
    lBubble.setAttribute("id", "leftBubble"+pNum);
    setBubbleImageUrl(lBubble, 0, pObj.ltext, 0);

    bubbleDiv.appendChild(lBubble);

    var rBubble = document.createElement("img");
    rBubble.setAttribute("id", "rightBubble"+pNum);
    setBubbleImageUrl(rBubble, 1, pObj.rtext, 0)
    bubbleDiv.appendChild(rBubble);
    panelDiv.appendChild(bubbleDiv);

    // Textareas for speech bubbles
    var textarea1Div = document.createElement("div");
    textarea1Div.setAttribute("class", "textareaDiv");      
    var textarea1 = document.createElement("textarea");
    textarea1.setAttribute("class", "textarea1");
    textarea1.setAttribute("id", "textarea1Panel"+pNum);
    textarea1.setAttribute("onBlur", "textareaBlur(" + pNum + ", 0)");
    textarea1.setAttribute("onClick", "textareaClick(" + pNum + ", 0)");
    setTextareaValue(textarea1, pObj.ltext);
    textarea1Div.appendChild(textarea1);
    panelDiv.appendChild(textarea1Div);

    var textarea2Div = document.createElement("div");
    textarea2Div.setAttribute("class", "textareaDiv");      
    var textarea2 = document.createElement("textarea");
    textarea2.setAttribute("class", "textarea2");
    textarea2.setAttribute("id", "textarea2Panel"+pNum);
    textarea2.setAttribute("onBlur", "textareaBlur(" + pNum + ", 1)");
    textarea2.setAttribute("onClick", "textareaClick(" + pNum + ", 1)");
    setTextareaValue(textarea2, pObj.rtext);
    textarea2Div.appendChild(textarea2);
    panelDiv.appendChild(textarea2Div);

    // Kitties
    var kittyDiv = document.createElement("div");
    kittyDiv.setAttribute("class","kittyDiv");
    var kitty1 = document.createElement("img");
    kitty1.setAttribute("class", "kitty1");
    kitty1.setAttribute("src", theComic.leftKittyUrl);
    kitty1.style.top = "" + kitty1Y + "px";
    kitty1.style.left = "" + kitty1X + "px";
    kittyDiv.appendChild(kitty1);

    var kitty2 = document.createElement("img");
    kitty2.setAttribute("class", "kitty2");
    kitty2.setAttribute("src", theComic.rightKittyUrl);
    kitty2.style.top = "" + kitty2Y + "px";
    kitty2.style.left = "" + kitty2X + "px";
    kittyDiv.appendChild(kitty2);
    panelDiv.appendChild(kittyDiv);

    container.appendChild(panelDiv);
    //updateMetadata();   // Only needed first time
}

/* Uses all the data to dynamically redisplay everything */
function refreshDisplay(theComic) {
    var textareaId = "textarea1Panel1";

    // Clear the old stuf
    document.getElementById("comicPanels").innerHTML = "";

    var pArray = theComic.panelsArray;
    for (var i=0; i<pArray.length; i++) {
        displayPanel(theComic, pArray[i], i+1);
    }
}

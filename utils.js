/* Function getElementsByClassName(node,classname) by Dustin Diaz, found here: 
http://stackoverflow.com/questions/1933602/
how-to-getelementbyclass-instead-of-getelementbyid-with-javascript*/

function getElementsByClassName(node,classname) {
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

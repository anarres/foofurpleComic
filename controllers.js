var images88;
var theComic;

function updateMetadata() {
    var bg = getBgMetadata(theComic.bgArt);
    var left = getLeftMetadata(theComic.leftKittyUrl);
    var right = getRightMetadata(theComic.rightKittyUrl);
    document.getElementById('imagesMetadata').innerHTML = bg + left + right;
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

//////////////////////////////////////////////////////////////////////////////////////////////

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

function selectBackgroundArt(url) {

    // Un-highlight previously selected image
    var imgArray = getElementsByClassName(document, 'backgroundChooser');

    for ( var i=0; i<imgArray.length; i++ ) {
        (imgArray[i]).style.backgroundImage="url('clear.png')";
    }
    // Hightlight newly selected image
    if (url !== "") {
        document.getElementById(url).style.backgroundImage="url('yellow.png')";
    }
    // Get all divs of class backgroundArt and give them this bg image
    var divs = getElementsByClassName(document, "backgroundArt");

    for (var j=0; j<divs.length; j++) {
        var myObj = divs[j];
        var myCSS = "url('" + url + "')";
        myObj.style.backgroundImage = myCSS;
    }
    theComic.bgArt = url;
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
        var images = getElementsByClassName(document, "kitty1");
        for (var j=0; j<images.length; j++) {   
            (images[j]).setAttribute("src", imgUrl);
        }
        document.getElementById(imgUrl).style.backgroundImage="url('yellow.png')";
        theComic.leftKittyUrl = imgUrl;
    }
    // Do the same if kitty2
    else if ( num === 2) {
        var images2 = getElementsByClassName(document, "kitty2");
        for (var k=0; k<images2.length; k++ ) {
            (images2[k]).setAttribute("src", imgUrl);
        }  
        document.getElementById(imgUrl).style.backgroundImage="url('yellow.png')";
        theComic.rightKittyUrl = imgUrl;
    }
    updateMetadata();
}


/////////////////////////////////////////////////////////////////////////////////
function loadCharacters() {

    // Load the character images
    var htmlLeft = "";
    var htmlRight = "";
    for( var i=0; i<images88[1].characters.length; i++ ) {
        htmlLeft += "<img src='";
        htmlLeft += images88[1].characters[i].left.url;
        htmlLeft += "' id='";
        htmlLeft += images88[1].characters[i].left.url;
        htmlLeft += "' class='imgChooser1 charImg' onclick=\"selectKitty(1, '";
        htmlLeft += images88[1].characters[i].left.url;
        htmlLeft += "')\">";

        htmlRight += "<img src='";
        htmlRight += images88[1].characters[i].right.url;
        htmlRight += "' id='";
        htmlRight += images88[1].characters[i].right.url;
        htmlRight += "' class='imgChooser2 charImg' onclick=\"selectKitty(2, '";
        htmlRight += images88[1].characters[i].right.url;
        htmlRight += "')\">";
    }
    document.getElementById("kittyLeft").innerHTML += htmlLeft;
    document.getElementById("kittyRight").innerHTML += htmlRight;
}

function newPanel() {
    theComic.createPanel();
    refreshDisplay(theComic);
}
function deletePanel() {
    theComic.delPanel();
    refreshDisplay(theComic);
}

function panelClickFoo(panelID) {

    // Remove class highlit from all panels
    var divsArray = getElementsByClassName(document, 'backgroundArt');

    for (var i=0; i<divsArray.length; i++) {
        divsArray[i].style.borderTop = "10px solid #bbbbbb";
    }
    var myDiv = document.getElementById(panelID);
    myDiv.style.borderTop = "10px solid #ffc405";

    theComic.setHighlight(panelID.slice(5));
}

function textareaClick(pNum, leftOrRight) {
    var lr = parseInt(leftOrRight);
    var index = parseInt(pNum) - 1;

    // Model
    theComic.setBubbleFocus(index, lr);

    // Display - textarea
    var foo = lr + 1
    var tID = "textarea" + foo + "Panel" + pNum;
    var tObj = document.getElementById(tID);
    tObj.style.height = "160px";

    // Display - bubble image
    var imgID = "leftBubble" + pNum;
    var bMode = theComic.panelsArray[index].lBubbleMode;
    if (lr == 1) {
        imgID = "rightBubble" + pNum;
        bMode = theComic.panelsArray[index].rBubbleMode;
    }
    var imgObj = document.getElementById(imgID);
    var panelObj = theComic.panelsArray[index];
    setBubbleImageMax(imgObj, lr, bMode);
}

function textareaBlur(pNum, leftOrRight) {
    var lr = parseInt(leftOrRight);
    var index = parseInt(pNum) - 1;    
    var myId = "textarea1Panel" + pNum;
    if (lr == 1) {
        myId = "textarea2Panel" + pNum;
    }
    var text = document.getElementById(myId).value;

    // Write the text to the model
    theComic.setText(index, lr, text);

    // Display bubble image
    var imgID = "leftBubble" + pNum;
    var bMode = theComic.panelsArray[index].lBubbleMode;
    if (lr == 1) {
        imgID = "rightBubble" + pNum;
        bMode = theComic.panelsArray[index].rBubbleMode;
    }
    var imgObj = document.getElementById(imgID);
    setBubbleImageUrl(imgObj, lr, text, bMode); // 0 is a fudge

    // Display - textarea
    var foo = lr + 1;
    var tID = "textarea" + foo + "Panel" + pNum;
    var tObj = document.getElementById(tID);
    setTextareaValue(tObj, text);
}

function changePanelBGColor() {
    var hexValue = "#" + document.getElementById('jscolor').value;    
    var divs = getElementsByClassName(document, 'backgroundArt');
    for (var i=0; i<divs.length; i++) {
        divs[i].style.backgroundColor = hexValue;
    }
    // Save the new value to the models
    theComic.setBgColor(document.getElementById("jscolor").value);
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function newWebImage(n) {
    var url = document.getElementById('newImageUrl').value;
    if (n == 2) {
        url = document.getElementById('newImageFileLocation').value;
    }
    if (document.getElementById('newBgUrl').checked) {
        var myObj = {"url":url,
            "title": "?",
            "description": "",
            "artist":"?",
            "artist_website":"",
            "license":"?",
            "license_short":"?",
            "license_url":""
            }
        // Add to the metadata
        images88[0]["bg"].push(myObj);

        // Reload bg images
        loadBgImages();

        // Set new image
        selectBackgroundArt(url);
    }
    else {
        var myObj = {
            "left":
                { 
                "url":url,
                "title": "",
                "description": "",
                "artist":"",
                "artist_website":"",
                "license":"",
                "license_short":"",
                "license_url":""
                },
            "right":
                { 
                "url":url,
                "title": "",
                "description": "",
                "artist":"",
                "artist_website":"",
                "license":"",
                "license_short":"",
                "license_url":""
                }
            };
        // Add to the metadata
        images88[1]["characters"].push(myObj);

        // Reload character images
        loadCharacters();

        // Set new image
        selectKitty(1, url);
        selectKitty(2, url);
    }
    document.getElementById("addNewImage").style.visibility = 'hidden';
}

function addNewImage() {

    //alert('foo');
    // hide the selectBackgroundImage() div
    //document.getElementById("chooseBackgroundImage").style.visibility = 'hidden';
    //document.getElementById("chooseKitty").style.visibility = 'hidden';

    // show the add new image div
    document.getElementById('addNewImage').style.visibility = "visible";
}

function bmCycle(bm) {
    if (bm==0) {
        return 1;
    }
    else if (bm==1) {
        return 2;
    }
    else {
        return 0;
    }
}

function toggleBubble(n) {

    var pNum = parseInt(theComic.highlit);
    var pObj = theComic.panelsArray[pNum-1];

    if (n==1) {
        var bm = pObj.lBubbleMode;
        var newMode = bmCycle(bm);
        var text = pObj.ltext;

        // Model
        pObj.lBubbleMode = newMode;

        // Display
        var myId = "leftBubble" + theComic.highlit;
        imgObj = document.getElementById(myId);
        setBubbleImageUrl(imgObj, 0, text, newMode);
    }
    else {
        var bm = pObj.rBubbleMode;
        var newMode = bmCycle(bm);
        var text = pObj.rtext;

        // Model
        pObj.rBubbleMode = newMode;

        // Display
        var myId = "rightBubble" + theComic.highlit;
        imgObj = document.getElementById(myId);
        setBubbleImageUrl(imgObj, 1, text, newMode);
    }
}


// FIXME put this somewhere else
// randomInt(0,10) would give numbers from 0 to 9.
function randomInt(lowestInt, highestInt) {
    lowestInt = parseInt(lowestInt);
    highestInt = parseInt(highestInt);
    var randomFraction = Math.random();
    var multiplier = highestInt - lowestInt;
    var output = Math.floor(randomFraction*multiplier) + lowestInt;
    return output;
}

function randomDefaultImages(theComic) {

    var fooArray = [ 

    {'bgColor':'','bgArt':'images/backgroundArt/spacey-scene.png','left':'images/kitties/left/purple_alien2.png', 'right':'images/kitties/right/purple_alien.png'},

    {'bgColor':'','bgArt':'images/backgroundArt/Farm-Landscape.jpg','left':'images/kitties/left/lemmling_Cartoon_cow.png', 'right':'images/kitties/right/lemmling_Cartoon_sheep.png'}, 

    {'bgColor':'5acbed','bgArt':'images/backgroundArt/mochovka-cloudy.png','left':'images/kitties/left/kitty.png', 'right':'images/kitties/right/fox.png'},

    {'bgColor':'cbcf99','bgArt':'images/backgroundArt/ufo-invasion.png','left':'images/kitties/left/shiny-octopus.png', 'right':'images/kitties/right/shiny-octopus2.png'},

    {'bgColor':'f2aeb1','bgArt':'images/backgroundArt/celtic-vine-border.png','left':'images/kitties/left/phique_owl1.png', 'right':'images/kitties/right/phique_owl2.png'},

    {'bgColor':'30b1fc','bgArt':'images/backgroundArt/Clue_Simple_Clouds.png','left':'images/kitties/left/critter.png', 'right':'images/kitties/right/critter2.png'}

    ];

    var x = randomInt(0, fooArray.length);
    theComic.bgColor = fooArray[x]['bgColor'];
    theComic.bgArt = fooArray[x]['bgArt'];
    theComic.leftKittyUrl = fooArray[x]['left'];
    theComic.rightKittyUrl = fooArray[x]['right'];
}

function getStarted() {
    theComic = new KittyComic();
    randomDefaultImages(theComic);
    theComic.createPanel();
    theComic.createPanel();
    refreshDisplay(theComic);

    loadBgImages();
    loadCharacters();
    updateMetadata();

    document.getElementById('jscolor').color.fromString(theComic.bgColor);


}

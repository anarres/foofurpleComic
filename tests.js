

/* TESTS (NB somewhat ironically, these are all broken) */
function getX0Test() {
    var result = "getX0Test... ";
    if (getX0(0) != 0) { result += "failed"; } 
    if (getX0(1) != 400) { result += "failed"; }  
    if (getX0(2) != 0) { result += "failed"; }  
    if (getX0(3) != 400) { result += "failed"; }
    return result;
}
function getY0Test() {
    var result = "getY0Test... ";
    if (getY0(0) != 0) { result += "failed"; } 
    if (getY0(1) != 0) { result += "failed"; }  
    if (getY0(2) != 300) { result += "failed"; }  
    if (getY0(3) != 300) { result += "failed"; }
    if (getY0(4) != 600) { result += "failed"; }  
    if (getY0(5) != 600) { result += "failed"; }
    return result;
}
function getCanvasWidthTest() {
    var result = "getCanvasWidthTest... ";
    if (getCanvasWidth(1) != 400) { result += "failed"; }
    if (getCanvasWidth(2) != 800) { result += "failed"; }
    if (getCanvasWidth(3) != 800) { result += "failed"; }
    if (getCanvasWidth(4) != 800) { result += "failed"; }
    return result;
}
function getCanvasHeightTest() {
    var result = "getCanvasHeightTest... ";
    if (getCanvasHeight(1) != 300) { result += "failed"; }
    if (getCanvasHeight(2) != 300) { result += "failed"; }
    if (getCanvasHeight(3) != 600) { result += "failed"; }
    if (getCanvasHeight(4) != 600) { result += "failed"; }
    if (getCanvasHeight(5) != 900) { result += "failed"; }
    return result;
}

function runTests() {
    alert(getX0Test());  
    alert(getY0Test());  
    alert(getCanvasWidthTest());
    alert(getCanvasHeightTest());
}    

//runTests();










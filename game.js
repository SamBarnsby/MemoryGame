var game;
var images = ["https://goo.gl/v97W2c", "https://goo.gl/UJANgk", "https://goo.gl/iyB9VV","https://goo.gl/HDP9kH"];
var flippedimage = "https://goo.gl/LWtQhj";
var imagenumbers;
var cardimages;
var cards;
var isFlipped;
var previousflippedcardimg = "";
var previousflippedcardid = "";
var src;
function Game(columns, rows) {
    this.columns = columns;
    this.rows = rows;
}

function compareCards(buttonid) {
    var bool;
   
    if(previousflippedcard == "") {
        previousflippedcard = cardimages[buttonid];
        previousflippedcardid = buttonid;
    }
    else if(previousflippedcard != "") {
        if(previousflippedcard == cardimages[buttonid]) {
            isFlipped[buttonid] = 1;
            isFlipped[previousflippedcardid] = 1;
            previousflippedcard = "";
            previousflippedcardid = "";
            bool = true;
        }
        else {
            previousflippedcard = "";
            bool = false;
        }
    }
    if(bool == false) {
            document.getElementById(buttonid).src= flippedimage;
            document.getElementById(previousflippedcardid).src= flippedimage;
            previousflippedcardid = "";
        }
}

function flipCard(buttonid) {
    if(buttonid == previousflippedcardid){}
    else if(isFlipped[buttonid] == 0) {
        document.getElementById(buttonid).src= cardimages[buttonid];
        if(previousflippedcardid != "") {
            setTimeout(function(){ compareCards(buttonid); }, 500); 
        }
        else {
            compareCards(buttonid);
        }
    }
}

Game.prototype.createCanvas = function() {
    var buttonid = 1;
    for(var i = 0; i < this.rows; i++) {
        for(var j = 0; j < this.columns; j++) {
            var boolean = true;
            while(boolean) {
                var src = Math.floor((Math.random() * images.length));
                 
                if(imagenumbers[src] == null) {
                    imagenumbers[src] = 1;
                    cardimages[buttonid] = images[src];
                    boolean = false;
                }
                else if(imagenumbers[src] < cards) {
                    imagenumbers[src] += 1;
                    cardimages[buttonid] = images[src];
                    boolean = false;
                }
                
            }
            document.getElementById('main').innerHTML += "<input type='" + "image" + "' class='"  + "buttons" + "' id='" + buttonid + "' value='" + "' src='" + flippedimage + "' onClick='" + "flipCard(" + buttonid + ")" + "'/>";
            isFlipped[buttonid] = 0;
            buttonid++; 
        }
        document.getElementById('main').innerHTML += "<br/>";
    }
    
}

function newGame() {
    document.getElementById('main').innerHTML = "";
    var columns = document.getElementById('columns').value;
    var rows = document.getElementById('rows').value;
    imagenumbers = new Array(images.length);
    previousflippedcard = "";
    previousflippedcardid = "";
    cardimages = new Array(columns * rows);
    isFlipped = new Array(columns * rows);
    game = new Game(columns, rows);
    cards = (columns * rows) / images.length;
    if(cards % 2 == 0) {
    game.createCanvas();
    }
}
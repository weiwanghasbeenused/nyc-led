/* 

    Scroller.js
    returns Scroller for scrolling messages.

    adjusted by O-R-G
    based on https://gist.github.com/edds/1192523
    by Edd Snowden https://e26.co.uk

    for New York Consolidated LED sign
    https://opendata.cityofnewyork.us

    nyc-led.info
    a *silent radio* tuned to the frequencies of new york city

*/

var Scroller = (function(){
  var scroll = {},
      led = [],
      message = [],
      messageOffset,
      emptyLetters = 0,
      letterSpaces;

  scroll._messageQueue = [];

  (function(){
    // Lovingly borrowed from http://one.idontsmoke.co.uk/x/text/
    var alpha = new Array();
    alpha['a'] = ["00000","00000","01110","00001","01111","10001","01111"];
    alpha['b'] = ["10000","10000","11110","10001","10001","10001","11110"];
    alpha['c'] = ["00000","00000","01111","10000","10000","10000","01111"];
    alpha['d'] = ["00001","00001","01111","10001","10001","10001","01111"];
    alpha['e'] = ["00000","00000","01110","10001","11110","10000","01111"];
    alpha['f'] = ["00111","00100","11110","01000","01000","01000","01000"];
    alpha['g'] = ["00000","00000","01111","10001","01111","00001","01110"];
    alpha['h'] = ["10000","10000","10110","11001","10001","10001","10001"];
    alpha['i'] = ["01100","00000","01100","00100","00100","00100","01110"];
    alpha['j'] = ["00110","00000","00110","00010","00010","10010","01100"];
    alpha['k'] = ["10000","10000","10010","10100","11000","10100","10010"];
    alpha['l'] = ["01100","00100","00100","00100","00100","00100","01110"];
    alpha['m'] = ["00000","00000","11010","10101","10101","10101","10101"];
    alpha['n'] = ["00000","00000","10110","11001","10001","10001","10001"];
    alpha['o'] = ["00000","00000","01110","10001","10001","10001","01110"];
    alpha['p'] = ["00000","00000","11110","10001","10001","11110","10000"];
    alpha['q'] = ["00000","00000","01111","10001","10001","01111","00001"];
    alpha['r'] = ["00000","00000","10111","11000","10000","10000","10000"];
    alpha['s'] = ["00000","00000","01111","10000","01110","00001","11110"];
    alpha['t'] = ["00100","00100","01111","00100","00100","00100","00011"];
    alpha['u'] = ["00000","00000","10001","10001","10001","10011","01101"];
    alpha['v'] = ["00000","00000","10001","10001","01010","01010","00100"];
    alpha['w'] = ["00000","00000","10001","10101","10101","11011","10001"];
    alpha['x'] = ["00000","00000","10001","01010","00100","01010","10001"];
    alpha['y'] = ["00000","00000","10001","10001","01111","00001","01110"];
    alpha['z'] = ["00000","00000","11111","00010","00100","01000","11111"];
    alpha['A'] = ["01110","10001","10001","10001","11111","10001","10001"];
    alpha['B'] = ["11110","10001","10001","11110","10001","10001","11110"];
    alpha['C'] = ["01110","10001","10000","10000","10000","10001","01110"];
    alpha['D'] = ["11110","10001","10001","10001","10001","10001","11110"];
    alpha['E'] = ["11111","10000","10000","11110","10000","10000","11111"];
    alpha['F'] = ["11111","10000","10000","11110","10000","10000","10000"];
    alpha['G'] = ["01110","10001","10000","10011","10001","10001","01110"];
    alpha['H'] = ["10001","10001","10001","11111","10001","10001","10001"];
    alpha['I'] = ["01110","00100","00100","00100","00100","00100","01110"];
    alpha['J'] = ["00111","00010","00010","00010","00010","10010","01100"];
    alpha['K'] = ["10001","10010","10100","11000","10100","10010","10001"];
    alpha['L'] = ["10000","10000","10000","10000","10000","10000","11111"];
    alpha['M'] = ["10001","11011","10101","10101","10001","10001","10001"];
    alpha['N'] = ["10001","10001","11001","10101","10011","10001","10001"];
    alpha['O'] = ["01110","10001","10001","10001","10001","10001","01110"];
    alpha['P'] = ["11110","10001","10001","11110","10000","10000","10000"];
    alpha['Q'] = ["01110","10001","10001","10001","10101","10010","01101"];
    alpha['R'] = ["11110","10001","10001","11110","10100","10010","10001"];
    alpha['S'] = ["01110","10001","10000","01110","00001","10001","01110"];
    alpha['T'] = ["11111","00100","00100","00100","00100","00100","00100"];
    alpha['U'] = ["10001","10001","10001","10001","10001","10001","01110"];
    alpha['V'] = ["10001","10001","10001","10001","01010","01010","00100"];
    alpha['W'] = ["10001","10001","10001","10101","10101","11011","10001"];
    alpha['X'] = ["10001","10001","01010","00100","01010","10001","10001"];
    alpha['Y'] = ["10001","10001","10001","01010","00100","00100","00100"];
    alpha['Z'] = ["11111","00001","00010","00100","01000","10000","11111"];
    alpha['0'] = ["01110","10001","10011","10101","11001","10001","01110"];
    alpha['1'] = ["00010","01110","00010","00010","00010","00010","00010"];
    alpha['2'] = ["01110","10001","00001","00110","01000","10000","11111"];
    alpha['3'] = ["01110","10001","00001","00110","00001","10001","01110"];
    alpha['4'] = ["00010","00110","01010","10010","11111","00010","00010"];
    alpha['5'] = ["11111","10000","11110","00001","00001","10001","01110"];
    alpha['6'] = ["00110","01000","10000","11110","10001","10001","01110"];
    alpha['7'] = ["11111","00001","00010","00010","00100","00100","00100"];
    alpha['8'] = ["01110","10001","10001","01110","10001","10001","01110"];
    alpha['9'] = ["01110","10001","10001","01111","00001","00010","01100"];
    alpha["/"] = ["00001","00001","00010","00100","01000","10000","10000"];
    alpha["\\"]= ["10000","10000","01000","00100","00010","00001","00001"];
    alpha[":"] = ["00000","01100","01100","00000","01100","01100","00000"];
    alpha["."] = ["00000","00000","00000","00000","00000","01100","01100"];
    alpha[","] = ["00000","00000","00000","00000","00000","01100","00100"];
    alpha[" "] = ["00000","00000","00000","00000","00000","00000","00000"];
    alpha["("] = ["00010","00100","00100","00100","00100","00100","00010"];
    alpha[")"] = ["01000","00100","00100","00100","00100","00100","01000"];
    alpha["["] = ["00111","00100","00100","00100","00100","00100","00111"];
    alpha["]"] = ["11100","00100","00100","00100","00100","00100","11100"];
    alpha['<'] = ["00000","00010","00100","01000","00100","00010","00000"];
    alpha['>'] = ["00000","01000","00100","00010","00100","01000","00000"];
    alpha["-"] = ["00000","00000","00000","11111","00000","00000","00000"];
    alpha["="] = ["00000","00000","11111","00000","11111","00000","00000"];
    alpha["'"] = ["00110","00110","00010","00000","00000","00000","00000"];
    alpha["`"] = ["01000","00100","00010","00000","00000","00000","00000"];
    alpha['"'] = ["11011","11011","01001","00000","00000","00000","00000"];
    scroll.alpha = alpha;
  }());

  scroll.enqueue = function(msg){
    // assume the index is the length - 1. Risky I know.
    var current_time = scroll.currentTime(true);
    // return scroll._messageQueue.push(msg) - 1;
    var time_msg = current_time + " /// " + msg;
    console.log(time_msg);
    return scroll._messageQueue.push(time_msg) - 1;
  };
  scroll.dequeue = function(index){
    delete scroll._messageQueue[index];
  }
  scroll.clearQueue = function(){
    scroll._messageQueue = [];
  };

  scroll.start = function(){
    if(!scroll.intervalTimer){
      scroll.appendMessages();
      scroll.intervalTimer = window.setInterval(scroll.run, 50); // e3 to turn into miliseconds
    }
  };
  scroll.stop = function(){
    if(scroll.intervalTimer){
      window.clearInterval(scroll.intervalTimer);
      delete scroll.intervalTimer;
    }
  };

  scroll.drawLetter = function(letter, xOffset){
    var offset = (typeof xOffset !== 'undefined') ? xOffset : 0,
        i, j, v, obj;
    for(i = 0; i < 7; i++){
      for(j = 0; j < 7; j++){
        if( offset + i >= 0 && offset + i < scroll._cols ){
          if(scroll.alpha[letter]){
            v = (scroll.alpha[letter][j].charAt(i) === '1') ? 'on' : 'off';
            obj = led[j][i+offset];
            if(obj.value !== v){
              obj.value = v;
              obj.elm.setAttribute('class', v);
            }
          }
        }
      }
    }
  };

  scroll.appendMessages = function(){
    var messages = scroll._messageQueue.join(' .:. ');

    if(messages.length){
      message = message.concat(messages.split(''));
    } else {
      scroll.stop();
    }
  };

  scroll.addBlank = function(){
    if(message.length < letterSpaces){
      message.push(' ');
      emptyLetters++;

      if(emptyLetters > letterSpaces){
        scroll.appendMessages();
        emptyLetters = 0;
      }
    }
  }

  scroll.run = function(){
    if(messageOffset === 7){
      messageOffset = 0;
      message.shift();
      scroll.addBlank();
    }
    var i, j;
    for(i = -messageOffset, j = 0; i < scroll._cols; j++){
      scroll.drawLetter(message[j], i);
      i = i + 7;
    }
    messageOffset = messageOffset + 1;
  };

  scroll.init = function(elm, cols, rows){
    var i, j, elm;

    scroll._body = document.getElementById(elm);
    scroll._rows = rows;
    scroll._cols = cols;

    letterSpaces = Math.ceil(cols / 7);

    // Fill all available spaces with blanks
    message = new Array(letterSpaces + 1).join(' ').split('');
    messageOffset  = 0;

    for(i=0; i<rows; i++){
      led[i] = [];
      for(j=0; j<cols; j++){
        elm = document.createElement('div');
        elm.setAttribute('id', 'led-'+i+'-'+j);
        scroll._body.appendChild(elm);
        led[i][j] = {
          value: 'off',
          elm: elm
        }
      }
    }
  };

  scroll.currentTime = function (date) {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    if (date)
        return d;
    else
        return h + ":" + m + ":" + s;
  };

  return scroll;
}());

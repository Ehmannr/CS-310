  /*** Name: Ryan Ehmann
 * Date: 2/15/22
 * Section: CS310
 * 
 * * --Lab4 --*/


(function() {
  "use strict";
  // any module-global variables/constants
  var text;
  var cipher;
  var key;
  
  
  window.addEventListener("load", init);

  function init() {
    console.log("window is fully loaded")
    // this code is ran after page is loaded!
    let btnOption = document.querySelector('#options');
    let btnElement = document.getElementById("btn");
    let btnreset = document.getElementById("btn-reset");
    
    // a button click event listener
    btnElement.addEventListener("click", addnumber);
    btnreset.addEventListener("click", reset);
    btnOption.addEventListener("change",showDiv);
var counter = 0;
counter++;
   }


   function addnumber(){
    var counter = 0;
    counter++

   }
   /*** Name: Ryan Ehmann
 * Date: 2/15/22
 * Section: CS310
 * 
 * * --Lab4 --*/

/**
 * @function encryption() the main method for the program
 * @listens onclickevent from the Encrypt It Button
 */


function encryption() {
  //kill all children
  killChild();
  //make vars
   text = document.getElementById("inout").value;
   cipher = document.querySelector('#options').value;
   key = document.getElementById('key').valueAsNumber;
  let btnCaps = document.querySelector('#caps');
   var cipheredText;
  //select correct cipher

  if (cipher == "Randomized") {
    cipheredText = randomizedCipher(text);
  }

  if (cipher == "Shift Cipher") {
    cipheredText = shiftCipher(text);
  }

  if (cipher == "Caesar Cipher") {
    cipheredText = caesarCipher(text, key);
  }


  console.log(btnCaps.checked);
  if (btnCaps.checked == true){
    cipheredText = cipheredText.toUpperCase();
  }

  createChild(cipheredText);

}




/**
 * @function showDiv() allowing for the key to be shown for the Caesar Chipher 
 */
function showDiv() {
  var cipher = document.querySelector('#options').value;

  if (cipher == "Caesar Cipher") {
    document.getElementById("key").style.display = "inline";
  } else {
    document.getElementById("key").style.display = "none";
  }
}


/**
 * @function createChild() making a child nodes
 */
function createChild(cipheredText) {
  const node = document.createElement("p")
  const textnode = document.createTextNode(cipheredText)
  node.appendChild(textnode);
  document.getElementById("output").appendChild(node)


}


/**
 * @function killChild() killing the children for a clean screen
 */
function killChild() {
  var parent = document.getElementById("output");
  var child = parent.firstElementChild;
  while (child) {
    parent.removeChild(child)
    child = parent.firstElementChild;
  }

}


/**
 * @function reset() resets the textarea to nothing
 */
function reset() {
  document.getElementById("inout").value = "";
}


/**
 * @function shiftCipher() Encrpting a text with Shift Cipher
 * @para {string} text to be encrypted
 * @return {string} encrpted text
 */

function shiftCipher(text) {
  text = text.toLowerCase();
  let result = "";
  for (let i = 0; i < text.length; i++) {
    if (text[i] < 'a' || text[i] > 'z') {
      result += text[i];
    } else if (text[i] == 'z') {
      result += 'a';
    } else {
      // letter is between 'a' and 'y’
      // each letter is shifted alphabetically ahead by 1 letter,
      let letter = text.charCodeAt(i);
      let resultLetter = String.fromCharCode(letter + 1);
      result += resultLetter;
    }
  }
  return result;
}


/**
 * @function caesarCipher() Encrpting a text with Caesar Cipher
 * @para {string} text to be encrypted
 * @return {string} encrpted text
 */

function caesarCipher(text, key) {
  text = text.toLowerCase();
  let result = "";
  for (let i = 0; i < text.length; i++) {
    if (text[i] < 'a' || text[i] > 'z') {
      result += text[i];
    } else {
      // letter is between 'a' and 'z’
      // each letter is shifted alphabetically ahead by key letters
      let position = text.charCodeAt(i) - "a".charCodeAt(0);
      position = (position + key) % 26;
      let resultLetter = String.fromCharCode("a".charCodeAt(0) + position);
      result += resultLetter;
    }
  }
  return result;
}


/**
 * @function randomizedCipher() Encrpting a text with Randomized Cipher
 * @para {string} text to be encrypted
 * @return {string} encrpted text
 */

function randomizedCipher(text) {
  let alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  let cipher = [];
  // it's poor style to hardcode a magic number like 26
  let alphabetLength = alphabet.length;
  for (let i = 0; i < alphabetLength; i++) {
    let randomIndex = Math.floor(Math.random() * alphabet.length);
    cipher.push(alphabet.splice([Math.floor(Math.random() * alphabet.length)], 1));
  }

  let result = "";
  for (let i = 0; i < text.length; i++) {
    if (text[i] >= 'a' && text[i] <= 'z') {
      let letterCode = text.charCodeAt(i) - 'a'.charCodeAt(0);
      result += cipher[letterCode];
    } else {
      result += text[i];
    }
  }
  return result.replace(",", "");
}

})();
  


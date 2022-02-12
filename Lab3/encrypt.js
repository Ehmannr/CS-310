// Part II: pops up an alert box

//window.alert("hello world");

// Part III: print on web browser’s console
//console.log("hello world");


// Part IV: Hello World Button
// write your code ...
function helloworld() {
    window.alert("hello world");


}

function getText() {
    var text = document.getElementById("textareabox").value;

    var cipher = document.querySelector('#selectbox').value;


    var key = document.getElementById('key').valueAsNumber;
    //console.log("I am key", key);

    switchcipher(text, cipher, key);
}
/**
 * Part V: Implement a basic Shift-Cipher
 *
 * Returns an encrypted version of the given text, where
 * each letter is shifted alphabetically ahead by 1 letter,
 * and 'z' is shifted to 'a' (creating an alphabetical cycle).
 */
var flag;

function showDiv() {
    var cipher = document.querySelector('#selectbox').value;
    element = document.getElementById("key");
    element2 = document.getElementById("label");


    //console.log("cipher is: ", cipher);
    //console.log("flag is: ", flag);

    if (cipher === '1') {
        element.classList.toggle("hidden");
        element2.classList.toggle("hidden");
        flag = false;

    } else if ((cipher === '2' || cipher === '3') && flag != true) {
        element.classList.toggle("hidden");
        element2.classList.toggle("hidden");
        flag = true;


    }



}

function switchcipher(text, cipher, key) {
    if (cipher == 3) {
        cipher = Math.floor(Math.random() * 2 + 1);
        console.log("cipher is = " ,cipher);
        console.log("Random time boiz");
    }
    if (cipher == 1) {
        console.log("EZ");
        shiftCipher(text);
    }
    if (cipher == 2) {
        if(key<0){
            alert("Please only use Positive numbers");
            exit();
        }
        console.log("the hard one");
        caesarCipher(text, key);
    }


}

function shiftCipher(text) {
    // convert text to lower case
    text.toLowerCase();

    let result = "";
    for (let i = 0; i < text.length; i++) {
        if (text[i] < 'a' || text[i] > 'z') {
            // current character is not a letter
            result += text[i];


        } else if (text[i] == 'z') {
            // letter is 'z'
            // the encrypted letter should be 'a'
            result += text[i] = 'a'

        } else {
            // letter is between 'a' and 'y’
            // letter should be shifted alphabetically ahead by 1 letter
            result += String.fromCharCode(text.charCodeAt(i) + 1);

        }
    }
    alert(result);
    return result;

}




/**
 * Part VI.
 * Returns an encrypted version of the given text, where
 * each letter is shifted alphabetically ahead by key letter
 * (creating an alphabetical cycle).
 */
function caesarCipher(text, key) {
    // convert text to lower case
    text = text.toLowerCase();
    //console.log(text);

    let result = "";
    for (let i = 0; i < text.length; i++) {
        if (text[i] < 'a' || text[i] > 'z') {
            // current character is not a letter
            // keep the character as it is
            result += text[i];

        } else {
            // letter is between 'a' and 'y’
            // letter should be shifted alphabetically ahead by key letter
            //console.log(text[i]);
            //console.log(text.charCodeAt(i));  // this makes letter === number
            temp = ((text.charCodeAt(i) - 97) + key) %26 + 97;
           result+= String.fromCharCode(temp);
    }

}
alert(result);
return result;
}
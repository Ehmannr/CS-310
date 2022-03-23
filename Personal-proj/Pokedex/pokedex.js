/**
 * CS 310 Lab 7
 * Pokedex Warmup
 * 
 * SOME HELPFULL URLS FOR THE API
 * 
 * (getting a specific pokemon)
 * https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/pokedex.php?pokemon=pikachu
 * https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/game.php
 * 
 * data.(blank)
 * hp​
  images: Object { photo: "images/charmander.jpg", typeIcon: "icons/fire.jpg", weaknessIcon: "icons/water.jpg" }
     photo: "images/charmander.jpg"
     typeIcon: "icons/fire.jpg"
     weaknessIcon: "icons/water.jpg"
  info: Object { id: 4, type: "fire", weakness: "water", … }
    description: "Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail."
    id: 4
    type: "fire"
    weakness: "water"
  moves: Array(4) [ {…}, {…}, {…}, … ]
  name: "Charmander"
  shortname
 */


(function () {
  "use strict";

  // TODO: What's the BASEURL of pokedex API?
  const BASE_URL = "https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/";
  const starterPokemon = ["Bulbasaur", "Charmander", "Squirtle"];


  /**
   *  init() function  will be called when the window is loaded.
   */
  window.addEventListener("load", init);

  function init() {

    // randomly pick a pokemon name
    let index = getRandomInt(0, starterPokemon.length - 1);
    var name = starterPokemon[index];

    // GET pokemon data by name
    requestByName(name);

    id("start-btn").addEventListener("click", function () {
      requestBattle(name);
    })

  }



  /**
   * make a GET request to get a Pokemon sprite by its name
   * @param {string} name A pokemon name
   * ------------------------------------------------------------------------------------------------
   * THIS IS FULLY DONE
   * ------------------------------------------------------------------------------------------------
   */
  async function requestByName(name) {
    // TODO: GET data of a pokemon name
    console.log("requesting ", name, "Please wait ...")

    //get data remember fetch by default is a GET request
    var url = BASE_URL + "pokedex.php?pokemon=" + name
    const response = await fetch(url)
    const data = await response.json()

    //give data to card
    console.log("giving data to card...")
    showCard("my-card", data)
  }




  /**
   * make a POST request to post a Pokemon name and start a battle
   * @param {string} name A pokemon name
   */
  async function requestBattle(name) {
    // TODO: make a POST request to post a Pokemon name and start a battle
    console.log("getting game set up ...")

    //get data BY POST REQUEST FORM
    var url = BASE_URL +"game.php?"
    // Add the various parameters to the params
    //{"user":"BurlingtonCodeAcademy","repo":"til","section":"blob","branch":"master","filepath":"/README.md"}
    var param  = new FormData
    param.append("startgame", true)
    param.append("mypokemon", name)
        // {"startgame": "true", "mypokemon": name}

    const response = await fetch(url, {
      method: "POST",
      body: param
    })
    const data = await response.json()
    console.log("their data = ", data.p2 )
    //give data to card
    console.log("giving data to card...")
    showCard("their-card", data.p2)
  }


  /**
   * show a Pokemon sprite info in a div, where its id is cardId
   * @param {string} cardId A div id #my-card or #their-card
   * @param {JSON} pokemon A json object includes the info of a Pokemon sprite
   * ------------------------------------------------------------------------------------------------
   * THIS IS FULLY DONE
   * ------------------------------------------------------------------------------------------------
   */
  function showCard(cardId, pokemon) {
    console.log("pokemon = ", pokemon.moves);
    // TODO: The “name” value should populate the #my-card .name heading.
    var parent = document.getElementById(cardId)
    var child = parent.getElementsByClassName("name")
    child[0].innerText = pokemon.name

    // TODO:  The “hp” value should populate the #my-card .hp span
    // You will need to append “HP” to the provided hp value
    child = parent.getElementsByClassName("hp")
    child[0].innerText = pokemon.hp

    // TODO:  The description should be placed in the #my-card .info paragraph.
    child = parent.getElementsByClassName("info")
    child[0].innerText = pokemon.info.description

    // TODO: The “images” value is a collection of three folder paths,
    // the first being “photo” to link to the Pokemon’s photo (referenced by #my-card .pokepic),
    child = parent.getElementsByClassName("pokepic")
    child[0].src = BASE_URL + pokemon.images.photo
    // the second being “typeIcon” to link to the type icon of the Pokemon in the top-left corner (#my-card .type),
    child = parent.getElementsByClassName("type")
    child[0].src = BASE_URL + pokemon.images.typeIcon
    // and the third being the “weaknessIcon” to link to the weakness type icon of the Pokemon in the bottom-left corner (#my-card .weakness).

    child = parent.getElementsByClassName("weakness")
    child[0].src = BASE_URL + pokemon.images.weaknessIcon


    // The “moves” attribute includes data about the Pokemon’s moves
    // (between 1 and 4 moves, depending on the Pokemon).
    let btns = qsa("#" + cardId + " .moves button");
    for (let i = 0; i < btns.length; i++) {
      if (pokemon.moves[i]) {
        btns[i].children[0].innerText = pokemon.moves[i].name;
        if (pokemon.moves[i].dp) {
          btns[i].children[1].innerText = pokemon.moves[i].dp;
        }
        let url = BASE_URL + "icons/" + pokemon.moves[i].type + ".jpg";
        btns[i].children[2].src = url;
        btns[i].children[2].alt = pokemon.moves[i].type;
      } else {
        btns[i].classList.add("hidden");
      }
    }

    // remove class "hidden" from "#start-btn" button
    id("start-btn").classList.remove("hidden");

  }




  /* ------------------------------ Helper Functions  ------------------------------ */
  // Note: You may use these in your code, but do remember that your code should not have
  // any functions defined that are unused.

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @returns {object} - valid result text if response was successful, otherwise rejected
   *                     Promise result
   */
  function checkStatus(response) {
    if (response.ok) {
      return response.text();
    } else {
      return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} query - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }

  /**
   * Returns a random integer between min and max.
   * @param {number} min - minimal integer number
   * @param {number} max - maximal integer number
   * @returns {number} a random integer between min (inclusive) and max (exclusive)
   */
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


})();
/**
 * The constructor function defines  the Text object with four paarameters and a function.
 * The function textInfo returns a string with containing title, number of characters and number of words
 * @param title
 * @param author
 * @param language
 * @param text
 * @constructor
 */
function Text(title, author, language, text) {
    this.title = title;
    this.author = author;
    this.language = language;
    this.text = text;
    this.textInfo = this.title + ' (' + this.text.split(" ").length + ' words, ' + this.text.length + ' chars)';
}

//initialization of a text object that will be displayed as default when page loads
const defaultText = new Text('Förändringens Tid', 'Erik Ström', 'swedish',
    'Vinden viner över sällsamma ruiner, över berg och slätter, dagar som nätter. Ger världen form inför den kommande storm, likt gudars sång, skall bli dess undergång. Svart som natten, blank likt vatten, i skyn du häver då Allfader kräver. Åter resas skall nu han, som i misteln döden fann. Sonas med sin ene broder, den blinde född av samma moder. Satt att råda är de båda, bröders hand över evigt land.'
);

var englishTexts = [];//array will be used to store english Text objects when gotten from the json file
var swedishTexts = [];//array will be used to store english Text objects when gotten from the json file

/**
 * This function request data from the json file texts.json through a server. The file contains two arrays of text "EN" and "SE".
 * En contains english text and se contain swedish text. when the data is gotten, The texts are load into Text objects
 * that are then store in either englishText or swedistText arrays depending on the language
 */
function getTexts(){
    let requestURL = "texts.json"
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        const response= request.response;
        const jsonEnTexts = response["EN"];
        const jsonSeTexts = response["SE"];

        //load englishText
        for(var i=0; i<jsonEnTexts.length; i++)
        {
            var title = jsonEnTexts[i].title;
            var author = jsonEnTexts[i].author;
            var language = jsonEnTexts[i].language;
            var text = jsonEnTexts[i].text;
            englishTexts.push(new Text(title, author, language, text));
        }
        //load swedishText
        for(var j=0; j<jsonSeTexts.length; j++)
        {
            var title2 = jsonSeTexts[j].title;
            var author2 = jsonSeTexts[j].author;
            var language2 = jsonSeTexts[j].language;
            var text2 = jsonSeTexts[j].text;
            swedishTexts.push(new Text(title2, author2, language2, text2));
        }
    }
}

var chars = document.getElementsByClassName("char");
var startTime=0;
var currentTime=0;
var total_errors =0
var total_char = 0;
var mySound = new Audio("audio/pop-sound-effect.mp3");
var correctLetter;
var typedLetter;
var textLength =0;

/**
 * this function controls the language options. When one language is clicked, that language is checked
 * and the other is unchecked, such that only one language can be choosen at a time.
 * the list of "Choose text" is then update to match the choosen language by function createOptions,
 * displayText display the text content of the first text in the corresponding array
 * resetgame and resetStatistics sets new game and clear staisitics
 */
function chooseLanguage() {
    var swed = document.getElementById("swedish");
    var eng = document.getElementById("english");
    swed.addEventListener("click", function () {
        swed.checked = true;
        eng.checked = false;
        createOptions();
        displayText(swedishTexts[0]);
        resetgame();
        resetStatistics();
    }, false)
    eng.addEventListener("click", function () {
        eng.checked = true;
        swed.checked = false;
        createOptions();
        displayText(englishTexts[0])
        resetgame();
        resetStatistics();

    }, false)
}

/**
 * This function creates a select element, then determines which language is checked and create and append option
 * elements within the select element, one option for each text in the choosen Text array depending on the checked language.
 * the options contain the text titles as innerText.
 */
function createOptions() {
    var select = document.createElement("select");

    if(document.getElementById("swedish").checked)
    {
        for(var i= 0; i<swedishTexts.length; i++)
        {
            var option = document.createElement("option");
            option.value = i+1;
            option.innerText = swedishTexts[i].title;
            select.appendChild(option);
        }
    }

    if(document.getElementById("english").checked)
    {
        for(var j= 0; j<englishTexts.length; j++)
        {
            var option2 = document.createElement("option");
            option2.value = j+1;
            option2.innerText = englishTexts[j].title;
            select.appendChild(option2);
        }
    }

    document.getElementById("text_choices").innerHTML= select.innerHTML;

}


/**
 * This function recieves a text, and for each letter in the text, creates a span element to wrap with the letter as
 content and appends it to the innertext of the element with id text_content
 *
 * @param myText
 * @returns {p}
 */
function spanText(myText) {
    var p = document.createElement("p");
    var text_length = myText.length;
    for (var i = 0; i < text_length; ++i) {
        var span = document.createElement("span");
        span.className = "char";
        span.innerText = myText[i];
        p.appendChild(span);
    }
    return p;

}


/**
 * function receives a Text object and set the different text data  as innertext/innerhtml to the corresponding html
 * elements to be displayed on the webpage
 *
 */
function displayText(selected_text) {
    document.getElementById("text_title").innerText = selected_text.textInfo;
    document.getElementById("text_author").innerText = selected_text.author;
    document.getElementById("text_content").innerHTML = spanText(selected_text.text).innerHTML;

}


function resetgame() {
    chars = document.getElementsByClassName("char");
    var selectedValue = document.getElementById("text_choices").value;
    var selectedText;
    if(document.getElementById("english").checked)
    {
        selectedText = englishTexts[selectedValue - 1];
    }
    if(document.getElementById("swedish").checked)
    {
        selectedText = swedishTexts[selectedValue - 1];
    }
    textLength = selectedText.text.length;
    displayText(selectedText);
    chars[0].style.backgroundColor = "yellow";
    document.getElementById("typing_area").value= "";
}


/**
 * resets all statistics, startTime, currentTime, total_errors and total_char to zero
 */
function resetStatistics(){
    startTime=0;
    currentTime=0;
    total_errors =0
    total_char = 0;
    document.getElementById("gross_wpm").innerText = 0;
    document.getElementById("net_wpm").innerText = 0;
    document.getElementById("accuracy").innerText = 0;
    document.getElementById("errors").innerText = 0;

}


/**
 * this function listens for when the user selects a text,
 * calls the function displayText and passes the Text object corresponding to the user's choice
 */
function changeText() {
    var select_id = document.getElementById("text_choices");
    select_id.addEventListener("change", function () {
        defaultState();
        resetgame();
        resetStatistics();
    }, false);
}

/**
 * this function returns true of false to if the value of the button is STOP.
 * @returns {boolean}
 */
function gameStarted() {
    var button_id = document.getElementById("control_button");
    var choice = button_id.value;

    return choice === "STOP";
}

/*
This function switches between play and stop by changing the background image and the value of the button
each time the button is clicked
 */
function switchControlButton() {
    var button_id = document.getElementById("control_button");
    var choice = button_id.value;

    if (choice === "START") {
        button_id.value = "STOP";
        button_id.style.backgroundImage = "url('img/red.jpg')";
    }
    else if (choice === "STOP") {
        button_id.value = "START";
        button_id.style.backgroundImage = "url('img/green.jpg')";
    }
}

/**
 * This function sets the value and background of the button to display start button,
 * disable the input box (typing area), clear the input box and
 * highlights the first character of the displayed text.
 *
 */
function defaultState(){
    var button_id = document.getElementById("control_button");
    button_id.value= 'START';
    button_id.style.backgroundImage = "url('img/green.jpg')";

    var typingAreaId = document.getElementById("typing_area");
    typingAreaId.value = "";
    typingAreaId.disabled = true;
    chars[0].style.backgroundColor = "yellow";
}

/**
 * this function enable the element with id "typing_area" (area for typing) when the value of the button
 * with id "control_button") is 'STOP' (when the game is started) and disable the element (typing area)
 * when the button value is 'START' (the game is stopped)
 */
function enableInputArea(){
    var typingAreaId = document.getElementById("typing_area");
    var button_id = document.getElementById("control_button");
    var choice = button_id.value;
    if (choice === "START") {
        typingAreaId.disabled = true;
    }
    else if (choice === "STOP") {
        typingAreaId.disabled = false;
    }
}

/**
 * creates a date a new date object with the current time
 * uses the Date object method getTime to get the number of milliseconds since midnight jan 1 1970 to current time
 * returns number of milliseconds
 * @returns {number}
 */
function getNewTime() {
    var myDate = new Date();
    return  myDate.getTime();
}

/**
 * computes gross and net WPM, accuracy and update the statistics displayed
 */
function updateStatistics() {
    var elapsed_minutes = (currentTime - startTime)/60000; //time is converted from milliseconds to minute
    var total_words = (total_char)/5;
    var grossWPM = total_words/elapsed_minutes;
    var netWPM = grossWPM - (total_errors/elapsed_minutes);
    var typing_accuracy = 100*(total_words-total_errors)/total_words;
    document.getElementById("gross_wpm").innerText = grossWPM;
    document.getElementById("net_wpm").innerText = netWPM;
    document.getElementById("accuracy").innerText = typing_accuracy;
    document.getElementById("errors").innerText = total_errors;
}

/**
 * this function returns true when the ignore case button is checked and false otherwise
 * @returns {boolean}
 */
function ignoreCasing(){
    return document.getElementById("ignore_case").checked;
}

/*
This function listens for when the user types a new character then,
move highlight to next character,
change the color of the current character,
check if the character entered is a space, if so
clears the content of the input box.
 */
function startOrStopGame() {

    var button_id = document.getElementById("control_button")
    button_id.addEventListener("click", function (){
        resetgame();
        switchControlButton();
        enableInputArea();
        if(gameStarted())
        {
            resetStatistics(); //clear statistics
            startTime = getNewTime();
        }
    }, false);


}

/**
 * This function listens for when a character is entered in the input box with id typing_area,
 * increases the total characters type from game start (total_char) by by 1,
 * get new Time(currentTime)
 * check if character entered is correct, if correct the letter in the display text is colered white
 * if wrong the letter in the display text is colored red and a pop sound is generated and number of errors increases by 1
 * if the character is a space, the input box is cleared.
 * if ignore case is checked, converted expected and typed characters to lower case before typing
 * print update statistics
 */
function trackTyping(){
    var typeAreaId = document.getElementById("typing_area");
    typeAreaId.addEventListener("input", function () {

        total_char++;
        console.log("total chars: " + total_char + "\n");
        currentTime = getNewTime();
        console.log("current time: " + currentTime + "\n");
        console.log("start time: " + startTime + "\n");

        var typedText = typeAreaId.value;
        var lengthOfText = typedText.length;
        chars[total_char-1].style.color = "white"; //changes color of type character
        chars[total_char-1].style.backgroundColor = ""; // remove highlight from the typed character
        correctLetter = chars[total_char-1].innerHTML;
        typedLetter = typedText[lengthOfText- 1];

        //clear the input box if entered character is space
        if (typedLetter === " ")
        {
            typeAreaId.value = "";
        }

        /*whenever incorrect character is entered number of errors increases by one,
        The character on the text is colored red and
        a sound is played
         */
        if(ignoreCasing())
        {
            typedLetter = typedLetter.toLowerCase();
            correctLetter = correctLetter.toLowerCase();
        }
        if (typedLetter !== correctLetter)
        {
            total_errors++;
            chars[total_char-1].style.color = "red";
            mySound.play();
        }
        console.log("text lenghth:"+textLength);
        if(total_char < textLength)
        {
            chars[total_char].style.backgroundColor = "yellow"; //place highlight to next character
        }
        else
        {
            typeAreaId.value ="GAME OVER!";
            switchControlButton();
            enableInputArea();
        }

        var elapsed_minutes = (currentTime - startTime)/60000; //time is converted from milliseconds to minute
        var total_words = (total_char)/5;
        var grossWPM = total_words/elapsed_minutes;
        var netWPM = grossWPM - (total_errors/elapsed_minutes);
        var typing_accuracy = 100*(total_char-total_errors)/total_char;
        document.getElementById("gross_wpm").innerText = Math.round(grossWPM);
        document.getElementById("net_wpm").innerText = Math.round(netWPM);
        document.getElementById("accuracy").innerText = Math.round(typing_accuracy);
        document.getElementById("errors").innerText = total_errors;
        console.log("total errors: " + total_errors + "\n");


    }, false);
}

/**
 * main is the function that is called at load time through the windows event listener. At load time,
 * getTexts gets data from json file and load arrays,
 * the defaultText Text object is displayed
 * swedish language is checked,
 * defaultState function  claer and disable inputbox, display start button and highlight first letter of display text.
 *listens for events(input from user) and to trigger chooseLanguage, changeText, startOrStopGame, trackTyping
 *
 */
function main() {
    getTexts();
    document.getElementById("swedish").click(); //check swedish as load time
    displayText(defaultText);//set default text as the first text of the TextArray
    defaultState();
    chooseLanguage();
    changeText();
    startOrStopGame();
    trackTyping();
}

window.addEventListener("load", main, false);
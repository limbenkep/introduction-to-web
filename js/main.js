function Text(title, author, language, text) {
    this.title = title;
    this.author = author;
    this.language = language;
    this.text = text;
    this.textInfo = this.title + ' (' + this.text.split(" ").length + ' words, ' + this.text.length + ' chars)';
}

const textnr1 = new Text('Förändringens Tid', 'Erik Ström', 'swedish',
    'Vinden viner över sällsamma ruiner, över berg och slätter, dagar som nätter. Ger världen form inför den kommande storm, likt gudars sång, skall bli dess undergång. Svart som natten, blank likt vatten, i skyn du häver då Allfader kräver. Åter resas skall nu han, som i misteln döden fann. Sonas med sin ene broder, den blinde född av samma moder. Satt att råda är de båda, bröders hand över evigt land.'
);

const textnr2 = new Text('Moln', 'Karin Boye', 'swedish',
    'Se de mäktiga moln, vilkas fjärran höga toppar stolta, skimrande resa sig, vita som vit snö! Lugna glida de fram för att slutligen lugnt dö sakta lösande sig i en skur av svala droppar. Majestätiska moln - genom livet, genom döden gå de leende fram i en strålande sols sken utan skymmande oro i eter så klart ren, gå med storstilat, stilla förakt för sina öden.'
);

const textnr3 =new Text('Jag har en dröm', 'Martin Luther King Jr.', 'swedish',
    'Så säger jag er, mina vänner, att jag trots dagens och morgondagens svårigheter har en dröm. Det är en dröm med djupa rötter i den amerikanska drömmen om att denna nation en dag kommer att resa sig och leva ut den övertygelsens innersta mening, som vi håller för självklar: Att alla människor är skapade med samma värde.'
);
var textArray = [textnr1, textnr2, textnr3];
//var myTextArray = [];
var englishTexts = [];
var swedishTexts = [];

var lang = "";

/*
function getTexts(lang){
    let requestURL = "./js/texts.json"
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        const jsonTexts = request.response;
        var arraylength = jsonTexts.length;

        console.log("engligh texts: " + arraylength);
    }
*/

function getTexts(){
    let requestURL = "./js/texts.json"
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        const response= request.response;
        const jsonEnTexts = response["EN"];
        const jsonSeTexts = response["SE"];
        //console.log("texts:"+jsonTexts)

        //console.log("engligh textsbb: " + arraylength);
        for(var i=0; i<jsonEnTexts.length; i++)
        {
            var title = jsonEnTexts[i].title;
            var author = jsonEnTexts[i].author;
            var language = jsonEnTexts[i].language;
            var text = jsonEnTexts[i].text;
            englishTexts.push(new Text(title, author, language, text));
            console.log("engligh title: " + englishTexts[i].title);
        }

        for(var j=0; j<jsonSeTexts.length; j++)
        {
            var title2 = jsonSeTexts[j].title;
            var author2 = jsonSeTexts[j].author;
            var language2 = jsonSeTexts[j].language;
            var text2 = jsonSeTexts[j].text;
            swedishTexts.push(new Text(title2, author2, language2, text2));
            console.log("swedish title: " + swedishTexts[j].title);
            //console.log("engligh title: " + myTextArray[i].title);
        }


    }
}

var chars = document.getElementsByClassName("char");
var startTime=0;
var currentTime=0;
var total_errors =0
var total_char = 0;
var mySound = new Audio("img/pop-sound-effect.mp3");
var correctLetter;
var typedLetter;
var textLength =0;


function byId(id) {
    return document.getElementById(id);
}
/**
 * this function controls the language options. When one language is clicked on, that language is checked
 * and the other is unchecked, susch that only one language can be choosen at a time
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
    //console.log("title1: " + myTextArray[0].title);


}

function showMe(msg, arr) {
    console.log(msg)
    if(arr !== null) {
        for (let i = 0; i < arr.length; i++) {
            console.log(arr[i]);

        }
    }else{
        console.log("Arry is null");
    }

}
/**
 * This function creates a select element containing an option elements for each text in myTextArray.
 * the options contain the text titles as innerText.
 */
function createOptions() {
    var select = document.createElement("select");
    //var textList = document.getElementById("text_choices")
    if(document.getElementById("swedish").checked)
    {
        for(var i= 0; i<swedishTexts.length; i++)
        {
            console.log("swedishlength: " + swedishTexts.length);
            var option = document.createElement("option");
            option.value = i+1;
            option.innerText = swedishTexts[i].title;
            console.log("choices "+ swedishTexts[i].title);
            select.appendChild(option);
        }
    }

    if(document.getElementById("english").checked)
    {
        console.log("length: " + englishTexts.length);
        for(var j= 0; j<englishTexts.length; j++)
        {
            var option2 = document.createElement("option");
            option2.value = j+1;
            option2.innerText = englishTexts[j].title;
            console.log("choices "+ englishTexts[j].title)
            select.appendChild(option2);
        }
    }

    document.getElementById("text_choices").innerHTML= select.innerHTML;
    //console.log("choices"+ select.innerHTML)

}

/**
 * function author and text content to the corresponding html elements to be displayed on the screen
 *
 */
function displayText(selected_text) {
    document.getElementById("text_title").innerText = selected_text.textInfo;
    document.getElementById("text_author").innerText = selected_text.author;
    document.getElementById("text_content").innerHTML = spanText(selected_text.text).innerHTML;

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
    }, false)


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
    //resetStatistics();
}

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
function trackTyping(){
    var typeAreaId = document.getElementById("typing_area");
    typeAreaId.addEventListener("input", function () {

        total_char++;
        console.log("total chars: " + total_char + "\n");
        currentTime = getNewTime();
        console.log("current time: " + currentTime + "\n");
        console.log("start time: " + startTime + "\n");
        // console.log("text chars: " + currentTextContent[total_char-] + "\n");

        var typedText = typeAreaId.value;
        var lengthOfText = typedText.length;
        chars[total_char-1].style.color = "white"; //changes color of type character
        chars[total_char-1].style.backgroundColor = ""; // remove highlight from the typed character
        //chars[total_char].style.backgroundColor = "yellow"; //place highlight to next character
        correctLetter = chars[total_char-1].innerHTML;
        typedLetter = typedText[lengthOfText- 1];

        //When ever space is eneter, the input box is cleared
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

function defaultState(){
    var button_id = document.getElementById("control_button");
    button_id.value= 'START';
    button_id.style.backgroundImage = "url('img/green.jpg')";
    var typingAreaId = document.getElementById("typing_area");
    typingAreaId.value = "";
    typingAreaId.disabled = true;
    //chars[0].style.backgroundColor = "yellow";
}
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
        //span.className = "test_character";
        // console.log("Character: " + myText[i] + "\n")
        span.innerText = myText[i];
        // console.log("Spanned: " + span + "\n");
        p.appendChild(span);
    }
    return p;

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
    console.log("total errors: " + total_errors + "\n");


}

function main() {
    getTexts();
    //document.getElementById("swedish").click();
    displayText(textArray[0]);//set default text as the first text of the TextArray
    chars[0].style.backgroundColor = "yellow";//hightlight the first letter of the text
    var typingAreaId = document.getElementById("typing_area");
    typingAreaId.disabled = true;
    document.getElementById("swedish").click();
    createOptions();
    chooseLanguage();
    changeText();
    startOrStopGame();
    trackTyping();
}

//window.addEventListener("load", changeText, false);

//window.addEventListener("load", startOrStopGame, false);
//window.addEventListener("load", startGame, false);
window.addEventListener("load", main, false);
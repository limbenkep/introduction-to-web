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
var typed_text;
var start_time=0;
var current_time=0;
var total_errors =0;
var total_char = 0;


function byId(id) {
    return document.getElementById(id);
}
function changeText(selected_text) {
    document.getElementById("text_title").innerText = selected_text.textInfo;
    document.getElementById("text_author").innerText = selected_text.author;
    document.getElementById("text_content").innerHTML = spanText(selected_text.text).innerHTML;

}
function displaytext() {
    var selected_value = document.getElementById("text_choices").value;
    var selected_text = textArray[selected_value - 1];
    changeText(selected_text);
}

function getEntryInfo(text) {

}
/*
This function clears the content of the input box whenever the user presses the space button
 */
function tractTyping() {

    var typeAreaId = document.getElementById("typing_area");
    typeAreaId.addEventListener("keyup", function () {
        total_char++;
        console.log("total chars: " + total_char + "\n");
        var typedText = typeAreaId.value;
        var lengthOfText = typedText.length;
        if (typedText[lengthOfText - 1] === " ") {
            typeAreaId.value = "";
        }
    }, false)
}

function startGame() {
    var button_id = document.getElementById("control_button")
    button_id.addEventListener("click", switchButton, false)
}

/*
This function switches between start and stop by changing the background image and the value of the button
each time the button is clicked
 */
function switchButton() {
    var button_id = document.getElementById("control_button")
    var choice = button_id.value;
    if (choice === "START") {
        button_id.value = "STOP";
        button_id.style.backgroundImage = "url('img/red.jpg')";
    }
    if (choice === "STOP") {
        button_id.value = "START";
        button_id.style.backgroundImage = "url('img/green.jpg')";
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
    var elapsed_minutes = (current_time - start_time)/60000; //time is converted from milliseconds to minute
    var total_words = (typed_text.length)/5;
    var grossWPM = total_words/elapsed_minutes;
    var netWPM = grossWPM - (total_errors/elapsed_minutes);
    var typing_accuracy = 100*(total_words-total_errors)/total_words;
    document.getElementById("gross_wpm").innerText = grossWPM;
    document.getElementById("net_wpm").innerText = netWPM;
    document.getElementById("accuracy").innerText = typing_accuracy;
    document.getElementById("errors").innerText = total_errors;

}

function main() {
    changeText(textArray[0]);
}

window.addEventListener("select", displaytext, false);
window.addEventListener("load", tractTyping, false);
window.addEventListener("load", startGame, false);
window.addEventListener("load", main, false);

var textnr1 = {
    title: 'Förändringens Tid',
    author: 'Erik Ström',
    language: 'swedish',
    text: 'Vinden viner över sällsamma ruiner, över berg och slätter, dagar som nätter. Ger världen form inför den kommande storm, likt gudars sång, skall bli dess undergång. Svart som natten, blank likt vatten, i skyn du häver då Allfader kräver. Åter resas skall nu han, som i misteln döden fann. Sonas med sin ene broder, den blinde född av samma moder. Satt att råda är de båda, bröders hand över evigt land.',
    textTitle: function () {
        return this.title;
    },
    authorName: function () {
        return this.author;
    },
    textLanguage: function () {
        return this.authorName()
    },
    textContent: function () {
        return this.text;
    }
}

var textnr2 = {
    title: 'Moln',
    author: 'Karin Boye',
    language: 'swedish',
    text: 'Se de mäktiga moln, vilkas fjärran höga toppar stolta, skimrande resa sig, vita som vit snö! Lugna glida de fram för att slutligen lugnt dö sakta lösande sig i en skur av svala droppar. Majestätiska moln - genom livet, genom döden gå de leende fram i en strålande sols sken utan skymmande oro i eter så klart ren, gå med storstilat, stilla förakt för sina öden.',
    textTitle: function () {
        return this.title;
    },
    authorName: function () {
        return this.author;
    },
    textLanguage: function () {
        return this.authorName()
    },
    textContent: function () {
        return this.text;
    }
}

var textnr3 = {
    title: 'Jag har en dröm',
    author: 'Martin Luther King Jr.',
    language: 'swedish',
    text: 'Så säger jag er, mina vänner, att jag trots dagens och morgondagens svårigheter har en dröm. Det är en dröm med djupa rötter i den amerikanska drömmen om att denna nation en dag kommer att resa sig och leva ut den övertygelsens innersta mening, som vi håller för självklar: Att alla människor är skapade med samma värde.',
    textTitle: function () {
        return this.title;
    },
    authorName: function () {
        return this.author;
    },
    textLanguage: function () {
        return this.authorName()
    },
    textContent: function () {
        return this.text;
    }
}

var textArray = [textnr1, textnr2, textnr3]

function wordCount(mystring) {
    return mystring.split(" ").length;
}

function byId(id) {
return document.getElementById(id);
}
function displaytext() {

    var selected = document.getElementById("text_choices").value;
    var textString = textArray[selected-1].text;
    var nrOfCharacter = textString.length;
    var nrOfWords = wordCount(textString);
    document.getElementById("text_title").innerText = textArray[selected - 1].textTitle() + ' (' + nrOfWords + ' words, ' + nrOfCharacter + ' chars)';
    document.getElementById("text_author").innerText = textArray[selected - 1].authorName();
    document.getElementById("text_content").innerText = textArray[selected - 1].textContent();

    /*switch (selected) {
        case "1":
            document.getElementById("text_title").innerText = textnr1.textTitle();
            document.getElementById("text_author").innerText = textnr1.authorName();
            document.getElementById("text_content").innerText = textnr1.textContent();
            break;
        case "2":
            document.getElementById("text_title").innerText = textnr2.textTitle();
            document.getElementById("text_author").innerText = textnr2.authorName();
            document.getElementById("text_content").innerText = textnr2.textContent();
            break;
        case "3":
            document.getElementById("text_title").innerText = textnr3.textTitle();
            document.getElementById("text_author").innerText = textnr3.authorName();
            document.getElementById("text_content").innerText = textnr3.textContent();
            break;
    }*/
}

function tractTyping() {
    var typeAreaId = document.getElementById("typing_area");
    typeAreaId.addEventListener("keyup", function () {
        var typedText = typeAreaId.value;
        var lengthOfText = typedText.length;
        if(typedText[lengthOfText-1] === " ")
        {
            typeAreaId.value = "";
        }
    })
}
function main() {
    document.getElementById("myTextarea").readOnly = true;
}

window.addEventListener("change", displaytext);
window.addEventListener("keyup", tractTyping);
window.addEventListener("load", main, false);
# Projektuppgift

## Environment & Tools / Utvecklingsmiljö & Verktyg
Window 10 Operating system, Webstorm 2019.3.4 IDE, Git version 2.25.0.windows.1, Google Chrome 83.0.4103.61 (64-bit), 
firefox 76.0.1 (64-bitars) and Microsoft edge, windows explorer version 11.836.18362.0
, https://validator.w3.org/.
All images for this project are copies from google pictures

### Purpose
The aim of this project is to create a web application that measures the typing speed and accuracy as a user types using the keyboard, 
using html for the structure of the application, CSS for styling and javascript for functionality.

### Procedures
This project was carried out according to specifications decribed in the document projektbeskrivning in Moodle.
For this project, the structure of the page is defined in the index.html, styles a implemented in style.css stored 
in directory css and functionality is implemented in the main.js stored in directory js. The texts used in this program are 
stored in the json file texts.json. The folders img, audio and font contain images, audio and fonts respectively used 
for this project. All the above mentioned directories and files must be taken along to be able to reproduce this program.
This program has been tested on four browsers and seen to work well on Google Chrome Version 83.0.4103.61 (64-bit), 
firefox 76.0.1 (64-bitars) and Microsoft edge but does not work on windows explorer version 11.836.18362.0.


If the page loads correctly, the page should look as follows. The page should show a clearly distinct header, main and footer. 
The header should have a logo picture and a label,and styled with a continous animation. 
In Main at top left 3 checkboxes ignore case, swedish and english should be displayed with swedish checked by default. 
A droplist 'Choose text' should be displayed on the top right of main containing a list of swedish text with the first on the list 
selected by default. This list should be updated if user checks the english box with a list of english text and vice versa. 
The content of selected text should be displayed below the setting and text list and if a new text is updated the 
text context should be updated too. A highlighter showing the next character to be typed should be positioned at the first
  letter of the displayed text and should move as typing progress. Below the text should be an input box where the user 
  can type and should be enabled only when the start button below the box is clicked. The start button should switch to a stop 
  button when the typing is in progress and back to start when the typing is stopped. The statistics of the typing should 
  be displayed at the button of the main area comprising of the gross WPM, Net WPM, accuracy and errors which are set to zero 
  at the beginning of each typing session and updates after each character is typed. As the typing proceed, when an 
  incorrect characters is typed the color of the character on the text should turn red and a pop sound produced, while 
  correctly typed characters should turn white. Whenever space is entered, the input box should be cleared. When  The footer 
  should contain a copyright message and a contact me link.
  
  To create distinction in the page, i used a grey background color for the footer and animation in the header that 
  continuously changes background color from pink to yellow and font size from small to large. Web fonts were also used 
  for the header and the footer. One challenge was how to switch english and swedish text. To solve this problem, 
  I stored the text in a json file and as two arrays, one for swedish text and one for swedish text, which takes off the 
  task of looping the whole list to get text with same languauge. At load time, the data in the json file is read using
   XMLTttpRequest and the JSON objects from the different arrays are converted to javascript objects and stored in two 
   arrays for the swedish and english texts and these arrays serve as the source of the texts for the rest of the program.
  However I had problems loading the default droplist and text from these arrays at loadtime. To solve this problem, I included a copy 
  of the swedish list in the html file and had a copy of the default text object stored in javascript that is loaded at load time.
  To ensure a smooth flow, I made it possible for the user to proceed with typing using the default text by clicking the start button,
  or choose another text from the droplist. Also I implemented the language check boxes such that checking one box unchecks the other 
  and swedish is checked by default at loadtime such that one and only language is selected at all times to 
  ensure that there is always a list to choose from and a text displayed to keep the flow of the page. Changing language or 
  text in the middle of a typing retarts typing and resets statistics, but ignore casing can be checked and 
  unchecked at any point in the course of the typing since it is controlled for each character typed. 
  When the last character is typed, the typing is ended with a message "Game over" printed in the input box, the input box 
  disabled and the stop buttom switched to start button ready for the next game, But the statistics a kept displayed until the start
   button is clicked which always clears statistics, or if the text is changed. The statistics were computed using the formula 
   provided in the project description and timing starts when theh start button is clicked. To implement the highlighter that shows what character is next, each character 
   in the text was enclosed in a span element and a yellow background color was applied to the span element of the character to be 
   highlighted. I used two background images, one that covers the whole screen and one for the body of the webpage. This project
   has been published on the student web and cn be access through http://studenter.miun.se/~holi1900/project.
 

### Discussion
In this project, I have done all the implementations for the B grade and present a working program that measures the 
typing speed and accuracy of the user. I think the project description was very elaborate and provided useful tips 
that helped alot in the implementation of this project. In the course of this project I have learnt how to store 
data in a json file, how to read a json file through a server and how to convert json object to javasript objects. I 
also learnt how to use @font face to incorporate non generic font types and @keyframes animate to add animation. I 
also learnt how to add audio using javascript, how to create html element is javascript and how to link multiple 
functions in js to interconnect different parts of the program. I also appreciate the feedback in the forum 
during the course of the project. The project was an appropriate evaluation for this course.

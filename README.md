# Projektuppgift

## Environment & Tools / Utvecklingsmiljö & Verktyg
Window 10 Operating system, Webstorm 2019.3.4 IDE, Git version 2.25.0.windows.1
, https://validator.w3.org/.
All images for this project are copies from google pictures

### Purpose
The aim of this project is to create a web application that measures the typing speed and accuracy as a user types using the keyboard, 
using html for the structure of the application, CSS for styling and javascript for functionality.

### Procedures
For this project, the structure of the page is defined in the index.html, styles a implemented in style.css stored 
in directory css and functionality is implemented in the main.js stored in directory js. The texts for the games are 
stored in a json file texts.json, img, audio and font contain images, audio and fonts used for this project.
In my index.html, i design the page composed of three parts; the header, the main and the footer. The header compose 
of a logo picture and a label,and is styled with a continous animation that repeatedly change background color from 
pink to yellow and fontsize from small to large. Main compose of settings block styled to position top left of main and
  made of 3 checkboxes to ignore case, languages swedish and english. At the top right is a droplist with all text user
   can choose from. Next in main is a display of the selected text from the list and compose of 3 parts; the title 
   aligned center, the author followed by number of words and characters in brackets and aligned center, and the text 
   content aligned left. Below the text content is an inputbox where user will enter character containing the defaualt 
   text "Type here". Below the input box is a controll button to start and stop game. At the button of main is the 
   statistics block that display gross WPM, Net WPM, accuracy snd errors.The 
 footer has grey background color for distiction. A background image is added to the html element which covers the 
 whole screen when rendered and a second background image was used which cover just the webpage.
 in javascript functions are written to give the following functionalities. Upon loading the page, the texts are 
 read from the json file and stored in two arrays depending on the language. when loaded the default is that swedish 
 is checked, the swedish texts list is loaded and first text of the swedish texts array is selected in choose text 
 droplist and the text content displayed with the first leter highlighted, the typing input box is disabled, and 
 the start button is displayed and statistics are set to zero. The user can click start to proceed with the default 
 or choose to another text from the droplist Choose text. The user can also change the language by checking the box 
 of one language and implementation is such that a click on one checkbox checks that box and unchecks the other such 
 that one and only one language is checked at all times and the droplist is updated with the corresponding text with 
 the first on the list displayed by default. changing language or text in the middle of a game resets the game 
 including statistics but the user can choose to ignore case or not at any point in the course of the game by 
 checking or unchecking the box with a click without restarting the game. 
 When the start button is clicked, the typing input box is enabled and the user can start typing, the start time
  and the start button is switched to a stop button. When each letter entered the statistics are recalculated and 
  entered character is compared with the expected character in the displayed text. If the character is correct it's
  color changes to white but uf incorrect its color changes to red and a pop sound is produced. The highlight then 
  moves to the next letter to be typed. When the last letter is typed the game ends and the input box is disabled 
  displaying text game over and start button displayed. If the stop button is clicked in the middle of a game and 
  started again the restarts from the beginning. stop or end of game keeps statisitics displayed and the when start 
  button is clicked the statistics are cleared.
  I encountered problems with getting the text arrays at load time and loading default droplist and default text to 
  be displayed from the array. So I have a default list in html same as the swedish list and a Text object stored in the 
  main.js same as the first text of the swedish array, which are loaded at load time. 


### Discussion




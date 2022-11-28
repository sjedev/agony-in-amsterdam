var currentRoom = "wspace"
var textBox = document.getElementById('gameBox');
var output = new Typewriter(textBox, {loop: false, delay: getDelay()});

function getDelay(){
  return (Math.floor(Math.random() * (50 - 40 + 1) + 40));
}

function checkInput(e){
  if(e.key == 'Enter'){
    command = userInput.textContent; // use the typed command
    userInput.innerHTML = ""
    parser(command);
    e.preventDefault();
  }
}

function parser(cmd){
  let commandWords = cmd.trim().toUpperCase().split(" ");
  switch (commandWords.length) {
    case 1:
      switch (commandWords[0]) {
        case "TEST":
          output.typeString("Test lol").start()
      }
  }
}

output.typeString("<strong style='font-size:24pt'>AGONY IN AMSTERDAM</strong>")
  .pauseFor(200)
  .typeString("<br>version ID-0.1 by @sjedev")
  .pauseFor(2500)
  .deleteAll(1)
  .typeString("The detective thanks you as you hang up the phone and flick on the TV for the local news. “A death in the square”, the headlines read, but the reports lacked information. You have a job to do, so you quickly grab your jacket and cycle to the police station.").start();

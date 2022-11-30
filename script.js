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
          break
        case "LEFT":
          switch (currentRoom) {
            case "wspace":
              currentRoom = "doffice"
              output.typeString("You moved to Detective's office.").start()
              break
            case "doffice":
              output.typeString("You cannot go any farther left.").start()
              break
            case "introom":
              currentRoom = "wspace"
              output.typeString("You moved to your workspace.").start()
              break
          }
          break
        case "RIGHT":
          switch (currentRoom) {
            case "wspace":
              currentRoom = "introom"
              output.typeString("You moved to the interrogation room.").start()
              break
            case "doffice":
              currentRoom = "wspace"
              output.typeString("You moved to your workspace.").start()
              break
            case "introom":
              output.typeString("You cannot go any farther right.").start()
              break
          }
          break
      }
  }
}

function intro(){
  output.typeString("<strong style='font-size:24pt'>AGONY IN AMSTERDAM</strong>")
  .pauseFor(200)
  .typeString("<br>version ID-0.1 by @sjedev")
  .pauseFor(2500)
  .typeString("<br><br><br><br>The detective thanks you as you hang up the phone and flick on the TV for the local news. “A death in the square”, the headlines read. You have a job to do, so you quickly grab your jacket and cycle to the police station.")
  .pauseFor(1000)
  .typeString("<br><br>You arrive hastily - the detective greets you at the entrance. “We don’t have much evidence to work with”, he mutters resignedly, “hopefully, we can count on you”. You offer to try your best before heading to your desk to read the report.")
  .pauseFor(3000)
  .typeString("<br><br><br><br><span style='color:#21b500'>## Report 9327 ##</span><br><br>Klaus Ludwig collapsed in the square just after 8 o' clock this morning. The incident is being treated as suspicious. It is believed that Klaus was travelling through the Netherlands on government business and records show he was staying at a nearby hotel the night before.")
  .pauseFor(1000)
  .typeString("<br><br>On the scene, Klaus was found with no signs of life and was pronounced dead by doctors. No cause of death has been confirmed yet, though medics are pointing towards a potential poisoning or violent attack. Blood was noted around his head, though no bruises appeared by that point.")
  .pauseFor(1000)
  .typeString("<br><br>Amsterdam was never his destination, ")
  .pauseFor(600)
  .typeString("<span style='color:#b50000'>yet here he lied.</span>")
  .pauseFor(3000)
  .start();
}

// intro()
location()

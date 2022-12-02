let currentRoom = "workspace"
let visited = [0, 0, 0] // rooms visited
let textBox = document.getElementById('gameBox');
let output = new Typewriter(textBox, {loop: false, delay: getDelay()});

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

function doTest(){
  output.typeString("This is a test").start();
}

function roomDesc(){
  switch(currentRoom){
    case "workspace":
      if(visited[1] == 0){
        output.typeString("<br><br>This is your <span style='color:#21b500'>workspace</span>. You can <span style='color:#028ecf'>watch</span><span style='color:#7a7a7a'> the </span><span style='color:#028ecf'>CCTV</span> captures available to the police or <span style='color:#028ecf'>review</span><span style='color:#7a7a7a'> the </span><span style='color:#028ecf'>report</span> again. You can go <span style='color:#cf2b02'>left</span> or <span style='color:#cf2b02'>right</span> to the <span style='color:#21b500'>detective’s office</span> or the <span style='color:#21b500'>interrogation room</span>, respectively.").start();
        visited[1] = 1;
      }
      else {
        output.typeString("<br><br>Welcome back to your <span style='color:#21b500'>workspace</span>. You can <span style='color:#028ecf'>watch CCTV</span> or <span style='color:#028ecf'>review</span><span style='color:#7a7a7a'> the </span><span style='color:#028ecf'>report</span> again.").start();
      }
      break
    case "interrogation":
      if(visited[2] == 0){
        output.typeString("<br><br>This is the <span style='color:#21b500'>interrogation room</span>. You can <span style='color:#028ecf'>list</span><span style='color:#7a7a7a'> the </span><span style='color:#028ecf'>suspects</span>, <span style='color:#028ecf'>read</span><span style='color:#7a7a7a'> the </span><span style='color:#028ecf'>questions</span>, and choose a suspect to <span style='color:#028ecf'>interrogate</span>. You can go <span style='color:#cf2b02'>left</span> to return to your <span style='color:#21b500'>workspace</span> where you can consolidate your findings.").start();
        visited[2] = 1;
      }
      else {
        output.typeString("<br><br>You can <span style='color:#028ecf'>list</span><span style='color:#7a7a7a'> the </span><span style='color:#028ecf'>suspects</span>, <span style='color:#028ecf'>read</span><span style='color:#7a7a7a'> the </span><span style='color:#028ecf'>questions</span>, or choose a suspect to <span style='color:#028ecf'>interrogate</span>.").start();
      }
      break
    case "detective":
      if(visited[0] == 0){
        output.typeString("<br><br>This is the <span style='color:#21b500'>detective’s office</span>. Once you are certain of the perpetrator, you can <span style='color:#028ecf'>accuse</span> them so the detective can press charges. You can go <span style='color:#cf2b02'>right</span> to return to your <span style='color:#21b500'>workspace</span> where you can gather more information about the case.").start();
        visited[0] = 1;
      }
      else {
        output.typeString("<br><br>Once you are certain of the perpetrator, you can <span style='color:#028ecf'>accuse</span> them so the detective can press charges.").start();
      }
      break
  }
}

function doMove(moveDir){
  switch (moveDir){
    case "moveLeft":
      switch (currentRoom){
        case "workspace":
          currentRoom = "detective"
          output.typeString("<br><br><br><br>You have moved to the <span style='color:#21b500'>detective's office</span>.").start();
          roomDesc()
          break
        case "detective":
          currentRoom = "detective"
          output.typeString("<br><br><br><br>You cannot move any farther left.").start();
          roomDesc()
          break
        case "interrogation":
          currentRoom = "workspace"
          output.typeString("<br><br><br><br>You have moved to your <span style='color:#21b500'>workspace</span>.").start();
          roomDesc()
          break
      }
      break
    case "moveRight":
      switch (currentRoom){
        case "workspace":
          currentRoom = "interrogation"
          output.typeString("<br><br><br><br>You have moved to the <span style='color:#21b500'>interrogation room</span>.").start();
          roomDesc()
          break
        case "interrogation":
          currentRoom = "interrogation"
          output.typeString("<br><br><br><br>You cannot move any farther right.").start();
          roomDesc()
          break
        case "detective":
          currentRoom = "workspace"
          output.typeString("<br><br><br><br>You have moved to your <span style='color:#21b500'>workspace</span>.").start();
          roomDesc()
          break
      }
      break
  }
}

function parser(cmd){
  let commandWords = cmd.trim().toUpperCase().split(" ");
  switch (commandWords.length) {
    case 1:
      switch (commandWords[0]){
        case "TEST":
          doTest()
          break
        case "LEFT":
          doMove("moveLeft")
          break
        case "RIGHT":
          doMove("moveRight")
          break
      }
    break
    case 2:
      switch (commandWords[0]){
        case "GO":
          switch (commandWords[1]){
            case "LEFT":
              doMove("moveLeft")
              break
            case "RIGHT":
              doMove("moveRight")
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
  .typeString("<span style='color:#cf2b02'>yet here he lied.</span><br><br>")
  .pauseFor(3000)
  .start();
  roomDesc();
}

//intro()
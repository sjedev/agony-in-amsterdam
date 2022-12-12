let currentRoom = "workspace"
let currentTime = 1
let moves = 0
let cmds = 0
let visited = [0, 0, 0] // rooms visited
let textBox = document.getElementById('gameBox');
let output = new Typewriter(textBox, {loop: false, delay: getDelay()});

let interrogations = [
  ["","","","",""],
  ["","Melānija: I was on an evening shift at the hotel, covering the front desk and the restaurant. My shift was from 16:00 to 00:00.","Saskia: I was at home and on my phone, just scrolling, and scrolling… and scrolling.","Niels: I was travelling between my bakery and the hotel – they ordered a batch of bread and various pastries.","Blanche: I was out at the bar with some friends, celebrating my new job – we were out late into the evening, probably for too long."],
  ["","Melānija: I manage the hotel at the square, and I get involved with a bit of everything. I lead the staff team, but also check in guests and help with housekeeping on quiet days.","Saskia: I am a barista at the nearby café, so I prepare drinks and food for our customers. I don’t care about the job that much, it’s just my source of income. ","Niels: I run our local bakery, so, while I bake and make our products, I also must look after the finances and keep us afloat. It gets stressful sometimes.","Blanche: I am a systems engineer at a large multinational corporation based out of Amsterdam. I develop and refine the company’s processes and manage our current engineering projects."],
  ["","Melānija: I have been in my job for the last few months. Things got rough back at home, so I eventually moved here for a much-needed change of pace. ","Saskia: Probably eight or nine months I’ve been working here. I realised I couldn’t live off my loan and I was struggling just waiting for each payment. It was difficult, but at least this job gives me some extra cash.","Niels: This bakery has been my life for the last three decades. Admittedly, things were a lot more straightforward when I first set it up. That was back in my twenties.","Blanche: I have just moved here to start my new job – I finally get to make use of my degree. For the last three years I have been working for a government agency in Belgium."],
  ["","Melānija: When I do have time off work, I try to keep active. I think its important to have a good balance in your life. Running is my favourite.","Saskia: When I am not working, I have to study. When I am not studying, I have to work. It’s the only way I can make things work.","Niels: My children and I like to play games together on our console. Otherwise, I’m usually in the city – I know it like the back of my hand; I’ve lived here all my life.","Blanche: I program and bodge together small projects in my free time. I don’t make money off of it, but being a good programmer is a good skill to have."]
]

function getDelay(){
  return (Math.floor(Math.random() * (20 - 10 + 1) + 10));
}

function checkInput(e){
  if(e.keyCode === 13){
    command = userInput.textContent; // use the typed command
    userInput.innerHTML = ""
    parser(command);
    e.preventDefault();
  }
}

function doTest(){
  cmdUp()
  output.typeString("1.	Melānija Indraše").start();
}

function doBg(){
  console.log(currentRoom)
  switch(currentRoom){
    case "workspace":
      document.getElementById("bgRed").style.opacity="1";
      document.getElementById("bgBlue").style.opacity="0";
      document.getElementById("bgWhite").style.opacity="0";
      break
    case "detective":
      document.getElementById("bgRed").style.opacity="0";
      document.getElementById("bgBlue").style.opacity="1";
      document.getElementById("bgWhite").style.opacity="0";
      break
    case "interrogation":
      document.getElementById("bgRed").style.opacity="0";
      document.getElementById("bgBlue").style.opacity="0";
      document.getElementById("bgWhite").style.opacity="1";
      break
  }
}

function doMap(){
  switch(currentRoom){
    case "workspace":
      spaceMapImg.innerHTML = "<img class='boxImg' src='images/workspace.png'>"
      break
    case "detective":
      spaceMapImg.innerHTML = "<img class='boxImg' src='images/detective.png'>"
      break
    case "interrogation":
      spaceMapImg.innerHTML = "<img class='boxImg' src='images/interrogation.png'>"
      break
  }
  timeMapImg.innerHTML = "<img class='boxImg' src='images/time" + currentTime + ".png'>"
}

function interrogation(action, scope, num){
  if (currentRoom != "interrogation"){
    output.typeString("<span class='tGrey'><br><br><br><br>You must be in the interrogation room to use that command.</span>").start()
  }
  else {
    cmdUp()
    switch(action){
    case "LIST":
      switch(scope){
        case "SUSPECTS":
          output.typeString("<br><br><br><br>The police have gathered the following suspects:<br><br>1. <span class='tGreen'>Melānija Indraše</span>, a middle-aged woman from Latvia. She is the manager of the nearby hotel that Klaus stayed at last night.<br><br>2. <span class='tGreen'>Saskia de Koning</span>, a female university student from the Netherlands. She is a barista at the coffee shop at the square.<br><br>3. <span class='tGreen'>Niels Bos</span>, well-aged man and nearing retirement from the Netherlands. He is the founder of and works at the bakery at the square.<br><br>4. <span class='tGreen'>Blanche Jost</span>, female Belgian-French dual national from Belgium. She has a degree in engineering.").start()
        case "QUESTIONS":
          output.typeString("<br><br><br><br>You can ask questions to learn more about the suspects.<br><br>1. Where were you last night?<br>2. What do you do for work?<br>3. How long have you been in your job?<br>4. How do you spend your free time?<br><br><span class='tGrey'>You can ask a suspect a question with </span><span class='tBlue'>ask [question number] [name]</span>").start()
          break
      }
    case "ASK":
      let person = 0
      switch (scope.charAt(0)){
        case "M":
          person = 1
          break
        case "S":
          person = 2
          break
        case "N":
          person = 3
          break
        case "B":
          person = 4
          break
      }
      output.typeString("<br><br><br><br>" + interrogations[num][person]).start()
    }
  } 
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

function moveUp(){
  moves += 1
  stats.innerHTML = moves + " moves<br>" + cmds + " commands"
}

function cmdUp(){
  cmds += 1
  stats.innerHTML = moves + " moves<br>" + cmds + " commands"
}

function doMove(moveDir){
  cmdUp()
  switch (moveDir){
    case "moveLeft":
      switch (currentRoom){
        case "workspace":
          currentRoom = "detective"
          output.typeString("<br><br><br><br>You have moved to the <span style='color:#21b500'>detective's office</span>.").start();
          roomDesc()
          doMap()
          doBg()
          moveUp()
          break
        case "detective":
          currentRoom = "detective"
          output.typeString("<br><br><br><br>You cannot move any farther left.").start();
          break
        case "interrogation":
          currentRoom = "workspace"
          output.typeString("<br><br><br><br>You have moved to your <span style='color:#21b500'>workspace</span>.").start();
          roomDesc()
          doMap()
          doBg()
          moveUp()
          break
      }
      break
    case "moveRight":
      switch (currentRoom){
        case "workspace":
          currentRoom = "interrogation"
          output.typeString("<br><br><br><br>You have moved to the <span style='color:#21b500'>interrogation room</span>.").start();
          roomDesc()
          doMap()
          doBg()
          moveUp()
          break
        case "interrogation":
          currentRoom = "interrogation"
          output.typeString("<br><br><br><br>You cannot move any farther right.").start();
          break
        case "detective":
          currentRoom = "workspace"
          output.typeString("<br><br><br><br>You have moved to your <span style='color:#21b500'>workspace</span>.").start();
          roomDesc()
          doMap()
          doBg()
          moveUp()
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
        case "LIST":
          switch (commandWords[1]){
            case "SUSPECTS":
              interrogation("LIST", "SUSPECTS")
              break
            case "QUESTIONS":
              interrogation("LIST", "QUESTIONS")
              break
          }
          break
      }
      break
    case 3:
      switch (commandWords[0]){
        case "ASK":
          interrogation("ASK", commandWords[2], commandWords[1])
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
  doMap();
  roomDesc();
}

//intro()
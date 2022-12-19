let currentRoom = "workspace"
let currentTime = 0
let moves = 0
let cmds = 0
let person = 0
let inCCTV = 0
let started = 0
let timeVisited = [0, 0, 0, 0, 0, 0, 0, 0]
let detectiveExtra = 0
let audioEnabled = 0
let visited = [0, 0, 0] // rooms visited
let textBox = document.getElementById('gameBox');
let output = new Typewriter(textBox, {loop: false, delay: 25});

let interrogations = [
  ["","","","",""],
  ["","<span class='tGreen'>Melānija</span>: I was on an evening shift at the hotel, covering the front desk and the restaurant. My shift was from 16:00 to 00:00.","<span class='tGreen'>Saskia</span>: I was at home and on my phone, just scrolling, and scrolling… and scrolling.","<span class='tGreen'>Niels</span>: I was travelling between my bakery and the hotel – they ordered a batch of bread and various pastries.","<span class='tGreen'>Blanche</span>: I was out at the bar with some friends, celebrating my new job – we were out late into the evening, probably for too long."],
  ["","<span class='tGreen'>Melānija</span>: I manage the hotel at the square, and I get involved with a bit of everything. I lead the staff team, but also check in guests and help with housekeeping on quiet days.","<span class='tGreen'>Saskia</span>: I am a barista at the nearby café, so I prepare drinks and food for our customers. I don’t care about the job that much, it’s just my source of income. ","<span class='tGreen'>Niels</span>: I run our local bakery, so, while I bake and make our products, I also must look after the finances and keep us afloat. It gets stressful sometimes.","<span class='tGreen'>Blanche</span>: I am a systems engineer at a large multinational corporation based out of Amsterdam. I develop and refine the company’s processes and manage our current engineering projects."],
  ["","<span class='tGreen'>Melānija</span>: I have been in my job for the last few months. Things got rough back at home, so I eventually moved here for a much-needed change of pace. ","<span class='tGreen'>Saskia</span>: Probably eight or nine months I’ve been working here. I realised I couldn’t live off my loan and I was struggling just waiting for each payment. It was difficult, but at least this job gives me some extra cash.","<span class='tGreen'>Niels</span>: This bakery has been my life for the last three decades. Admittedly, things were a lot more straightforward when I first set it up. That was back in my twenties.","<span class='tGreen'>Blanche</span>: I have just moved here to start my new job – I finally get to make use of my degree. For the last three years I have been working for a government agency in Belgium."],
  ["","<span class='tGreen'>Melānija</span>: When I do have time off work, I try to keep active. I think it's important to have a good balance in your life. Running is my favourite.","<span class='tGreen'>Saskia</span>: When I am not working, I have to study. When I am not studying, I have to work. It’s the only way I can make things work.","<span class='tGreen'>Niels</span>: My children and I like to play games together on our console. Otherwise, I’m usually in the city – I know it like the back of my hand; I’ve lived here all my life.","<span class='tGreen'>Blanche</span>: I program and bodge together small projects in my free time. I don’t make money off of it, but being a good programmer is a good skill to have."]
]

let footage = ["",
              "<span class='tGreen'>## T-00:00 ##</span><br>(08:30)<br><br>It is a frosty winter’s morning in the square. Besides Klaus’ lifeless body on the cold tiles, the surrounding area is lively with police. The flickering lights of the emergency vehicles repeatedly illuminates the surroundings. You can see Klaus in the centre of the footage, a bit of blood by his head, and the detective diligently taking notes. The evidence is limited and the death is unexpected.<br><br>You observe the closed shops and businesses that surround the square but notice Melānija and Niels amongst the onlookers. There is also another figure you are unaware of, looking intently at the events unfolding on the square. Before long, reporters appear at the scene to document the death.",
              "<span class='tGreen'>## T-01:00 ##</span><br>(07:30)<br><br>It is early morning – you observe the beautiful golden hues that blanket the square and know the sun is rising. There is hardly anyone here, besides the infrequent cyclist or two passing through for an early start at work. You increase the volume, but the audio is crackly. Still, you can make out the faint song of the square’s resident birds.<br><br>Then, a figure appears from the street to the right – it is a figure you recognise from the previous recording. Niels appears to be walking towards his bakery, but he is also on the phone. “Never again”, you hear him mutter. He looks tired. With the distorted audio, the higher-pitched response from the other end is too muffled for you to understand.",
              "<span class='tGreen'>## T-08:00 ##</span><br>(00:30)<br><br>It is late – midnight passed a while ago. Yet there are still sparks of activity in the square, emanating from the bar at the far end. All but a few lights are out in the apartments above the shops and businesses that closed in the evening. The weak streetlamps fight the darkness to keep the pavement visible with their warm white radiance.<br><br>As the noise from the bar dwindles, a few people stream out. Blanche and Saskia are among the group. They are accompanied by a third person you are unfamiliar with, and you wonder if it’s the same unknown figure you saw in the first recording. They head down that same street to the right together, but as you flick through your notes you find this is hardly the quickest way home for Saskia.",
              "<span class='tGreen'>## T-14:00 ##</span><br>(18:30, Yesterday)<br><br>Somewhat to your surprise, you see Klaus – he departs the tram from the far-left of the square and wanders toward the café. Having seen her leaving the bar later that night, you wonder if Saskia is working or not; she might have been the barista that prepared his drink. Klaus promptly returns into view, this time with a cardboard coffee cup in hand, and sets out for the nearby hotel. You suppose the street to the right leads there, as you see him disappear from the recording in that direction.<br><br>This would be the last time Klaus is seen alive, at least on the CCTV footage, you note. Wishfully, you gesture at the screen trying to warn him, but a sense of loss is imminent upon the realisation it is already too late.",
              "<span class='tGreen'>## T-14:30 ##</span><br>(18:00, Yesterday)<br><br>You take note of the bakery in the square, quite an old building you suspect hasn’t changed much over the years. The old hanging signpost painted aqua blue reads “Brood van Bos” in bold, white font – you reckon it’s a family business. It is past the closing time, yet you see Niels just outside accompanied by a cart of nondescript packaged goods.<br><br>As Niels sets off through the square, he crosses paths between the trees with that same unknown figure. They're carrying a bag and had left the convenience store just before. They seem to be in a rush, and move out of view within a minute. You think to yourself – you ought to <span class='tBlue'>inform</span> the detective of this person.",
              "<span class='tGreen'>## T-19:30 ##</span><br>(13:00, Yesterday)<br><br>Seeing the passers-by wrapped up warmly, there is surely a distinct winter's chill in the air. Despite the cold, you notice Melānija and Blanche occupying the bench in the centre of the square. It looks like they're eating lunch together - you note down their friendliness, but don't know what to make of it.<br><br>Blanche is new to the area, but you suppose they could have known each other already. You remember how long it took you to meet people when you first moved in, though you realise it might've just been you.",
              "<span class='tGreen'>## T-23:30 ##</span><br>(09:00, Yesterday)<br><br>The same figure you keep seeing appears once more. Walking rather hastily but without any sort of direction, he is on the phone.<br><br>“Don’t worry, nobody will find out” … “It will be hours before anything happens” he anxiously attempts to assure the other end of the phone line. He looks up to the sky – for once there aren’t any clouds in view, just the square and the great blue sky – before glancing at the CCTV camera and noticing its presence.<br><br>“Uh, look, I’ll call you back later”. He scurries out of view. "]

function checkInput(e){
  if(e.keyCode === 13){
    command = userInput.textContent; // use the typed command
    userInput.innerHTML = ""
    parser(command);
    e.preventDefault();
  } else if(e.keyCode === 37){
    userInput.innerHTML = ""
    e.preventDefault();
    doMove("moveLeft")
  } else if(e.keyCode === 39){
    userInput.innerHTML = ""
    e.preventDefault();
    doMove("moveRight")
  }
  if (audioEnabled == 1){
    document.getElementById("startPb").style.display="none";
  }
}

function doBg(){
  console.log(currentRoom)
  if (inCCTV == 1){
    switch (currentTime) {
      case 1:
        document.getElementById("bgRed").style.opacity="1";
        document.getElementById("bgBlue").style.opacity="0";
        document.getElementById("bgWhite").style.opacity="0";
        document.getElementById("bgOrange").style.opacity="0";
        document.getElementById("bgPurple").style.opacity="0";
        document.getElementById("bgSky").style.opacity="0";
        document.getElementById("colourBar").style.backgroundColor="#cf2b02";
        document.getElementById("stats").style.color="#fff";
        break
      case 2:
        document.getElementById("bgRed").style.opacity="0";
        document.getElementById("bgBlue").style.opacity="0";
        document.getElementById("bgWhite").style.opacity="0";
        document.getElementById("bgOrange").style.opacity="1";
        document.getElementById("bgPurple").style.opacity="0";
        document.getElementById("bgSky").style.opacity="0";
        document.getElementById("colourBar").style.backgroundColor="#CF9902";
        document.getElementById("stats").style.color="#fff";
        break
      case 3:
        document.getElementById("bgRed").style.opacity="0";
        document.getElementById("bgBlue").style.opacity="0";
        document.getElementById("bgWhite").style.opacity="0";
        document.getElementById("bgOrange").style.opacity="0";
        document.getElementById("bgPurple").style.opacity="1";
        document.getElementById("bgSky").style.opacity="0";
        document.getElementById("colourBar").style.backgroundColor="#28005c";
        document.getElementById("stats").style.color="#fff";
        break
      case 4:
        document.getElementById("bgRed").style.opacity="0";
        document.getElementById("bgBlue").style.opacity="0";
        document.getElementById("bgWhite").style.opacity="0";
        document.getElementById("bgOrange").style.opacity="1";
        document.getElementById("bgPurple").style.opacity="0";
        document.getElementById("bgSky").style.opacity="0";
        document.getElementById("colourBar").style.backgroundColor="#CF9902";
        document.getElementById("stats").style.color="#fff";
        break
      case 5:
        document.getElementById("bgRed").style.opacity="0";
        document.getElementById("bgBlue").style.opacity="0";
        document.getElementById("bgWhite").style.opacity="0";
        document.getElementById("bgOrange").style.opacity="1";
        document.getElementById("bgPurple").style.opacity="0";
        document.getElementById("bgSky").style.opacity="0";
        document.getElementById("colourBar").style.backgroundColor="#CF9902";
        document.getElementById("stats").style.color="#fff";
        break
      case 6:
        document.getElementById("bgRed").style.opacity="0";
        document.getElementById("bgBlue").style.opacity="0";
        document.getElementById("bgWhite").style.opacity="0";
        document.getElementById("bgOrange").style.opacity="0";
        document.getElementById("bgPurple").style.opacity="0";
        document.getElementById("bgSky").style.opacity="1";
        document.getElementById("colourBar").style.backgroundColor="#00d6e0";
        document.getElementById("stats").style.color="#fff";
        break
      case 7:
        document.getElementById("bgRed").style.opacity="0";
        document.getElementById("bgBlue").style.opacity="0";
        document.getElementById("bgWhite").style.opacity="0";
        document.getElementById("bgOrange").style.opacity="0";
        document.getElementById("bgPurple").style.opacity="0";
        document.getElementById("bgSky").style.opacity="1";
        document.getElementById("colourBar").style.backgroundColor="#00d6e0";
        document.getElementById("stats").style.color="#fff";
        break
    }
  } else {
    switch(currentRoom){
      case "workspace":
        document.getElementById("bgRed").style.opacity="1";
        document.getElementById("bgBlue").style.opacity="0";
        document.getElementById("bgWhite").style.opacity="0";
        document.getElementById("bgOrange").style.opacity="0";
        document.getElementById("bgPurple").style.opacity="0";
        document.getElementById("bgSky").style.opacity="0";
        document.getElementById("colourBar").style.backgroundColor="#cf2b02";
        document.getElementById("stats").style.color="#fff";
        document.getElementById("startPb").style.color="#fff";
        break
      case "detective":
        document.getElementById("bgRed").style.opacity="0";
        document.getElementById("bgBlue").style.opacity="1";
        document.getElementById("bgWhite").style.opacity="0";
        document.getElementById("bgOrange").style.opacity="0";
        document.getElementById("bgPurple").style.opacity="0";
        document.getElementById("bgSky").style.opacity="0";
        document.getElementById("colourBar").style.backgroundColor="#024acf";
        document.getElementById("stats").style.color="#fff";
        document.getElementById("startPb").style.color="#fff";
        break
      case "interrogation":
        document.getElementById("bgRed").style.opacity="0";
        document.getElementById("bgBlue").style.opacity="0";
        document.getElementById("bgWhite").style.opacity="1";
        document.getElementById("bgOrange").style.opacity="0";
        document.getElementById("bgPurple").style.opacity="0";
        document.getElementById("bgSky").style.opacity="0";
        document.getElementById("colourBar").style.backgroundColor="#ffffff";
        document.getElementById("stats").style.color="#000";
        document.getElementById("startPb").style.color="#000";
        break
    }
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

function doHelp(){
  cmdUp()
  output.typeString("<br><br><br><br><span class='tGreen'>## HELP MENU ##</span><br><span class='tGrey'>[optional] *required*</span><br><br><span class='tGreen'>MOVEMENT</span><br>- go left<br>- go right<br>- left<br>- right<br><br><span class='tGreen'>WORKSPACE</span><br>- watch cctv<br>- review report<br><br><span class='tGreen'>CCTV</span><br>- fastforward [number]<br>- ffw [number]<br>- reverse [number]<br>- rev [number]<br><br><span class='tGreen'>INTERROGATION</span><br>- list questions<br>- list suspects<br>- ask *question number* *first name*<br><br><span class='tGreen'>DETECTIVE</span><br>- accuse *first name*<br><br><span class='tGrey'>You do not need to spell names exactly; if you write at least the first letter of the name, the game will recognise the character.</span>").start()
}

function report(){
  if (currentRoom != "workspace"){
    output.typeString("<span class='tGrey'><br><br><br><br>You must be at your workspace to use that command.</span>").start()
  } else {
    cmdUp()
    output.typeString("<br><br><br><br><span style='color:#21b500'>## Report 9327 ##</span><br><br>Klaus Ludwig collapsed in the square just after 8 o' clock this morning. The incident is being treated as suspicious. It is believed that Klaus was travelling through the Netherlands on government business and records show he was staying at a nearby hotel the night before.")
    .pauseFor(1000)
    .typeString("<br><br>On the scene, Klaus was found with no signs of life and was pronounced dead by doctors. No cause of death has been confirmed yet, though medics are pointing towards a potential poisoning or violent attack. Blood was noted around his head, though no bruises appeared by that point.")
    .pauseFor(1000)
    .typeString("<br><br>Amsterdam was never his destination, ")
    .pauseFor(600)
    .typeString("<span style='color:#cf2b02'>yet here he lied.</span>")
    .pauseFor(3000)
    .start();
  }
}

function doFootage(){
  cmdUp()
  doBg()
  output.typeString("<br><br><br><br>" + footage[currentTime]).start()
  if (currentTime == 5){
    detectiveExtra = 1
  }
}

function revFfw(action, quantity){
  if (inCCTV != 1){
    output.typeString("<span class='tGrey'><br><br><br><br>You must be logged into the network to use that command.</span>").start()
  } else {
    if (action == "REV"){
      console.log("REV")
      if ((currentTime + Math.abs(quantity)) > 7){
        output.typeString("<span class='tGrey'><br><br><br><br>Please navigate within the available recordings.</span>").start()
      }
      else {
        if (timeVisited[currentTime + Math.abs(quantity)] == 0){
          if (timeVisited[currentTime + Math.abs(quantity) - 1] == 1){
            currentTime += Math.abs(quantity)
            timeVisited[currentTime] = 1
            doMap()
            doFootage()
          } else {
            output.typeString("<span class='tGrey'><br><br><br><br>Please navigate within the available recordings.</span>").start()
          }
        } else {
          currentTime += Math.abs(quantity)
          timeVisited[currentTime] = 1
          doMap()
          doFootage()
        }
      }
    } else if (action == "FFW") {
      console.log("FFW")
      if ((currentTime - Math.abs(quantity)) < 1){
        output.typeString("<span class='tGrey'><br><br><br><br>Please navigate within the available recordings.</span>").start()
      } else {
        currentTime -= Math.abs(quantity)
        doMap()
        doFootage()
      }
    }
  }
  console.log(currentTime)
}

function CCTV(action){
  if (currentRoom != "workspace"){
    output.typeString("<span class='tGrey'><br><br><br><br>You must be at your workspace to use that command.</span>").start()
  } else {
    switch (action){
      case "LIST":
        cmdUp()
        inCCTV = 1
        if (timeVisited[0] == 1){
          output.typeString("<br><br><br><br>You log on to the network with your credentials and bring up the CCTV archives.").start()
        } else {
          output.typeString("<br><br><br><br>You log on to the network with your credentials and double click on the CCTV archives. The police only have access to seven intermittent recordings over the last few days. Hopefully, it will be enough to determine the perpetrator.<br><br>You can use <span class='tBlue'>reverse</span> / <span class='tBlue'>rev</span> or <span class='tBlue'>fastforward</span> / <span class='tBlue'>ffw</span> to move between the recordings. Include a number to choose how many recordings to skip through (e.g., <span class='tBlue'>ffw 2</span>). You can only skip between recordings you have already viewed.<br><br>Remember, you start with the most recent recording. So, you can use <span class='tBlue'>reverse</span> to begin.").start()
          timeVisited[0] = 1
        }
        break
    }
    doMap()
  }
}

function config(setting, parameter){
  if (setting == "DELAY"){
    output.changeDelay(Number(parameter))
    alert("[OK] Time set to " + parameter)
  }
  else if (setting == "TIME"){
    currentTime = Number(parameter)
    alert("[OK] Time set to " + parameter)
  }
  else if (setting = "ECHO"){
    output.typeString(parameter).start()
  }
}

function detective(action, scope = ""){
  if (currentRoom != "detective"){
    output.typeString("<span class='tGrey'><br><br><br><br>You must be in the detective's office to use that command.</span>").start()
  }
  else {
    cmdUp()
    switch(action){
      case "ACCUSE":
        if (cmds <= 5){
          output.typeString('<br><br><br><br>"I appreciate you are eager to help, but your decisions must be calculated. You ought to spend more time reviewing the evidence, however limited it may be." says the detective. You can return later when you have more information.').start()
        } else {
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
            case "X":
              person = 5
              break
            }
          if (person != 5){
            document.getElementById("userInput").style.display="none";
            output.typeString('<br><br><br><br>"...so it has to have been them" you proclaim confidently to the detective. He expresses his relief and shakes your hand before you gather your notes and leave the police station. But as you are cycling home, a wave of doubt crosses your mind - was it really them?').pauseFor(1500).changeDelay(70).typeString("<br><br><span class='tRed'>No, the perpetrator was not who you accused.</span>").start()
          } else {
            document.getElementById("userInput").style.display="none";
            output.typeString('<br><br><br><br>"...so it has to have been them" you proclaim confidently to the detective. He expresses his relief and shakes your hand before you gather your notes and leave the police station. But as you are cycling home, a wave of doubt crosses your mind - was it really them?').pauseFor(1500).changeDelay(70).typeString("<br><br><span class='tGreen'>Yes, you successfully identified the perpetrator.</span>").start()
          }
        }
        break
      case "INFORM":
        if (detectiveExtra = 1){
          output.typeString('<br><br><br><br>"Hmm, that is a good point. We will have to refer to this individual as <span class="tGreen">X</span> and will dedicate more resources to identifying them if we need to." the detective concludes. He is pleased with your findings, but urges you to keep working through the evidence available to you as not to waste police resources.').start()
          detectiveExtra = 0
        }
        break
    }
  }
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
          output.typeString("<br><br><br><br>The police have gathered the following suspects:<br><br>1. <span class='tGreen'>Melānija Indraše</span>, a middle-aged woman from Latvia. She is the manager of the nearby hotel that Klaus stayed at last night.<br><br>2. <span class='tGreen'>Saskia de Koning</span>, a female university student from the Netherlands. She is a barista at the coffee shop in the square.<br><br>3. <span class='tGreen'>Niels Bos</span>, well-aged man and nearing retirement from the Netherlands. He is the founder of and works at the bakery at the square.<br><br>4. <span class='tGreen'>Blanche Jost</span>, female Belgian-French dual national from Belgium. She has a degree in engineering.").start()
          break
        case "QUESTIONS":
          output.typeString("<br><br><br><br>You can ask questions to learn more about the suspects.<br><br>1. Where were you last night?<br>2. What do you do for work?<br>3. How long have you been in your job?<br>4. How do you spend your free time?<br><br><span class='tGrey'>You can ask a suspect a question with </span><span class='tBlue'>ask [question number] [first name]</span>").start()
          break
      }
    case "ASK":
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
        break
    case "HELP":
        output.typeString("<br><br><br><br> Interrogating the suspects might be a good way to find out more information. You can ask a suspect a question with <span class='tBlue'>ask [question number] [first name]</span>.").start()
      break
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
        output.typeString("<br><br>This is the <span style='color:#21b500'>interrogation room</span>. You can <span style='color:#028ecf'>list</span><span style='color:#7a7a7a'> the </span><span style='color:#028ecf'>suspects</span>, <span style='color:#028ecf'>list</span><span style='color:#7a7a7a'> the </span><span style='color:#028ecf'>questions</span>, and choose a suspect to <span style='color:#028ecf'>interrogate</span>. You can go <span style='color:#cf2b02'>left</span> to return to your <span style='color:#21b500'>workspace</span> where you can consolidate your findings.").start();
        visited[2] = 1;
      }
      else {
        output.typeString("<br><br>You can <span style='color:#028ecf'>list</span><span style='color:#7a7a7a'> the </span><span style='color:#028ecf'>suspects</span>, <span style='color:#028ecf'>list</span><span style='color:#7a7a7a'> the </span><span style='color:#028ecf'>questions</span>, or choose a suspect to <span style='color:#028ecf'>interrogate</span>.").start();
      }
      break
    case "detective":
      if(visited[0] == 0){
        output.typeString("<br><br>This is the <span style='color:#21b500'>detective’s office</span>. Once you are certain of the perpetrator, you can <span style='color:#028ecf'>accuse</span> them so the detective can press charges. You can go <span style='color:#cf2b02'>right</span> to return to your <span style='color:#21b500'>workspace</span> where you can gather more information about the case.").start();
        visited[0] = 1;
        if (detectiveExtra == 1){
          output.typeString("<br><br>You can also <span class='tBlue'>inform</span> the detective of this unnamed individual you took note of.")
        }
      }
      else {
        output.typeString("<br><br>Once you are certain of the perpetrator, you can <span style='color:#028ecf'>accuse</span> them so the detective can press charges.").start();
        if (detectiveExtra == 1){
          output.typeString("<br><br>You can also <span class='tBlue'>inform</span> the detective of this unnamed individual you took note of.")
        }
      }
      break
  }
}

function moveUp(){
  moves += 1
  stats.innerHTML = moves + " moves • " + cmds + " commands"
}

function cmdUp(){
  cmds += 1
  stats.innerHTML = moves + " moves • " + cmds + " commands"
}

function doMove(moveDir){
  cmdUp()
  inCCTV = 0
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
        case "HELP":
          doHelp()
          break
        case "INTERROGATE":
          interrogation("HELP")
          break
        case "REV":
          revFfw("REV", "1")
          break
        case "FFW":
          revFfw("FFW", "1")
          break
        case "REVERSE":
          revFfw("REV", "1")
          break
        case "FASTFORWARD":
          revFfw("FFW", "1")
          break
        case "SKIP":
          if (started != 1){
            doMap();
            roomDesc();
            started = 1;
            cmdUp()
          }
          break
        case "START":
          if (started != 1){
            intro();
            started = 1;
            cmdUp()
          }
          break
        case "INFORM":
          detective("INFORM")
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
        case "ACCUSE":
          detective("ACCUSE", String(commandWords[1]))
          break
        case "WATCH":
          CCTV("LIST")
          break
        case "REVIEW":
          report()
          break
        case "REV":
          revFfw("REV", String(commandWords[1]))
          break
        case "FFW":
          revFfw("FFW", String(commandWords[1]))
          break
        case "REVERSE":
          revFfw("REV", String(commandWords[1]))
          break
        case "FASTFORWARD":
          revFfw("FFW", String(commandWords[1]))
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
        case "CONFIG":
          config(commandWords[1], commandWords[2])
          break
      }
  }
  
}

function intro(){
  output.typeString("<br><br><br><br>The detective thanks you as you hang up the phone and flick on the TV for the local news. “A death in the square”, the headlines read. You have a job to do, so you quickly grab your jacket and cycle to the police station.")
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

output.typeString("<strong style='font-size:24pt'>AGONY IN AMSTERDAM</strong>")
  .pauseFor(200)
  .typeString("<br>version 1.1 by @sjedev")
  .pauseFor(1000)
  .typeString("<br><br>Use <span class='tBlue'>start</span> to begin. You can skip the intro with <span class='tBlue'>skip</span>.").start()

document.getElementById('startPb').addEventListener('click', () => {
  document.getElementById("bgm").play();
  document.getElementById("startPb").style.opacity="0";
  audioEnabled = 1;
});
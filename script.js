var cli = document.getElementById('gameBox');
var output = new Typewriter(cli, {loop: false, delay: getDelay()});

function getDelay(){
  return (Math.floor(Math.random() * (50 - 40 + 1) + 40));
}

output.typeString("<strong style='font-size:24pt'>AGONY IN AMSTERDAM</strong>")
  .pauseFor(200)
  .typeString("<br>version ID-0.1 by @sjedev")
  .pauseFor(2500)
  .deleteAll()
  .typeString("The detective thanks you as you hang up the phone and flick on the TV for the local news. “A death in the square”, the headlines read, but the reports lacked information. You have a job to do, so you quickly grab your jacket and cycle to the police station.").start();
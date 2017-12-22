var game, timer;

var imgMonster = document.querySelectorAll('img')[0];
var imgSmile = document.querySelectorAll('img')[1];
var overlay = document.getElementById('overlay');

var gameStart = document.getElementById('game-start');
var gameEnd = document.getElementById('game-end');
var refresh = document.getElementById('refresh');

var score = 0;
var scoreText = document.getElementById('score');
scoreText.innerHTML = 'Score: 0';
var finalScore = document.getElementById('final-score');

var time = 0;
var timeText = document.getElementById('time');
timeText.innerHTML = 'Time: 0s';

var speed = document.querySelectorAll('select')[0];
var speedContainer = document.getElementsByClassName('speed')[0];

var audioControl = document.getElementById('audio-control');

var wow1 = document.getElementById('wow1');
var wow2 = document.getElementById('wow2');
var wow3 = document.getElementById('wow3');

imgMonster.style.position = 'absolute';
imgMonster.style.top = '160px';
imgMonster.style.left = '340px';

function getTop() {
  var top = Math.floor(Math.random() * 320);
  return top;
}

function getLeft() {
  var left = Math.floor(Math.random() * 670);
  return left;
}

gameStart.onclick = function() {
  gameEnd.style.display = 'block';
  gameStart.style.display = 'none';
  
  speedContainer.style.display = 'none';
  
  imgMonster.onclick = function() {
    score++;
    scoreText.innerHTML = 'Score: ' + score;
    setTimeout(function() {
      imgMonster.src = 'monster.png';
    }, 300);
    imgMonster.src = 'monster_clicked.png';
    
    var order = Math.round(Math.random() * 2) + 1;
    if (order == 1) {
      wow1.play();
    } else if (order == 2) {
      wow2.play();
    } else {
      wow3.play();
    }
  }

  overlay.onclick = function() {
    if (score > 0) {
      score--;
      scoreText.innerHTML = 'Score: ' + score;
    } else {
      score = 0;
      scoreText.innerHTML = 'Score: ' + score;
    }
  }
  
  game = setInterval(function() {
    imgMonster.style.top = getTop() + 'px';
    imgMonster.style.left = getLeft() + 'px';
    
    if (time == 15) {
      clearInterval(game);
      clearInterval(timer);
      
      imgMonster.onclick = function() {
        return;
      }
      
      overlay.onclick = function() {
        return;
      }
      
      imgMonster.style.display = 'none';
      refresh.style.display = 'block';
      finalScore.innerHTML = 'Your score is: ' + score;
      finalScore.style.display = 'block';
      imgSmile.style.display = 'block';
      
      gameEnd.style.display = 'none';
      gameStart.style.display = 'none';
    }
  }, speed.value);
  
  timer = setInterval(function() {
    time++;
    timeText.innerHTML = 'Time: ' + time + 's';
  }, 1000);
};

gameEnd.onclick = function() {
  clearInterval(game);
  clearInterval(timer);
  
  imgMonster.style.top = '160px';
  imgMonster.style.left = '340px';
  
  score = 0;
  scoreText.innerHTML = 'Score: 0';
  
  time = 0;
  timeText.innerHTML = 'Time: 0s';
  
  gameEnd.style.display = 'none';
  gameStart.style.display = 'block';
  
  speedContainer.style.display = 'block';
  
  imgMonster.onclick = function() {
    wow1.pause();
    wow2.pause();
    wow3.pause();
  }
};

refresh.onclick = function() {
  imgMonster.style.display = 'block';
  imgMonster.style.top = '160px';
  imgMonster.style.left = '340px';
  
  score = 0;
  scoreText.innerHTML = 'Score: 0';
  
  time = 0;
  timeText.innerHTML = 'Time: 0s';
  
  gameEnd.style.display = 'none';
  gameStart.style.display = 'block';
  
  speedContainer.style.display = 'block';
  
  imgSmile.style.display = 'none';
  
  finalScore.innerHTML = '';
  finalScore.style.display = 'none';
  
  refresh.style.display = 'none';
};

audioControl.onclick = function() {
  var sound = document.getElementsByTagName('audio')[0];
  if (sound.paused) {
    sound.play();
    audioControl.style.background = 'url(playpause.png) 0 0';
    audioControl.style.backgroundSize = '200%';
  } else {
    sound.pause();
    audioControl.style.background = 'url(playpause.png) 30px 0';
    audioControl.style.backgroundSize = '200%';
  }
};

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7

const background = new Sprite({
    position: {
      x: 0,
      y: 0
    },
    imageSrc: 'assets/img/background.png'
  })

const loja = new Sprite({
    position: {
      x: 600,
      y: 128,
    },
    imageSrc: 'assets/img/shop.png',
    scale: 2.75,
    framesMax: 6,
  })

 // Caixa do Player Um
const player = new Lutador ({
    position: {
        x:100,
        y:0
    }, 
    velocity: {
        x:0,
        y:0      
    },
    offset: {
        x: 0,
        y: 0
    },

      //Sprites do Jogador 1

  imageSrc: 'assets/img/samuraiMack/Idle.png',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 157
  },
  sprites: {
    idle: {
        imageSrc: 'assets/img/samuraiMack/Idle.png',
        framesMax: 8
    },
    idle2: {
        imageSrc: 'assets/img/samuraiMack/Idle2.png',
        framesMax: 8
    },
    run: {
        imageSrc: 'assets/img/samuraiMack/Run.png',
        framesMax: 8,
    },
    run2: {
        imageSrc: 'assets/img/samuraiMack/Run2.png',
        framesMax: 8,
    },
    jump: {
        imageSrc: 'assets/img/samuraiMack/Jump.png',
        framesMax: 2,
    },
    jump2: {
        imageSrc: 'assets/img/samuraiMack/Jump2.png',
        framesMax: 2,
    },
    fall: {
        imageSrc: 'assets/img/samuraiMack/Fall.png',
        framesMax: 2,
    },
    fall2: {
        imageSrc: 'assets/img/samuraiMack/Fall2.png',
        framesMax: 2,
    },
    attack1: {
        imageSrc: 'assets/img/samuraiMack/Attack1.png',
        framesMax: 6,
    },
    takeHit: {
        imageSrc: 'assets/img/samuraiMack/Take Hit - white silhouette.png',
        framesMax: 4,
    },
    death: {
        imageSrc: 'assets/img/samuraiMack/Death.png',
        framesMax: 6,
    },
},
  // Define a distancia do ataque

  attackBox: {
    offset: {
        x:100,
        y:50
    },
    width: 160,
    height: 50
    }
})
  // Caixa do Player Dois
    const enemy = new Lutador ({
        position: {
            x:850,
            y:100
        }, 
        velocity: {
            x:0,
            y:0
            
        },
        color: 'blue',
        
        offset: {
            x: -50,
            y: 0
        },

  //Sprites do Jogador 2

  imageSrc: 'assets/img/kenji/Idle.png',
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 167
  },
  sprites: {
    idle: {
        imageSrc: 'assets/img/kenji/Idle.png',
        framesMax: 4,
    },
    run: {
        imageSrc: 'assets/img/kenji/Run.png',
        framesMax: 8,
    },
    run2: {
        imageSrc: 'assets/img/kenji/Run2.png',
        framesMax: 8,
    },
    jump: {
        imageSrc: 'assets/img/kenji/Jump.png',
        framesMax: 2,
    },
    jump2: {
        imageSrc: 'assets/img/kenji/Jump2.png',
        framesMax: 2,
    },
    fall: {
        imageSrc: 'assets/img/kenji/Fall.png',
        framesMax: 2,
    },
    fall2: {
        imageSrc: 'assets/img/kenji/Fall2.png',
        framesMax: 2,
    },
    attack1: {
        imageSrc: 'assets/img/kenji/Attack1.png',
        framesMax: 4,
    },
    takeHit: {
        imageSrc: 'assets/img/kenji/Take hit.png',
        framesMax: 3,
    },
    death: {
        imageSrc: 'assets/img/kenji/Death.png',
        framesMax: 7,
    },
},
  attackBox: {
    offset: {
        x: -170,
        y:50
    },
    width: 170,
    height: 50
  }
})

    // Declara se as Teclas forem pressionadas
        const keys = {
            a: {
                pressed: false
            },
            A: {
                pressed: false
            },
            d: {
                pressed: false
            },
            D: {
                pressed: false
            },
            ArrowRight: {
                pressed: false
            },
            ArrowLeft: {
                pressed: false
            },
        }

relogio();
        // Cria a animação do canvas

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    loja.update()
    c.fillStyle = 'rgba(255, 255, 255, 0.15)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()
        
    // Define a velocidade dos Jogadores

    player.velocity.x = 0
    enemy.velocity.x = 0
    
    // Movimentação do Primeiro Jogador

    if (keys.a.pressed && player.lastKey === 'a' ) { 
        player.velocity.x = -5
        player.switchSprite('run2')
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
        player.switchSprite('run')
    } else {
        player.switchSprite('idle')
    }

    // Função Pular Jogador 1

    if(player.velocity.y < 0) {
        player.switchSprite('jump')
    if(player.lastKey === 'a') {
        player.switchSprite('jump2') 
    }
} 
    else if (player.velocity.y > 0){
        player.switchSprite('fall')  
        if (player.lastKey === 'a'){
        player.switchSprite('fall2') 
    }
}

    // Movimentação do Segundo Jogador
    
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft' ) { 
        enemy.velocity.x = -5
        enemy.switchSprite('run')
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
        enemy.switchSprite('run2')
    } else {
        enemy.switchSprite('idle') 
    }
        // Função Pular Jogador 2

    if(enemy.velocity.y < 0) {
        enemy.switchSprite('jump')
    if(enemy.lastKey === 'ArrowRight') {
        enemy.switchSprite('jump2') 
    }
} 
    else if (enemy.velocity.y > 0){   
        enemy.switchSprite('fall')
        if(enemy.lastKey === 'ArrowRight'){
        enemy.switchSprite('fall2')
    }
}
    

    // Verifica se o Jogador foi atingido, se for, então, define uma animação

    if (
      colisaoRetangular({
        retangulo1: player,
        retangulo2: enemy
      }) &&
      player.isAtacking && 
      player.framesCurrent === 4
    ){
        enemy.takeHit()
        player.isAtacking = false
        if(!enemy.dead){
           songAtack2.play();
        }
        gsap.to('#saude2', {
            width: enemy.saude + '%'
          })
    }

    // Define oque sera feito se um Jogador não atingir o outro

    if (player.isAtacking && player.framesCurrent === 4 ) {
        player.isAtacking = false
        songAtackMiss2.play();
    }
    

    // Define a quantidade de DANO que o Jogador vai sofrer ao ser atingido por um Ataque 
    // Define quem é o retangulo1 e o retangulo2
    
    if (
        colisaoRetangular({
          retangulo1: enemy,
          retangulo2: player
        }) &&
        enemy.isAtacking &&
        enemy.framesCurrent === 2
      ){
          player.takeHit()
          enemy.isAtacking = false
          if(!player.dead){
            songAtack1.play();
          }
            gsap.to('#saude1', {
            width: player.saude + '%'
          })
      }
        // Define oque sera feito se um Jogador não atingir o outro
      
        if (enemy.isAtacking && enemy.framesCurrent === 2 ) {
        enemy.isAtacking = false
        songAtackMiss1.play();
        }

      // Fim de Jogo baseado na Saude
      if (enemy.saude <= 0 || player.saude <= 0) {
         quemVenceu({player, enemy, timerId})
      }

    }
animate()

window.addEventListener('keydown',(event) => {
    if (!player.dead && !onP1) {
    switch (event.key) {
    
        // Teclas do Primeiro Jogador
    case 'd':
    case 'D':
        keys.d.pressed = true
        player.lastKey = 'd'
        break

    case 'a':
    case 'A':
        keys.a.pressed = true
        player.lastKey = 'a'
        break

    case 'w':
    case 'W':
        player.velocity.y = 0
        break
        // Tecla de Ataque Primeiro Jogador
    
    case 's':
    case 'S':   
        player.attack()
        break
    }
}

    if (!enemy.dead && !onP2) {
    switch (event.key) {
        // Teclas do segundo jogador
    
    case 'ArrowRight':
        keys.ArrowRight.pressed = true
        enemy.lastKey = 'ArrowRight'
        break

    case 'ArrowLeft':
        keys.ArrowLeft.pressed = true
        enemy.lastKey = 'ArrowLeft'
        break

    case 'ArrowUp':
        enemy.velocity.y = 0
        break
        
        // Tecla de Ataque do Segundo Jogador
    
    case 'ArrowDown':
        enemy.attack()
        break
        }
    }
})

// Define o pulo do Player 1 

var clickOne = false;

function cancellJump1(){
window.addEventListener('keydown',(event) => {
    if(!player.dead && !onP1){
        if(!clickOne) {
    switch (event.key) {
    case 'w':
    case 'W':
        player.velocity.y = -20
        songJump2.play();
        clickOne = true
        setTimeout(backFalseOne, 1000)
        break
                }
            }
        }
    }
    
)}
 
 function backFalseOne(){
        clickOne = false
}       cancellJump1();

 // Define o pulo do Player 2

var clickTwo = false;

function cancellJump2(){
window.addEventListener('keydown',(event) => {
    if(!enemy.dead && !onP2){ 
        if(!clickTwo) {
    switch (event.key) {
    case 'ArrowUp':
        enemy.velocity.y = -20
        songJump1.play();
        clickTwo = true
        setTimeout(backFalseTwo, 1000)
        break
                }
            }
        }
    }
)} 

function backFalseTwo(){
        clickTwo = false
}       cancellJump2();

// Define as teclas de movimentação como false

window.addEventListener('keyup',(event) => {
    switch (event.key) {
    // Teclas de mover do Primeiro Jogador
    case 'd':
    case 'D':
        keys.d.pressed = false
        keys.D.pressed = false
        break

    case 'a':
    case 'A':
        keys.a.pressed = false
        keys.A.pressed = false
        break 
    
    //Teclas de mover do segundo jogador
    
    case 'ArrowRight':
        keys.ArrowRight.pressed = false
        break

    case 'ArrowLeft':
        keys.ArrowLeft.pressed = false
        break
    }
})

// Mostra/Oculta o Popoup de Como Jogar

const popup = document.querySelector('.popup-wrapper')
const button = document.querySelector('#popupOn')

button.addEventListener('click', () => {
    popup.style.display = 'block'
})

popup.addEventListener('click', event => {
    const classNameOfClikedElement = event.target.classList[0]
    const classNames = ['popup-close', 'popup-link','popup-wrapper']
    const popupClose = classNames.some(classNames => classNames === classNameOfClikedElement)

    if (popupClose) {
        popup.style.display = 'none'
    }
})

// Define os sons que serão usados dentro do jogo

const songAtack1 = new Audio();
const songAtack2 = new Audio();
const songAtackMiss1 = new Audio();
const songAtackMiss2 = new Audio();
const songJump1 = new Audio();
const songJump2 = new Audio();
songAtack1.src = 'assets/songs/ataque1.ogg';
songAtack2.src = 'assets/songs/ataque2.ogg';
songAtackMiss1.src = 'assets/songs/ataqueMiss1.mp3';
songAtackMiss2.src = 'assets/songs/ataqueMiss1.mp3';
songJump1.src = 'assets/songs/jump1.mp3';
songJump2.src = 'assets/songs/jump1.mp3';

// Define o volume da musica de Ambiente Padrão 0.3

var audio = document.getElementById("audio");
audio.volume = 0.3;

// Define o modo de Jogo

var onP1 = false
var setP1 = document.getElementById("p1");
setP1.addEventListener("click", function(event){
    if (event.target === p2 || onP1 === false){     
            onP2 = true
            onP1 = false
            resetGame();
    }
})

var onMulti = false
var setMulti = document.getElementById("multi");
setMulti.addEventListener("click", function(event){
    if (event.target === multi){
            resetGame();
            onP1 = false
            onP2 = false
    }
})

var onP2 = false
var setP2 = document.getElementById("p2");
setP2.addEventListener("click", function(event) {
    if (event.target === p2 || onP2 === false) {
            resetGame();
            onP1 = true
            onP2 = false
    }
})

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
    imageSrc: './img/background.png'
  })

const loja = new Sprite({
    position: {
      x: 600,
      y: 128,
    },
    imageSrc: './img/shop.png',
    scale: 2.75,
    framesMax: 6,
  })

 // Caixa do Player Um
const player = new Lutador ({
    position: {
        x:0,
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

  imageSrc: './img/samuraiMack/Idle.png',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 157
  },
  sprites: {
    idle: {
        imageSrc: './img/samuraiMack/Idle.png',
        framesMax: 8
    },
    run: {
        imageSrc: './img/samuraiMack/Run.png',
        framesMax: 8,
    },
    jump: {
        imageSrc: './img/samuraiMack/Jump.png',
        framesMax: 2,
    },
    fall: {
        imageSrc: './img/samuraiMack/Fall.png',
        framesMax: 2,
    },
    attack1: {
        imageSrc: './img/samuraiMack/Attack1.png',
        framesMax: 6,
    },
    takeHit: {
        imageSrc: './img/samuraiMack/Take Hit - white silhouette.png',
        framesMax: 4,
    },
    death: {
        imageSrc: './img/samuraiMack/Death.png',
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
            x:400,
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

  imageSrc: './img/kenji/Idle.png',
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 167
  },
  sprites: {
    idle: {
        imageSrc: './img/kenji/Idle.png',
        framesMax: 4,
    },
    run: {
        imageSrc: './img/kenji/Run.png',
        framesMax: 8,
    },
    jump: {
        imageSrc: './img/kenji/Jump.png',
        framesMax: 2,
    },
    fall: {
        imageSrc: './img/kenji/Fall.png',
        framesMax: 2,
    },
    attack1: {
        imageSrc: './img/kenji/Attack1.png',
        framesMax: 4,
    },
    takeHit: {
        imageSrc: './img/kenji/Take hit.png',
        framesMax: 3,
    },
    death: {
        imageSrc: './img/kenji/Death.png',
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
            d: {
                pressed: false
            },
            w: {
                pressed: false
            },
            ArrowRight: {
                pressed: false
            },
            ArrowLeft: {
                pressed: false
            }
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
        player.switchSprite('run')
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
        player.switchSprite('run')
    } else {
        player.switchSprite('idle')
    }

    // Função Pular Jogador 1

    if(player.velocity.y < 0) {
        player.switchSprite('jump')
    } else if (player.velocity.y > 0){
        player.switchSprite('fall')  
    }

    // Movimentação do Segundo Jogador
    
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft' ) { 
        enemy.velocity.x = -5
        enemy.switchSprite('run')
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
        enemy.switchSprite('run')
    } else {
        enemy.switchSprite('idle') 
    }

        // Função Pular Jogador 2

    if(enemy.velocity.y < 0) {
        enemy.switchSprite('jump')
    } else if (enemy.velocity.y > 0){   
        enemy.switchSprite('fall')  
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
        // document.querySelector("#saude2").style.width = enemy.saude + '%'
        gsap.to('#saude2', {
            width: enemy.saude + '%'
          })
    }

    // Define oque sera feito se um Jogador não atingir o outro

    if (player.isAtacking && player.framesCurrent === 4 ) {
        player.isAtacking = false
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
        //   document.querySelector("#saude1").style.width = player.saude + '%'
        gsap.to('#saude1', {
            width: player.saude + '%'
          })
      }
        // Define oque sera feito se um Jogador não atingir o outro
      
        if (enemy.isAtacking && enemy.framesCurrent === 2 ) {
        enemy.isAtacking = false
    }

      // Fim de Jogo baseado na Saude
      if (enemy.saude <= 0 || player.saude <= 0) {
         quemVenceu({player, enemy, timerId})
      }

    }
animate()

window.addEventListener('keydown',(event) => {
    if (!player.dead) {
    switch (event.key) {
    
        // Teclas do Primeiro Jogador
    case 'd':
        keys.d.pressed = true
        player.lastKey = 'd'
        break

    case 'a':
        keys.a.pressed = true
        player.lastKey = 'a'
        break

    case 'w':
        player.velocity.y = -20
        break
     
        // Tecla de Ataque Primeiro Jogador
    
        case ' ':
        player.attack()
        break
    }
}

    if (!enemy.dead) {
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
        enemy.velocity.y = -20
        break
        
        // Tecla de Ataque do Segundo Jogador
    
    case 'ArrowDown':
        enemy.attack()
        break
        }
    }
})

window.addEventListener('keyup',(event) => {
    switch (event.key) {
    // Teclas de mover do Primeiro Jogador
    case 'd':
        keys.d.pressed = false
        break

    case 'a':
        keys.a.pressed = false
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
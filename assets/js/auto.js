// Define a movimentação automatica


// Movimentação do Player 1
function moveP1(){
if (!enemy.dead){
    if(player.position.x - enemy.position.x === -200){
        player.switchSprite('idle')
        keys.d.pressed = true
       player.lastKey = 'd'
} 
    else if (player.position.x - enemy.position.x === 100){
        keys.a.pressed = true
        player.lastKey = 'a'
}
    if (player.position.x - enemy.position.x === -100){
        player.attack()
}
    if (player.dead){
        keys.a.pressed = false
        keys.d.pressed = false
        player.lastKey = 'd'
        player.switchSprite('dead')
}
    } 
    else if (enemy.dead && player.saude >= 0){
        keys.a.pressed = false
        keys.d.pressed = false
        player.lastKey = 'd'
        player.switchSprite('idle')
    }
    if (clickTwo === false){
        window.addEventListener('keydown',(event) => {
            if(!enemy.dead && !player.dead){ 
                if(!clickOne && onP1) {
            switch (event.key) {
            case 'ArrowUp':
                player.velocity.y = -20
                songJump1.play();
                clickOne = true
                setTimeout(backFalseOne, 3000)
                break
                    }
                }
            }
        })
    }
}

// Movimentação do Player 2

function moveP2(){
    if (!player.dead){
        if(player.position.x - enemy.position.x === -200){
            enemy.switchSprite('idle')
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
    } 
        else if (player.position.x - enemy.position.x === 100){
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
    }
        if (player.position.x - enemy.position.x === -100){
            enemy.attack()
    }
        if (enemy.dead && player.saude >= 0){
            keys.ArrowRight.pressed = false
            keys.ArrowLeft.pressed = false
            enemy.lastKey = 'ArrowRight'
            enemy.switchSprite('dead')
    }
        } 
        else if (player.dead){
            keys.ArrowRight.pressed = false
            keys.ArrowLeft.pressed = false
            enemy.lastKey = 'ArrowRight'
            enemy.switchSprite('idle')
        }
        if (clickOne === false){
            window.addEventListener('keydown',(event) => {
                if(!enemy.dead && !player.dead){ 
                    if(!clickTwo && onP2) {
                switch (event.key) {
                case 'w':
                case 'W':
                    enemy.velocity.y = -20
                    songJump1.play();
                    clickTwo = true
                    setTimeout(backFalseTwo, 3000)
                    break
                    }
                }
            }
        })
    }
}
var goTo = false
var goToN = false

function goToP1(){
    if (goTo === false){
        keys.ArrowLeft.pressed = true
        enemy.lastKey = 'ArrowLeft'
        goTo = true
        setTimeout(changeToP1, 1900)
    }
}

function changeToP1(){
    if (goTo === true){
        keys.ArrowLeft.pressed = false
        enemy.lastKey = 'ArrowLeft'
        goTo = false
    }
}

function goToP2(){
    if (goToN === false){
        keys.d.pressed = true
        player.lastKey = 'd'
        goToN = true
        setTimeout(changeToP2, 1900)
    }
}

function changeToP2(){
    if (goToN === true){
        keys.d.pressed = false
        player.lastKey = 'd'
        goToN = false
    }
}
// Define a movimentação automatica

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
        player.switchSprite('dead')
}
    } 
    else if (!player.dead){
        keys.a.pressed = false
        keys.d.pressed = false
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
        if (enemy.dead){
            keys.ArrowRight.pressed = false
            keys.ArrowLeft.pressed = false
            enemy.switchSprite('dead')
    }
        } 
        else if (player.dead){
            keys.ArrowRight.pressed = false
            keys.ArrowLeft.pressed = false
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
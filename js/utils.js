function colisaoRetangular({retangulo1, retangulo2}) { 
    return (
        retangulo1.attackBox.position.x + retangulo1.attackBox.width >= 
        retangulo2.position.x && retangulo1.attackBox.position.x <= retangulo2.position.x + retangulo2.width &&
        retangulo1.attackBox.position.y + retangulo1.attackBox.height >= retangulo2.position.y &&
        retangulo1.attackBox.position.y <= retangulo2.position.y + retangulo2.height
    )
}

function quemVenceu({player, enemy, timerId}) {
clearTimeout (timerId)
document.querySelector('#empate').style.display = 'flex'
if (player.saude === enemy.saude) {
document.querySelector('#empate').innerHTML = 'Empate'
} else if (player.saude > enemy.saude ) {
document.querySelector('#empate').innerHTML = 'Jogador 1 Ganhou'
} else if (enemy.saude > player.saude ) {
document.querySelector('#empate').innerHTML = 'Jogador 2 Ganhou'
    }
}

// Determina o fim do Jogo se o Relogio chegar a 0 
let timer = 60
let timerId
function relogio () {
if( timer > 0) {
timerId = setTimeout (relogio, 1000)
timer--
document.querySelector('#timer').innerHTML = timer
}
if (timer === 0){
quemVenceu({player, enemy, timerId})
    }
}
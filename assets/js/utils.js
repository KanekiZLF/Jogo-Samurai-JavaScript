function colisaoRetangular({retangulo1, retangulo2}) { 
    return (
        retangulo1.attackBox.position.x + retangulo1.attackBox.width >= 
        retangulo2.position.x && retangulo1.attackBox.position.x <= retangulo2.position.x + retangulo2.width &&
        retangulo1.attackBox.position.y + retangulo1.attackBox.height >= retangulo2.position.y &&
        retangulo1.attackBox.position.y <= retangulo2.position.y + retangulo2.height
    )
}

function quemVenceu({player, enemy, timerId}) {
clearTimeout(timerId)
document.querySelector('#resultado').style.display = 'flex'
if (player.saude === enemy.saude) {
document.querySelector('#resultado').innerHTML = 'Empate'
} else if (player.saude > enemy.saude ) {
document.querySelector('#resultado').innerHTML = 'Jogador 1 Ganhou'
} else if (enemy.saude > player.saude ) {
document.querySelector('#resultado').innerHTML = 'Jogador 2 Ganhou'
    }
}

// Determina o fim do Jogo se o Relogio chegar a 0 
let timer = 61
let timerId
function relogio () {
if( timer > 0) {
timerId = setTimeout(relogio, 1000)
timer--
document.querySelector('#timer').innerHTML = timer
}
if (timer === 60){
    clearTimeout(timerId)
}
if (timer === 0){
quemVenceu({player, enemy, timerId})
    } 
}

// Redefine ambos os jogadores

function resetGame (){
        player.saude = 100
        player.dead = false
        player.position.x = 100
        enemy.saude = 100
        enemy.dead = false
        enemy.position.x = 850
        document.getElementById('saude1').style.width = '100%'
        document.getElementById('saude2').style.width = '100%'
        document.querySelector('#resultado').innerHTML = ' '
        document.querySelector('#resultado').style.display = 'flex'
        timerSet();
        timer = 60
}
// Redefine o relogio

function timerSet(){
        setTimeout(relogio, 1000)
    }

// Desativa as teclas "Espaço, Seta pra Cima, Seta pra Baixo"

window.onkeydown = function (e) {
    const codes = [40,38,32];
    if(codes.includes(e.keyCode)) {
    e.keyCode = 0;
    e.returnValue = false;
    return false;
    } 
}

console.info("Este Jogo foi Desenvolvido Por Luiz F. R. Pimentel")
var onP1 = false
var onMulti = false
var onP2 = false

function gameP1(){
    if (onP1 === false){
        onP1 = true
        onP2 = false
    }
}

function gameMulti(){
    if (onMulti === false){
        onMulti = true
    } else if (onP1 = false){}
}

function gameP2(){
    if (onP2 === false){
        onP2 = true
        onP1 = false
    }
}


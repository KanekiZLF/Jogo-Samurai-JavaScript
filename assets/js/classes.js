class Sprite {
    constructor({ 
        position, 
        imageSrc, 
        scale = 1, 
        framesMax = 1, 
        offset = {x:0, y:0},
    }){
        this.position = position
        this.height = 150
        this.width = 50
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.offset = offset
        
    }
    draw() {
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
            )
        }

        animateFrames() {
            this.framesElapsed++
            if(this.framesElapsed % this.framesHold === 0 ){
    
            if(this.framesCurrent < this.framesMax - 1){
            this.framesCurrent++ 
            } else {
                this.framesCurrent = 0
                }
            }
        }
    
    update() {
        this.draw()
       this.animateFrames()
    }
}

class Lutador extends Sprite {
    constructor({
        position, 
        velocity, 
        color = 'red', 
        imageSrc, 
        scale = 1, 
        framesMax = 1 ,
        offset = {x:0, y: 0},
        sprites,
        attackBox = {offset: {}, width: undefined, height: undefined}
        }) {
            super({
                position,
                imageSrc,
                scale,
                framesMax,
                offset
            })
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        this.color = color
        this.isAtacking
        this.saude = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.sprites = sprites
        this.dead = false

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }
    
    update() {
        this.draw()
        if (!this.dead) this.animateFrames()
        
        // Caixas de Ataque

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        // Descomente para mostrar a caixa de ataque dos Jogadores 1 e 2

    //   c.fillRect(
    //     this.attackBox.position.x,
    //     this.attackBox.position.y, 
    //     this.attackBox.width, 
    //     this.attackBox.height 
    //     )

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        // Define o posicionamento dos personagens

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            this.velocity.y = 0
            this.velocity.x = 330
            
        } else this.velocity.y += gravity

        this.position.x = Math.max(0, Math.min(1005 - this.width, this.position.x))
        if (onP2){
            moveP2();
        }
        if (onP1){
            moveP1();
        }                     
    }

    // Define o ataque como VERDADEIRO
    
    attack() {
        this.switchSprite('attack1')
        this.isAtacking = true 
    }

    // Define qual ação vai ser feita caso "takeHit" seja verdadeiro
    // Define o valor de Saude que o Jogador ira perder se for atingido. Valor em PORCENTAGEM
    
    takeHit () {
        this.saude -= 20

        if (this.saude <= 0) {
            this.switchSprite('death')
        } else this.switchSprite('takeHit')
    }

    // Define uma tag que sera usada para definir a imagem de cada jogador

    switchSprite(sprite) {
        
        if (this.image === this.sprites.death.image && player.saude <= 0) {
            if (this.framesCurrent === this.sprites.death.framesMax -1 )
                this.dead = true
                return
        }

        if (this.image === this.sprites.death.image && enemy.saude <= 0) {
            if (this.framesCurrent === this.sprites.death.framesMax -1 )
                this.dead = true
                return
        }
   
        // Substitui todas as outras animações pela animação de ataque
       
        if (
            this.image === this.sprites.attack1.image && 
            this.framesCurrent < this.sprites.attack1.framesMax -1
            ) return

    // Cancela as animações de "TakeHit" Jogador atingido
       
        if (
            this.image === this.sprites.takeHit.image && 
            this.framesCurrent < this.sprites.takeHit.framesMax -1
            ) return

        switch(sprite) {
            case 'idle':
            if (this.image !== this.sprites.idle.image){
            this.image = this.sprites.idle.image    
            this.framesMax = this.sprites.idle.framesMax
            this.framesCurrent = 0
        }   break
        
        case 'idle2':
            if (this.image !== this.sprites.idle2.image){
            this.image = this.sprites.idle2.image    
            this.framesMax = this.sprites.idle2.framesMax
            this.framesCurrent = 0
        }   break

            case 'run':
            if (this.image !== this.sprites.run.image){
            this.image = this.sprites.run.image  
            this.framesMax = this.sprites.run.framesMax
            this.framesCurrent = 0
        }   break

        case 'run2':
            if (this.image !== this.sprites.run2.image){
            this.image = this.sprites.run2.image  
            this.framesMax = this.sprites.run2.framesMax
            this.framesCurrent = 0
        }   break

            case 'jump':
            if (this.image !== this.sprites.jump.image){
            this.image = this.sprites.jump.image    
            this.framesMax = this.sprites.jump.framesMax
            this.framesCurrent = 0
        }   break

        case 'jump2':
            if (this.image !== this.sprites.jump2.image){
            this.image = this.sprites.jump2.image    
            this.framesMax = this.sprites.jump2.framesMax
            this.framesCurrent = 0
        }   break
        
        case 'fall':
            if (this.image !== this.sprites.fall.image){
            this.image = this.sprites.fall.image    
            this.framesMax = this.sprites.fall.framesMax
            this.framesCurrent = 0
        }   break

        case 'fall2':
            if (this.image !== this.sprites.fall2.image){
            this.image = this.sprites.fall2.image    
            this.framesMax = this.sprites.fall2.framesMax
            this.framesCurrent = 0
        }   break

        case 'attack1':
            if (this.image !== this.sprites.attack1.image){
            this.image = this.sprites.attack1.image    
            this.framesMax = this.sprites.attack1.framesMax
            this.framesCurrent = 0
        }   break
        
        case 'takeHit':
            if (this.image !== this.sprites.takeHit.image){
            this.image = this.sprites.takeHit.image    
            this.framesMax = this.sprites.takeHit.framesMax
            this.framesCurrent = 0
        }   break

        case 'death':
            if (this.image !== this.sprites.death.image){
            this.image = this.sprites.death.image    
            this.framesMax = this.sprites.death.framesMax
            this.framesCurrent = 0
        }   break
        
        }

    }
}


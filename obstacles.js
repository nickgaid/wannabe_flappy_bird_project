const obstaclesArray = [];
const pipeSpriteBottom = new Image();
pipeSpriteBottom.src = 'images/pipe.png';
const pipeSpriteTop = new Image();
pipeSpriteTop.src = 'images/pipe180.png';
class Obstacle {
    constructor(){
        this.top = (Math.random() * canvas.height/3) + 40;
        this.bottom = (Math.random() * canvas.height/3) + 40;
        this.x = canvas.width;
        this.width = 80;
        this.counted = false;
    }
    draw(){
        //ctx.fillStyle = this.color;
        //ctx.fillRect(this.x, 0, this.width, this.top);
        //ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
        ctx.drawImage(pipeSpriteTop,this.x,this.top-canvas.height-95);
        ctx.drawImage(pipeSpriteBottom,this.x,canvas.height-this.bottom-2);
        
    }
    update(){
        this.x -= gameSpeed;
        if (!this.counted && this.x <bird.x){
            score++;
            this.counted = true;
        }
        this.draw();
    }
}

function handleObstacles(){
    if (frame % 150 === 0){
        obstaclesArray.unshift(new Obstacle);
    }
    for (let i = 0; i < obstaclesArray.length; i++){
        obstaclesArray[i].update();
    }
    if (obstaclesArray.length > 20){
        obstaclesArray.pop(obstaclesArray[0]);
    }
}
// Δημιουργώ τον canva και του βάζω ύψος και πλάτος
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;
const background = new Image();

background.src = 'images/bg.png';

const BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}



// Για να ελέγχουμε πότε πατήθηκε το space
let spacePressed = false;
// Θα χρησιμοποιηθεί απο την Math.sin μέθοδο για την πάνω κάτω κίνηση του bird
let angle = 0;
let frame = 0;
// Αυξάνεται κάθε φορά που περνάμε ένα εμπόδιο
let score = 0;
// Χρησιμοποιήται για να τρέχουν όλα τα αντικείμενα με τον ίδιο ρυθμό
let gameSpeed = 1.5;

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.fillRect(10, canvas.height - 90, 50, 50);
    handleBackground();
    bird.update();
    bird.draw();
    ctx.fillStyle = 'black';
    ctx.font = '35px Georgia';
    handleObstacles();
    handleCollisions();
    ctx.fillText('Current Score: ' + score, 300, 70);
    if (handleCollisions()) { return;}
    requestAnimationFrame(animate);
    angle += 0.12;
    frame++;
}

animate();

 function restartGame(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleBackground();
    ctx.fillStyle = 'black';
    ctx.font = '35px Georgia';
    ctx.fillText('Press R to start the game ', canvas.width/5, canvas.height/2);
    window.addEventListener('keydown',function(e){
        if (e.key ==='r') {
            console.log('pressed');
            gameState = true;
            this.document.location.reload();
        }
    });
}


// Κάθε φορά που πατάω το space
window.addEventListener('keydown',function(e){
    if (e.code === 'Space') spacePressed = true;
});

// Κάθε φορά που αφήνω το space
window.addEventListener('keyup',function(e){
    if (e.code === 'Space') spacePressed = false;
    bird.frameX = 0;
});

function handleCollisions(){
    for (let i = 0; i < obstaclesArray.length; i++){
        if (bird.x <= obstaclesArray[i].x + obstaclesArray[i].width &&
            bird.x + bird.width >= obstaclesArray[i].x && 
            ((bird.y <= 0 + obstaclesArray[i].top && bird.y + bird.height >= 0) ||
            (bird.y >= canvas.height-50 - obstaclesArray[i].bottom &&
            bird.y + bird.height <= canvas.height))){
                //Χτύπησε σωλήνα
                ctx.font = "25px Georgia";
                ctx.fillStyle = 'black';
                ctx.fillText('Game Over, your score is ' + score,canvas.width/4+15,canvas.height/2 - 10);
                setTimeout(restartGame,3000);
                return true;
            }
    }
}

function handleBackground(){
    if(BG.x1 <= -BG.width + gameSpeed) BG.x1 = BG.width;
    else BG.x1 = gameSpeed;
    if(BG.x2 <= -BG.width + gameSpeed) BG.x2 = BG.width;
    else BG.x2 = gameSpeed;
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}
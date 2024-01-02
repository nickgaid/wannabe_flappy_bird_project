const birdSprite = new Image();
birdSprite.src = 'images/bird.png';

class Bird {
    constructor(){
        // Οριζόντια θέση
        this.x = 150;
        // Κάθετη θέση
        this.y = 200;
        // Ταχύτητα y(κάθετης θέσης)
        this.vy = 0;
        this.originalWidth = 405;
        this.width = this.originalWidth/8-1;
        this.height = 50;
        // Βάρος του παίχτη
        this.weight = 0.7;
        this.frameX = 0;
    }
    update(){
         
        //Math.sin επιστρέφει συνεχώμενα -1 και 1
        let curve = Math.sin(angle) * 20;  

        // Αν ακουμπήσει το πάτωμα σταματάει να κουνιέται
        if (this.y > canvas.height - (this.height * 1.2) + curve)
        {
            this.y = canvas.height - (this.height * 1.2) + curve;
            this.vy = 0;
        }else
            {
                // Όσο πιο ψιλά είναι ο παίχτης τόσο πιο γρήγορα θα πέφτει
                this.vy += this.weight;
                this.vy *= 0.5;
                this.y += this.vy;
            }
        // Αν ακουμπήσει το ταβάνι σταματάει να κουνιέται
        if (this.y < 0 + -this.height)
        {
            this.y = 0 + this.height;
            this.vy = 0;
        }
        if (spacePressed && this.y > this.height ) this.flap();
    }
    draw(){
        //ctx.fillStyle = 'red';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(birdSprite, this.frameX * this.width, 0, 
             this.width, this.height,
             this.x - 20, this.y - 12, this.width * 1.7, 
             this.height * 1.7);
    }
    flap(){
        this.vy -= 1.5;
        if (this.frameX >= 3) this.frameX = 0;
        else if(frame % 2 === 0) this.frameX++;
    }
}
const bird = new Bird();
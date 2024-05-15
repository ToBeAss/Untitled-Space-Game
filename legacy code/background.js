class Nebula 
{
    constructor(image, xPos, yPos, width, height, z)
    {
        this.image = image;
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
        this.z = z;
    }

    draw()
    {
        canvas.background.globalAlpha = this.z;
		canvas.background.drawImage(this.image, -6765+this.xPos+ship.xPos*this.z, -7086+this.yPos+ship.yPos*this.z, this.width, this.height);

        //canvas.minimap.drawImage(this.image, this.xPos/75, this.yPos/75, this.width/75, this.height/75);
    }
}
let nebulaArray = new Array();
let nebulaCount = 0;
let nebula1 = new Image();
nebula1.src = "images/nebula1.png"
let nebula2 = new Image();
nebula2.src = "images/nebula2.png"

while (nebulaCount < 100)
{
    nebulaCount++;
    let x = (Math.random() * 15000 - (15000/2)) - -6765; // map size - map left
    let y = (Math.random() * 15000 - (15000/2)) - -7086; // map size - map top
    let z = Math.random() * 0.75;
    let w = Math.random() * 1000 + 1000;
    let h = w;
    if (nebulaCount >= 40) {image = nebula2;}
    else {image = nebula1;}
    nebulaArray.push(new Nebula(image, x, y, w, h, z));
}


class Stars
{
    constructor(xPos, yPos, radius, color, z)
    {
        this.xPos = xPos;
        this.yPos = yPos;
        this.radius = radius;
        this.color = color;
        this.z = z;
    }

    draw()
    {
        canvas.background.globalAlpha = this.z;
        canvas.background.fillStyle = this.color;
        canvas.background.beginPath();
        canvas.background.arc(-6765+this.xPos+ship.xPos*this.z, -7086+this.yPos+ship.yPos*this.z, this.radius, 0, 2 * Math.PI);
        canvas.background.fill();
    }
}
let starArray = new Array();
let starCount = 0;

while (starCount < 1000)
{
    starCount++;
    let x = (Math.random() * 15000 - (15000/2)) - -6765; // map size - map left
    let y = (Math.random() * 15000 - (15000/2)) - -7086; // map size - map top
    let z = Math.random() * 0.75;
    let r = Math.random() * 3;
    let c = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    starArray.push(new Stars(x, y, r, c, z));
}


let init = "incomplete"

let offScreenCanvas = document.createElement("canvas");
offScreenCanvas.width = 15000; // map size
offScreenCanvas.height = 15000;
let offScreenCtx = offScreenCanvas.getContext("2d");

let back = new Image();

function drawBackground()
{
    if (init == "incomplete")
    {
        canvas.background.fillRect(MAP_LEFT+ship.xPos, MAP_TOP+ship.yPos, MAP_SIZE, MAP_SIZE);

        for (let nebula of nebulaArray)
        {
            nebula.draw();
        }

        for (let star of starArray)
        {
            star.draw();
        }
        init = "incomplete";
    }
}
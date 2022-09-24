var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
const MaxPulos = 10
let botao = document.getElementById("btnjava")
botao.addEventListener("click",desenhar)

teclas = {};

var bola = {
    x: canvas.width/2,
    y: canvas.height/2,
    raio: 15,
    cor: "white",
    dy:2,
    dx:0
}



var golesquerdo = {
    x : 0,
    y : 275,
    altura: 160,
    largura: 50,
}

let image_golesquerdo = new Image();
image_golesquerdo.src = 'img/gol1.png';


var goldireito = {
    x : 700,
    y : 275,
    altura: 160,
    largura: 50,
}

let image_goldireito = new Image();
image_goldireito.src = 'img/gol2.png';



var fundo = {
    altura: canvas.height,
    largura: canvas.width,
}

let image_fundo = new Image();
image_fundo.src = 'img/game_background_1.png';

var mario = {
    x: 25,
    y: canvas.height/2 - 60,
    altura: 75,
    largura: 75,
    speed: 4,
    score: 0,
    gravidade: 0.25,
    pulo:5,
    qntpulos:0,
}

var image_mario = new Image();
image_mario.src = 'img/mario.png';

var placar = new Image();
placar.src = 'img/placar.png';

var image_mario2 = new Image();
image_mario2.src = 'img/mario2.png';

var chao = {
    x:0,
    y:410,
    altura:50,
    largura:740,
}

var image_chao = new Image();
image_chao.src = 'img/Tile_02.png';



var mario2 = {
    x: canvas.width - 90,
    y: canvas.height/2 - 60,
    altura: 75,
    largura: 75,
    speed: 4,
    score: 0,
    gravidade: 0.25,
    pulo:5,

}

document.addEventListener("keydown", function (evento){
    teclas[evento.keyCode] = true;
});

document.addEventListener("keyup", function (evento){
    delete teclas[evento.keyCode];
});

function newgame(winner) {
    if(winner == "player 1")
        ++mario.score;
    else
        ++mario2.score;
    bola.dy = 0
	bola.dy = 0
    bola.y = canvas.height / 2 
    bola.x = canvas.width / 2
};




function movePlayers(){


    mario.velocidade =mario.velocidade + mario.gravidade;
    if (mario.y + mario.altura + mario.velocidade <= chao.y){
        mario.y = mario.y + mario.velocidade;
    
    }
    else mario.velocidade= 0
    mario2.velocidade = mario2.velocidade + mario2.gravidade;
    if (mario2.y + mario2.altura + mario2.velocidade <= chao.y){
        mario2.y = mario2.y + mario2.velocidade;
    }
    else mario2.velocidade= 0



    //w - 87
    if(87 in teclas && mario.y > 0)
        if (mario.qntpulos < MaxPulos){
            ++mario.qntpulos;
            mario.velocidade =-mario.pulo;
            
        }
        if (mario.qntpulos >= MaxPulos){
            mario.qntpulos = 0;
        }
  
 

    //d
    if ( 68 in teclas && mario.x <canvas.width - mario.largura) {
        mario.x += mario.speed;
        }

    //a
    if ( 65 in teclas  && mario.x > 0) {
        mario.x -= mario.speed;
        }

    //sobe - 38
    if(38 in teclas && mario2.y > 0)
        mario2.velocidade = -mario2.pulo;

    if (39 in teclas &&  mario2.x <canvas.width - mario2.largura) {
            mario2.x += mario2.speed;
        }
    if (37 in teclas && mario2.x > 0) {
            mario2.x -= mario2.speed;
        }
}

 
function moveBola() {

    if (bola.y + bola.raio >= 410) {
        bola.dy = -bola.dy * 0.7
    } else {
        bola.dy += 1
    }
    bola.y += bola.dy
    bola.x += bola.dx
    if(bola.x + bola.raio >mario.x && bola.x + bola.raio < (mario.x + mario.largura) && bola.y > mario.y && bola.y < mario.y + mario.altura){
        bola.dx = 10;
        bola.dy = 20;
    }

    if(bola.x + bola.raio >mario2.x && bola.x + bola.raio < (mario2.x + mario2.largura) && bola.y > mario2.y && bola.y < mario2.y + mario2.altura){
        bola.dx = -10;
        bola.dy = 20;
    }
}



function Bolagol(){
	if(bola.x + bola.raio > canvas.width){
		if(bola.y > 200 && bola.y < 500 ){
			bola.dy = 0
			bola.dx = 0
			mario.x = 25
			mario.y = canvas.height/2 - 60
			mario2.x = canvas.width - 90
			mario2.y = canvas.height/2 - 60
			newgame("player 1");
			return;
		}
	}
	if(bola.x - bola.raio < 0){
		if(bola.y > 200 && bola.y < 500 ){
			bola.dy = 0
			bola.dx = 0
			mario.x = 25
			mario.y = canvas.height/2 - 60
			mario2.x = canvas.width - 90
			mario2.y = canvas.height/2 - 60
			newgame("player 2");
			return;
		}
    }

}



function desenhar(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    movePlayers();
    moveBola()
    Bolagol();

    ctx.fillStyle = bola.cor;
    ctx.beginPath();
    ctx.drawImage(image_fundo,0,0,fundo.largura, fundo.altura)

    ctx.drawImage(image_chao,chao.x,chao.y,chao.largura, chao.altura)

    ctx.arc(bola.x, bola.y, bola.raio, 0, 2*Math.PI);
    ctx.fill();

    ctx.drawImage(image_mario,mario.x, mario.y, mario.largura, mario.altura);
    ctx.drawImage(image_mario2,mario2.x, mario2.y, mario2.largura, mario2.altura);
    ctx.drawImage(image_golesquerdo,golesquerdo.x, golesquerdo.y, golesquerdo.largura, golesquerdo.altura);
    ctx.drawImage(image_goldireito, goldireito.x, goldireito.y, goldireito.largura, goldireito.altura);
    ctx.drawImage(placar, 100,  20 , 480, 50);


    ctx.fillStyle = "white";
    ctx.font = "bold"
    ctx.font = "40px Arial";
    ctx.fillText(+ mario.score, 293, 55);
    ctx.fillText( + mario2.score, 355,55);

    requestAnimationFrame(desenhar);
}






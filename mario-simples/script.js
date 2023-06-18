const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const placar = document.querySelector('.placar #p');
const gameboard = document.querySelector('.gameboard');

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

let contador = 0;
let gameOver = false;

const checkCollision = () => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    console.log(marioPosition);

    const gameboardWidth = gameboard.offsetWidth;
    const pipeWidth = pipe.offsetWidth;
    const marioBottom = marioPosition * gameboardWidth / 100;

    if (pipePosition <= gameboardWidth * 0.12 && pipePosition > 0 && marioBottom < gameboardWidth * 0.16) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = '/img/game-over.png';
        mario.style.width = '15%';
        mario.style.marginLeft = '10%';

        gameOver = true;
        clearInterval(loop);

        showGameOverScreen();
    }
}

const showGameOverScreen = () => {
    const gameOverScreen = document.createElement('div');
    gameOverScreen.className = 'game-over-screen';
    gameOverScreen.innerHTML = `
        <h1>Game Over</h1>
        
        <button class="restart-button">Restart</button>
    `;

    // Adicione estilos diretamente usando a propriedade style
    gameOverScreen.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    gameOverScreen.style.color = '#fff';
    gameOverScreen.style.padding = '10px';
    gameOverScreen.style.textAlign = 'center';
    gameOverScreen.style.position = 'absolute';
    gameOverScreen.style.top = '50%';
    gameOverScreen.style.left = '50%';
    gameOverScreen.style.transform = 'translate(-50%, -50%)';
    gameOverScreen.style.fontFamily = 'Montserrat, sans-serif';

    const restartButton = gameOverScreen.querySelector('.restart-button');
    restartButton.style.backgroundColor = '#f00';
    restartButton.style.color = '#fff';
    restartButton.style.padding = '10px 20px';
    restartButton.style.border = 'none';
    restartButton.style.borderRadius = '5px';
    restartButton.style.cursor = 'pointer';

    restartButton.addEventListener('click', () => {
        location.reload();
    });

    gameboard.appendChild(gameOverScreen);
}


const loop = setInterval(() => {
    if (gameOver) return;

    checkCollision();

    contador++;
    console.log(contador);
    placar.textContent = contador;
}, 18);

document.addEventListener('keydown', jump);
document.addEventListener('touchstart', jump);


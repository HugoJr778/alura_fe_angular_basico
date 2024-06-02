const html = document.querySelector('html');

const imgContexto = document.querySelector('.app__image');
const txtTitulo = document.querySelector('.app__title');

const btnFoco = document.querySelector('.app__card-button--foco');
const btnCurto = document.querySelector('.app__card-button--curto');
const btnLongo = document.querySelector('.app__card-button--longo');

const checkMscinput = document.querySelector('#alternar-musica');
const musicaLuna = new Audio('/sons/luna-rise-part-one.mp3');
musicaLuna.volume.volume = 0.5;
musicaLuna.loop = true;

const musicaBeep = new Audio('/sons/beep.mp3');
musicaBeep.volume = 0.5;

const musicaPlay = new Audio('/sons/play.wav');
musicaPlay.volume = 0.5;

const musicaPause = new Audio('/sons/pause.mp3');
musicaPause.volume = 0.5;

const btnsContexto = document.querySelectorAll('.app__card-button');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

const temporizador = document.querySelector('#timer');
const btnComecar = document.querySelector('#start-pause');

const txtBtnComecarOuPausar = document.querySelector('#start-pause span');
const imgBtnComecarOuPausar = document.querySelector('#start-pause img');


btnFoco.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    btnFoco.classList.add('active');
});

btnCurto.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    btnCurto.classList.add('active');
});

btnLongo.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    btnLongo.classList.add('active');
});

checkMscinput.addEventListener('change', () => {
    if (musicaLuna.paused) {
        musicaLuna.play();
    } else {
        musicaLuna.pause();
    }
});

function alterarContexto(contexto) {
    mostrarTemporizador();
    btnsContexto.forEach(function (contexto) {
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    imgContexto.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            txtTitulo.innerHTML = `Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case "descanso-curto":
            txtTitulo.innerHTML = `Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case "descanso-longo":
            txtTitulo.innerHTML = `Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>`;
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        musicaBeep.play();
        alert('Tempo Finalizado!');
        zerarTimer();
        return
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTemporizador();
}

btnComecar.addEventListener('click', iniciarOuPausarTimer);

function iniciarOuPausarTimer() {
    if(intervaloId) {
        musicaPause.play();
        zerarTimer();
        return
    }
    musicaPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    txtBtnComecarOuPausar.textContent = "Pausar";
    imgBtnComecarOuPausar.setAttribute('src', '/imagens/pause.png');
}

function zerarTimer() {
    clearInterval(intervaloId);
    txtBtnComecarOuPausar.textContent = "Começar";
    imgBtnComecarOuPausar.setAttribute('src', '/imagens/play_arrow.png');
    intervaloId = null;
}

function mostrarTemporizador() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});
    temporizador.innerHTML = `${tempoFormatado}`;
}

mostrarTemporizador();

function tocaSom (seletorAudio) {
    const elemento = document.querySelector(seletorAudio);
    if (elemento && elemento.localName === 'audio') {
        elemento.play;
    } else {
        console.log('Seletor não encontrado/incorreto!');
    }
}

const listaDeTeclas = document.querySelectorAll('.tecla');

for (let contador = 0; contador < listaDeTeclas.length; contador++) {
    const tecla = listaDeTeclas[contador];

    listaDeTeclas[contador].onclick = function () {
        tocaSom(`#som_${tecla.classList[1]}`);
    }

    tecla.onkeydown = function (evento) {
        if(evento.code === 'Enter' || evento.code === 'Space') {
            tecla.classList.add('ativa');
        }
    }

    tecla.onkeyup = function () {
        tecla.classList.remove('ativa');
    }
}

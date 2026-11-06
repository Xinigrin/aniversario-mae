// 1. Criar o reprodutor
const audio = new Audio();

// 2. Localizar os elementos do site
const botao = document.getElementById("iniciar-musica");
const fotografias = document.getElementById("capitulo-fotografias");
const homenagem = document.getElementById("homenagem");

// 3. Caminhos das músicas
const musicas = [
    "musicas/musica1.mp3",
    "musicas/musica2.mp3",
    "musicas/musica3.mp3"
];

// 4. Controle da reprodução
let musicaAtual = -1;
let reproducaoIniciada = false;

// 5. Função para trocar de música
function trocarMusica(numero) {

    if (musicaAtual === numero) {
        return;
    }

    musicaAtual = numero;

    audio.pause();
    audio.src = musicas[numero];
    audio.load();

    audio.play().catch(function(erro) {
        console.log("Erro ao trocar música:", erro);
    });
}

// 6. Iniciar a primeira música pelo botão
botao.addEventListener("click", function() {

    reproducaoIniciada = true;

    trocarMusica(0);

    botao.textContent = "Nossa viagem começou ❤️";

});

// 7. Observar a chegada aos capítulos
const observador = new IntersectionObserver(function(entradas) {

    if (!reproducaoIniciada) {
        return;
    }

    entradas.forEach(function(entrada) {

        if (entrada.isIntersecting) {

            if (entrada.target.id === "capitulo-fotografias") {
                trocarMusica(1);
            }

            if (entrada.target.id === "homenagem") {
                trocarMusica(2);
            }

        }

    });

}, {
    threshold: 0.25
});

// 8. Observar os capítulos
observador.observe(fotografias);
observador.observe(homenagem);

// 9. Observar a entrada das fotografias na tela

const observadorFotos = new IntersectionObserver(function(entradas) {

    entradas.forEach(function(entrada) {

        if (entrada.isIntersecting) {

            entrada.target.classList.add("visivel");

            observadorFotos.unobserve(entrada.target);

        }

    });

}, {
    threshold: 0.15
});

// 10. Observar cada fotografia

document.querySelectorAll(".galeria figure").forEach(function(foto) {

    observadorFotos.observe(foto);

});
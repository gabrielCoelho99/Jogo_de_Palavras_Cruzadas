// CRIAÇÃO DE LISTA E FUNÇÃO PARA GERAR PALAVRA ALEATÓRIA

// UMA LISTA DE PALAVRAS
const palavras = ["maça", "goiaba", "banana", "uva", "pêra", "salsicha", "ovo", "tempero", "farinha", "calabresa", "pinga", "limão", "tomate", "cebola", "pimentão"];

// FUNÇÃO PARA ESCOLHER A PALAVRA ALEATÓRIA
function escolherPalavraAleatoria() {
    const indiceAleatorio = Math.floor(Math.random() * palavras.length); // GERA UM NÚMERO ALEATÓRIO ENTRE 0 E O NÚMERO DE PALAVRAS MENOS 1
    return palavras[indiceAleatorio];
}

// PALAVRA SECRETA ESCOLHIDA ALEATORIAMENTE
let palavraSecreta = escolherPalavraAleatoria(); // AQUI USAMOS 'let' PARA PODER REINICIAR A PALAVRA SECRETA NO FUTURO

// ENTRADA DO JOGADOR

// SELECIONA OS ELEMENTOS DO HTML
const inputTentativa = document.getElementById("inputTentativa");
const botaoTentativa = document.getElementById("botaoTentativa");
const feedback = document.getElementById("feedback");
const tentativas = document.getElementById("tentativas");
const botaoReiniciar = document.getElementById("botaoReiniciar");

// CONTAGEM DE TENTATIVAS
let contagemTentativas = 0;
const limiteTentativas = 100; // MUDADO PARA 6 TENTATIVAS

// FUNÇÃO QUE DEVE PROCESSAR A TENTATIVA DO JOGADOR
function processarTentativa() {
    const tentativa = inputTentativa.value.toLowerCase(); // OBTÉM A TENTATIVA DO JOGADOR EM MINÚSCULAS
    contagemTentativas++; // INCREMENTA O CONTADOR DE TENTATIVAS
    verificarTentativa(tentativa); // CHAMA A FUNÇÃO PARA VERIFICAR A TENTATIVA
}

// EVENTO PARA O BOTÃO DE TENTATIVA
botaoTentativa.addEventListener("click", processarTentativa);

// FUNÇÃO PARA VERIFICAR A TENTATIVA DO JOGADOR
function verificarTentativa(tentativa) {
    if (tentativa === palavraSecreta) {
        feedback.textContent = "Isso ai! Acertou!";
        botaoReiniciar.style.display = "block";
        return;
    }

    let feedbackTexto = "";
    // Verifica se a tentativa tem o mesmo comprimento da palavra secreta
    for (let i = 0; i < palavraSecreta.length; i++) {
        if (i < tentativa.length) {
            if (tentativa[i] === palavraSecreta[i]) {
                feedbackTexto += tentativa[i]; // Letra correta e na posição certa
            } else if (palavraSecreta.includes(tentativa[i])) {
                feedbackTexto += "*"; // Letra correta mas na posição errada
            } else {
                feedbackTexto += "."; // Letra incorreta
            }
        } else {
            feedbackTexto += "."; // Letras extras na tentativa (maior que a palavra secreta)
        }
    }

    feedback.textContent = feedbackTexto;
    tentativas.textContent = `Tentativas restantes: ${limiteTentativas - contagemTentativas}`;
    
    if (contagemTentativas >= limiteTentativas) {
        feedback.textContent = `Você perdeu! A palavra secreta era ${palavraSecreta}`;
        botaoReiniciar.style.display = "block";
    }
}

// FUNÇÃO PARA REINICIAR O JOGO
function reiniciarJogo() {
    palavraSecreta = escolherPalavraAleatoria(); // ESCOLHE UMA NOVA PALAVRA SECRETA
    contagemTentativas = 0; // REINICIA O CONTADOR DE TENTATIVAS
    feedback.textContent = ""; // LIMPA O FEEDBACK
    tentativas.textContent = `Tentativas restantes: ${limiteTentativas}`; // REINICIA A EXIBIÇÃO DE TENTATIVAS RESTANTES
    botaoReiniciar.style.display = "none"; // OCULTA O BOTÃO DE REINÍCIO
    inputTentativa.value = ""; // LIMPA O CAMPO DE ENTRADA
    console.log("Nova palavra secreta:", palavraSecreta); // EXIBE A NOVA PALAVRA SECRETA NO CONSOLE AO REINICIAR O JOGO
}

// EVENTO PARA O BOTÃO DE REINÍCIO
botaoReiniciar.addEventListener("click", reiniciarJogo);

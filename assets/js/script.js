//CRIAÇÃO DE LISTA E FUNÇÃO PARA GERAR PALAVRA ALEATORIA.

// UMA LISTA DE PALAVRAS
const palavras = ["MAÇA", "GOIABA", "BANANA", "UVA", "PÊRA", "SALSICHA", "OVO", "TEMPERO","FARINHA", "CALABRESA", "PINGA", "LIMÃO", "TOMATE", "CEBOLA", "PIMENTÃO"];

//AGORA UMA FUNÇÃO PARA ESCOLHER A PALAVRA ALEATÓRIA
function escolherPalavraAleatoria(){
    const indiceAleatorio = Math.floor(Math.random() * palavras.length); // VAI GERAR UM NÚMERO ENTRE 0 E O COMPRIMENTO DA LISTA DE PALAVRAS MENOS 1. O MATH.RANDOM GERA UM NUMERO ALEATORIO E O MATH.FLOOR ARREDONDA PARA BAIXO.
    return palavras[indiceAleatorio];
}

//PALAVRA SECRETA ESCOLHIDA ALEATORIAMENTE
const palavraSecreta = escolherPalavraAleatoria();


//ENTRADA DO JOGADOR

//PRIMEIRO VAMOS SELECIONAR OS ELEMENTOS DO HTML

const inputTentativa = document.getElementById("inputTentativa");
const botaoTentativa = document.getElementById("botaoTentativa");
const feedback = document.getElementById("feedback");
const tentativas = document.getElementById("tentativas");
const botaoReiniciar = document.getElementById("botaoReiniciar");

//CONTAGEM DE TENTATIVAS
let contagemTentativas = 0;
const limiteTentativas = 100;

//FUNÇÃO QUE DEVE PROCESSAR A TENTATIVA DO JOGADOR
function processarTentativa(){
    const tentativas = inputTentativa.value.toLowerCase();
    contagemTentativas++;
    verificarTentativa(tentativa);
}

//FUNÇÃO PARA PROCESSAR A TENTATIVA DO JOGADOR
function processarTentativa() {
    const tentativa = inputTentativa.value.toLowerCase(); //OBTEM A TENTATIVA
    contagemTentativas++; //CONTADO DE TENTATIVA
    verificarTentativa(tentativa); //CHAMA A FUNÇÃO QUE VERIFICA A TENTATIVA
}

// EVENTO PARA O BOTÃO DE TENTATIVA
botaoTentativa.addEventListener("click", processarTentativa);

//AGORA PRECISO SABER COMO COMPARAR SE A TENTAIVA ESTA CERTA E DAR UM FEEDBACK

//VERIFICAR SE ESTÁ CORRETA
function verificarTentativa(tentativa){
    if (tentativa === palavraSecreta){
        feedback.textContent = "Isso ai! Acertou!";
        botaoReiniciar.style.display = "block";
        return;
    }
    //COMPARAR AS LETRAS DAS TENTATIVAS COM A PALAVRA SECRETA
    let feedbackTexto = "";
    for (let i = 0; i < tentativa.length; i++){
        if (i < palavraSecreta.length){
            if (tentativa[i] === palavraSecreta[i]){
                feedbackTexto += tentativa[i];
            } else if (palavraSecreta.includes(tentativa[i])){
                feedbackTexto += "*";
            } else {
                feedbackTexto += ".";
            }
        } else {
            feedbackTexto += ".";
        }
    }

    //ATUALIZA O FEEDBACK E O NUMERO DE TENTATIVAS
    feedback.textContent = feedbackTexto;
    tentativas.textContent = `Tentativas restantes ${limiteTentativas-contagemTentativas}`;
    
    if (contagemTentativas >= limiteTentativas){
        feedback.textContent = `Você perdeu rapaz! A palavra secreta era ${palavraSecreta}`;
        botaoReiniciar.style.display = "block";
    }
}

//CONTROLE DE TENTATIVAS E REINICIO DO JOGO

function reiniciarJogo(){
    palavraSecreta = escolherPalavraAleatoria();
    contagemTentativas = 0;
    feedback.textContent = "";
    tentativas.textContent = `Tentativas restantes: ${limiteTentativas}`;
    botaoReiniciar.style.display = "none";
    inputTentativa.value = "";
}

botaoReiniciar.addEventListener("click", reiniciarJogo);

console.log (palavraSecreta);
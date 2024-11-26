// Mapeamento das sequências alfabéticas para os estados
const estados = {
    "saoPaulo": [
        "BFA", "GKI", "QSN", "QSZ"
    ],
    "espiritoSanto": [
        "RBA", "RBJ", "QRB", "QRM", "PPA", "PPZ", "OYD", "OYK", "OVH", "OVL",
        "OVE", "OVF", "OCV", "ODT", "MOX", "MTZ", "RQM", "RQV"
    ],
    "rioDeJaneiro": [
        "RIO", "RIP", "RKV", "KMF", "LVE"
    ]
};

// Caminho das imagens
const imagens = {
    placeholder: {
        brasao: "brasao-placeholder.png",
        bandeira: "bandeira-placeholder.png"
    },
    saoPaulo: {
        brasao: "sao-paulo-brasao.png",
        bandeira: "sao-paulo-bandeira.png"
    },
    espiritoSanto: {
        brasao: "espirito-santo-brasao.png",
        bandeira: "espirito-santo-bandeira.png"
    },
    rioDeJaneiro: {
        brasao: "rio-de-janeiro-brasao.png",
        bandeira: "rio-de-janeiro-bandeira.png"
    }
};

// Referências aos elementos do HTML
const placaInput = document.getElementById("placa-input");
const verificarButton = document.getElementById("verificar-btn");
const resultadoDiv = document.getElementById("resultado");
const brasaoImg = document.getElementById("brasao-img");
const bandeiraImg = document.getElementById("bandeira-img");

// Função para verificar o estado com base na placa
function verificarPlaca() {
    const placa = placaInput.value.trim().toUpperCase();
    if (placa.length !== 7) {
        resultadoDiv.textContent = "Por favor, insira uma placa completa com 7 caracteres.";
        atualizarImagens("placeholder");
        return;
    }

    const letrasPlaca = placa.slice(0, 3); // Pega as três primeiras letras
    let estadoEncontrado = "placeholder";

    // Procura o estado correspondente
    for (const estado in estados) {
        if (estados[estado].some(seq => letrasPlaca >= seq.slice(0, 3) && letrasPlaca <= seq.slice(seq.length - 3))) {
            estadoEncontrado = estado;
            break;
        }
    }

    atualizarImagens(estadoEncontrado);

    if (estadoEncontrado === "placeholder") {
        resultadoDiv.textContent = "A placa não pertence aos estados de São Paulo, Espírito Santo ou Rio de Janeiro.";
    } else {
        resultadoDiv.textContent = `A placa pertence ao estado de ${formatarEstado(estadoEncontrado)}.`;
    }
}

// Função para atualizar as imagens de bandeira e brasão
function atualizarImagens(estado) {
    brasaoImg.src = imagens[estado].brasao;
    bandeiraImg.src = imagens[estado].bandeira;
}

// Formata o nome do estado para exibição
function formatarEstado(estado) {
    return estado
        .replace("saoPaulo", "São Paulo")
        .replace("espiritoSanto", "Espírito Santo")
        .replace("rioDeJaneiro", "Rio de Janeiro");
}

// Adiciona o evento de clique ao botão
verificarButton.addEventListener("click", verificarPlaca);

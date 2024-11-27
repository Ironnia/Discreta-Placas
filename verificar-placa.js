// Mapeamento das sequências alfabéticas para os estados
const estados = {
    "saoPaulo": [
        { inicio: "BFA", fim: "GKI" },
        { inicio: "QSN", fim: "QSZ" }
    ],
    "espiritoSanto": [
        { inicio: "RBA", fim: "RBJ" },
        { inicio: "QRB", fim: "QRM" },
        { inicio: "PPA", fim: "PPZ" },
        { inicio: "OYD", fim: "OYK" },
        { inicio: "OVH", fim: "OVL" },
        { inicio: "OVE", fim: "OVF" },
        { inicio: "OCV", fim: "ODT" },
        { inicio: "MOX", fim: "MTZ" },
        { inicio: "RQM", fim: "RQV" }
    ],
    "rioDeJaneiro": [
        { inicio: "RIO", fim: "RIO" },
        { inicio: "RIP", fim: "RKV" },
        { inicio: "KMF", fim: "LVE" }
    ]
};

// Caminho das imagens
const imagens = {
    placeholder: {
        brasao: "Imagens/brasao-placeholder.png",
        bandeira: "Imagens/bandeira-placeholder.png"
    },
    saoPaulo: {
        brasao: "Imagens/sao-paulo-brasao.png",
        bandeira: "Imagens/sao-paulo-bandeira.png"
    },
    espiritoSanto: {
        brasao: "Imagens/espirito-santo-brasao.png",
        bandeira: "Imagens/espirito-santo-bandeira.png"
    },
    rioDeJaneiro: {
        brasao: "Imagens/rio-de-janeiro-brasao.png",
        bandeira: "Imagens/rio-de-janeiro-bandeira.png"
    },
    naoTem: {
        brasao: "Imagens/nao-tem.jpg",
        bandeira: "Imagens/nao-tem.jpg"
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

    // Validação do formato da placa
    const regex = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;
    if (!regex.test(placa)) {
        resultadoDiv.textContent = "Formato de placa inválido. Use: AAA0A00.";
        atualizarImagens("naoTem");
        return;
    }

    const letrasPlaca = placa.slice(0, 3); // Pega as três primeiras letras
    let estadoEncontrado = "naoTem";

    // Procura o estado correspondente
    for (const [estado, intervalos] of Object.entries(estados)) {
        if (intervalos.some(intervalo =>
            letrasPlaca.localeCompare(intervalo.inicio) >= 0 &&
            letrasPlaca.localeCompare(intervalo.fim) <= 0
        )) {
            estadoEncontrado = estado;
            break;
        }
    }

    atualizarImagens(estadoEncontrado);

    if (estadoEncontrado === "naoTem") {
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

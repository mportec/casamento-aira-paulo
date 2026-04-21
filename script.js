let confirmados = JSON.parse(localStorage.getItem("confirmados")) || [];
// Lista convidados (remove duplicados automaticamente)
const convidados = [...new Set([
    "Áira",
    "Anselmo",
    "Miralda",
    "Adriele",
    "Yvan",
    "Yane",
    "Yana Helena",
    "Mileide",
    "Miralva",
    "Lucileide",
    "Geovan",
    "Ricardo",
    "Geovanna",
    "Vandressa",
    "Ian",
    "Thayse",
    "Nicolle",
    "Bismarc",
    "Nicolas",
    "Nilmaria",
    "Henrique",
    "Eva Moreira",
    "Liz Moreira",
    "Lorena",
    "Lorrany",
    "Aline",
    "Iara",
    "Maicon",
    "Ingrid",
    "Angela",
    "Wallas",
    "Gustavo",
    "Crislane",
    "Anita",
    "Roberto",
    "Rebeca",
    "Carlos Henrique",
    "Luan",
    "Arielle",
    "Iago",
    "Crisiele",
    "Marcos",
    "Alice",
    "José Lita",
    "Marcia",
    "Celso",
    "Breno",
    "Cassiano",
    "Brenda",
    "Elisa",
    "Paula",
    "Carlos Alberto",
    "Anderson",
    "Emilia",
    "Diego",
    "Gabriel",
    "Raiane",
    "Joyce",
    "Arthur",
    "Maria Helena",
    "Eloa",
    "Hilda",
    "Juliane",
    "Marinez",
    "Theo Santos",
    "Davy",
    "Evelly",
    "Diana",
    "Victor",
    "Joans",
    "Lucia",
    "Indiana",
    "Isaac",
    "Miguel",
    "Melina",
    "Luis Alberto",
    "Kennedy",
    "Ruan",
    "Hadassya",
    "André de Jesus",
    "Alan",
    "Mirian",
    "Thaís",
    "Eva Burgarelli",
    "Theo Burgarelli",
    "Joaquim",
])];

const nomeInput = document.getElementById("nome");
const suggestionsBox = document.getElementById("suggestions");
const msg = document.getElementById("msg");

const btnConfirmar = document.getElementById("btnConfirmar");

let indiceSelecionado = -1;

// ================= AUTOCOMPLETE =================
nomeInput.addEventListener("input", () => {
    const texto = nomeInput.value.toLowerCase();
    suggestionsBox.innerHTML = "";
    indiceSelecionado = -1;

    if (!texto) {
        suggestionsBox.style.display = "none";
        return;
    }

    const filtrados = convidados.filter(n =>
        n.toLowerCase().includes(texto)
    );

    filtrados.forEach((nome) => {
        const div = document.createElement("div");
        div.textContent = nome;

        div.addEventListener("click", () => {
            nomeInput.value = nome;
            suggestionsBox.style.display = "none";
        });

        suggestionsBox.appendChild(div);
    });

    suggestionsBox.style.display = filtrados.length ? "block" : "none";

    nomeInput.addEventListener("input", () => {
    const texto = nomeInput.value.toLowerCase();
    suggestionsBox.innerHTML = "";
    indiceSelecionado = -1;

    if (!texto) {
        suggestionsBox.style.display = "none";
        return;
    }

    const filtrados = convidados.filter(n =>
        n.toLowerCase().includes(texto)
    );

    filtrados.forEach((nome) => {
        const div = document.createElement("div");
        div.textContent = nome;

        div.addEventListener("click", () => {
            nomeInput.value = nome;
            suggestionsBox.style.display = "none";
        });

        suggestionsBox.appendChild(div);
    });

    suggestionsBox.style.display = filtrados.length ? "block" : "none";

    // 👇 AQUI É O PASSO 3
    const nomeDigitado = nomeInput.value.trim().toLowerCase();

    if (confirmados.includes(nomeDigitado)) {
        btnConfirmar.disabled = true;
        btnConfirmar.style.opacity = "0.5";
        msg.style.color = "orange";
        msg.textContent = "⚠️ Você já confirmou presença!";
    } else {
        btnConfirmar.disabled = false;
        btnConfirmar.style.opacity = "1";
    }

});

});

// ================= NAVEGAÇÃO COM SETAS =================
nomeInput.addEventListener("keydown", (e) => {
    const itens = suggestionsBox.querySelectorAll("div");

    if (!itens.length) return;

    if (e.key === "ArrowDown") {
        indiceSelecionado++;
        if (indiceSelecionado >= itens.length) indiceSelecionado = 0;
    }

    if (e.key === "ArrowUp") {
        indiceSelecionado--;
        if (indiceSelecionado < 0) indiceSelecionado = itens.length - 1;
    }

    if (e.key === "Enter") {
        if (indiceSelecionado > -1) {
            nomeInput.value = itens[indiceSelecionado].textContent;
            suggestionsBox.style.display = "none";
        }
    }

    itens.forEach(item => item.classList.remove("ativo"));

    if (indiceSelecionado > -1) {
        itens[indiceSelecionado].classList.add("ativo");
    }
});

// ================= CONFIRMAR PRESENÇA =================
function confirmarPresenca() {

    const nomeDigitado = nomeInput.value.trim().toLowerCase();

    if (!nomeDigitado) {
        msg.style.color = "red";
        msg.textContent = "Digite seu nome!";
        return;
    }

    // 🔎 Verifica se está na lista
    const encontrado = convidados.find(n => n.toLowerCase() === nomeDigitado);

    if (!encontrado) {
        msg.style.color = "red";
        msg.textContent = "❌ Nome não está na lista de convidados.";
        return;
    }

    // 🔁 Verifica duplicado (já confirmou)
    if (confirmados.includes(nomeDigitado)) {
        msg.style.color = "orange";
        msg.textContent = "⚠️ Você já confirmou presença!";
        return;
    }

    // 💾 Salva localmente
    confirmados.push(encontrado.toLowerCase());

    //Aqui é pra salvar no navegado
    localStorage.setItem("confirmados", JSON.stringify(confirmados));

    // 🚀 Envia para o Google Forms
    const url = "https://docs.google.com/forms/d/e/1FAIpQLScVMSVonImKpisnlpBuXpynkh-MDCBoOHYIATJn58SZ28t8AA/formResponse?entry.975099360=" 
    + encodeURIComponent(encontrado);

    fetch(url, {
        method: "POST",
        mode: "no-cors"
    });

    msg.style.color = "green";
    msg.textContent = `✔ Presença confirmada! Obrigado, ${encontrado} 💛`;

    nomeInput.value = "";
}

// ================= ANIMAÇÃO AO ROLAR =================
document.addEventListener("DOMContentLoaded", function () {

    const elementos = document.querySelectorAll('.animar, .presente');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                if (entry.target.classList.contains("presente")) {

                    const presentes = document.querySelectorAll(".presente");
                    presentes.forEach((el, index) => {
                        setTimeout(() => {
                            el.classList.add("mostrar");
                        }, index * 200);
                    });

                } else {
                    entry.target.classList.add("mostrar");
                }

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    elementos.forEach(el => observer.observe(el));

});

function abrirPix() {
    document.getElementById("pixModal").style.display = "flex";
}

function fecharPix() {
    document.getElementById("pixModal").style.display = "none";
}

function copiarPix() {
    let copyText = document.getElementById("pixKey");
    copyText.select();
    document.execCommand("copy");
    alert("Chave PIX copiada!");
}

// Lista convidados (remove duplicados automaticamente)
const convidados = [...new Set([
    "Anselmo",
    "Miralda",
    "Adriele",
    "Yvan",
    "Yane",
    "Helena",
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
    "Nilmaria",
    "Henrique",
    "Eva",
    "Liz",
    "Lorena",
    "Lorrany",
    "Aline",
    "Iara",
    "Maicon",
    "Ingrid",
    "Angela",
    "Wallas",
    "Gustavo",
    "Cris",
    "Anita",
    "Roberto",
    "Rebeca",
    "Carlos",
    "Luan",
    "Arielle",
    "Iago",
    "Crisiele",
    "Marcos",
    "Alice",
    "Cleide",
    "Anna Laura",
    "Lita",
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
    "Helena",
    "Eloa",
    "Hilda",
    "Juliane",
    "Marines",
    "Theo",
    "Davy",
    "Evelly",
    "Diana",
    "Victor",
    "Ana",
    "Lucia",
    "Indiana",
    "Isaac",
    "Miguel",
    "Melina",
    "Luis Alberto",
    "Kennedy",
    "Agnaldo",
    "Alana",
    "Lorenzo",
    "Ruan",
    "Hadassya",
    "André"
])];

const nomeInput = document.getElementById("nome");
const suggestionsBox = document.getElementById("suggestions");
const msg = document.getElementById("msg");

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

    const encontrado = convidados.find(n =>
        n.toLowerCase() === nomeDigitado
    );

    if (!encontrado) {
        msg.style.color = "red";
        msg.textContent = "❌ Nome não encontrado na lista.";
        return;
    }

    msg.style.color = "green";
    msg.textContent = `✔ Presença confirmada! Obrigada, ${encontrado} 💛`;

    suggestionsBox.style.display = "none";
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
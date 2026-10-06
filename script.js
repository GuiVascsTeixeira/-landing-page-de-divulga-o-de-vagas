const formulario = document.getElementById("form-vaga");
const corpoTabela = document.getElementById("tabela-vagas");
const mensagemVazio = document.getElementById("vazio");
const contador = document.getElementById("contador");

// Lista de vagas guardada no navegador (continua depois de recarregar a página)
let vagas = JSON.parse(localStorage.getItem("vagas")) || [];

function salvar() {
  localStorage.setItem("vagas", JSON.stringify(vagas));
}

function formatarBolsa(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function criarCelula(texto) {
  const td = document.createElement("td");
  td.textContent = texto;
  return td;
}

function mostrarVagas() {
  corpoTabela.innerHTML = "";

  vagas.forEach(function (vaga, posicao) {
    const linha = document.createElement("tr");

    linha.appendChild(criarCelula(vaga.empresa));
    linha.appendChild(criarCelula(vaga.cargo));

    const celulaModalidade = document.createElement("td");
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = vaga.modalidade;
    celulaModalidade.appendChild(tag);
    linha.appendChild(celulaModalidade);

    linha.appendChild(criarCelula(vaga.local));
    linha.appendChild(criarCelula(formatarBolsa(vaga.bolsa)));
    linha.appendChild(criarCelula(vaga.contato));

    const celulaAcao = document.createElement("td");
    const botaoRemover = document.createElement("button");
    botaoRemover.type = "button";
    botaoRemover.className = "remover";
    botaoRemover.textContent = "Remover";
    botaoRemover.addEventListener("click", function () {
      vagas.splice(posicao, 1);
      salvar();
      mostrarVagas();
    });
    celulaAcao.appendChild(botaoRemover);
    linha.appendChild(celulaAcao);

    corpoTabela.appendChild(linha);
  });

  mensagemVazio.style.display = vagas.length === 0 ? "block" : "none";
  contador.textContent = vagas.length === 1
    ? "1 vaga disponível"
    : vagas.length + " vagas disponíveis";
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const novaVaga = {
    empresa: document.getElementById("empresa").value.trim(),
    cargo: document.getElementById("cargo").value.trim(),
    modalidade: document.getElementById("modalidade").value,
    local: document.getElementById("local").value.trim(),
    bolsa: document.getElementById("bolsa").value,
    contato: document.getElementById("contato").value.trim()
  };

  vagas.push(novaVaga);
  salvar();
  mostrarVagas();
  formulario.reset();

  document.getElementById("vagas").scrollIntoView({ behavior: "smooth" });
});

mostrarVagas();
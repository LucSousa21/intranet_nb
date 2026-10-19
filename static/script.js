
const API_URL = "https://nb.onrender.com";

const nomesTipos = {
  1: "Administrativo",
  2: "Laboratórios e Diagnósticos",
  4: "Hospitais e Maternidades"
};

function normalizar(texto) {
  return String(texto ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

async function carregarEnderecos(cidade) {
  document.getElementById("menu").style.display = "none";
  document.getElementById("tela-enderecos").style.display = "block";

  document.getElementById("titulo-cidade").textContent =
    "Filiais de " + cidade;

  const lista = document.getElementById("lista-enderecos");
  const mensagem = document.getElementById("mensagem");

  lista.innerHTML = "";
  mensagem.textContent = "Carregando endereços...";

  try {
    const resposta = await fetch(API_URL);

    if (!resposta.ok) {
      throw new Error("Erro ao consultar a API.");
    }

    const dados = await resposta.json();

    const unidades = Array.isArray(dados)
      ? dados
      : dados.unidades;

    if (!Array.isArray(unidades)) {
      throw new Error("A API não retornou uma lista de unidades.");
    }

    // Filtra as unidades pela cidade.
    // A API precisa fornecer cidade ou municipio.
    const resultados = unidades.filter(unidade => {
      const nomeCidade = unidade.cidade || unidade.municipio;

      return nomeCidade &&
        normalizar(nomeCidade) === normalizar(cidade);
    });

    lista.innerHTML = "";
    mensagem.textContent = "";

    if (resultados.length === 0) {
      mensagem.textContent =
        "Nenhuma unidade encontrada para esta cidade. " +
        "Verifique se a API informa a cidade de cada unidade.";
      return;
    }

    // Agrupa as unidades pelo tipo.
    const grupos = {};

    resultados.forEach(unidade => {
      const tipo = unidade.tipo_unidade_id ?? "outros";

      if (!grupos[tipo]) {
        grupos[tipo] = [];
      }

      grupos[tipo].push(unidade);
    });

    // Ordena os grupos pelo tipo.
    Object.keys(grupos)
      .sort((a, b) => {
        if (a === "outros") return 1;
        if (b === "outros") return -1;
        return Number(a) - Number(b);
      })
      .forEach(tipo => {
        // Ordena os endereços dentro de cada grupo.
        grupos[tipo].sort((a, b) =>
          Number(a.endereco_id ?? Infinity) -
          Number(b.endereco_id ?? Infinity)
        );

        // Título do grupo sem exibir o código numérico.
        const tituloGrupo = document.createElement("h2");
        tituloGrupo.textContent =
          nomesTipos[tipo] || "Outras unidades";

        lista.appendChild(tituloGrupo);

        grupos[tipo].forEach(unidade => {
          const card = document.createElement("article");
          card.className = "endereco-card";

          const titulo = document.createElement("h3");
          titulo.textContent =
            unidade.unidade_nome || "Unidade Hapvida";

          const endereco = document.createElement("p");
          endereco.textContent =
            "Endereço: " +
            (unidade.logradouro || "Não informado");

          const numero = document.createElement("p");
          numero.textContent =
            "Número: " +
            (unidade.numero || "Não informado");

          const bairro = document.createElement("p");
          bairro.textContent =
            "Bairro: " +
            (unidade.bairro || "Não informado");

          const referencia = document.createElement("p");
          referencia.textContent =
            "Referência: " +
            (unidade.ponto_referencia || "Não informada");

          // Não adiciona IDs numéricos ao cartão.
          card.append(
            titulo,
            endereco,
            numero,
            bairro,
            referencia
          );

          lista.appendChild(card);
        });
      });

  } catch (erro) {
    mensagem.textContent =
      "Não foi possível carregar os endereços. " +
      "Verifique a conexão com a API.";

    console.error(erro);
  }
}

function voltarMenu() {
  document.getElementById("tela-enderecos").style.display = "none";
  document.getElementById("menu").style.display = "block";
}

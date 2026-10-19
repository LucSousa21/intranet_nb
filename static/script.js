
const API_BASE = "https://intranet-nb.onrender.com";

const nomesTipos = {
  1: "Administrativo",
  2: "Laboratórios e Diagnósticos",
  4: "Hospitais e Maternidades"
};

async function carregarEnderecos(cidade, endpoint) {
  const menu = document.getElementById("menu");
  const telaEnderecos = document.getElementById("tela-enderecos");
  const tituloCidade = document.getElementById("titulo-cidade");
  const lista = document.getElementById("lista-enderecos");
  const mensagem = document.getElementById("mensagem");

  // Exibe a tela de endereços.
  menu.style.display = "none";
  telaEnderecos.style.display = "block";
  tituloCidade.textContent = "Filiais de " + cidade;

  lista.innerHTML = "";
  mensagem.textContent = "Carregando endereços...";

  try {
    if (!endpoint) {
      throw new Error("Endpoint não informado para " + cidade);
    }

    const url = `${API_BASE}${endpoint}`;
    console.log("Consultando API:", url);

    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error(`Erro HTTP ${resposta.status}`);
    }

    const dados = await resposta.json();
    console.log("Dados recebidos da API:", dados);

    // Aceita uma lista direta ou um objeto com a propriedade unidades.
    const unidades = Array.isArray(dados)
      ? dados
      : dados.unidades;

    if (!Array.isArray(unidades)) {
      throw new Error("A API não retornou uma lista de unidades.");
    }

    const resultados = unidades;

    lista.innerHTML = "";
    mensagem.textContent = "";

    if (resultados.length === 0) {
      mensagem.textContent =
        "Nenhuma unidade encontrada para esta cidade.";
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

    // Ordena os grupos numericamente, deixando "outros" no final.
    Object.keys(grupos)
      .sort((a, b) => {
        if (a === "outros") return 1;
        if (b === "outros") return -1;

        return Number(a) - Number(b);
      })
      .forEach(tipo => {
        // Ordena os endereços dentro de cada grupo.
        grupos[tipo].sort((a, b) => {
          const idA = Number(a.endereco_id ?? Infinity);
          const idB = Number(b.endereco_id ?? Infinity);

          return idA - idB;
        });

        // Cria o título do grupo.
        const tituloGrupo = document.createElement("h2");
        tituloGrupo.textContent =
          nomesTipos[tipo] || "Outras unidades";

        lista.appendChild(tituloGrupo);

        // Cria um cartão para cada unidade.
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
            (unidade.numero ?? "Não informado");

          const bairro = document.createElement("p");
          bairro.textContent =
            "Bairro: " +
            (unidade.bairro || "Não informado");

          const referencia = document.createElement("p");
          referencia.textContent =
            "Referência: " +
            (unidade.ponto_referencia || "Não informada");

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

    console.log(
      `Exibidas ${resultados.length} unidades de ${cidade}.`
    );

  } catch (erro) {
    console.error("Erro ao carregar os endereços:", erro);

    lista.innerHTML = "";
    mensagem.textContent =
      "Não foi possível carregar os endereços. " +
      "Verifique a conexão com a API.";
  }
}

function voltarMenu() {
  document.getElementById("tela-enderecos").style.display = "none";
  document.getElementById("menu").style.display = "block";
}

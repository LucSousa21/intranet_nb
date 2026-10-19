  
  const API_URLS = {
    "Fortaleza": "https://nb.onrender.com/api-fortaleza",
    "Salvador": "https://nb.onrender.com/api-salvador",
    "Camaçari": "https://nb.onrender.com/api-camacari",
    "Lauro de Freitas": "https://nb.onrender.com/api-lauro-de-freitas",
    "Recife": "https://nb.onrender.com/api-recife",
    "Manaus": "https://nb.onrender.com/api-manaus",
    "Belém": "https://nb.onrender.com/api-belem",
    "Goiânia": "https://nb.onrender.com/api-goiania"
  };
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
      const url = API_URLS[cidade];

    if (!url) {
    throw new Error("Não existe uma API cadastrada para " + cidade);
    }

    
    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error(
        `Erro HTTP ${resposta.status} ao consultar ${cidade}`
      );
    }

    const dados = await resposta.json();

      const unidades = Array.isArray(dados)
        ? dados
        : dados.unidades;

      if (!Array.isArray(unidades)) {
        throw new Error("A API não retornou uma lista de unidades.");
      }

    // A API já retorna somente as unidades da cidade selecionada.
      const resultados = unidades;

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
          "Tente novamente em instantes.";

        console.error("Erro ao carregar endereços:", erro);
      }
    }

    function voltarMenu() {
      document.getElementById("tela-enderecos").style.display = "none";
      document.getElementById("menu").style.display = "block";
    }


//CARINHO DE COMPRA.

let carrinho = [];
let creditos = 800; // feat: sistema de créditos para simulação de compra

export function initCarrinho() {
  const botoesAdicionar = document.querySelectorAll(".btn-add-carrinho");

  botoesAdicionar.forEach((botao) => {
    botao.addEventListener("click", () => {
      const card = botao.closest(".produto-card");

      const nome = card.querySelector(".card-title").textContent;
      const preco = Number(card.dataset.price);
      const imagem = card.querySelector("img").src;

      adicionarAoCarrinho({
        nome,
        preco,
        imagem,
      });
    });
  });

  //validacao de saldo para finalizar compraa
  const botaoFinalizar = document.getElementById("finalizar-pedido");

  botaoFinalizar.addEventListener("click", () => {
    if (carrinho.length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }

    const total = carrinho.reduce(
      (soma, produto) => soma + produto.preco * produto.quantidade,
      0
    );

    //limitador dos creditos na hora do pagamento
    if (total > creditos) {
      alert("Saldo insuficiente para finalizar o pedido.");
      return;
    }

   //feat: atualiza os créditos restantes conforme o total do carrinho
    const saldoRestante = creditos - total;

    alert(
      `Pedido finalizado! Pagamento do pedido concluído.\n\n` +
        `Você ainda possui R$${saldoRestante
          .toFixed(2)
          .replace(".", ",")} em créditos.`
    );

    carrinho.splice(0, carrinho.length); //c nao tiver nada no carrinho

    renderizarCarrinho();
  });

  renderizarCarrinho();
}

function adicionarAoCarrinho(produto) {
  const produtoExistente = carrinho.find(
    (item) => item.nome === produto.nome
  );

  let novoTotal = 0;

  carrinho.forEach((item) => {
    novoTotal += item.preco * item.quantidade;
  });

  novoTotal += produto.preco;

  if (novoTotal > creditos) {
    const saldoDisponivel = creditos - (novoTotal - produto.preco);

    alert(
      `Saldo insuficiente! Você possui R$${saldoDisponivel
        .toFixed(2)
        .replace(".", ",")} em créditos.`
    );

    return;
  }

  if (produtoExistente) {
    produtoExistente.quantidade++;
  } else {
    carrinho.push({
      ...produto,
      quantidade: 1,
    });
  }

  renderizarCarrinho();
}

function renderizarCarrinho() {
  const creditosCarrinho =
    document.getElementById("creditos-carrinho");
  const listaCarrinho = document.getElementById("lista-carrinho");
  const contadorCarrinho =
    document.getElementById("contador-carrinho");
  const totalCarrinho =
    document.getElementById("total-carrinho");

  //feature com logica de finalizacao de compra no carrinho
  listaCarrinho.innerHTML = "";

  let total = 0;
  let quantidadeTotal = 0;

  carrinho.forEach((produto) => {
    total += produto.preco * produto.quantidade;
    quantidadeTotal += produto.quantidade;
  });

  if (carrinho.length === 0) {
    listaCarrinho.innerHTML = `
      <p class="text-center text-white">
        Seu carrinho está vazio.
      </p>
    `;

    contadorCarrinho.textContent = "0";
    totalCarrinho.textContent = "R$0,00";
    creditosCarrinho.textContent = "R$800,00";

    return;
  }

  carrinho.forEach((produto, index) => {
    const item = document.createElement("div");

    item.classList.add("item-carrinho");

    item.innerHTML = `
      <div>
        <strong>${produto.nome}</strong>
        <div>
          ${produto.quantidade}x R$${produto.preco
            .toFixed(2)
            .replace(".", ",")}
        </div>
      </div>

      <button
        class="btn-remover-item"
        data-index="${index}"
      >
        <i class="bi bi-trash"></i>
      </button>
    `;

    listaCarrinho.appendChild(item);
  });

  contadorCarrinho.textContent = quantidadeTotal;

  totalCarrinho.textContent =
    `R$${total.toFixed(2).replace(".", ",")}`;

  const saldoRestante = creditos - total;

  creditosCarrinho.textContent =
    `R$${saldoRestante.toFixed(2).replace(".", ",")}`;

  const botoesRemover =
    document.querySelectorAll(".btn-remover-item");

  botoesRemover.forEach((botao) => {
    botao.addEventListener("click", () => {
      const index = Number(botao.dataset.index);

      carrinho.splice(index, 1);

      renderizarCarrinho();
    });
  });
}
let carrinho = [];

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

  renderizarCarrinho();
}

function adicionarAoCarrinho(produto) {
  const produtoExistente = carrinho.find((item) => item.nome === produto.nome);

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
  const listaCarrinho = document.getElementById("lista-carrinho");
  const contadorCarrinho = document.getElementById("contador-carrinho");
  const totalCarrinho = document.getElementById("total-carrinho");

  listaCarrinho.innerHTML = "";

  if (carrinho.length === 0) {
    listaCarrinho.innerHTML = `
      <p class="text-center text-white">
        Seu carrinho está vazio.
      </p>
    `;

    contadorCarrinho.textContent = "0";
    totalCarrinho.textContent = "R$0,00";

    return;
  }

  let total = 0;
  let quantidadeTotal = 0;

  carrinho.forEach((produto, index) => {
    total += produto.preco * produto.quantidade;
    quantidadeTotal += produto.quantidade;

    const item = document.createElement("div");

    item.classList.add("item-carrinho");

    item.innerHTML = `
      <div>
        <strong>${produto.nome}</strong>
        <div>
          ${produto.quantidade}x R$${produto.preco.toFixed(2).replace(".", ",")}
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

  totalCarrinho.textContent = `R$${total.toFixed(2).replace(".", ",")}`;

  const botoesRemover = document.querySelectorAll(".btn-remover-item");

  botoesRemover.forEach((botao) => {
    botao.addEventListener("click", () => {
      const index = Number(botao.dataset.index);

      carrinho.splice(index, 1);

      renderizarCarrinho();
    });
  });
}

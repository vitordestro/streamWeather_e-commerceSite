import { gridProdutos } from "./shared.js";
export function initOrdenacao() {
  const radiosOrdenacao = document.querySelectorAll(
    'input[name="ordenar-preco"]',
  );

  radiosOrdenacao.forEach((radio) => {
    radio.addEventListener("change", () => {
      ordenarProdutos(radio.value);
    });
  });
}

function ordenarProdutos(direcao) {
  const cards = Array.from(gridProdutos.querySelectorAll(".produto-card"));

  cards.sort((cardA, cardB) => {
    const precoA = Number(cardA.dataset.price);
    const precoB = Number(cardB.dataset.price);

    if (direcao === "asc") {
      return precoA - precoB; // menor do maior primeiro
    } else {
      return precoB - precoA; // maior do menor primeiro
    }
  });

  cards.forEach((card) => {
    gridProdutos.appendChild(card);
  });
}

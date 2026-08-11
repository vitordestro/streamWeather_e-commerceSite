import { gridProdutos } from "./shared.js";

export function initFiltros() {
  const checkboxesFiltro = document.querySelectorAll(".filtro-preco");
  const inputBusca = document.getElementById("busca-produto");
  const formBusca = document.getElementById("form-busca");
  const categorias = document.querySelectorAll(".categoria-item");

  let categoriaAtiva = "";

  checkboxesFiltro.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      aplicarFiltros(checkboxesFiltro, inputBusca, categoriaAtiva);
    });
  });

  inputBusca.addEventListener("input", () => {
    aplicarFiltros(checkboxesFiltro, inputBusca, categoriaAtiva);
  });

  formBusca.addEventListener("submit", (evento) => {
    evento.preventDefault();
  });

  categorias.forEach((categoria) => {
    categoria.addEventListener("click", () => {
      const novaCategoria = categoria.dataset.category;

      categoriaAtiva = categoriaAtiva === novaCategoria ? "" : novaCategoria;

      categorias.forEach((item) => {
        item.classList.toggle(
          "categoria-ativa",
          item.dataset.category === categoriaAtiva,
        );
      });

      aplicarFiltros(checkboxesFiltro, inputBusca, categoriaAtiva);
    });
  });
}

function aplicarFiltros(checkboxesFiltro, inputBusca, categoriaAtiva) {
  const faixasMarcadas = Array.from(checkboxesFiltro)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => ({
      min: Number(checkbox.dataset.min),
      max: Number(checkbox.dataset.max),
    }));

  const textoBusca = inputBusca.value.trim().toLowerCase();

  const cards = gridProdutos.querySelectorAll(".produto-card");

  cards.forEach((card) => {
    const preco = Number(card.dataset.price);
    const categoriaProduto = card.dataset.category;
    const passaNoPreco =
      faixasMarcadas.length === 0 ||
      faixasMarcadas.some((faixa) => preco >= faixa.min && preco <= faixa.max);

    const passaNaCategoria =
      categoriaAtiva === "" || categoriaProduto === categoriaAtiva;

    const nomeProduto = card
      .querySelector(".card-title")
      .textContent.toLowerCase();

    const passaNaBusca = textoBusca === "" || nomeProduto.includes(textoBusca);

    card.classList.toggle(
      "d-none",
      !(passaNoPreco && passaNaCategoria && passaNaBusca),
    );
  });
}

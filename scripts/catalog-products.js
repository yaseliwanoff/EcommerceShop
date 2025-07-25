const productsContainer = document.getElementById("products-container");
const categoryContainer = document.getElementById("category-list");
const tag = document.querySelector(".tag");

/* 
  Применение стилей к выбранной категории
*/
categoryContainer.addEventListener("click", function(event) {
  if (event.target.classList.contains("category__list--item")) {
    const categories = categoryContainer.querySelectorAll(".category__list--item");
    categories.forEach(category => category.classList.remove("active"));
    
    event.target.classList.add("active");
  }
});

/* 
  Получение данных о продуктах из JSON
*/
let productsData = [];

const loadJsonProducts = async () => {
  try {
    const repsone = await fetch("../database/products.json");
    if (!repsone.ok) {
      throw new Error(`Ошибка fetch: ${error}`);
    }
    productsData = await repsone.json();
    return productsData;
  } catch(error) {
    console.error(`Ошибка получения json: ${error}`)
    return null;
  }
}

function renderVariantTag(tagType) {
  switch(tagType) {
    case "Available":
      return "tag tag-available";
    case "Not available":
      return "tag not-tag";
    case "Coming soon":
      return "tag tag-soon";
    default:
      console.error("У продукта нету такого тега");
      return tag;
  }
}

function isBtnDisabled(tagOption) {
  if (tagOption === "Not available") {
    return "btn btn-primary btn-disabled";
  } else {
    return "btn btn-primary";
  }
}

function isDisabledCart(tagOption) {
  if (tagOption === "Not available") {
    return "disabled";
  } else {
    return "default";
  }
}

/* 
  Подставление данных из JSON в HTML и 
  замена статической разметки на динамическую
*/
async function pasteJsonToHtml() {
  const jsonData = await loadJsonProducts();

  if (!jsonData) {
    console.log("Не удалось загрузить данные");
    return;
  }

  const productHTML = jsonData.map((product) => `
        <a href="/product-detail-page.html" data-product-id="${product.id}" class="product__card--link ${isDisabledCart(product.availability)}">
          <div class="product__card">
            <div class="product__card--top">
              <img src="${product.image1x}"
                  srcset="${product.image2x} 2x" 
                  class="product__image" 
                  alt="${product.name}">
            </div>
            <div class="product__card--bottom">
              <span class="${renderVariantTag(product.availability)}">${product.availability}</span>
              <h3 class="product__card--name">${product.name}</h3>
              <span class="product__card--price">$${product.price}</span>
              <button class="${isBtnDisabled(product.availability)}">Add to Cart</button>
            </div>
          </div>
        </a>
    `
  ).join("");

  productsContainer.innerHTML = productHTML;
}

pasteJsonToHtml();

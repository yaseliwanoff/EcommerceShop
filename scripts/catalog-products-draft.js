const loadJsonProducts = () => {
  fetch("../database/products.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка fetch: ${response.status}`);
      }
      
      console.log(response.status);
      response.json();
    })
    .then((data) => {
      const names = data.map(product => product.name);
      console.log(names);
      console.log(data);
    })
    .catch((error) => console.error(`Ошибка получения json: ${error}`));
}

function pasteJsonToHTML(jsonData) {
  /* 
    Функция в которой данные подставляются из JSON'a
    и заменяются в HTML макете, заменяя стандартные данные
  */
 const productItems = {
  productName: jsonData.map()
 }
 const productHTML = `
    <a href="/product-detail-page.html" class="product__card--link">
      <div class="product__card">
        <div class="product__card--top">
          <img src="./assets/images/png/product__images/shirt-white__1x.png" 
              srcset="./assets/images/png/product__images/shirt-white__2x.png 2x" 
              class="product__image" 
              alt="product image">
        </div>
        <div class="product__card--bottom">
          <span class="tag">Available</span>
          <h3 class="product__card--name">Essential Neutrals</h3>
          <span class="product__card--price">$19.99</span>
          <button class="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </a>
 `
}

pasteJsonToHTML(loadJsonProducts())

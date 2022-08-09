import React from 'react';

const products = [
  { id: 1, name: 'Skol Lata 250ml', price: 2.20, urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg' },
  { id: 2, name: 'Heineken 600ml', price: 7.50, urlImage: 'http://localhost:3001/images/heineken_600ml.jpg' },
  { id: 3, name: 'Antarctica Pilsen 300ml', price: 2.49, urlImage: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg' },
  { id: 4, name: 'Brahma 600ml', price: 7.50, urlImage: 'http://localhost:3001/images/brahma_600ml.jpg' },
  { id: 5, name: 'Skol 269ml', price: 2.19, urlImage: 'http://localhost:3001/images/skol_269ml.jpg' },
  { id: 6, name: 'Skol Beats Senses 313ml', price: 4.49, urlImage: 'http://localhost:3001/images/skol_beats_senses_313ml.jpg' },
];

function Products() {
  return (
    <section>
      {products.map((product, index) => (
        <div
          key={ product.id }
        >
          <h4
            data-testid={ `customer_products__element-card-title-${index}` }
          >
            { product.name }
          </h4>
          <h4
            data-testid={ `customer_products__element-card-price-${index}` }
          >
            { product.price }
          </h4>
          <img
            data-testid={ `customer_products__element-card-bg-image-${index}` }
            alt="foto ilutrativa do produto"
            src={ product.urlImage }
          />

          <button
            type="button"
            data-testid={ `customer_products__element-card-add-item-${index}` }
          >
            +
          </button>

          <button
            type="button"
            data-testid={ `customer_products__element-card-rm-item-${index}` }
          >
            -
          </button>

        </div>
      ))}
    </section>
  );
}

export default Products;

import React from 'react';
import PropTypes from 'prop-types';

const ProductBlock = ({
  products,
  removeItem
}) => {
  const { cartDetail } = products;

  const renderImage = images => {
    if (images.length > 0) {
      return images[0].url;
    }
    return '/images/image_not_available.png';
  };

  const renderItems = () => (
    cartDetail ?
      cartDetail.map(({
        _id,
        images,
        brand,
        name,
        quantity,
        price
      }) => (
        <div
          key={_id}
          className="user_product_block"
        >
          <div className="item">
            <div
              className="image"
              style={{
                background: `url(${renderImage(images)}) no-repeat`
              }}
            />
          </div>
          <div className="item">
            <h4>Product name</h4>
            <p>{brand.name} - {name}</p>
          </div>
          <div className="item">
            <h4>Quantity</h4>
            <p>{quantity}</p>
          </div>
          <div className="item">
            <h4>Price</h4>
            <p>${price}</p>
          </div>
          <div className="item btn">
            <button
              type="button"
              onClick={() => removeItem(_id)}
              className="cart_remove_btn"
            >
                Remove
            </button>
          </div>
        </div>
      )) : ''
  );

  return (
    <div>
      {renderItems()}
    </div>
  );
};

ProductBlock.propTypes = {
  products: PropTypes.object,
  removeItem: PropTypes.func,
};

export default ProductBlock;

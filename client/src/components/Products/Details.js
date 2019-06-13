/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import MyButton from '../utils/button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import faTruck from '@fortawesome/fontawesome-free-solid/faTruck';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

library.add(faTruck, faCheck, faTimes);

const Details = ({
  detail,
  addToCart
}) => {
  const { _id, brand, name, description } = detail;

  const showProdTags = ({
    shipping,
    available
  }) => (
    <div className="product_tags">
      {
        shipping ?
          <div className="tag">
            <FontAwesomeIcon icon="truck" />
            <div className="tag_text">
              <span>Free shipping</span>
              <br />
              <span>And return</span>
            </div>
          </div> : ''
      }

      {
        available ?
          <div className="tag">
            <FontAwesomeIcon icon="check" />
            <div className="tag_text">
              <span>Available</span>
              <br />
              <span>in store</span>
            </div>
          </div> :
          <div className="tag">
            <FontAwesomeIcon icon="times" />
            <div className="tag_text">
              <span>Not Available</span>
              <br />
              <span>preorder only</span>
            </div>
          </div>
      }
    </div>
  );

  const showProdActions = ({
    price
  }) => (
    <div className="product_actions">
      <div className="price">${price}</div>
      <div className="cart">
        <MyButton
          type="add_to_cart"
          runAction={() => addToCart(_id)}
        />
      </div>
    </div>
  );

  const showProdSpec = ({
    wood,
    frets
  }) => (
    <div className="product_specifications">
      <h2>Specs:</h2>
      <div className="item">
        <strong>Frets:</strong> {frets}
      </div>
      <div className="item">
        <strong>wood:</strong> {wood.name}
      </div>
    </div>
  );

  return (
    <div className="right">
      <h1> {brand.name} - {name} </h1>
      <p>{description}</p>
      {showProdTags(detail)}
      {showProdActions(detail)}
      {showProdSpec(detail)}
    </div>
  );
};

Details.propTypes = {
  detail: PropTypes.shape({
    price: PropTypes.number,
  }),
  available: PropTypes.bool,
};

export default Details;

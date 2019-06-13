import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import faShoppingBag from '@fortawesome/fontawesome-free-solid/faShoppingBag';

library.add(faShoppingBag);

const MyButton = ({
  type,
  altClass,
  linkTo,
  title,
  addStyles,
  runAction
}) => {

  const buttons = () => {
    let temp = '';

    switch (type) {

      case 'default':
        temp = (
          <Link
            className={
              altClass ? altClass : 'link_default'
            }
            to={linkTo}
            {...addStyles}
          >
            {title}
          </Link>
        );
        break;

      case 'bag_link':
        temp = (
          <button
            className="bag_link button"
            onClick={runAction}
          >
            <FontAwesomeIcon icon="shopping-bag" />
          </button>
        );
        break;

      case 'add_to_cart':
        temp = (
          <button
            type="button"
            className="add_to_cart_link"
            onClick={runAction}
          >
            <FontAwesomeIcon icon="shopping-bag" />
            Add to cart
          </button>
        );
        break;

      default:
        temp = '';
    }

    return temp;
  };

  return (
    <div className="my_link">
      {buttons()}
    </div>
  );
};

MyButton.propTypes = {
  type: PropTypes.string,
  altClass: PropTypes.string,
  linkTo: PropTypes.string,
  title: PropTypes.string,
  addStyles: PropTypes.object,
  runAction: PropTypes.func,
};

export default MyButton;

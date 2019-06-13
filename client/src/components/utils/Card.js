import React from 'react';
import PropTypes from 'prop-types';

import MyButton from './button';
import { connect } from 'react-redux';
import { addToCart } from '../../store/actions/user';

const Card = ({
  user,
  dispatch,
  grid = '',
  images,
  brand,
  name,
  price,
  description,
  _id
}) => {

  const { isAuth } = user.userData;

  const renderCardImg = images => {
    if (images.length > 0) return images[0].url;
    return '/images/image_not_available.png';
  };

  return (
    <>
      <div className={`card_item_wrapper ${grid}`}>
        <div
          className="image"
          style={{
            background: `url(${renderCardImg(images)}) no-repeat`,
          }}
        />
        <div className="action_container">
          <div className="tags">
            <div className="brand">
              {brand.name}
            </div>

            <div className="name">
              {name}
            </div>

            <div className="price">
              ${price}
            </div>

            {
              grid ?
                <div className="description">
                  {description}
                </div> : ''
            }
            <div className="actions">
              <div className="button_wrapp">
                <MyButton
                  type="default"
                  altClass="card_link"
                  title="View product"
                  linkTo={`/products/${_id}`}
                  addStyles={{
                    margin: '10px 0 0 0',
                  }}
                />
              </div>
              <div className="button_wrapp">
                <MyButton
                  type="bag_link"
                  runAction={() => {
                    isAuth ?
                      dispatch(addToCart(_id)) :
                      // eslint-disable-next-line no-console
                      console.log('u need to log in');
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Card.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
  grid: PropTypes.string,
  images: PropTypes.array,
  brand: PropTypes.object,
  name: PropTypes.string,
  price: PropTypes.number,
  description: PropTypes.string,
  _id: PropTypes.string
};

export default connect(
  ({ user }) => { return { user }; }
)(Card);

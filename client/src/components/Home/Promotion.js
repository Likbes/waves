import React from 'react';
import MyButton from '../utils/button';

const Promotion = () => {

  const promotion = {
    img: '/images/featured/featured_home_3.jpg',
    title: 'Up to 40% off',
    descr: 'In second hand guitars',
    linkTitle: 'Shop now',
    linkTo: '/shop',
  };

  const generatePromotion = () => (
    promotion ?
      <div
        className="home_promotion_img"
        style={{
          background: `url(${promotion.img})`
        }}
      >
        <h2 className="tag title">
          {promotion.title}
        </h2>
        <h3 className="tag low_title">
          {promotion.descr}
        </h3>
        <MyButton
          type="default"
          title={promotion.title}
          linkTo={promotion.linkTo}
          addStyles={{
            margin: '10px 0 0 0',
          }}
        />
      </div> : ''
  );

  return (
    <div className="home_promotion">
      {generatePromotion()}
    </div>
  );
};

export default Promotion;

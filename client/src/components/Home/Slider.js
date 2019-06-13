import React from 'react';
import ReactSlider from 'react-slick';
import MyButton from '../utils/button';

const Slider = () => {

  const slides = [
    {
      img: '/images/featured/featured_home.jpg',
      title: 'Fender',
      descr: 'Custom shop',
      linkTitle: 'Shop now',
      linkTo: '/shop?categ=custom_shop',
    },
    {
      img: '/images/featured/featured_home_2.jpg',
      title: 'B-Stock',
      descr: 'Awesome discounts',
      linkTitle: 'View offers',
      linkTo: '/shop',
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const menuHeight = 84;

  const generateSlides = () => (
    slides ?
      slides.map(slide => (
        <div key={slide.title}>
          <div
            className="featured_image"
            style={{
              background: `url(${slide.img})`,
              height: `${window.innerHeight - menuHeight}px`,
            }}
          >
            <div className="featured_action">
              <h2 className="tag title">
                {slide.title}
              </h2>
              <h3 className="tag low_title">
                {slide.descr}
              </h3>
              <MyButton
                type="default"
                title={slide.title}
                linkTo={slide.linkTo}
                addStyles={{
                  margin: '10px 0 0 0',
                }}
              />
            </div>
          </div>
        </div>
      )) : ''
  );

  return (
    <div className="featured_container">
      <ReactSlider {...settings} >
        {generateSlides()}
      </ReactSlider>
    </div>
  );
};

export default Slider;

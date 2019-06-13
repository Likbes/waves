import React from 'react';
import PropTypes from 'prop-types';
import ImageLightbox from '../utils/lightbox';

class Images extends React.Component {

  state = {
    lightbox: false,
    lightboxImgs: [],
    imgPos: 0,
  }

  componentDidMount() {
    const { images } = this.props.detail;
    if (images.length > 0) {
      let lightboxImgs = [];

      images.forEach(img => {
        lightboxImgs.push(img.url);
      });

      this.setState({ lightboxImgs });
    }
  }

  showThumbs = () => {
    const { lightboxImgs } = this.state;

    return lightboxImgs.map((item, i) => (
      i > 0 ?
        <div
          key={i}
          className="thumb"
          onClick={() => this.handleLightbox(i)}
          style={{ background: `url(${item}) no-repeat` }}
        /> : ''
    ));
  }

  handleLightbox = pos => {
    const { lightboxImgs } = this.state;
    if (lightboxImgs.length > 0) {
      this.setState({
        lightbox: true,
        imgPos: pos,
      });
    }
  }

  handleLightboxClose = () => {
    this.setState({
      lightbox: false,
    });
  }

  renderImg = images => {
    if (images.length > 0) {
      return images[0].url;
    }
    return '/images/image_not_available.png';
  }

  render() {
    const { images, id } = this.props.detail;
    const { lightbox, lightboxImgs, imgPos } = this.state;

    return (
      <div className="left">
        <div className="product_image_container">
          <div className="main_pic">
            <div
              onClick={() => this.handleLightbox(0)}
              style={{
                background: `url(${this.renderImg(images)}) no-repeat`
              }}
            />
          </div>
          <div className="main_thumbs">
            {this.showThumbs()}
          </div>
          {
            lightbox ?
              <ImageLightbox
                id={id}
                images={lightboxImgs}
                isOpen={lightbox}
                pos={imgPos}
                onClose={() => this.handleLightboxClose()}
              /> : ''
          }
        </div>
      </div>
    );
  }
}

Images.propTypes = {
  detail: PropTypes.object,
};

export default Images;

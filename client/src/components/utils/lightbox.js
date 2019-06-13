import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-images';

class ImageLightbox extends Component {
  static propTypes = {
    pos: PropTypes.number,
    images: PropTypes.array,
    onClose: PropTypes.func,
  }

  state = {
    lightboxIsOpen: true,
    currentImage: this.props.pos,
    images: [],
  }

  static getDerivedStateFromProps(props, state) {
    const { images } = props;

    if (images) {
      const finalImages = [];
      images.forEach(img => {
        finalImages.push({ src: `${img}` });
      });
      return state = { images: finalImages };
    }
    return false;
  }

  gotToPrevious = () => {
    this.setState(prevState => {
      return {
        currentImage: prevState.currentImage - 1,
      };
    });
  }

  gotToNext = () => {
    this.setState(prevState => {
      return {
        currentImage: prevState.currentImage + 1,
      };
    });
  }

  closeLightbox = () => {
    const { onClose } = this.props;
    onClose();
  }

  render() {
    const {
      currentImage,
      images,
      lightboxIsOpen
    } = this.state;
    return (
      <Lightbox
        currentImage={currentImage}
        images={images}
        isOpen={lightboxIsOpen}
        onClickPrev={() => this.gotToPrevious()}
        onClickNext={() => this.gotToNext()}
        onClose={() => this.closeLightbox()}
      />
    );
  }
}

export default ImageLightbox;

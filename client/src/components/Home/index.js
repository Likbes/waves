import React, { Component } from 'react';
import Slider from './Slider';
import Products from './Products';
import Promotion from './Promotion';

export default class Home extends Component {
  render() {
    return (
      <>
        <Slider />
        <Products sell />
        <Promotion />
        {/* by arrival default */}
        <Products />
      </>
    );
  }
}

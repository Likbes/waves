import React from 'react';
import PropTypes from 'prop-types';

import { frets, price } from '../utils/Form/fixedCategories';
import CollapseCheckbox from '../utils/CollapseCheckbox';
import CollapseRadio from '../utils/CollapseRadio';

const Filters = ({
  brands,
  woods,
  handleFilters
}) => {
  return (
    <div className="left">
      <CollapseCheckbox
        initState
        title="Brands"
        list={brands}
        handleFilters={filters => handleFilters(filters, 'brand')}
      />

      <CollapseCheckbox
        initState={false}
        title="Frets"
        list={frets}
        handleFilters={filters => handleFilters(filters, 'frets')}
      />

      <CollapseCheckbox
        initState={false}
        title="Woods"
        list={woods}
        handleFilters={filters => handleFilters(filters, 'wood')}
      />

      <CollapseRadio
        initState
        title="Price"
        list={price}
        handleFilters={filters => handleFilters(filters, 'price')}
      />
    </div>
  );
};

Filters.propTypes = {
  brands: PropTypes.array,
  woods: PropTypes.array,
  handleFilters: PropTypes.func,
};

export default Filters;


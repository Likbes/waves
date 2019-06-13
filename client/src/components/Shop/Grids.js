import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import faTh from '@fortawesome/fontawesome-free-solid/faTh';


library.add(faBars, faTh);

const Grids = ({ grid, handleGrid }) => {
  return (
    <div className="shop_options">
      <div className="shop_grids clear">
        <button
          className={`grid_btn ${grid ? '' : 'active'}`}
          onClick={handleGrid}
        >
          <FontAwesomeIcon icon='th' />
        </button>

        <button
          className={`grid_btn ${!grid ? '' : 'active'}`}
          onClick={handleGrid}
        >
          <FontAwesomeIcon icon='bars' />
        </button>
      </div>
    </div>
  );
};

Grids.propTypes = {
  grid: PropTypes.string,
  handleGrid: PropTypes.func,
};

export default Grids;

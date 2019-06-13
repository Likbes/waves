import React from 'react';
import PropTypes from 'prop-types';

import Cards from './Cards';

const Content = ({ grid, list, limit, loadMore, size }) => {
  return (
    <>
      <Cards
        grid={grid}
        list={list}
      />
      {
        size > 0 && size >= limit ?
          <div className="load_more_container">
            <button
              className="button"
              type='button'
              onClick={loadMore}
            >
              Load More
            </button>
          </div> : ''
      }
    </>
  );
};

Content.propTypes = {
  grid: PropTypes.string,
  list: PropTypes.array,
  limit: PropTypes.number,
  size: PropTypes.number,
  loadMore: PropTypes.func,
};

export default Content;

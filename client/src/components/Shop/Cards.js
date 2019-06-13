import React from 'react';
import PropTypes from 'prop-types';

import Card from '../utils/Card';

const Cards = ({
  grid,
  list
}) => {
  const renderCards = (list) => (
    list ?
      list.map(card => (
        <Card
          key={card._id}
          {...card}
          grid={grid}
        />
      )) : ''
  );

  return (
    <div className="card_block_shop">
      {
        list && list.length === 0 ?
          <div className="no_result">
            Sorry, no results
          </div> : ''
      }
      {renderCards(list)}
    </div>
  );
};

Cards.propTypes = {
  grid: PropTypes.string,
  list: PropTypes.array,
};

export default Cards;

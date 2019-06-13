import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card';

const CardBlock = ({
  title,
  list,
}) => {

  const renderCards = list => (
    list ?
      list.map(card => (
        <Card
          key={card._id}
          {...card}
        />
      )) : ''
  );

  return (
    <div className="card_block">
      <div className="container">

        {
          title ?
            <div className="title">{title}</div> :
            ''
        }

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}>
          {renderCards(list)}
        </div>
      </div>
    </div>
  );
};

CardBlock.propTypes = {
  title: PropTypes.string,
  list: PropTypes.array,
};

export default CardBlock;

import React from 'react';
import PropTypes from 'prop-types';

const HistoryBlock = ({
  products
}) => {

  const renderBlocks = () => (
    products ?
      products.map(({
        id,
        name,
        brand,
        price,
        quantity,
        purchaseOrder,
      }) => (
        <tr key={`${id}-${purchaseOrder}`}>
          <td>{purchaseOrder}</td>
          <td>{`${brand} - ${name}`}</td>
          <td>{price}</td>
          <td>{quantity}</td>
        </tr>
      )) : ''
  );

  return (
    <div className="history_blocks">
      <table>
        <thead>
          <tr>
            <th>Order number</th>
            <th>Product</th>
            <th>Price paid</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {renderBlocks()}
        </tbody>
      </table>
    </div>
  );
};

HistoryBlock.propTypes = {
  products: PropTypes.array,
};

export default HistoryBlock;

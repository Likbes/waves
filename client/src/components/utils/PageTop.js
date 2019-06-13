import React from 'react';
import PropTypes from 'prop-types';

const PageTop = ({ title }) => {
  return (
    <div className="page_top">
      <div className="container">
        {title}
      </div>
    </div>
  );
};

PageTop.propTypes = {
  title: PropTypes.string,
};

export default PageTop;

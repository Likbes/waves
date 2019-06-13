import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import faExclamationCircle from '@fortawesome/fontawesome-free-solid/faExclamationCircle';

library.add(faExclamationCircle);

const NotFound = () => {
  return (
    <div className="container">
      <div className="not_found_container">
        <FontAwesomeIcon icon="exclamation-circle" />
        <h2>Ooops! Page not found!</h2>
      </div>
    </div>
  );
};

export default NotFound;

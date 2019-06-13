import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import faCompass from '@fortawesome/fontawesome-free-solid/faCompass';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';

library.add(faCompass, faPhone, faClock, faEnvelope);

const Footer = ({ data: { siteData } }) => {
  if (!siteData) return '';
  const { address, phone, hours, email } = siteData[0];
  return (
    <footer className="bck_b_dark">
      <div className="container">
        <div className="logo">
          WAVES
        </div>
        <div className="wrapper">
          <div className="left">
            <h2>Contact information</h2>
            <div className="business_nfo">

              <div className="tag">
                <FontAwesomeIcon
                  icon="compass"
                  className="icon"
                />
                <div className="nfo">
                  <h4>Adress</h4>
                  <h4>{address}</h4>
                </div>
              </div>

              <div className="tag">
                <FontAwesomeIcon
                  icon="phone"
                  className="icon"
                />
                <div className="nfo">
                  <h4>Phone</h4>
                  <h4>{phone}</h4>
                </div>
              </div>

              <div className="tag">
                <FontAwesomeIcon
                  icon="clock"
                  className="icon"
                />
                <div className="nfo">
                  <h4>Working hours</h4>
                  <h4>{hours}</h4>
                </div>
              </div>

              <div className="tag">
                <FontAwesomeIcon
                  icon="envelope"
                  className="icon"
                />
                <div className="nfo">
                  <h4>Email</h4>
                  <h4>{email}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <h2>Be the first to know</h2>
            <p>
              Get all the latest information on events, sales and offers. You can miss out.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  data: PropTypes.object,
};

export default Footer;

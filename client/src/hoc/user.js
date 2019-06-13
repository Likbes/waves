import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const links = [
  { name: 'My account', linkTo: '/user/dashboard' },
  { name: 'User information', linkTo: '/user/profile' },
  { name: 'My cart', linkTo: '/user/cart' },
];

const admin = [
  {
    name: 'Site info',
    linkTo: '/admin/site_info'
  },
  {
    name: 'Add products',
    linkTo: '/admin/add_product'
  },
  {
    name: 'Upload file',
    linkTo: '/admin/add_file'
  },
  {
    name: 'Manage categories',
    linkTo: '/admin/manage_categories'
  }
];

const UserLayout = ({ userData, children }) => {

  const generateLinks = (links) => {
    return links.map(link => (
      <Link
        to={link.linkTo}
        key={link.name}
      >
        {link.name}
      </Link>
    ));
  };

  return (
    <div className="container">
      <div className="user_container">
        <div className="user_left_nav">
          <div>
            <h2>My account</h2>
            <div className="links">
              {generateLinks(links)}
            </div>
          </div>
          {userData.isAdmin ?
            <div>
              <h2>Admin</h2>
              <div className="links">
                {generateLinks(admin)}
              </div>
            </div>
            : ''
          }
        </div>
        <div className="user_right">
          {children}
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    userData: state.user.userData,
  };
}

UserLayout.propTypes = {
  userData: PropTypes.object,
  children: PropTypes.element,
};

export default connect(mapStateToProps)(UserLayout);

import React from 'react';
import PropTypes from 'prop-types';
import UserLayout from '../../hoc/user';
import HistoryBlock from '../utils/User/historyBlock';
import MyButton from '../utils/button';

const UserDashboard = ({ user }) => {
  const { userData } = user;
  const {
    name,
    lastname,
    email,
    phone,
    history,
  } = userData;

  return (
    <UserLayout>
      <>
        <div className="user_nfo_panel">
          <h1>User information</h1>
          <div>
            <span>{name}</span>
            <span>{lastname}</span>
            <span>{email}</span>
            <span>{phone}</span>
          </div>
          <MyButton
            type="default"
            title="Edit account info"
            linkTo="/user/profile"
          />
        </div>

        {
          history ?
            <div className="user_nfo_panel">
              <h1>History purchases</h1>
              <div className="user_product_block_wrapper">
                <HistoryBlock
                  products={history}
                />
              </div>
            </div> : ''
        }
      </>
    </UserLayout>
  );
};

UserDashboard.propTypes = {
  user: PropTypes.object,
};

export default UserDashboard;

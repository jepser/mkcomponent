import React from 'react';
import PropTypes from 'prop-types';

const $ComponentName = ({ children }) => {
  return (
    <div>{children}</div>
  )
};

$ComponentName.propTypes = {
  children: PropTypes.any,
};

$ComponentName.defaultProps = {
  children: null,
};   

export default $ComponentName;

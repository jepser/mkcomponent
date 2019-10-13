import React from 'react';
import PropTypes from 'prop-types';

const $ComponentName = ({ children = null }) => {
  return (
    <div>{children}</div>
  )
};

$ComponentName.propTypes = {
  children: PropTypes.any,
};

export default $ExportComponentName;

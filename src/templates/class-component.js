import React, { $ComponentType } from 'react';
import PropTypes from 'prop-types';

class $ComponentName extends $ComponentType {
  render () {
    const { children } = this.props
    return (
      <div>{children}</div>
    )
  }
};

$ComponentName.propTypes = {
  children: PropTypes.any,
};

$ComponentName.defaultProps = {
  children: null,
};

export default $ExportComponentName;

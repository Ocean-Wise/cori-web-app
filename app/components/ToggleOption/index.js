/**
*
* ToggleOption
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import MenuItem from '@material-ui/core/MenuItem';

const ToggleOption = ({ value, message, intl }) => (
  <MenuItem value={value}>
    {message ? intl.formatMessage(message) : value}
  </MenuItem>
);

ToggleOption.propTypes = {
  value: PropTypes.string.isRequired,
  message: PropTypes.object,
  intl: intlShape.isRequired,
};

export default injectIntl(ToggleOption);

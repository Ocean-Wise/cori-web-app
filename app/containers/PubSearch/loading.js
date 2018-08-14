/**
 *
 * Loading
 *
 */

import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

class Loading extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <IconButton aria-label="Search">
        <SearchIcon />
      </IconButton>
    );
  }
}

Loading.propTypes = {
};

export default Loading;

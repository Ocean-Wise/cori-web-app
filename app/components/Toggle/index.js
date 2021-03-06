/**
*
* LocaleToggle
*
*/

import React from 'react';
import PropTypes from 'prop-types';

// import Select from './Select';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// import ToggleOption from '../ToggleOption';

const styles = () => ({
  root: {
    fontSize: 14,
    color: '#FFF',
    border: '1px solid white',
    paddingLeft: 9,
  },
  icon: {
    color: '#FFF',
  },
  paper: {
    minWidth: '111px !important',
    top: '39px !important',
    left: '12px !important',
  },
});

function Toggle(props) {
  // let content = (<option>--</option>);

  // If we have items, render them
  // if (props.values) {
    // content = props.values.map((value) => (
      // <ToggleOption key={value} value={value} message={props.messages[value]} test={value} />
    // ));
  // }
  const { classes } = props;
  return (
    <Select MenuProps={{ classes: { paper: classes.paper } }} value={props.value} onChange={props.onToggle} displayEmpty name="language" classes={{ root: classes.root, icon: classes.icon, selectMenu: classes.selectMenu }}>
      <MenuItem value="en">
        English
      </MenuItem>
      <MenuItem value="fr">
        Français
      </MenuItem>
    </Select>
  );
}

Toggle.propTypes = {
  onToggle: PropTypes.func,
  // values: PropTypes.array,
  value: PropTypes.string,
  classes: PropTypes.object.isRequired,
  // messages: PropTypes.object,
};

export default withStyles(styles)(Toggle);

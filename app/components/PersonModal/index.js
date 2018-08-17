/**
*
* PersonModal
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import { compose } from 'redux';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import ReactMarkdown from 'react-markdown';
import Divider from './Divider';
import Person from './Person';
import Img from './Img';

const styles = () => ({
  paper: {
    overflowX: 'hidden',
  },
  paperWidthSm: {
    maxWidth: 750,
  },
  paperFullScreen: {
    maxWidth: '100% !important',
  },
  root: {
    '&#actions': {
      marginTop: -1,
      marginRight: -10,
    },
  },
});

class PersonModal extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    open: this.props.active,
  }

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { person, fullScreen, classes } = this.props;
    let honorific = '';
    if (person.honorifictitle !== null) {
      honorific = `${person.honorifictitle}. `;
    }

    return (
      <div>
        <Person onClick={this.handleToggle}>
          <Img image={person.image.url} filter={'grayscale'} />
          <div style={{ color: '#00B398', fontSize: 24, fontWeight: 300, letterSpacing: '2.57px', lineHeight: '35px', maxWidth: 255 }}>{honorific}{person.first} {person.last}</div>
          <Divider />
          <div style={{ maxWidth: 255 }}>
            <span className="bold">{person.position}</span>
          </div>
        </Person>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleToggle}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          classes={classes}
        >
          <DialogActions classes={classes} id="actions">
            <IconButton onClick={this.handleToggle}>
              <ClearIcon />
            </IconButton>
          </DialogActions>
          <DialogContent>
            <Person className="embed">
              <Img image={person.image.url} filter={'grayscale'} />
              <div style={{ color: '#00B398', fontSize: 24, fontWeight: 300, letterSpacing: '2.57px', lineHeight: '35px', maxWidth: 255 }}>{honorific}{person.first} {person.last}</div>
              <Divider />
              <div style={{ maxWidth: 255 }}>
                <span className="bold">{person.position}</span>
              </div>
            </Person>
            <ReactMarkdown source={person.copy} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

PersonModal.propTypes = {
  person: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool.isRequired,
  classes: PropTypes.object,
  active: PropTypes.bool,
};

export default compose(
  withMobileDialog(),
  withStyles(styles),
)(PersonModal);

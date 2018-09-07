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
import ReactGA from 'react-ga';
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
    if (!this.state.open) {
      ReactGA.event({
        category: 'Team',
        action: 'Viewed a reasearcher\'s bio',
        label: `${this.props.person.honorifictitle !== null ? `${this.props.person.honorifictitle}.` : ''} ${this.props.person.first} ${this.props.person.last}`,
      });
    }
    this.setState({ open: !this.state.open });
  }

  render() {
    const { person, isIE, fullScreen, classes } = this.props;
    let honorific = '';
    try {
      if (person.honorifictitle !== null && typeof person.honorifictitle === 'string') {
        honorific = `${person.honorifictitle}. `;
      }
    } catch (err) {
      honorific = '';
    }
    try {
      return (
        <div>
          <Person onClick={this.handleToggle}>
            <Img image={isIE ? person.image.fields.file.url : person.image.url} filter={'grayscale'} />
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
                <Img image={isIE ? person.image.fields.file.url : person.image.url} filter={'grayscale'} />
                <div style={{ color: '#00B398', fontSize: 24, fontWeight: 300, letterSpacing: '2.57px', lineHeight: '35px', maxWidth: 255 }}>{honorific}{person.first} {person.last}</div>
                <Divider />
                <div style={{ maxWidth: 255 }}>
                  <span className="bold">{person.position}</span>
                </div>
              </Person>
              <div style={{ width: 375, marginLeft: 320 }}>
                <ReactMarkdown source={person.copy} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      );
    } catch (err) {
      return <div />;
    }
  }
}

PersonModal.propTypes = {
  person: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool.isRequired,
  classes: PropTypes.object,
  active: PropTypes.bool,
  isIE: PropTypes.bool,
};

export default compose(
  withMobileDialog(),
  withStyles(styles),
)(PersonModal);

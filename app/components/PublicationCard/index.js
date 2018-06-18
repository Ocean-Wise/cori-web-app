/**
*
* PublicationCard
*
*/

import React from 'react';
// import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Cite from 'citation-js';

// import messages from './messages';

const styles = () => ({
  label: {
    flexDirection: 'row-reverse',
  },
  card: {
    maxWidth: 1120,
    margin: '15px auto',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: 'all 0.4s cubic-bezier(0.4, -0.2, 0.6, 1.2)',
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

class PublicationCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    expanded: false,
    citation: new Cite(this.props.data.citation),
    citationString: '',
    checked: this.props.isSelected,
  };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  bibtex = () => {
    this.setState({ citationString: this.state.citation.get({ style: 'bibtex', type: 'string' }) });
  }

  apa = () => {
    this.setState({ citationString: this.state.citation.get({ style: 'citation-apa', type: 'string' }) });
  }

  vancouver = () => {
    this.setState({ citationString: this.state.citation.get({ style: 'citation-vancouver', type: 'string' }) });
  }

  harvard = () => {
    this.setState({ citationString: this.state.citation.get({ style: 'citation-harvard1', type: 'string' }) });
  }

  handleCheck = () => {
    const item = { key: this.props.index, citation: this.props.data.citation };
    if (!this.state.checked) {
      this.props.addToList(item);
      this.setState({ checked: !this.state.checked });
    } else {
      this.props.removeFromList(item);
      this.setState({ checked: !this.state.checked });
    }
  }

  render() {
    const { classes, data } = this.props;
    const { citationString } = this.state;

    const abstract = data.abstract !== null ? (
      <Typography variant="body2">
        {data.abstract.substring(0, 270)} [...]
      </Typography>
    ) : '';

    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            title={data.title}
            subheader={data.year}
            action={
              <FormControlLabel
                className={classes.label}
                control={
                  <Checkbox
                    checked={this.state.checked}
                    onChange={this.handleCheck}
                  />
                }
                label="Add to reading list?"
              />
            }
          />
          <CardContent>
            {abstract}
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="headline">
                Generate a citation:
              </Typography>
              <div style={{ display: 'flex', flexDirection: 'row', marginLeft: -20 }}>
                <Button style={{ margin: '0 5px' }} onClick={this.bibtex}>BibTeX</Button>
                <Button style={{ margin: '0 5px' }} onClick={this.apa}>APA</Button>
                <Button style={{ margin: '0 5px' }} onClick={this.vancouver}>Vancouver</Button>
                <Button style={{ margin: '0 5px' }} onClick={this.harvard}>Harvard</Button>
              </div>
              <div>
                {citationString}
              </div>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}

PublicationCard.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  isSelected: PropTypes.bool,
  addToList: PropTypes.func,
  removeFromList: PropTypes.func,
  index: PropTypes.string,
};

export default withStyles(styles)(PublicationCard);

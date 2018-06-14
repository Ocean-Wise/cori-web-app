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
import Cite from 'citation-js';

// import messages from './messages';

const styles = () => ({
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

  render() {
    const { classes, data } = this.props;
    const { citationString } = this.state;

    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            title={data.title}
            subheader={data.year}
          />
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
};

export default withStyles(styles)(PublicationCard);

/**
*
* PublicationCard
*
*/

import React from 'react';
// import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Grid, Row, Col } from 'react-flexbox-grid';
// import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
import Button from 'components/Button';
// import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FileIcon from '@material-ui/icons/Description';
import PDFIcon from 'styles/icons/pdf.svg';
import Container from './Container';
import P from './P';
import Title from './Title';
import Year from './Year';
import Hr from './Hr';
import ReadingList from './ReadingList';

// import messages from './messages';

const styles = () => ({
  checkRoot: {
    color: '#00B398',
    '&$checked': {
      color: '#00B398',
    },
  },
  checked: {},
  label: {
    flexDirection: 'row-reverse',
    marginRight: 0,
    fontSize: '12 !important',
    lineHeight: '14px !important',
    fontWeight: 'bold !important',
    color: '#8D8D8D !important',
  },
  card: {
    maxWidth: 1120,
    margin: '0px auto',
    boxShadow: '0 0px 0px 0 rgba(0,0,0,0.24), 8px -8px 0 0 #CCF0EA',
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
    citation: this.props.data.citation,
    citationString: '',
    inArray: this.props.isSelected,
  };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  bibtex = () => {
    axios.post(`${window.location.origin}/api/citation`, { citations: this.state.citation, style: 'bibtex' })
      .then((res) => {
        this.setState({ citationString: res.data });
      })
      .catch();
  }

  apa = () => {
    axios.post(`${window.location.origin}/api/citation`, { citations: this.state.citation, style: 'apa' })
      .then((res) => {
        this.setState({ citationString: res.data });
      })
      .catch();
  }

  vancouver = () => {
    axios.post(`${window.location.origin}/api/citation`, { citations: this.state.citation, style: 'vancouver' })
      .then((res) => {
        this.setState({ citationString: res.data });
      })
      .catch();
  }

  harvard = () => {
    axios.post(`${window.location.origin}/api/citation`, { citations: this.state.citation, style: 'harvard' })
      .then((res) => {
        this.setState({ citationString: res.data });
      })
      .catch();
  }

  handleCheck = () => {
    const item = { key: this.props.name, citation: this.props.data.citation };
    if (!this.state.inArray) {
      this.props.addToList(item);
      this.setState({ inArray: !this.state.inArray });
    } else {
      this.props.removeFromList(item);
      this.setState({ inArray: !this.state.inArray });
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

    const downloadFile = data.pdf !== null ? (
      <div style={{ marginRight: 12 }}>
        <Button id="download" publication href={data.pdf.url}>
          <div style={{ padding: '0 10px 5px' }}>
            <span style={{ position: 'relative', top: 2, marginRight: 10 }}>Download</span>
            <img id="svg" style={{ height: 25 }} src={PDFIcon} alt="Download PDF" />
          </div>
        </Button>
      </div>
    ) : '';

    return (
      <Container className="publicationCard" index={`${this.props.max - this.props.index}`}>
        <Grid fluid>
          <Row style={{ paddingTop: 18 }}>
            <Col md={1}>
              <Row>
                <Year>{data.year}</Year>
              </Row>
            </Col>
            <Col lg={9} md={8} style={{ paddingRight: 32 }}>
              <Row>
                <Title>{data.title}</Title>
              </Row>
              <Row>
                <P>{abstract}</P>
                <Hr />
              </Row>
              <Row>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                  <Title citation style={{ marginTop: 7 }}>Citation Format:</Title>
                  <Button id="BibTeX" noBorder onClick={this.bibtex}>BibTeX</Button>
                  <Button id="APA" noBorder style={{ margin: '0 5px' }} onClick={this.apa}>APA</Button>
                  <Button id="Vancouver" noBorder style={{ margin: '0 5px' }} onClick={this.vancouver}>Vancouver</Button>
                  <Button id="Harvard" noBorder style={{ margin: '0 5px' }} onClick={this.harvard}>Harvard</Button>
                </div>
                <div>
                  <P>{citationString}</P>
                </div>
              </Row>
            </Col>
            <Col lg={2} md={3}>
              <Row between="xs" style={{ paddingBottom: 15 }}>
                <div>
                  <ReadingList>Add to citation list?</ReadingList>
                  <Checkbox
                    classes={{
                      root: classes.checkRoot,
                      checked: classes.checked,
                    }}
                    checked={this.props.isSelected && this.state.inArray}
                    onChange={this.handleCheck}
                  />
                </div>
                {downloadFile}
              </Row>
            </Col>
          </Row>
        </Grid>
      </Container>
    );
  }
}

PublicationCard.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  isSelected: PropTypes.bool,
  addToList: PropTypes.func,
  removeFromList: PropTypes.func,
  name: PropTypes.string,
  index: PropTypes.number,
  max: PropTypes.number,
};

export default withStyles(styles)(PublicationCard);

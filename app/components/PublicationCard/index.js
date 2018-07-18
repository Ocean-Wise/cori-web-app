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
import { withStyles } from '@material-ui/core/styles';
import Button from 'components/Button';
import Checkbox from '@material-ui/core/Checkbox';
import PDFIcon from 'styles/icons/pdf.svg';
import ExternalLink from 'styles/icons/externalLink.svg';
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
});

class PublicationCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    citation: this.props.data.citation,
    citationString: '',
    inArray: this.props.isSelected,
    semanticScholar: {},
  };

  componentWillMount() {
    axios.post(`${window.location.origin}/api/citation`, { citations: this.state.citation, style: 'fas' })
      .then((res) => {
        this.setState({ citationString: res.data });
      })
      .then(() => {
        if (this.props.data.pdf === null && this.props.data.doi !== null) {
          try {
            axios.get(`https://api.semanticscholar.org/v1/paper/${this.props.data.doi}`)
              .then((pub) => {
                this.setState({ semanticScholar: pub.data });
              });
          } catch (err) {
            // Semantic Scholar gave a 404, so leave the semanticScholar state object empty
          }
        }
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

    const abstract = data.abstract !== null ? `${data.abstract.substring(0, 270)} [...]` : '';

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

    const linkToJournal = data.url !== null ? (
      <div style={{ marginRight: 12 }}>
        <Button id="journalLink" publication href={data.url}>
          <div style={{ padding: '0 0px 5px' }}>
            <span style={{ position: 'relative', top: 2, marginRight: 5 }}>Full Article</span>
            <img id="svg" style={{ height: 22 }} src={ExternalLink} alt="Full Article" />
          </div>
        </Button>
      </div>
    ) : '';

    const semanticScholarButton = Object.keys(this.state.semanticScholar).length !== 0 ? (
      <div style={{ marginRight: 12 }}>
        <Button id="journalLink" publication href={this.state.semanticScholar.url}>
          <div style={{ padding: '0 0px 5px' }}>
            <span style={{ position: 'relative', top: 2, marginRight: 5 }}>Full Article</span>
            <img id="svg" style={{ height: 22 }} src={ExternalLink} alt="Full Article" />
          </div>
        </Button>
      </div>
    ) : '';

    // eslint-disable-next-line
    const actionButton = downloadFile !== '' ? downloadFile : semanticScholarButton !== '' ? semanticScholarButton : linkToJournal;

    const abstractSection = abstract !== '' ? (
      <Row>
        <P>{abstract}</P>
        <Hr />
      </Row>
    ) : (
      <Row>
        <Hr />
      </Row>
    );

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
              {abstractSection}
              <Row>
                <div>
                  <P citation>{citationString}</P>
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
                {actionButton}
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

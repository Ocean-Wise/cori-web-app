/**
 *
 * Surveys
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
// import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import ListDivider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import Header from 'components/Header';

import Survey from './Survey';
import SurveyRow from './SurveyRow';
import SurveyCol from './SurveyCol';
import Wrapper from './Wrapper';
import IntroContainer from './IntroContainer';
import Section from './Section';
import Img from './Img';
import H1 from './H1';
import Divider from './Divider';
import CopyBlock from './CopyBlock';
import Blockquote from './Blockquote';

import messages from './messages';

const styles = () => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: 15,
    flexBasis: '33.33%',
    flexShrink: 0,
    paddingRight: '0 !important',
  },
  secondaryHeading: {
    fontSize: 15,
    color: 'rgb(0,179,152)',
  },
  divider: {
    backgroundColor: 'rgb(0,0,0, 0.22)',
    marginTop: 15,
    marginBottom: 15,
  },
});

export class Surveys extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    expanded: null,
    lingcod: {},
    rockfish: {},
    annapolis: {},
    seastars: {},
    sixgills: {},
    generalLocation: '',
    nests: 1,
  };

  handleChange = (panel) => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  }

  handleData = (survey, field) => (event) => {
    const updatedSurvey = this.state[survey];
    updatedSurvey[field] = event.target.value;
    this.setState({
      [survey]: updatedSurvey,
    });
    console.log(this.state[survey]);
  }

  handleDataObject = (survey, object, field) => (event) => {
    const updatedSurvey = this.state[survey];
    const updatedObject = updatedSurvey[object] !== undefined ? updatedSurvey[object] : {};
    updatedObject[field] = event.target.value;
    updatedSurvey[object] = updatedObject;
    this.setState({
      [survey]: updatedSurvey,
    });
    console.log(this.state[survey]);
  }

  handleSelectData = (survey) => (event) => {
    this.setState({ [event.target.name]: event.target.value });
    const updatedSurvey = this.state[survey];
    updatedSurvey[event.target.name] = event.target.value;
    this.setState({
      [survey]: updatedSurvey,
    });
    console.log(this.state[survey]);
  }

  handleSelectDataObject = (survey, object, field) => (event) => {
    this.setState({ [event.target.name]: event.target.value });
    const updatedSurvey = this.state[survey];
    const updatedObject = updatedSurvey[object] !== undefined ? updatedSurvey[object] : {};
    updatedObject[field] = event.target.value;
    updatedSurvey[object] = updatedObject;
    this.setState({
      [survey]: updatedSurvey,
    });
    console.log(this.state[survey]);
  }

  handleAddNest = () => {
    this.setState({ nests: this.state.nests + 1 });
  }

  handleSubmit = (survey) => {
    console.log(survey);
    // axios.post(``)
  }

  render() {
    const { classes } = this.props;
    const { expanded, nests } = this.state;

    const nestInfo = [];
    for (let i = 0; i < nests; i += 1) {
      nestInfo.push(
        <div>
          <ListDivider className={classes.divider} />
          <SurveyRow>
            <SurveyCol>
              <h4 style={{ margin: 0 }}>Nest #{(i + 1).toString()}</h4>
            </SurveyCol>
          </SurveyRow>
          <SurveyRow>
            <SurveyCol>
              <TextField
                id={`depth${(i + 1).toString()}`}
                label="Depth (feet)"
                placeholder="Depth (feet)"
                margin="normal"
                onChange={this.handleDataObject('lingcod', `nest${(i + 1).toString()}`, 'depth')}
              />
              <FormControl>
                <InputLabel htmlFor={`size${(i + 1).toString()}`}>Size</InputLabel>
                <Select
                  value={this.state[`size${(i + 1).toString()}`]}
                  onChange={this.handleSelectDataObject('lingcod', `nest${(i + 1).toString()}`, 'size')}
                  inputProps={{
                    name: `size${(i + 1).toString()}`,
                    id: `size${(i + 1).toString()}`,
                  }}
                >
                  <MenuItem value="" disabled><em>Size</em></MenuItem>
                  <MenuItem value="Watermellon">W = Watermellon</MenuItem>
                  <MenuItem value="Cantaloupe">C = Cantaloupe</MenuItem>
                  <MenuItem value="Grapefruit">G = Grapefruit</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel htmlFor={`condition${(i + 1).toString()}`}>Condition</InputLabel>
                <Select
                  value={this.state[`condition${(i + 1).toString()}`]}
                  onChange={this.handleSelectDataObject('lingcod', `nest${(i + 1).toString()}`, 'condition')}
                  inputProps={{
                    name: `condition${(i + 1).toString()}`,
                    id: `condition${(i + 1).toString()}`,
                  }}
                >
                  <MenuItem value="" disabled><em>Condition</em></MenuItem>
                  <MenuItem value="New (white, pink)">N = New (white, pink)</MenuItem>
                  <MenuItem value="Eyed (dark grey)">E = Eyed (dark grey)</MenuItem>
                  <MenuItem value="Rotten">R = Rotten</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel htmlFor={`situation${(i + 1).toString()}`}>Situation</InputLabel>
                <Select
                  value={this.state[`situation${(i + 1).toString()}`]}
                  onChange={this.handleSelectDataObject('lingcod', `nest${(i + 1).toString()}`, 'situation')}
                  inputProps={{
                    name: `situation${(i + 1).toString()}`,
                    id: `situation${(i + 1).toString()}`,
                  }}
                >
                  <MenuItem value="" disabled><em>Situation</em></MenuItem>
                  <MenuItem value="Secure in crevice">S = Secure in Crevice</MenuItem>
                  <MenuItem value="Loose in crevice">L = Loose in crevice</MenuItem>
                  <MenuItem value="Out in open">O = Out in open</MenuItem>
                </Select>
              </FormControl>
            </SurveyCol>
          </SurveyRow>
        </div>
      );
    }

    return (
      <div>
        <Helmet>
          <title>Surveys</title>
          <meta name="description" content="Description of Surveys" />
        </Helmet>
        <Header />
        <Wrapper>
          <IntroContainer>
            <center>
              <H1><FormattedMessage {...messages.headline} /></H1>
              <Blockquote><FormattedMessage {...messages.subheader} /></Blockquote>
            </center>
          </IntroContainer>
        </Wrapper>
        <Wrapper>
          <Section flexDirection="column">
            <Img src={'//placehold.it/600x400/6DD32C/000000'} alt={'Placeholder'} float="left" />
            <CopyBlock float="right">
              <Divider />
              <ExpansionPanel expanded={expanded === 'lingcod'} onChange={this.handleChange('lingcod')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>Lingcod Survey</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Survey>
                    <SurveyRow>
                      <TextField
                        id="divedate"
                        label="Dive Date"
                        placeholder="dd/mm/yyyy"
                        margin="normal"
                        onChange={this.handleData('lingcod', 'diveDate')}
                      />
                    </SurveyRow>
                    <ListDivider className={classes.divider} />
                    <SurveyRow>
                      <SurveyCol>
                        <h4 style={{ margin: 0 }}><FormattedMessage {...messages.diver} /> A</h4>
                      </SurveyCol>
                      <SurveyCol>
                        <h4 style={{ margin: 0 }}><FormattedMessage {...messages.diver} /> B</h4>
                      </SurveyCol>
                    </SurveyRow>
                    <SurveyRow>
                      <SurveyCol>
                        <TextField
                          id="name"
                          label="Name"
                          placeholder="Name"
                          margin="normal"
                          onChange={this.handleDataObject('lingcod', 'diverA', 'name')}
                        />
                      </SurveyCol>
                      <SurveyCol>
                        <TextField
                          id="name"
                          label="Name"
                          placeholder="Name"
                          margin="normal"
                          onChange={this.handleDataObject('lingcod', 'diverB', 'name')}
                        />
                      </SurveyCol>
                    </SurveyRow>
                    <SurveyRow>
                      <SurveyCol>
                        <TextField
                          id="address"
                          label="Address"
                          placeholder="Address"
                          multiline
                          margin="normal"
                          onChange={this.handleDataObject('lingcod', 'diverA', 'address')}
                        />
                      </SurveyCol>
                      <SurveyCol>
                        <TextField
                          id="address"
                          label="Address"
                          placeholder="Address"
                          multiline
                          margin="normal"
                          onChange={this.handleDataObject('lingcod', 'diverB', 'address')}
                        />
                      </SurveyCol>
                    </SurveyRow>
                    <SurveyRow>
                      <SurveyCol>
                        <TextField
                          id="phone"
                          label="Phone"
                          placeholder="Phone"
                          margin="normal"
                          onChange={this.handleDataObject('lingcod', 'diverA', 'phone')}
                        />
                      </SurveyCol>
                      <SurveyCol>
                        <TextField
                          id="phone"
                          label="Phone"
                          placeholder="Phone"
                          margin="normal"
                          onChange={this.handleDataObject('lingcod', 'diverB', 'phone')}
                        />
                      </SurveyCol>
                    </SurveyRow>
                    <SurveyRow>
                      <SurveyCol>
                        <TextField
                          id="email"
                          label="Email"
                          placeholder="Email"
                          margin="normal"
                          onChange={this.handleDataObject('lingcod', 'diverA', 'email')}
                        />
                      </SurveyCol>
                      <SurveyCol>
                        <TextField
                          id="email"
                          label="Email"
                          placeholder="Email"
                          margin="normal"
                          onChange={this.handleDataObject('lingcod', 'diverB', 'email')}
                        />
                      </SurveyCol>
                    </SurveyRow>
                    <ListDivider className={classes.divider} />
                    <SurveyRow>
                      <FormControl className={classes.root}>
                        <InputLabel htmlFor="generalLocation">General Location</InputLabel>
                        <Select
                          value={this.state.generalLocation}
                          onChange={this.handleSelectData('lingcod')}
                          inputProps={{
                            name: 'generalLocation',
                            id: 'generalLocation',
                          }}
                        >
                          <MenuItem value="" disabled><em>General Location</em></MenuItem>
                          <MenuItem value="Howe Sound">Howe Sound</MenuItem>
                          <MenuItem value="Sunshine Coast">Sunshine Coast</MenuItem>
                          <MenuItem value="Indian Arm">Indian Arm</MenuItem>
                          <MenuItem value="West Vancouver Island">West Vancouver Island</MenuItem>
                          <MenuItem value="Southern Gulf Islands">Southern Gulf Islands</MenuItem>
                          <MenuItem value="Northern Gulf Islands">Northern Gulf Islands</MenuItem>
                          <MenuItem value="Johnstone Strait">Johnstone Strait</MenuItem>
                          <MenuItem value="Hecate Strait">Hecate Strait</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </Select>
                      </FormControl>
                    </SurveyRow>
                    <SurveyRow>
                      <TextField
                        className={classes.root}
                        id="specificLocation"
                        label="Specific Location"
                        placeholder="Specific Location"
                        margin="normal"
                        onChange={this.handleData('lingcod', 'specificLocation')}
                      />
                    </SurveyRow>
                    <SurveyRow>
                      <TextField
                        className={classes.root}
                        id="bottomTime"
                        label="Bottom Time"
                        placeholder="Bottom Time"
                        margin="normal"
                        onChange={this.handleData('lingcod', 'bottomTime')}
                      />
                    </SurveyRow>
                    {nestInfo}
                    <Button onClick={this.handleAddNest}>Add Nest</Button>
                    <ListDivider className={classes.divider} />
                    <SurveyRow>
                      <TextField
                        className={classes.root}
                        id="additionalComments"
                        label="Additional Comments"
                        placeholder="Additional Comments"
                        margin="normal"
                        multiline
                        onChange={this.handleData('lingcod', 'additionalComments')}
                      />
                    </SurveyRow>
                    <Button onClick={() => this.handleSubmit('lingcod')}>Submit</Button>
                  </Survey>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </CopyBlock>
          </Section>
        </Wrapper>
      </div>
    );
  }
}

Surveys.propTypes = {
  classes: PropTypes.object,
  // dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
  withStyles(styles),
)(Surveys);

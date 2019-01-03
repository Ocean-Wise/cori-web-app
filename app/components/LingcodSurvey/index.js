/**
*
* LingcodSurvey
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from 'components/Button/Loadable';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import SurveyCopy from 'components/SurveyCopy';

import Hero from './Hero';
import HEROIMG from './hero.jpg';
import P from './P';

class LingcodSurvey extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      divedate: '',
      dateError: '',
      divera: {
        name: '',
        address: '',
        phone: '',
        email: '',
      },
      diverb: {
        name: '',
        address: '',
        phone: '',
        email: '',
      },
      generalLocation: '',
      specificLocation: '',
      gps: '',
      bottomType: '',
      bottomTime: '',
      nests: [],
      nestList: [],
      additionalComments: '',
      submitting: false,
      submitted: false,
      error: '',
    };
  }

  componentWillMount() {
    // this.handleNewNest();
    const nests = [];
    for (let i = 0; i < 20; i += 1) {
      nests.push({
        number: i,
        depth: '',
        size: '',
        condition: '',
        situation: '',
        guard: '',
      });
    }
    this.setState({ nests });
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps !== this.props) {
  //     this.updateSubmitted();
  //   }
  // }

  updateSubmitted = () => {
    this.setState({ submitted: this.props.submitted });
  }


  doUpload = async () => {
    this.setState({ submitting: true });
    const { divera, diverb, divedate, generalLocation, specificLocation, gps, bottomType, bottomTime, nests, additionalComments } = this.state;
    const surveyData = {
      divera,
      diverb,
      divedate,
      generalLocation,
      specificLocation,
      gps,
      bottomType,
      bottomTime,
      nests,
      additionalComments,
    };
    if (divera.name === '') {
      this.setState({ submitting: false, error: 'Diver A name required' });
    } else if (divera.email === '') {
      this.setState({ submitting: false, error: 'Diver A email required' });
    } else if (generalLocation === '') {
      this.setState({ submitting: false, error: 'Please select an area' });
    } else if (divedate === '') {
      this.setState({ submitting: false, error: 'Please select a date' });
    } else {
      this.props.upload({ files: [], name: 'lingcod', surveyData });
      this.setState({ submitted: true, submitting: false });
    }
  }

  handleText = (type) => (event) => {
    if (type.includes('diverA')) {
      const { divera } = this.state;
      if (type.includes('Name')) {
        divera.name = event.target.value;
        this.setState({ divera });
      }
      if (type.includes('Address')) {
        divera.address = event.target.value;
        this.setState({ divera });
      }
      if (type.includes('Phone')) {
        divera.phone = event.target.value;
        this.setState({ divera });
      }
      if (type.includes('Email')) {
        divera.email = event.target.value;
        this.setState({ divera });
      }
    } else if (type.includes('diverB')) {
      const { diverb } = this.state;
      if (type.includes('Name')) {
        diverb.name = event.target.value;
        this.setState({ diverb });
      }
      if (type.includes('Address')) {
        diverb.address = event.target.value;
        this.setState({ diverb });
      }
      if (type.includes('Phone')) {
        diverb.phone = event.target.value;
        this.setState({ diverb });
      }
      if (type.includes('Email')) {
        diverb.email = event.target.value;
        this.setState({ diverb });
      }
    } else if (type.includes('nest')) {
      const { nests } = this.state;
      const i = type.match(/\d+/g)[0];
      if (type.includes('depth')) {
        nests[i].depth = event.target.value;
      }
      if (type.includes('size')) {
        nests[i].size = event.target.value;
      }
      if (type.includes('condition')) {
        nests[i].condition = event.target.value;
      }
      if (type.includes('situation')) {
        nests[i].situation = event.target.value;
      }
      if (type.includes('guard')) {
        nests[i].guard = event.target.value;
      }
      this.setState({ nests });
    } else {
      this.setState({ [type]: event.target.value });
    }
  }

  render() {
    const submitButton = this.state.submitted ? ( // eslint-disable-line
      <P><strong>Thank you for your submission!</strong></P>
    ) : this.state.submitting ? (
      <Button id="upload">Submitting...</Button>
    ) : (
      <Button id="upload" onClick={this.doUpload}>Submit Survey</Button>
    );

    const nestList = [];
    for (let i = 0; i < 20; i += 1) {
      nestList.push(
        <div style={{ borderBottom: '1px solid black', paddingBottom: 15 }}>
          <div style={{ paddingTop: 22 }}>{i + 1}</div>
          <div key={i} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <TextField placeholder="Depth (in meters)" margin="normal" value={this.state.nests[i].depth} onChange={this.handleText(`nest-${i}-depth`)} />
            <Select value={this.state.nests[i].size} displayEmpty onChange={this.handleText(`nest-${i}-size`)}>
              <MenuItem value="">Size</MenuItem>
              <MenuItem value="W = watermelon">W = watermelon</MenuItem>
              <MenuItem value="C = cantaloupe">C = cantaloupe</MenuItem>
              <MenuItem value="G = grapefruit">G = grapefruit</MenuItem>
            </Select>
            <Select value={this.state.nests[i].condition} displayEmpty onChange={this.handleText(`nest-${i}-condition`)}>
              <MenuItem value="">Condition</MenuItem>
              <MenuItem value="N = new (white, pink)">N = new (white, pink)</MenuItem>
              <MenuItem value="E = eyed (dark grey)">E = eyed (dark grey)</MenuItem>
              <MenuItem value="R = rotten">R = rotten</MenuItem>
            </Select>
            <Select value={this.state.nests[i].situation} displayEmpty onChange={this.handleText(`nest-${i}-situation`)}>
              <MenuItem value="">Situation</MenuItem>
              <MenuItem value="S = secure in crevice">S = secure in crevice</MenuItem>
              <MenuItem value="L = loose in crevice">L = loose in crevice</MenuItem>
              <MenuItem value="O = out in open">O = out in open</MenuItem>
            </Select>
            <Select value={this.state.nests[i].guard} displayEmpty onChange={this.handleText(`nest-${i}-guard`)}>
              <MenuItem value="">Nest-Guarding Male</MenuItem>
              <MenuItem value="P = male present">P = male present</MenuItem>
              <MenuItem value="P2 = male guarding multiple egg masses">P2 = male guarding multiple egg masses</MenuItem>
              <MenuItem value="A = absent male">A = absent male</MenuItem>
            </Select>
          </div>
        </div>
      );
    }

    return (
      <div style={{ overflowX: 'hidden' }}>
        <Hero src={HEROIMG} alt={`${this.props.slug}-hero`} />
        <div style={{ padding: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '0 auto', maxWidth: 1100 }}>
            <SurveyCopy surveySlug="lingcod" />
            <div style={{ maxWidth: 580, margin: '0 auto' }}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <h3>Note:</h3>
                <P>Please enter the substrate types you encountered on your dive in the comments box at the end of the form below, thank you!</P>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <TextField error={this.state.dateError} type="date" label="Dive Date (required)" InputLabelProps={{ shrink: true }} value={this.state.divedate} onChange={this.handleText('divedate')} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <div style={{ display: 'inline', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <h4>Diver A:</h4>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <TextField placeholder="Full Name (Required)" margin="normal" value={this.state.divera.name} onChange={this.handleText('diverAName')} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <TextField placeholder="Address" margin="normal" value={this.state.divera.address} onChange={this.handleText('diverAAddress')} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <TextField placeholder="Phone" margin="normal" value={this.state.divera.phone} onChange={this.handleText('diverAPhone')} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <TextField placeholder="Email (Required)" margin="normal" value={this.state.divera.email} onChange={this.handleText('diverAEmail')} />
                  </div>
                </div>
                <div style={{ display: 'inline', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <h4>Diver B:</h4>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <TextField placeholder="Full Name" margin="normal" value={this.state.diverb.name} onChange={this.handleText('diverAName')} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <TextField placeholder="Address" margin="normal" value={this.state.diverb.address} onChange={this.handleText('diverAAddress')} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <TextField placeholder="Phone" margin="normal" value={this.state.diverb.phone} onChange={this.handleText('diverBPhone')} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <TextField placeholder="Email" margin="normal" value={this.state.diverb.email} onChange={this.handleText('diverBEmail')} />
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', marginTop: 15 }}>
                <Select fullWidth value={this.state.generalLocation} displayEmpty onChange={this.handleText('generalLocation')}>
                  <MenuItem value="">Area (Required)</MenuItem>
                  <MenuItem value="Howe Sound">Howe Sound</MenuItem>
                  <MenuItem value="Haida Gwaii">Haida Gwaii</MenuItem>
                  <MenuItem value="Burrard Inlet">Burrard Inlet</MenuItem>
                  <MenuItem value="Saanich Inlet">Saanich Inlet</MenuItem>
                  <MenuItem value="Strait of Georgia Southern Gulf Islands">Strait of Georgia Southern Gulf Islands</MenuItem>
                  <MenuItem value="Inside Southern Gulf Islands">Inside Southern Gulf Islands</MenuItem>
                  <MenuItem value="San Juan Islands">San Juan Islands</MenuItem>
                  <MenuItem value="Barkley Sound">Barkley Sound</MenuItem>
                  <MenuItem value="NE Vancouver Island">NE Vancouver Island</MenuItem>
                  <MenuItem value="Central Coast">Central Coast</MenuItem>
                  <MenuItem value="Strait of Juan de Fuca">Strait of Juan de Fuca</MenuItem>
                  <MenuItem value="Campbell River">Campbell River</MenuItem>
                  <MenuItem value="Northern Gulf Islands">Northern Gulf Islands</MenuItem>
                  <MenuItem value="Sunshine Coast North">Sunshine Coast North</MenuItem>
                  <MenuItem value="Sunshine Coast South">Sunshine Coast South</MenuItem>
                  <MenuItem value="Nanaimo">Nanaimo</MenuItem>
                  <MenuItem value="Sechelt">Sechelt</MenuItem>
                  <MenuItem value="Jervis Inlet">Jervis Inlet</MenuItem>
                  <MenuItem value="Parksville">Parksville</MenuItem>
                  <MenuItem value="Victoria">Victoria</MenuItem>
                  <MenuItem value="Cape Lazo North">Cape Lazo North</MenuItem>
                  <MenuItem value="Agamemnon Channel">Agamemnon Channel</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <TextField placeholder="Specific Location" margin="normal" fullWidth value={this.state.specificLocation} onChange={this.handleText('specificLocation')} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <TextField placeholder="GPS (decimal degrees)" margin="normal" fullWidth value={this.state.gps} onChange={this.handleText('gps')} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <Select value={this.state.bottomType} displayEmpty onChange={this.handleText('bottomType')}>
                  <MenuItem value="">Dominant Bottom Type</MenuItem>
                  <MenuItem value="wall">wall</MenuItem>
                  <MenuItem value="boulders">boulders</MenuItem>
                  <MenuItem value="cobble">cobble</MenuItem>
                  <MenuItem value="silt">Silt</MenuItem>
                  <MenuItem value="bedrock">Bedrock</MenuItem>
                </Select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <TextField placeholder="Bottom Time" margin="normal" fullWidth value={this.state.bottomTime} onChange={this.handleText('bottomTime')} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <TextField placeholder="Additional Comments" fullWidth margin="normal" value={this.state.additionalComments} onChange={this.handleText('additionalComments')} multiline />
              </div>
              {nestList}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '0 auto', maxWidth: 580, paddingTop: 20 }}>
              {this.state.error !== '' ? (
                <div style={{ color: 'red' }}>
                  {this.state.error}
                </div>
              ) : ''}
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: 20 }}>
                {submitButton}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LingcodSurvey.propTypes = {
  submitted: PropTypes.bool,
  upload: PropTypes.func,
  slug: PropTypes.string,
};

export default LingcodSurvey;

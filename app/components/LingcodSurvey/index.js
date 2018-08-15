/**
*
* LingcodSurvey
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Hero from './Hero';
import HEROIMG from './hero.jpg';
import H1 from './H1';
import H2 from './H2';
import Divider from './Divider';
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
        phane: '',
        email: '',
      },
      generalLocation: '',
      specificLocation: '',
      bottomTime: '',
      nests: [],
      nestList: [],
      additionalComments: '',
      submitting: false,
      submitted: false,
    };
  }

  componentWillMount() {
    // this.handleNewNest();
    const nests = [];
    for (let i = 0; i < 20; i += 1) {
      nests.push({
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
    const { divera, diverb, divedate, generalLocation, specificLocation, bottomTime, nests, additionalComments } = this.state;
    const surveyData = {
      divera,
      diverb,
      divedate,
      generalLocation,
      specificLocation,
      bottomTime,
      nests,
      additionalComments,
    };

    this.props.upload({ files: [], name: 'lingcod', surveyData });
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
            <TextField placeholder="Depth" margin="normal" value={this.state.nests[i].depth} onChange={this.handleText(`nest-${i}-depth`)} />
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
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '0 auto', marginBottom: 20 }}>
              <H1 style={{ marginBottom: 5 }}>Lingcod Egg Mass Survey</H1>
              <Divider />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '0 auto', marginBottom: 20 }}>
              <H2>Calling All Divers</H2>
              <P>By taking part in the Annual Lingcod Egg Mass Survey, you are helping to gather important information about a valuable local resource. We should be very concerned when a stock has reached 3-5 percent of what it was a century ago. Divers participating in this annual survey collect information on the number, size, condition, and position of egg masses, as well as whether or not a guarding male is present. Data such as these help us determine the health of local lingcod populations.</P>
              <P>The 2018 Survey took place place January 27 to March 11, 2018. During this time divers gathered data on lingcod egg masses. The 2019 survey will take place early next year, please check back for updates.</P>
              <P>If you have any questions, or would like an information package sent to you, please email <a href="mailto:fishlab@vanaqua.org">fishlab@vanaqua.org</a>.</P>
              <P><strong>Note:</strong> Some instructions on data collection techniques have changed. Please download the Instruction Package and read it thoroughly before heading out on your dives. Thank You!</P>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '0 auto', marginBottom: 20 }}>
              <H2>How The Survey Began</H2>
              <P>In 1994, the Marine Life Sanctuaries Society (MLSS) created a project to involve the sport diving community in assisting with the collection of data on lingcod populations. At the time the commercial lingcod fishery in Georgia Strait had recently been closed, and the sport fishery was restricted by new size limits and annual bag limits. This project, now sponsored and organized by the Vancouver Aquarium, is called the Lingcod Egg Mass Survey (LEMS).</P>
              <H2>The Importance of Timing</H2>
              <P>The survey is carried out just after mature female lingcod spawn. After spawning, the female leaves the male to guard the nest site. The size of the egg mass indicates the age of the spawning female while the number of egg masses observed in a given area helps researchers determine lingcod abundance. The survey uses data collected by volunteer divers to evaluate the status of lingcod populations on the coast of B.C. These data provide information on the reproductive outputs of lingcod, as well as an insight into the age structure of the female lingcod population.</P>
              <H2>Natural Bottom Dwellers</H2>
              <P>The lingcod is a bottom dwelling fish that inhabits the local waters of B.C.&lsquo;s coast. Lingcod can grow up to 1.5 meters in length and weigh up to 45 kg. Lingcod spawn from December through to early April in the Strait of Georgia, with peak egg mass abundance in late February. The males guard the egg masses, which resemble Styrofoam, for over a month, until hatching. The behavior of the guarding male and the distinctive appearance of the egg masses are easily identified by volunteer divers.</P>
              <H2>Lingcod At The Aquarium</H2>
              <P>The lingcod projects at the Vancouver Aquarium, including the Lingcod Egg Mass Survey and lingcod rearing in the research laboratory, have emerged due to serious concerns regarding the overfishing of lingcod stocks. Strait of Georgia Lingcod stocks are just 7-22 percent of what they were 100 years ago except for the Vancouver area, at less than 1 percent. In 1990, the commercial fishery for lingcod was stopped and in 2002, sportfishing for lingcod was banned in the Strait of Georgia.<br /><a href="http://www.vanaqua.orf/learn/aquafacts/fish/lingcod" style={{ color: '#00B398' }}>Visit our lingcod AquaFacts</a></P>
            </div>
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
                    <TextField placeholder="Full Name" margin="normal" value={this.state.divera.name} onChange={this.handleText('diverAName')} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <TextField placeholder="Address" margin="normal" value={this.state.divera.address} onChange={this.handleText('diverAAddress')} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <TextField placeholder="Phone" margin="normal" value={this.state.divera.phone} onChange={this.handleText('diverAPhone')} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <TextField placeholder="Email" margin="normal" value={this.state.divera.email} onChange={this.handleText('diverAEmail')} />
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
                  <MenuItem value="">General Location...</MenuItem>
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
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <TextField placeholder="Specific Location" margin="normal" fullWidth value={this.state.specificLocation} onChange={this.handleText('specificLocation')} />
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

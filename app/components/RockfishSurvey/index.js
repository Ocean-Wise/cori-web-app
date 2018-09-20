/**
*
* RockfishSurvey
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from 'components/Button/Loadable';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Hero from './Hero';
import HEROIMG from './hero.jpg';
import H1 from './H1';
import H2 from './H2';
import Divider from './Divider';
import P from './P';

class RockfishSurvey extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      instructionsOpen: false,
      instructionsRead: false,
      divedate: '',
      name: '',
      address: '',
      phone: '',
      email: '',
      generalLocation: '',
      specificLocation: '',
      gps: '',
      bottomType: '',
      bottomTime: '',
      averageDepth: '',
      maximumDepth: '',
      speciesData: {
        quillbackAdults: '',
        quillbackJuvenile: '',
        quillbackBaby: '',
        copperAdults: '',
        copperJuvenile: '',
        copperBaby: '',
        yelloweyeAdults: '',
        yelloweyeJuvenile: '',
        yelloweyeBaby: '',
        yellowtailAdults: '',
        yellowtailJuvenile: '',
        yellowtailBaby: '',
        blackAdults: '',
        blackJuvenile: '',
        blackBaby: '',
        tigerAdults: '',
        tigerJuvenile: '',
        tigerBaby: '',
        pugetSoundAdults: '',
        pugetSoundJuvenile: '',
        pugetSoundBaby: '',
        vermillionAdults: '',
        vermillionJuvenile: '',
        vermillionBaby: '',
        canaryAdults: '',
        canaryJuvenile: '',
        canaryBaby: '',
        deaconAdults: '',
        deaconJuvenile: '',
        deaconBaby: '',
        widowAdults: '',
        widowJuvenile: '',
        widowBaby: '',
        silvergreyAdults: '',
        silvergreyJuvenile: '',
        silvergreyBaby: '',
        brownAdults: '',
        brownJuvenile: '',
        brownBaby: '',
        chinaAdults: '',
        chinaJuvenile: '',
        chinaBaby: '',
        boccacioAdults: '',
        boccacioJuvenile: '',
        boccacioBaby: '',
        otherAdults: '',
        otherJuvenile: '',
        otherBaby: '',
        unknownAdults: '',
        unknownJuvenile: '',
        unknownBaby: '',
      },
      additionalComments: '',
    };
  }

  updateSubmitted = () => {
    this.setState({ submitted: this.props.submitted });
  }


  doUpload = async () => {
    const { divedate, name, address, phone, email, generalLocation, specificLocation, gps, bottomType, bottomTime, averageDepth, maximumDepth, speciesData, additionalComments } = this.state;
    const surveyData = {
      divedate,
      name,
      address,
      phone,
      email,
      generalLocation,
      specificLocation,
      gps,
      bottomType,
      bottomTime,
      averageDepth,
      maximumDepth,
      speciesData,
      additionalComments,
    };

    this.props.upload({ files: [], name: 'rockfish', surveyData });
  }

  handleInstructions = (dir) => {
    let instructionsRead = false;
    if (dir) {
      instructionsRead = true;
    }
    this.setState({ instructionsOpen: !this.state.instructionsOpen, instructionsRead });
  }

  handleText = (type) => (event) => {
    if (type.includes('Adult') || type.includes('Juvenile') || type.includes('Baby')) {
      const { speciesData } = this.state;
      speciesData[type] = event.target.value;
      this.setState({ speciesData });
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

    const instructions = (
      <Dialog onClose={this.handleInstructions} open={this.state.instructionsOpen} aria-labelledby="instructions-dialog">
        <DialogTitle id="instructions-title">Instructions</DialogTitle>
        <DialogContent>
          <P>Read the <a href="https://assets.ctfassets.net/fsquhe7zbn68/1WXvrDsHPOia28OkY2w0UK/de1e90332b23cbdf881e41e323786f58/RAS_Survey_Instructions.pdf" target="_blank" rel="noopener noreferrer">PDF version</a> of these instructions</P>
          <H2>Determining The Age Of Rockfish</H2>
          <P>Adult rockfish are approximately 20 cm in length or longer. For most divers, this is length of your hand from your fingertip to wrist (looking at your palm). Please check your hand against this length before conducting the survey in order to be as accurate as possible.</P>
          <P>Rockfish smaller than your hand (20 cm) should be counted as Juvenile*.<br />Very young rockfish, pinky-finger-length and smaller, are differently coloured and should be counted as Baby**.</P>
          <P>* The only exception to this rule is a Puget Sound rockfish. Due to their small adult size, all Puget Sound rockfish should be counted as Adult.<br />** Baby rockfish, often up to 18 months age, can look very different from Juveniles and Adults and as such if you can send us video or a photo of the baby rockfish you encounter we can ID them for you.</P>
          <H2>Species Identification</H2>
          <P>Divers must be able to identify local rockfish species as adults and juveniles (but note that babies are differently coloured). If you are unsure of species ID let us help by sending us your dive videos or photos of rockfish and we’ll count and ID them for you. Please upload your video to <a href="https://youtube.com/" target="_blank">YouTube</a> or <a href="https://vimeo.com/" target="_blank">Vimeo</a>, and then <a href="mailto:fishlab@vanaqua.org">email</a> us the link. </P>
          <P>The most common species in the Strait of Georgia/Johnstone Strait/Haro Strait include: copper, quillback, yelloweye (red snapper), yellowtail, tiger and Puget Sound rockfish. Other species that may be seen include brown, black and vermilion rockfish amongst others. If you are unsure of a species, record it as UNKNOWN or capture it in a photo for us to ID.</P>
          <H2>Site Selection</H2>
          <P>Rockfish surveys should be conducted in areas known to have rockfish, which usually means complex rocky reef: rockfish like rocks! They often hide is crevices and caves. Surveys should not be conducted in areas with poor rockfish habitat such as sandy bottom or mud slopes. GPS coordinates for entry point, plus compass direction along shore from entry point are helpful</P>
          <H2>Data Collection</H2>
          <P>One diver should be responsible for recording the data on a slate. Any dive buddies should stay close to the data collector, helping to locate and point out rockfish in the area or to light for videotaping.</P>
          <P>Avoid double counting. If the dive has a fixed entry/exit point such as would occur on a shoreline dive, the divers should survey different depths for each direction traveled. For example, survey a depth of 45-60 feet in one direction, returning at a depth of 30-45 feet.</P>
          <P>Repeat surveys conducted at the same site are both welcome and necessary in order to build a solid data record for a given area. The idea is to repeat counts under different visibility conditions over an extended period (years). We no longer recommend winter/spring surveying, as data prove that extensive winter hiding occurs.</P>
          <H2>Bottom Times</H2>
          <P>Total bottom time is absolutely necessary in order to calculate the abundance of rockfish in a given area. For the survey, bottom times should include any decompression stops.</P>
          <Button onClick={this.handleInstructions} id="dialog-close">Close</Button>
        </DialogContent>
      </Dialog>
    );

    return (
      <div style={{ overflowX: 'hidden' }}>
        <Hero src={HEROIMG} alt={`${this.props.slug}-hero`} />
        <div style={{ padding: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '0 auto', maxWidth: 1100 }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '0 auto', marginBottom: 20 }}>
              <H1 style={{ marginBottom: 5 }}>The Rockfish Abundance Survey</H1>
              <Divider />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '0 auto', marginBottom: 20 }}>
              <H2>Annual Rockfish Abundance Survey</H2>
              <P>Are you a SCUBA diver? If so, Ocean Wise® can use your help with our Annual Rockfish Abundance Survey. Either count or video the rockfish you see on you dive and submit your data online to participate. Conservation of B.C.’s inshore rockfish species is a serious matter owing to the slow maturation, longevity and small home territories of these fishes. By surveying rockfish along the B.C. coast, we can monitor and continue to ensure these species thrive. In 2007, Fisheries and Oceans Canada finalized a total of 164 Rockfish Conservation Areas in BC to aid the recovery of B.C.’s inshore rockfish species.</P>
              <H2>Rockfish Conservation</H2>
              <P>Rockfish are an important species in rocky reef communities in B.C. However, rockfish tend to have a small home range and as such they are easy targets for fishermen. Following depletion of rockfish through the 1980s, protection for rockfish through Rockfish Conservation Areas has been an important step aiding the recovery of depleted inshore rockfish species.</P>
              <P>In addition to the Rockfish Abundance Survey, the Howe Sound Research and Conservation team has been monitoring copper rockfish winter hiding behaviour in Howe Sound to understand seasonal behaviour associated with shallow-water populations of copper rockfish. As a result of this research, the Annual Rockfish Abundance Survey is conducted primarily between August – October when rockfish are not hiding in rock piles and when visibility is best. The team also assisted with the transplant of Black Rockfish to Point Atkinson in the early 2000s as part of an effort to re-introduce a species that had been extirpated from Howe Sound in the 1960s. Since the transplant of Black Rockfish there have been successful year classes in 2004, 2006, 2008, 2010 and most recently in 2016.</P>
              <P>Read our <a href="https://assets.ctfassets.net/fsquhe7zbn68/X9nr4O0ZQkoWocSC2iYqa/674e14d52fd3957f49d303d0f069ce3c/Rockfish_Abundance_Survey_Report_2017.pdf" target="_blank" rel="noopener noreferrer">most recent report</a></P>
              <Button id="instructions" onClick={() => this.handleInstructions(false)}>Start by reading the instructions</Button>
              {instructions}
              <div style={{ maxWidth: 760, margin: '0 auto' }}>
                <h3>Data Collection Form</h3>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                      <h4>Diver Info:</h4>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                      <TextField fullWidth type="date" label="Dive date:" InputLabelProps={{ shrink: true }} value={this.state.divedate} onChange={this.handleText('divedate')} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                      <TextField fullWidth placeholder="Name" margin="normal" value={this.state.name} onChange={this.handleText('name')} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                      <TextField fullWidth placeholder="Address" margin="normal" value={this.state.address} onChange={this.handleText('address')} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                      <TextField fullWidth placeholder="Phone" margin="normal" value={this.state.phone} onChange={this.handleText('phone')} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                      <TextField fullWidth placeholder="Email" margin="normal" value={this.state.email} onChange={this.handleText('email')} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                      <Select fullWidth value={this.state.generalLocation} displayEmpty onChange={this.handleText('generalLocation')}>
                        <MenuItem value="">Area...</MenuItem>
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
                        <MenuItem value="Wall">Wall</MenuItem>
                        <MenuItem value="Boulders">Boulders</MenuItem>
                        <MenuItem value="Cobble">Cobble</MenuItem>
                        <MenuItem value="Silt">Silt</MenuItem>
                        <MenuItem value="Bedrock">Bedrock</MenuItem>
                      </Select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                      <TextField placeholder="Bottom Time" margin="normal" fullWidth value={this.state.bottomTime} onChange={this.handleText('bottomTime')} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                      <TextField placeholder="Average Depth" margin="normal" fullWidth value={this.state.averageDepth} onChange={this.handleText('averageDepth')} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                      <TextField placeholder="Maximum Depth" margin="normal" fullWidth value={this.state.maximumDepth} onChange={this.handleText('maximumDepth')} />
                    </div>
                  </div>
                  <hr />
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <Grid fluid>
                      <Row>
                        <Col xl={2}>
                          <h3>Species</h3>
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                        </Col>
                      </Row>
                      <Row>
                        <Col xl={2}>
                          Copper
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Adults" margin="normal" value={this.state.copperAdults} onChange={this.handleText('copperAdults')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Juvenile" margin="normal" value={this.state.copperJuvenile} onChange={this.handleText('copperJuvenile')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Baby" margin="normal" value={this.state.copperBaby} onChange={this.handleText('copperBaby')} />
                        </Col>
                      </Row>
                      <Row>
                        <Col xl={2}>
                          Quillback
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Adults" margin="normal" value={this.state.quillbackAdults} onChange={this.handleText('quillbackAdults')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Juvenile" margin="normal" value={this.state.quillbackJuvenile} onChange={this.handleText('quillbackJuvenile')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Baby" margin="normal" value={this.state.quillbackBaby} onChange={this.handleText('quillbackBaby')} />
                        </Col>
                      </Row>
                      <Row>
                        <Col xl={2}>
                          Vermillion
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Adults" margin="normal" value={this.state.vermillionAdults} onChange={this.handleText('vermillionAdults')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Juvenile" margin="normal" value={this.state.vermillionJuvenile} onChange={this.handleText('vermillionJuvenile')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Baby" margin="normal" value={this.state.vermillionBaby} onChange={this.handleText('vermillionBaby')} />
                        </Col>
                      </Row>
                      <Row>
                        <Col xl={2}>
                          Canary
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Adults" margin="normal" value={this.state.canaryAdults} onChange={this.handleText('canaryAdults')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Juvenile" margin="normal" value={this.state.canaryJuvenile} onChange={this.handleText('canaryJuvenile')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Baby" margin="normal" value={this.state.canaryBaby} onChange={this.handleText('canaryBaby')} />
                        </Col>
                      </Row>
                      <Row>
                        <Col xl={2}>
                          Yelloweye
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Adults" margin="normal" value={this.state.yelloweyeAdults} onChange={this.handleText('yelloweyeAdults')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Juvenile" margin="normal" value={this.state.yelloweyeJuvenile} onChange={this.handleText('yelloweyeJuvenile')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Baby" margin="normal" value={this.state.yelloweyeBaby} onChange={this.handleText('yelloweyeBaby')} />
                        </Col>
                      </Row>
                      <Row>
                        <Col xl={2}>
                          Tiger
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Adults" margin="normal" value={this.state.tigerAdults} onChange={this.handleText('tigerAdults')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Juvenile" margin="normal" value={this.state.tigerJuvenile} onChange={this.handleText('tigerJuvenile')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Baby" margin="normal" value={this.state.tigerBaby} onChange={this.handleText('tigerBaby')} />
                        </Col>
                      </Row>
                      <Row>
                        <Col xl={2}>
                          Puget Sound
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Adults" margin="normal" value={this.state.pugetSoundAdults} onChange={this.handleText('pugetSoundAdults')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Juvenile" margin="normal" value={this.state.pugetSoundJuvenile} onChange={this.handleText('pugetSoundJuvenile')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Baby" margin="normal" value={this.state.pugetSoundBaby} onChange={this.handleText('pugetSoundBaby')} />
                        </Col>
                      </Row>
                      <Row>
                        <Col xl={2}>
                          Yellowtail
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Adults" margin="normal" value={this.state.yellowtailAdults} onChange={this.handleText('yellowtailAdults')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Juvenile" margin="normal" value={this.state.yellowtailJuvenile} onChange={this.handleText('yellowtailJuvenile')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Baby" margin="normal" value={this.state.yellowtailBaby} onChange={this.handleText('yellowtailBaby')} />
                        </Col>
                      </Row>
                      <Row>
                        <Col xl={2}>
                          Black
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Adults" margin="normal" value={this.state.blackAdults} onChange={this.handleText('blackAdults')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Juvenile" margin="normal" value={this.state.blackJuvenile} onChange={this.handleText('blackJuvenile')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Baby" margin="normal" value={this.state.blackBaby} onChange={this.handleText('blackBaby')} />
                        </Col>
                      </Row>
                      <Row>
                        <Col xl={2}>
                          Deacon
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Adults" margin="normal" value={this.state.deaconAdults} onChange={this.handleText('deaconAdults')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Juvenile" margin="normal" value={this.state.deaconJuvenile} onChange={this.handleText('deaconJuvenile')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Baby" margin="normal" value={this.state.deaconBaby} onChange={this.handleText('deaconBaby')} />
                        </Col>
                      </Row>
                      <Row>
                        <Col xl={2}>
                          Widow
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Adults" margin="normal" value={this.state.widowAdults} onChange={this.handleText('widowAdults')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Juvenile" margin="normal" value={this.state.widowJuvenile} onChange={this.handleText('widowJuvenile')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Baby" margin="normal" value={this.state.widowBaby} onChange={this.handleText('widowBaby')} />
                        </Col>
                      </Row>
                      <Row>
                        <Col xl={2}>
                          Silvergrey
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Adults" margin="normal" value={this.state.silvergreyAdults} onChange={this.handleText('silvergreyAdults')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Juvenile" margin="normal" value={this.state.silvergreyJuvenile} onChange={this.handleText('silvergreyJuvenile')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Baby" margin="normal" value={this.state.silvergreyBaby} onChange={this.handleText('silvergreyBaby')} />
                        </Col>
                      </Row>
                      <Row>
                        <Col xl={2}>
                          Brown
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Adults" margin="normal" value={this.state.brownAdults} onChange={this.handleText('brownAdults')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Juvenile" margin="normal" value={this.state.brownJuvenile} onChange={this.handleText('brownJuvenile')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Baby" margin="normal" value={this.state.brownBaby} onChange={this.handleText('brownBaby')} />
                        </Col>
                      </Row>
                      <Row>
                        <Col xl={2}>
                          China
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Adults" margin="normal" value={this.state.chinaAdults} onChange={this.handleText('chinaAdults')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Juvenile" margin="normal" value={this.state.chinaJuvenile} onChange={this.handleText('chinaJuvenile')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Baby" margin="normal" value={this.state.chinaBaby} onChange={this.handleText('chinaBaby')} />
                        </Col>
                      </Row>
                      <Row>
                        <Col xl={2}>
                          Boccacio
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Adults" margin="normal" value={this.state.boccacioAdults} onChange={this.handleText('boccacioAdults')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Juvenile" margin="normal" value={this.state.boccacioJuvenile} onChange={this.handleText('boccacioJuvenile')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Baby" margin="normal" value={this.state.boccacioBaby} onChange={this.handleText('boccacioBaby')} />
                        </Col>
                      </Row>
                      <Row>
                        <Col xl={2}>
                          Other
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Adults" margin="normal" value={this.state.otherAdults} onChange={this.handleText('otherAdults')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Juvenile" margin="normal" value={this.state.otherJuvenile} onChange={this.handleText('otherJuvenile')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Baby" margin="normal" value={this.state.otherBaby} onChange={this.handleText('otherBaby')} />
                        </Col>
                      </Row>
                      <Row>
                        <Col xl={2}>
                          Unknown
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Adults" margin="normal" value={this.state.unknownAdults} onChange={this.handleText('unknownAdults')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Juvenile" margin="normal" value={this.state.unknownJuvenile} onChange={this.handleText('unknownJuvenile')} />
                        </Col>
                        <Col xl={3} style={{ marginLeft: 5, marginRight: 5 }}>
                          <TextField placeholder="# Baby" margin="normal" value={this.state.unknownBaby} onChange={this.handleText('unknownBaby')} />
                        </Col>
                      </Row>
                    </Grid>
                  </div>
                  <div style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <TextField placeholder="Additional Comments" fullWidth margin="normal" value={this.state.additionalComments} onChange={this.handleText('additionalComments')} />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', margin: '0 auto', maxWidth: 580, paddingTop: 20 }}>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: 20 }}>
                    {submitButton}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RockfishSurvey.propTypes = {
  submitted: PropTypes.bool,
  upload: PropTypes.func,
  slug: PropTypes.string,
};

export default RockfishSurvey;

/**
*
* AnnapolisSurvey
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button/Loadable';
import TextField from '@material-ui/core/TextField';
import SurveyCopy from 'components/SurveyCopy';

import Dropzone from 'react-dropzone';

import Hero from './Hero';
import HEROIMG from './hero.jpg';
import P from './P';

class AnnapolisSurvey extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      name: '',
      nameError: false,
      email: '',
      emailError: false,
      divedate: '',
      dateError: false,
      videoLink: '',
      comments: '',
      submitting: false,
      submitted: false,
      error: '',
    };
  }

  // Check if we have recieved an updated submitted prop. Update our state with it
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.updateSubmitted();
    }
  }

  // Handle dropping files onto our file upload box
  onDrop = (files) => {
    this.setState({ files });
  }

  updateSubmitted = () => {
    this.setState({ submitted: this.props.submitted });
  }

  // A proper asyncronous forEach loop
  asyncForEach = async (array, callback) => {
    for (let i = 0; i < array.length; i += 1) {
      await callback(array[i], i, array) // eslint-disable-line
    }
  }

  /**
   * Loop over our files and return them as an array of objects
   * containing the file name, MIME type, and base64 encoded data
   */
  readFiles = async (files) => {
    const fileData = [];
    await this.asyncForEach(files, async (file) => {
      await this.readFile(file).then((data) => {
        fileData.push({
          name: file.name,
          type: file.type,
          base64: data,
        });
      });
    });
    return fileData;
  }

  // Promise to read a file as a base64 encoded string
  readFile = (file) => new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => {
      const fileAsBinaryString = reader.result;
      res(fileAsBinaryString);
    };
    reader.onabort = () => rej();
    reader.onerror = () => rej();

    reader.readAsDataURL(file);
  });

  /**
   * Do our file upload.
   * Read our files and corral our survey data.
   * Then call the passed Redux dispatch function prop with our data
   */
  doUpload = async () => {
    const { name, email, divedate, videoLink, comments } = this.state;

    // Check if the required name, email, and dive date fields have been filled in
    let nameError = false;
    let emailError = false;
    let dateError = false;

    if (name === '') nameError = true;
    if (email === '') emailError = true;
    if (divedate === '') dateError = true;
    this.setState({ nameError, emailError, dateError, submitting: false }); // Set the error state values

    if (nameError || emailError || dateError) {
      // At least one field has not been completed to exit the function and do not submit data
      return false;
    }

    // Begin submission process
    this.setState({ submitting: true });
    // Read the files the user has selected for uploading
    const files = await this.readFiles(this.state.files);

    // Create our surveyData object from the user's entered information
    const surveyData = {
      name,
      email,
      divedate,
      videoLink,
      comments,
    };

    // Call the Redux function with our data and return
    this.props.upload({ files, name: 'annapolis', surveyData });
    return true;
  }

  // Update our survey data text fields
  handleText = (type) => (event) => {
    this.setState({ [type]: event.target.value });
  }

  render() {
    // Render the user's selected images, if any, as a series of tiny images and their file sizes
    const images = this.state.files.length > 0 ? (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 25 }}>
        <aside>
          <h2 style={{ textAlign: 'center' }}>Selected image files</h2>
          <div style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap', maxWidth: 550 }}>
            {
              this.state.files.map((f) => (
                <div key={f.name} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <img src={f.preview} height="50" alt={`${f.name}-preview`} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    {/* File sizes are given to us in bytes, so convert to megabytes and round to one decimal place */}
                    {Math.floor((f.size / 1000000.0) * 10) / 10}MB
                  </div>
                </div>
              ))
            }
          </div>
        </aside>
      </div>
    ) : '';

    // If the user submission was successful say so, else if submitting say that, else show submit button
    const submitButton = this.state.submitted ? ( // eslint-disable-line
      <P><strong>Thank you for your submission!</strong></P>
    ) : this.state.submitting ? (
      <Button id="upload">Submitting...</Button>
    ) : (
      <Button id="upload" onClick={this.doUpload}>Submit Survey</Button>
    );

    return (
      <div style={{ overflowX: 'hidden' }}>
        <Hero src={HEROIMG} alt={`${this.props.slug}-hero`}>
          <span id="attribution">Photo Credit: Amy Morgan-Young</span>
        </Hero>
        <div style={{ padding: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '0 auto', maxWidth: 1100 }}>
            <SurveyCopy surveySlug="annapolis" />
            <div style={{ maxWidth: 580, margin: '0 auto' }}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <TextField error={this.state.nameError} placeholder="Full Name (required)" margin="normal" value={this.state.name} onChange={this.handleText('name')} />
                <TextField error={this.state.emailError} placeholder="Email (required)" margin="normal" value={this.state.email} onChange={this.handleText('email')} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <TextField error={this.state.dateError} type="date" label="Dive Date (required)" InputLabelProps={{ shrink: true }} value={this.state.divedate} onChange={this.handleText('divedate')} />
                <TextField placeholder="Video Link" margin="normal" value={this.state.videoLink} onChange={this.handleText('videoLink')} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <TextField placeholder="Comments" margin="normal" fullWidth multiline value={this.state.comments} onChange={this.handleText('comments')} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '0 auto', maxWidth: 580, paddingTop: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Dropzone onDrop={this.onDrop} accept={['image/png', 'image/jpeg']}>
                  <p style={{ margin: '0 auto', position: 'relative', textAlign: 'center', top: 64 }}>Drop your PNG or JPEG images here, or click to select</p>
                </Dropzone>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: 20 }}>
                {submitButton}
              </div>
            </div>
            {images}
          </div>
        </div>
      </div>
    );
  }
}

AnnapolisSurvey.propTypes = {
  upload: PropTypes.func.isRequired,
  slug: PropTypes.string,
  submitted: PropTypes.bool,
};

export default AnnapolisSurvey;

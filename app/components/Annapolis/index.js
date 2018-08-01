/**
*
* Annapolis
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import Dropzone from 'react-dropzone';

class Annapolis extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }

  onDrop = (files) => {
    this.setState({ files });
  }

  asyncForEach = async (array, callback) => {
    for (let i = 0; i < array.length; i += 1) {
      await callback(array[i], i, array) // eslint-disable-line
    }
  }

  readFiles = async (files) => {
    const fileData = [];
    await this.asyncForEach(files, async (file) => {
      // console.log(file);
      await this.readFile(file).then((data) => {
        fileData.push({
          name: file.name,
          type: file.type,
          binaryData: data,
        });
      });
    });
    // console.log(fileData[0]);
    return fileData;
  }

  readFile = (file) => new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => {
      const fileAsBinaryString = reader.result;
      res(fileAsBinaryString);
    };
    reader.onabort = () => rej();
    reader.onerror = () => rej();

    reader.readAsBinaryString(file);
  });

  doUpload = async () => {
    // console.log('Doing upload...');

    const files = await this.readFiles(this.state.files);

    this.props.upload({ files, name: 'test' });
  }

  render() {
    return (
      <div>
        <div>
          <Dropzone onDrop={this.onDrop}>
            <p>Drop stuff here</p>
          </Dropzone>
          {/* <Button id="upload" onClick={this.doUpload}>Submit Survey</Button> */}
          <Button id="upload" onClick={this.doUpload}>Submit Survey</Button>
        </div>
        <aside>
          <h2>Dropped files</h2>
          <ul>
            {
              this.state.files.map((f) => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
      </div>
    );
  }
}

Annapolis.propTypes = {
  upload: PropTypes.func.isRequired,
};

export default Annapolis;

/**
*
* Button
*
*/

import React, { Children } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from '@material-ui/core/Button';

function Button(props) {
  const transition = 'all 0.2s cubic-bezier(0.23, 1, 0.23, 1) 0ms !important';

  const style = {
    root: {
      margin: 2.5,
      borderRadius: 0,
      fontFamily: "'Helvetica Neue', Helvatica, Arial, sans-serif",
      textTransform: 'unset',
    },
    button: {
      height: '40px',
      borderRadius: 0,
    },
    overlay: {
      height: '40px',
      paddingTop: '2px',
      paddingLeft: '45px',
      paddingRight: '45px',
      fontWeight: 700,
      borderRadius: 0,
    },
  };

  const primary = `
    #${props.id}:hover {
      background-color: rgb(0, 179, 152) !important;
      color: #efefef !important;
      font-size: 16px;
      font-weight: bold;
      line-height: 12px;
      text-transform: unset;
      border: 1px solid transparent !important;
      transition: ${transition};
    }
    #${props.id}:hover #svg {
      filter: brightness(0) invert(0.93);
    }
    #${props.id} {
      background-color: transparent !important;
      color: rgb(0, 179, 152) !important;
      font-size: 16px;
      font-weight: bold;
      line-height: 12px;
      text-transform: unset;
      border: 1px solid rgb(0, 179, 152) !important;
      transition: ${transition};
    }
  `;


  const inverted = `
    #${props.id}:hover {
      background-color: #00B398 !important;
      color: #F5F5F5 !important;
      font-size: 16px;
      font-weight: bold;
      line-height: 12px;
      border: 1px solid #00B398 !important;
      transition: ${transition};
      width: ${props.width ? `${props.width}px` : '200px'};
      height: ${props.height ? `${props.height}px` : '45px'};
      ${props.noMargin ? 'margin: 0px !important;' : ''}
    }
    #${props.id} {
      background-color: transparent !important;
      color: #00B398 !important;
      font-size: 16px;
      font-weight: bold;
      line-height: 12px;
      border: 1px solid #00B398 !important;
      transition: ${transition};
      width: ${props.width ? `${props.width}px` : '200px'};
      height: ${props.height ? `${props.height}px` : '45px'};
      ${props.noMargin ? 'margin: 0px !important;' : ''}
    }
  `;

  const noBorder = `
    #${props.id} {
      ${props.selected ? `
        background-color: #00B398 !important;
        color: #FFFFFF;
      ` : `
        background-color: trasparent !important;
        color: #00B398 !important;
      `}
      font-size: 12px;
      line-height: 18px;
      text-transform: uppercase !important;
    }
    #${props.id}:hover {
      ${props.selected ? `
        // background-color: transparent !important;
        background-color: #E9EEF6 !important;
        color: #00B398 !important;
      ` : `
        background-color: #E9EEF6 !important;
      `}
    }
  `;

  const publication = `
    #${props.id}:hover {
      background-color: rgb(0, 179, 152) !important;
      color: #efefef !important;
      font-size: 16px;
      font-weight: bold;
      line-height: 12px;
      text-transform: unset;
      border: 1px solid transparent !important;
      transition: ${transition};
    }
    #${props.id}:hover #svg {
      filter: brightness(0) invert(0.93);
    }
    #${props.id} {
      background-color: transparent !important;
      color: rgb(0, 179, 152) !important;
      font-size: 16px;
      font-weight: bold;
      line-height: 12px;
      text-transform: unset;
      border: 1px solid rgb(0, 179, 152) !important;
      transition: ${transition};
      max-width: 144px;
      margin-left: 0 !important;
    }
  `;

  let theme;
  if (props.inverted) {
    theme = inverted;
  } else if (props.noBorder) {
    theme = noBorder;
  } else if (props.publication) {
    theme = publication;
  } else {
    theme = primary;
  }

  return (
    <div style={{ display: 'inline-block' }}>
      <style>
        {theme}
      </style>
      <RaisedButton id={props.id} style={style.root} target={props.href ? '_blank' : ''} href={props.href} onClick={props.onClick}>
        {Children.toArray(props.children)}
      </RaisedButton>
    </div>
  );
}

Button.propTypes = {
  inverted: PropTypes.bool,
  noBorder: PropTypes.bool,
  id: PropTypes.string,
  children: PropTypes.node.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  noMargin: PropTypes.bool,
  publication: PropTypes.bool,
  href: PropTypes.string,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
};

export default Button;

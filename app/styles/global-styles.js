import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  input + div span {
    top: -11px !important;
    left: 0 !important;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    padding: 0 !important;
  }

  body.fontLoaded {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }
  a {
    text-decoration: none !important;
    color: inherit !important;
  }

  .ScrollUpButton__Container {
    position: fixed;
    bottom: 20px;
    width: 50px;
    transition: all 0.5s ease-in-out;
    transition-property: : opacity, right;
    opacity: 0;
    right: -75px;
  }
  .ScrollUpButton__Toggled {
    opacity: 1;
    right: 20px;
  }

  .search-paper {
    width: 100%;
    height: 100%;
  }
  @media all and (min-width: 1025px) {
    .search-paper {
      width: 35%;
      height: unset;
    }
  }

  #menu-sort {
    top: 46px;
  }

  .ais-SearchBox-input {
    padding-left: 45px;
    border: 1px solid #B2BEC4;
    border-radius: 2px;
    height: 56px;
    &::placeholder {
      color: #8D8D8D;
    }
  }
  .ais-SearchBox-submit {
    left: 0.8rem;
  }
  .ais-SearchBox-submitIcon {
    width: 20px;
    height: 20px;
    margin-left: 4px;
  }
  .ais-SearchBox-submitIcon path {
    fill: #CED5D9;
  }
  .ais-Highlight-highlighted {
    background-color: rgba(0, 179, 152, 0.3);
  }
  .ais-MultiIndex__root {
    margin-top: 8px;
  }

  ul.pagination {
    display: inline-block;
    padding-left: 0;
    padding-right: 15px;
    margin-top: 33px;
  }

  ul.pagination a:active {
    text-decoration: none;
    outline: 0;
  }

  ul.pagination a:hover {
    text-decoration: none;
    border: none;
    outline: 0;
  }

  ul.pagination a:focus {
    outline: 0;
  }

  ul.pagination a {
    padding: 15px;
    margin-left: -15px;
    margin-right: -15px;
    user-select: none;
  }

  ul.pagination li {
    display: inline-block;
    padding: 10px 15px;
    cursor: pointer;
    border: 1px solid #B2BEC4;
    border-right: 0;
    background-color: #FFF;
  }

  ul.pagination .active {
    background-color: #00B398;
  }


  li.previous {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  li.next {
    border-right: 1px solid #B2BEC4 !important;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .break-me a {
    cursor: default;
  }
`;

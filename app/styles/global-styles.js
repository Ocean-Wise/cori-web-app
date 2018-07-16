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
`;

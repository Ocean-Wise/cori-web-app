/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import HomePage from 'containers/HomePage/Loadable';
import Team from 'containers/Team/Loadable';
import ResearchArea from 'containers/ResearchArea/Loadable';
import Program from 'containers/Program/Loadable';
import Project from 'containers/Project/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Footer from 'components/Footer';

const AppWrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;


export default function App() {
  return (
    <MuiThemeProvider>
      <AppWrapper>
        <Helmet
          titleTemplate="%s - React.js Boilerplate"
          defaultTitle="React.js Boilerplate"
        >
          <meta name="description" content="A React.js Boilerplate application" />
        </Helmet>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/team/:slug" component={Team} />
          <Route path="/team" component={Team} />
          <Route path="/research/:slug" component={ResearchArea} />
          <Route path="/program/:slug" component={Program} />
          <Route path="/project/:slug" component={Project} />
          <Route path="" component={NotFoundPage} />
        </Switch>
        <Footer />
      </AppWrapper>
    </MuiThemeProvider>
  );
}

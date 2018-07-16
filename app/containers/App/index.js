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

import HomePage from 'containers/HomePage/Loadable';
import About from 'containers/About/Loadable';
import Team from 'containers/Team/Loadable';
import ResearchArea from 'containers/ResearchArea/Loadable';
import Program from 'containers/Program/Loadable';
import Project from 'containers/Project/Loadable';
import Publications from 'containers/Publications';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Footer from 'components/Footer';

import ScrollUpButton from 'react-scroll-up-button';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import IconButton from '@material-ui/core/IconButton';

import ApolloWrapper from 'containers/ApolloWrapper';

const AppWrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const ScrollWrapper = styled.div`
  z-index: 15;
`;

export default function App() {
  return (
    <AppWrapper>
      <ApolloWrapper>
        <Helmet
          titleTemplate="%s - Ocean Wise Research"
          defaultTitle="Ocean Wise Research"
        >
          <meta name="description" content="Ocean Wise Research" />
        </Helmet>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={About} />
          <Route path="/team/:slug" component={Team} />
          <Route path="/team" component={Team} />
          <Route path="/research/:slug" component={ResearchArea} />
          <Route path="/program/:slug" component={Program} />
          <Route path="/project/:slug" component={Project} />
          {/* This comment is, for some reason, required for routes to actually render when Linked to... */}
          <Route path="/publications/:slug" component={Publications} />
          <Route path="/publications" component={Publications} />
          <Route path="" component={NotFoundPage} />
        </Switch>
        <Footer />
      </ApolloWrapper>
      <ScrollWrapper>
        <ScrollUpButton
          StopPosition={0}
          TransitionBtnPosition={150}
          EasingType="easeOutCubic"
          AnimationDuration={500}
          ContainerClassName="ScrollUpButton__Container"
          TransitionClassName="ScrollUpButton__Toggled"
        >
          <IconButton style={{ backgroundColor: 'rgba(95,95,95,0.4313725490)' }}>
            <ArrowUpward />
          </IconButton>
        </ScrollUpButton>
      </ScrollWrapper>
    </AppWrapper>
  );
}

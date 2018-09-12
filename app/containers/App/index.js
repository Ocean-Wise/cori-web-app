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
import ReactGA from 'react-ga';

import HomePage from 'containers/HomePage/Loadable';
import About from 'containers/About/Loadable';
import Media from 'containers/Media/Loadable';
import Team from 'containers/Team/Loadable';
import ResearchArea from 'containers/ResearchArea/Loadable';
import Program from 'containers/Program/Loadable';
import Project from 'containers/Project/Loadable';
import Publications from 'containers/Publications';
import Survey from 'containers/Survey';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Footer from 'components/Footer';
import ContentfulEdit from 'components/ContentfulEdit';

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
  z-index: 2147483647;
`;

const REACT_APP_ENV = process.env.NODE_ENV;

const isProd = REACT_APP_ENV === 'production' && !(window.location.host.includes('cori-staging'));

ReactGA.initialize('UA-305660-37');

export default function App() {
  const contentfulEdit = isProd ? '' : <ContentfulEdit />;
  ReactGA.pageview(window.location.pathname);
  return (
    <AppWrapper>
      <ApolloWrapper>
        <Helmet
          titleTemplate="%s - Ocean Wise Research"
          defaultTitle="Ocean Wise Research"
        >
          {/* Search Engine */}
          <meta name="description" content="Ocean Wise Research contributes to knowledge and understanding of individuals, populations and habitats through a combination of studies carried out in the wild and with the animals living at the Vancouver Aquarium. Field research is largely carried out under the auspices of the Coastal Ocean Research Institute (CORI)." />
          <meta name="image" content="http://images.ctfassets.net/fsquhe7zbn68/7hl1kxd9XG8OmgQsWu6S4c/c51e91dcc782cca4f4df977cefbf1cc6/Resources_title_picture.jpg" />
          {/* Schema.org for Google */}
          {/* eslint-disable */}
          <meta itemprop="name" content="Ocean Wise Research" />
          <meta itemprop="description" content="Ocean Wise Research contributes to knowledge and understanding of individuals, populations and habitats through a combination of studies carried out in the wild and with the animals living at the Vancouver Aquarium. Field research is largely carried out under the auspices of the Coastal Ocean Research Institute (CORI)." />
          <meta itemprop="image" content="http://images.ctfassets.net/fsquhe7zbn68/7hl1kxd9XG8OmgQsWu6S4c/c51e91dcc782cca4f4df977cefbf1cc6/Resources_title_picture.jpg" />
          {/* eslint-enable */}
          {/* Twitter */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="Ocean Wise Research" />
          <meta name="twitter:description" content="Ocean Wise Research contributes to knowledge and understanding of individuals, populations and habitats through a combination of studies carried out in the wild and with the animals living at the Vancouver Aquarium. Field research is largely carried out under the auspices of the Coastal Ocean Research Institute (CORI)." />
          {/* Open Graph general (Facebook, Pinterest & Google+) */}
          <meta name="og:title" content="Ocean Wise Research" />
          <meta name="og:description" content="Ocean Wise Research contributes to knowledge and understanding of individuals, populations and habitats through a combination of studies carried out in the wild and with the animals living at the Vancouver Aquarium. Field research is largely carried out under the auspices of the Coastal Ocean Research Institute (CORI)." />
          <meta name="og:image" content="http://images.ctfassets.net/fsquhe7zbn68/7hl1kxd9XG8OmgQsWu6S4c/c51e91dcc782cca4f4df977cefbf1cc6/Resources_title_picture.jpg" />
          <meta name="og:url" content="https://research.ocean.org" />
          <meta name="og:site_name" content="Ocean Wise Research" />
          <meta name="og:type" content="website" />
        </Helmet>
        {contentfulEdit}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={About} />
          <Route path="/media" component={Media} />
          <Route path="/team/:slug" component={Team} />
          <Route path="/team" component={Team} />
          <Route path="/research/:slug" component={ResearchArea} />
          <Route path="/program/:slug" component={Program} />
          <Route path="/project/:slug" component={Project} />
          {/* This comment is, for some reason, required for routes to actually render when Linked to... */}
          <Route path="/publications/:slug" component={Publications} />
          <Route path="/publications" component={Publications} />
          <Route path="/survey/:slug" component={Survey} />
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

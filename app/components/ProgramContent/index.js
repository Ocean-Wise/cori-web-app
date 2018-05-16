/**
*
* ProgramContent
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
// import ReactMarkdown from 'react-markdown';
import getProgram from 'graphql/queries/getProgram.graphql';

import Breadcrumbs from 'components/Breadcrumbs';
import Hero from './Hero';
import Container from './Container';

function ProgramContent({ data: { programs }, slug, match }) {
  let program = {};

  try {
    program = programs[0];
    return (
      <div>
        <Hero src={program.hero.url} alt={program.hero.title} />
        <Container>
          <Breadcrumbs slug={slug} location={match} />
        </Container>
      </div>
    );
  } catch (err) {
    return <div></div>;
  }
}

ProgramContent.propTypes = {
  data: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
};

export default graphql(getProgram, {
  options: (props) => ({
    variables: {
      slug: `fields.slug=${props.slug}`,
    },
  }),
})(ProgramContent);

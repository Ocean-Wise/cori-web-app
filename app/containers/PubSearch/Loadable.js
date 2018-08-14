/**
 *
 * Asynchronously loads the component for Search
 *
 */

import React from 'react';
import Loadable from 'react-loadable';
import Loading from './loading';

export default Loadable({
  loader: () => import('./index'),
  loading: () => <Loading />,
});

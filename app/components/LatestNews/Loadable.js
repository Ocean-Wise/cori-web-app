/**
 *
 * Asynchronously loads the component for LatestNews
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});

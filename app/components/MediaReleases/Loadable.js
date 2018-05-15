/**
 *
 * Asynchronously loads the component for MediaReleases
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});

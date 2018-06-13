/**
 *
 * Asynchronously loads the component for GetPublications
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});

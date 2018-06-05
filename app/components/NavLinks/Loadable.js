/**
 *
 * Asynchronously loads the component for NavLinks
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});

/**
 *
 * Asynchronously loads the component for ProjectContent
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});

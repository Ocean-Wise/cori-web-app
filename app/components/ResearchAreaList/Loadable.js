/**
 *
 * Asynchronously loads the component for ResearchAreaList
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});

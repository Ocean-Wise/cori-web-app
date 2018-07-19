/**
 *
 * Asynchronously loads the component for ResearchAreaTag
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});

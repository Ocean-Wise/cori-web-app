/**
 *
 * Asynchronously loads the component for ResearchOverviewTilesIe
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});

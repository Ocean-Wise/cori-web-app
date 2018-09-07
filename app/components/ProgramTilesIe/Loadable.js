/**
 *
 * Asynchronously loads the component for ProgramTilesIe
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});

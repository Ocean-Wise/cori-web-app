/**
 *
 * Asynchronously loads the component for ProgramContentIe
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});

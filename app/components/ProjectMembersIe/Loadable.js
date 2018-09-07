/**
 *
 * Asynchronously loads the component for ProjectMembersIe
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});

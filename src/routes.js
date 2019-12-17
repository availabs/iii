
// -- Landing Routes
import Landing from './pages/Landing'

// -- Public Pages
import Public from './pages/Public/Home/'
import DataExplorer from './pages/Public/DataExplorer/'
import DataSnapshots from './pages/Public/DataSnapshots/'
import Methodology from './pages/Public/Methodology/'
import Team from './pages/Public/Team/'
import NoMatch from './pages/404.js'

const routes = [
        ...Public,
        ...DataExplorer,
        ...DataSnapshots,
        ...Methodology,
        ...Team,
    Landing,
    NoMatch
];
export default {
    routes: routes
}
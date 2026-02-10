import { type RouteConfig, route } from '@react-router/dev/routes'

export default [
  route('/driver', './pages/driver-page/index.tsx'),
  route('/observer', './pages/observer-page/index.tsx'),

  // * matches all URLs, the ? makes it optional so it will match / as well
  route('*?', 'catchall.tsx')
] satisfies RouteConfig

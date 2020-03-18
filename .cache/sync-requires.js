const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/home/zomervinicius/projects/college/7_semestre/coronavirusbr/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/home/zomervinicius/projects/college/7_semestre/coronavirusbr/src/pages/404.js"))),
  "component---src-pages-contact-js": hot(preferDefault(require("/home/zomervinicius/projects/college/7_semestre/coronavirusbr/src/pages/contact.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/home/zomervinicius/projects/college/7_semestre/coronavirusbr/src/pages/index.js")))
}


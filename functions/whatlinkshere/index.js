const Xray = require('x-ray');
const x = Xray();

module.exports = async (event, context) => {
  const limit = event.queryStringParameters.limit | 2000000;
  const target = event.queryStringParameters.target;

  const results = await x(`https://en.wikipedia.org/w/index.php?title=Special%3AWhatLinksHere&limit=${limit}&target=${target}&namespace=0`, '#mw-whatlinkshere-list > li', [{
    title: 'a',
    link: 'a@href',
    redirects: x('ul > li', [{ title: 'a', link: 'a@href' }])
  }])

  return {
    statusCode: 200,
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(results, null, 2),
  };
}

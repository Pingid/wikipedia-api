const Xray = require('x-ray');
const axios = require('axios');

const prom = f => (...args) =>
  new Promise((resolve, reject) => f(...args)((err, res) => err ? reject(err) : resolve(res)))

const x = Xray();

module.exports = async (event, context) => {

  const url = await (async () => {
    if (event.queryStringParameters && event.queryStringParameters.url) return event.queryStringParameters.url;
    return axios({ url: 'https://en.wikipedia.org/wiki/Special:Random', maxRedirects: 1 })
      .then(x => x.request.res.responseUrl)
  })()

  const results = await x(url, {
    title: 'h1',
    paragraphs: ['p'],
    links: x('p', [{ link: 'a@href', text: 'a' }]),
    categories: x('#mw-normal-catlinks > ul > li', [{
      link: 'a@href',
      title: 'a'
    }])
  })
  .then(x => x)

  return {
    statusCode: 200,
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(results, null, 2),
  };
}

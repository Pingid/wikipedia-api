const Xray = require('x-ray');
const x = Xray();

module.exports = async (event, context) => {
  const category = event.queryStringParameters.category;

  const results = await x(`https://en.wikipedia.org/wiki/Special:CategoryTree?target=Category%3A${category}&mode=categories&namespaces=0&title=Special%3ACategoryTree`, {
    parents: x('div.CategoryTreeParents > span', [{
      title: 'a',
      link: 'a@href'
    }]),
    children: x('.CategoryTreeChildren > div.CategoryTreeSection', [{
      title: 'div.CategoryTreeItem > a',
      link: 'div.CategoryTreeItem > a@href',
    }])
  })

  return {
    statusCode: 200,
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(results, null, 2),
  };
}

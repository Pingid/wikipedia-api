const axios = require('axios');

module.exports = async (event, context) => {
  const search = event.queryStringParameters.search;
  const limit = event.queryStringParameters.limit | 10;
  
  const { data } = await axios({
    url: `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&formatversion=2&search=${search}&namespace=0&limit=${limit}&suggest=true`
  })

  const formated = data[1].map((title, i) => ({
    title,
    description: data[2][i],
    link: data[3][i]
  }))

  return {
    statusCode: 200,
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(formated, null, 2),
  };
}

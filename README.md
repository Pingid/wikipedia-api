# Wikipedia API Lamda functions

To deploy the functions to aws first install [serverless](https://serverless.com/framework/docs/providers/aws/guide/quick-start/) framework and [setup](https://serverless.com/framework/docs/providers/aws/guide/credentials/) your AWS credentials. Then simply...

```
git clone https://github.com/Pingid/wikipedia-api;
cd wikipedia-api;
npm install;
serverless deploy;
```

To start a local sever run: ```serverless offline``` 

## API

Endpoint | Query Paramters | Return Data
:------------|-----------------------|--------------------------------------------------
**/page** | ?url={page url} | ```{ paragraphs: [String], links: [{ title: String, link: String }]}``` 
**/search** | ?search={search string}&limit={n} | ```[{ title: Page Title, descritption: Page Description, link: Page URL }]``` 
**/whatlinkshere** | ?target={Page Title}&limit={n} | ```[{ title: Page Title, link: Page URL, redirects: [{ title: page the links to the parent page that ultimatel redirects to the queried page, link: URL }] }]``` 
**/categorytree** | ?category={wikipedia category} | ```{ parents: [{ title }], children: [{ title, link }]}``` 

## Contribution

Feel free to contribute by extending the API, improving the functionality or documentation.


import { gql } from 'graphql-request'
import sortNewsByImage from './sortNewsByImage'


// interface FecthNewsProps {
//   category?: Category | string
//   keywords?: string
//   isDynamic?: boolean 
// }

export async function fecthNews( 
  category?: Category | string,
  keywords?: string,
  isDynamic?: boolean 
 ){
  // GraphQL query
  const query = gql`
    query MyQuery (
      $access_key: String!
      $categories: String!
      $keywords: String
    ){
      myQuery(
        access_key: $access_key
        categories: $categories
        countries: "gb"
        sort: "published_desc"
        keywords: $keywords
        ) {
        data {
          country
          image
          language
          published_at
          source
          title
          url
          author
          category
          description
        }
        pagination {
          count
          limit
          offset
          total
        }
      }
    }
  `

  // Fetch function with Next.js 13 caching...
  const res = await fetch('https://naunhof.stepzen.net/api/listening-lizard/__graphql', {
    method: 'POST',
    cache: isDynamic ? 'no-cache' : 'default',
    next: isDynamic ? {revalidate: 0} : { revalidate: 60},
    headers:{
      "Content-Type": "application/json",
      Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`
    },
    body: JSON.stringify({
      query,
      variables: {
        access_key: process.env.MEDIASTACK_API_KEY,
        categories: category,
        keywords: keywords,
      }
    })
    }
  )

  console.log("Loading NEW DATA FROM API for category >>>>>",
  category,
  "and",
  keywords
  )

  const newsResponse = await res.json()

  // Sort function by images VS not images present
  const news = sortNewsByImage(newsResponse.data.myQuery)
  // return news

  return news
}


// stepzen import curl http://api.mediastack.com/v1/news?access_key=c009dba1756d90b3a5f611f5aa319efe&sources=business,sports
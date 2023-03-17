import { gql } from 'graphql-request'
import sortNewsByImage from './sortNewsByImage'


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
        countries: "br, us"
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
    next: isDynamic ? {revalidate: 0} : { revalidate: 60 * 10 }, //10 minutes
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

  const newsResponse = await res.json()

  // Sort function by images VS not images present
  const news = sortNewsByImage(newsResponse.data.myQuery)
  // return news

  return news
}

import { categories } from '../constants'
import { fecthNews } from '../utils/fetchNews'
import NewsList from './NewsList'
import response from '../response.json'
import sortNewsByImage from '../utils/sortNewsByImage'

export const metadata = {
  title: 'TheBrabus News'
}

export default async function Home (){


  const news: NewsResponse = sortNewsByImage(response) 
  // || await fecthNews(categories.join(','))

  return(
    <div>
      <NewsList 
        news={news}
      />

    </div>
  )
}
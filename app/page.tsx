import { categories } from '../constants'
import { fecthNews } from '../utils/fetchNews'
import NewsList from './NewsList'

export const metadata = {
  title: 'TheBrabus News'
}

export default async function Home (){


  const news: NewsResponse = await fecthNews(categories.join(','))

  return(
    <div>
      <NewsList 
        news={news}
      />

    </div>
  )
}
import { categories } from '../constants'
import { fecthNews } from '../utils/fetchNews'

export const metadata = {
  title: 'TheBrabus News'
}

export default async function Home (){

  // const category = categories.join(',')

  const news: NewsResponse = await fecthNews(categories.join(','))

  console.log(news)
  return(
    <div>
    {/* NewsList news */}

    </div>
  )
}
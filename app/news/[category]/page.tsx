interface NewsCategoryProps{
  params: {category: Category}
}
import { categories } from "../../../constants"
import { fecthNews } from "../../../utils/fetchNews"
import NewsList from "../../NewsList"

export default async function NewsCategory({params: { category}}: NewsCategoryProps){

  const news: NewsResponse = await fecthNews(category)

  return (
    <div>
      <h1 className="headerTitle">{category}</h1>
      <NewsList news={news} />
    </div>
  )
}

export async function generateStaticParams(){
  return categories.map(category => ({
    category: category
  }))
}
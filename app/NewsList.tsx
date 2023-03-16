import Article from "./Article"

interface NewsListProps {
  news: NewsResponse
}

export default function NewsList({news} : NewsListProps){
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-10 gap-10">
        {news.data.map(article => (
          <Article key={article.title} article={article}/>
        ))}
      
    </main>
  )
}
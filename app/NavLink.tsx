import Link from "next/link"

interface NavLinkProps {
  category: string
  isActive: boolean
}

export default function NavLink({category, isActive}: NavLinkProps){
  return (
    <div>
      <Link 
        href={`/news/${category}`}
        className={`navLink ${isActive && 'underline decoration-orange-400 underline-offset-4 font-bold text-lg'}`}
      >
        {category}
      </Link>
    </div>
  )
}
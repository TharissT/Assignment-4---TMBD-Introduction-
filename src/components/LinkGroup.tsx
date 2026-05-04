import { Link } from '@/components/Link'

type LinkGroupProps = {
  links: Array<{ label: string; to: string }>
}

export const LinkGroup = ({ links }: LinkGroupProps) => {
  return (
    <div className="mb-6 flex gap-1 border-b border-zinc-800">
      {links.map((link) => (
        <Link key={link.to} to={link.to} className="mr-4 pb-3">
          {link.label}
        </Link>
      ))}
    </div>
  )
}

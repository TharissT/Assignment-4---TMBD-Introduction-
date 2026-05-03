import { Link } from '@/components/Link';

type LinkGroupProps = {
  links: Array<{ label: string; to: string }>;
};

export const LinkGroup = ({ links }: LinkGroupProps) => {
  return (
    <div className="flex gap-1 border-b border-zinc-800 mb-6">
      {links.map((link) => (
        <Link key={link.to} to={link.to} className="pb-3 mr-4">
          {link.label}
        </Link>
      ))}
    </div>
  );
};

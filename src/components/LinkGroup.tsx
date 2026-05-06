import { Link } from '@/components/Link';

type LinkGroupProps = {
  links: Array<{ label: string; to: string }>;
};

export const LinkGroup = ({ links }: LinkGroupProps) => {
  return (
    <div className="flex gap-4 border-b border-zinc-800 pb-2 pt-4">
      {links.map((link) => (
        <Link key={link.to} to={link.to}>
          {link.label}
        </Link>
      ))}
    </div>
  );
};

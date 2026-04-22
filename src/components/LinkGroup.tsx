import { Link } from '@/components';

type LinkGroupProps = {
  options: Array<{
    label: string;
    to: string;
    match?: string[];
  }>;
};

export const LinkGroup = ({ options }: LinkGroupProps) => {
  return (
    <div className="flex gap-6">
      {options.map((option) => (
        <Link key={option.label} to={option.to} match={option.match}>
          {option.label}
        </Link>
      ))}
    </div>
  );
};

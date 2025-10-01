import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Home as HomeIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbNavProps {
  items?: BreadcrumbItem[];
}

const BreadcrumbNav = ({ items }: BreadcrumbNavProps) => {
  const { t } = useTranslation();
  const location = useLocation();

  // Default items if none are provided, based on current path
  const defaultItems: BreadcrumbItem[] = React.useMemo(() => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    let currentPath = '';
    return [
      { label: t('home'), href: '/' },
      ...pathnames.map((name) => {
        currentPath += `/${name}`;
        // Attempt to translate common path segments or use the segment itself
        const translatedLabel = t(name.toLowerCase()) !== name.toLowerCase() ? t(name.toLowerCase()) : name.charAt(0).toUpperCase() + name.slice(1);
        return {
          label: translatedLabel,
          href: currentPath,
        };
      }),
    ];
  }, [location.pathname, t]);

  const breadcrumbItems = items || defaultItems;

  return (
    <nav aria-label="breadcrumb" className="flex py-2"> {/* Added vertical padding */}
      <ol className="flex items-center space-x-1 text-sm text-rovida-slate-green-gray">
        {breadcrumbItems.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 mx-1 text-rovida-slate-green-gray" />} {/* Consistent icon color */}
            <Link
              to={item.href}
              className={cn(
                "hover:text-rovida-gold transition-colors",
                index === breadcrumbItems.length - 1 ? "text-rovida-gold font-medium" : "text-rovida-slate-green-gray" // Ensure non-active links are slate-green-gray
              )}
            >
              {index === 0 && item.href === '/' ? <HomeIcon className="h-4 w-4 inline-block mr-1" /> : null}
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbNav;
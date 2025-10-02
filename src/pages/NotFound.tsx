import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // Import Card components

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation(['common']); // Initialize useTranslation with common namespace

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md card-rovida">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-rovida-navy">404</CardTitle>
          <CardDescription className="text-xl text-rovida-slate-green-gray">
            {t('oops page not found', { ns: 'common' })}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <a href="/" className="link-rovida">
            {t('return to home', { ns: 'common' })}
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
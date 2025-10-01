import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const IntegrationDetail = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  return (
    <div className="flex flex-1 flex-col gap-4">
      <h1 className="text-2xl font-semibold md:text-3xl">{t('integrations')} Detail: {slug}</h1>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <p className="text-muted-foreground">Details for integration {slug} coming soon!</p>
      </div>
    </div>
  );
};

export default IntegrationDetail;
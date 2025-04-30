// src/components/AccessDenied.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const AccessDenied = () => {
  const { t } = useTranslation();

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>{t('access_denied.title')}</h1>
      <p>{t('access_denied.message')}</p>
    </div>
  );
};

export default AccessDenied;

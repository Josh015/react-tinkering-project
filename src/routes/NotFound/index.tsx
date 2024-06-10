import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();

  return <label>{t('NotFound.Message')}</label>;
}

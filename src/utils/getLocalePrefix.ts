export default function getLocalePrefix(locale: string, defaultLocale: string) {
  return locale === defaultLocale ? "" : `/${locale}`;
}

import I18n from 'react-native-i18n';

// Import Language Package
import en from './locales/en';
import zh from './locales/zh';
import cn from './locales/cn';

I18n.fallbacks = true;

I18n.translations = {
  en,
  zh,
  cn,
};

I18n.locale = 'zh';

export default I18n;

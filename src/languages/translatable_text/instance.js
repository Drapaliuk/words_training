import { combinedTranslations } from '../translations/combined_translations'
import { translatableTextsCreator } from '../core/translatable_text_creator';

export const translateInstance = translatableTextsCreator(combinedTranslations);

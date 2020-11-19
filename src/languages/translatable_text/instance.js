import { combinedTranslations } from '../translations/index'
import { translatableTextsCreator } from './translatable_text_creator';

export const translateInstance = translatableTextsCreator(combinedTranslations);

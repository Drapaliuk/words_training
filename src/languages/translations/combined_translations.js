import { headerTranslations } from './header/header_translations';
import { authTranslations } from './auth/auth_translations'
import { HEADER_PART, AUTH_PART, PROFILE_PART, INTRODUCTION_PART,
         TRAINING_PART, KNOWLEDGE_TESTS_PART, WORDS_KITS_PART } from '../translations_parts/translations_parts';
import { profileTranslations } from './profile/profile_translations';
import { introductionTranslations } from './introduction/introduction_translates';
import { trainingTranslations } from './training/training_translates';
import { knowledgeTestsTranslations } from './knowledge_tests/knowledge_tests_translates';
import { wordsKitsTranslations } from './words_kits/words_kits_translations';

export const combinedTranslations = {
    [HEADER_PART]: headerTranslations,
    [AUTH_PART]: authTranslations,
    [PROFILE_PART]: profileTranslations,
    [INTRODUCTION_PART]: introductionTranslations,
    [TRAINING_PART]: trainingTranslations,
    [KNOWLEDGE_TESTS_PART]: knowledgeTestsTranslations,
    [WORDS_KITS_PART]: wordsKitsTranslations
}
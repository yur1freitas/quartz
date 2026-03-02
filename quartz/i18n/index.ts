import zhTw from './locales/zh-TW'
import zh from './locales/zh-CN'
import vi from './locales/vi-VN'
import uk from './locales/uk-UA'
import tr from './locales/tr-TR'
import th from './locales/th-TH'
import ru from './locales/ru-RU'
import ro from './locales/ro-RO'
import pt from './locales/pt-BR'
import pl from './locales/pl-PL'
import nl from './locales/nl-NL'
import no from './locales/nb-NO'
import lt from './locales/lt-LT'
import ko from './locales/ko-KR'
import kk from './locales/kk-KZ'
import ja from './locales/ja-JP'
import it from './locales/it-IT'
import id from './locales/id-ID'
import hu from './locales/hu-HU'
import he from './locales/he-IL'
import fr from './locales/fr-FR'
import fi from './locales/fi-FI'
import fa from './locales/fa-IR'
import es from './locales/es-ES'
import enUs from './locales/en-US'
import enGb from './locales/en-GB'
import { Translation, CalloutTranslation } from './locales/definition'
import de from './locales/de-DE'
import cs from './locales/cs-CZ'
import ca from './locales/ca-ES'
import ar from './locales/ar-SA'

export const TRANSLATIONS = {
    'en-US': enUs,
    'en-GB': enGb,
    'fr-FR': fr,
    'it-IT': it,
    'ja-JP': ja,
    'de-DE': de,
    'nl-NL': nl,
    'nl-BE': nl,
    'ro-RO': ro,
    'ro-MD': ro,
    'ca-ES': ca,
    'es-ES': es,
    'ar-SA': ar,
    'ar-AE': ar,
    'ar-QA': ar,
    'ar-BH': ar,
    'ar-KW': ar,
    'ar-OM': ar,
    'ar-YE': ar,
    'ar-IR': ar,
    'ar-SY': ar,
    'ar-IQ': ar,
    'ar-JO': ar,
    'ar-PL': ar,
    'ar-LB': ar,
    'ar-EG': ar,
    'ar-SD': ar,
    'ar-LY': ar,
    'ar-MA': ar,
    'ar-TN': ar,
    'ar-DZ': ar,
    'ar-MR': ar,
    'uk-UA': uk,
    'ru-RU': ru,
    'ko-KR': ko,
    'zh-CN': zh,
    'zh-TW': zhTw,
    'vi-VN': vi,
    'pt-BR': pt,
    'hu-HU': hu,
    'fa-IR': fa,
    'pl-PL': pl,
    'cs-CZ': cs,
    'tr-TR': tr,
    'th-TH': th,
    'lt-LT': lt,
    'fi-FI': fi,
    'nb-NO': no,
    'id-ID': id,
    'kk-KZ': kk,
    'he-IL': he
} as const

export const defaultTranslation = 'en-US'
export const i18n = (locale: ValidLocale): Translation =>
    TRANSLATIONS[locale ?? defaultTranslation]
export type ValidLocale = keyof typeof TRANSLATIONS
export type ValidCallout = keyof CalloutTranslation

interface Domain {
    name: string;
    domain: string;
}

const DEFAULT_BATO_DOMAIN: Domain = {
    name: 'xbato.com',
    domain: 'https://xbato.com',
};

class BTDomainsClass {
    Domains: Domain[] = [
        DEFAULT_BATO_DOMAIN,
        {
            name: 'bato.to',
            domain: 'https://bato.to',
        },
        {
            name: 'battwo.com',
            domain: 'https://battwo.com',
        },
        {
            name: 'batocomic.org',
            domain: 'https://batocomic.org',
        },
        {
            name: 'hto.to',
            domain: 'https://hto.to',
        },
        {
            name: 'wto.to',
            domain: 'https://wto.to',
        },
        {
            name: 'mangatoto.com',
            domain: 'https://mangatoto.com',
        },
    ]

    getDomainList(): string[] {
        return this.Domains.map(Domain => Domain.domain)
    }
    getName(domain: string): string {
        return this.Domains.filter(Domain => Domain.domain == domain)[0]?.name ?? 'Unknown'
    }
    getDefault(): Domain {
        return DEFAULT_BATO_DOMAIN
    }
}

export const BTDomains = new BTDomainsClass()

interface Genre {
    name: string;
    param: string;
}

class BTGenresClass {
    Genres: Genre[] = [
        { name: 'Artbook', param: 'artbook' },
        { name: 'Cartoon', param: 'cartoon' },
        { name: 'Comic', param: 'comic' },
        { name: 'Doujinshi', param: 'doujinshi' },
        { name: 'Imageset', param: 'imageset' },
        { name: 'Manga', param: 'manga' },
        { name: 'Manhua', param: 'manhua' },
        { name: 'Manhwa', param: 'manhwa' },
        { name: 'Webtoon', param: 'webtoon' },
        { name: 'Western', param: 'western' },
        { name: 'Shoujo(G)', param: 'shoujo' },
        { name: 'Shounen(B)', param: 'shounen' },
        { name: 'Josei(W)', param: 'josei' },
        { name: 'Seinen(M)', param: 'seinen' },
        { name: 'Yuri(GL)', param: 'yuri' },
        { name: 'Yaoi(BL)', param: 'yaoi' },
        { name: 'Futa(WL)', param: 'futa' },
        { name: 'Bara(ML)', param: 'bara' },
        { name: 'Gore', param: 'gore' },
        { name: 'Bloody', param: 'bloody' },
        { name: 'Violence', param: 'violence' },
        { name: 'Ecchi', param: 'ecchi' },
        { name: 'Adult', param: 'adult' },
        { name: 'Mature', param: 'mature' },
        { name: 'Smut', param: 'smut' },
        { name: 'Hentai', param: 'hentai' },
        { name: '4-Koma', param: '_4_koma' },
        { name: 'Action', param: 'action' },
        { name: 'Adaptation', param: 'adaptation' },
        { name: 'Adventure', param: 'adventure' },
        { name: 'Age', param: 'age_gap' },
        { name: 'Aliens', param: 'aliens' },
        { name: 'Animals', param: 'animals' },
        { name: 'Anthology', param: 'anthology' },
        { name: 'Beasts', param: 'beasts' },
        { name: 'Bodyswap', param: 'bodyswap' },
        { name: 'cars', param: 'cars' },
        { name: 'Cheating/Infidelity', param: 'cheating_infidelity' },
        { name: 'Childhood', param: 'childhood_friends' },
        { name: 'College', param: 'college_life' },
        { name: 'Comedy', param: 'comedy' },
        { name: 'Contest', param: 'contest_winning' },
        { name: 'Cooking', param: 'cooking' },
        { name: 'crime', param: 'crime' },
        { name: 'Crossdressing', param: 'crossdressing' },
        { name: 'Delinquents', param: 'delinquents' },
        { name: 'Dementia', param: 'dementia' },
        { name: 'Demons', param: 'demons' },
        { name: 'Drama', param: 'drama' },
        { name: 'Dungeons', param: 'dungeons' },
        { name: 'Emperor\'s daughte', param: 'emperor_daughte' },
        { name: 'Fantasy', param: 'fantasy' },
        { name: 'Fan-Colored', param: 'fan_colored' },
        { name: 'Fetish', param: 'fetish' },
        { name: 'Full', param: 'full_color' },
        { name: 'Game', param: 'game' },
        { name: 'Gender', param: 'gender_bender' },
        { name: 'Genderswap', param: 'genderswap' },
        { name: 'Ghosts', param: 'ghosts' },
        { name: 'Gyaru', param: 'gyaru' },
        { name: 'Harem', param: 'harem' },
        { name: 'Harlequin', param: 'harlequin' },
        { name: 'Historical', param: 'historical' },
        { name: 'Horror', param: 'horror' },
        { name: 'Incest', param: 'incest' },
        { name: 'Isekai', param: 'isekai' },
        { name: 'Kids', param: 'kids' },
        { name: 'Loli', param: 'loli' },
        { name: 'Magic', param: 'magic' },
        { name: 'Magical', param: 'magical_girls' },
        { name: 'Martial', param: 'martial_arts' },
        { name: 'Mecha', param: 'mecha' },
        { name: 'Medical', param: 'medical' },
        { name: 'Military', param: 'military' },
        { name: 'Monster', param: 'monster_girls' },
        { name: 'Monsters', param: 'monsters' },
        { name: 'Music', param: 'music' },
        { name: 'Mystery', param: 'mystery' },
        { name: 'Netorare/NTR', param: 'netorare' },
        { name: 'Ninja', param: 'ninja' },
        { name: 'Office', param: 'office_workers' },
        { name: 'Omegaverse', param: 'omegaverse' },
        { name: 'Oneshot', param: 'oneshot' },
        { name: 'parody', param: 'parody' },
        { name: 'Philosophical', param: 'philosophical' },
        { name: 'Police', param: 'police' },
        { name: 'Post-Apocalyptic', param: 'post_apocalyptic' },
        { name: 'Psychological', param: 'psychological' },
        { name: 'Regression', param: 'regression' },
        { name: 'Reincarnation', param: 'reincarnation' },
        { name: 'Reverse', param: 'reverse_isekai' },
        { name: 'Romance', param: 'romance' },
        { name: 'Royal', param: 'royal_family' },
        { name: 'Royalty', param: 'royalty' },
        { name: 'Samurai', param: 'samurai' },
        { name: 'School', param: 'school_life' },
        { name: 'Sci-Fi', param: 'sci_fi' },
        { name: 'Shota', param: 'shota' },
        { name: 'Shoujo', param: 'shoujo_ai' },
        { name: 'Shounen', param: 'shounen_ai' },
        { name: 'Showbiz', param: 'showbiz' },
        { name: 'Slice', param: 'slice_of_life' },
        { name: 'SM/BDSM/SUB-DOM', param: 'sm_bdsm' },
        { name: 'Space', param: 'space' },
        { name: 'Sports', param: 'sports' },
        { name: 'Super', param: 'super_power' },
        { name: 'Superhero', param: 'superhero' },
        { name: 'Supernatural', param: 'supernatural' },
        { name: 'Survival', param: 'survival' },
        { name: 'Thriller', param: 'thriller' },
        { name: 'Time', param: 'time_travel' },
        { name: 'Tower', param: 'tower_climbing' },
        { name: 'Traditional', param: 'traditional_games' },
        { name: 'Tragedy', param: 'tragedy' },
        { name: 'Transmigration', param: 'transmigration' },
        { name: 'Vampires', param: 'vampires' },
        { name: 'Villainess', param: 'villainess' },
        { name: 'Video', param: 'video_games' },
        { name: 'Virtual', param: 'virtual_reality' },
        { name: 'Wuxia', param: 'wuxia' },
        { name: 'Xianxia', param: 'xianxia' },
        { name: 'Xuanhuan', param: 'xuanhuan' },
        { name: 'Zombies', param: 'zombies' },
        { name: 'shotacon', param: 'shotacon' },
        { name: 'lolicon', param: 'lolicon' },
        { name: 'Award', param: 'award_winning' },
        { name: 'Youkai', param: 'youkai' },
        { name: 'Uncategorized', param: 'uncategorized' }
    ]

    constructor() {
        // Sorts the genres based on name
        this.Genres = this.Genres.sort((a, b) => a.name > b.name ? 1 : -1)
    }

    getGenresList(): string[] {
        return this.Genres.map(Genre => Genre.name)
    }
    getParam(name: string) {
        return this.Genres.filter(Genre => Genre.name == name)[0]?.param
    }
}

export const BTGenres = new BTGenresClass()

interface Language {
    name: string;
    BTCode: string;
    lang: string;
    default?: boolean;
}

class BTLanguagesClass {
    Languages: Language[] = [
        {
            name: 'English',
            BTCode: 'en,en_us',
            lang: '🇬🇧',
            default: true
        },
        {
            name: 'Arabic',
            BTCode: 'ar',
            lang: '🇸🇦'
        },
        {
            name: 'Bulgarian',
            BTCode: 'bg',
            lang: '🇧🇬'
        },
        {
            name: 'Chinese',
            BTCode: 'zh',
            lang: '🇨🇳'
        },
        {
            name: 'Czech',
            BTCode: 'cs',
            lang: '🇨🇿'
        },
        {
            name: 'Danish',
            BTCode: 'da',
            lang: '🇩🇰'
        },
        {
            name: 'Dutch',
            BTCode: 'nl',
            lang: '🇳🇱'
        },
        {
            name: 'Filipino',
            BTCode: 'fil',
            lang: '🇵🇭'
        },
        {
            name: 'Finnish',
            BTCode: 'fi',
            lang: '🇫🇮'
        },
        {
            name: 'French',
            BTCode: 'fr',
            lang: '🇫🇷'
        },
        {
            name: 'German',
            BTCode: 'de',
            lang: '🇩🇪'
        },
        {
            name: 'Greek',
            BTCode: 'el',
            lang: '🇬🇷'
        },
        {
            name: 'Hebrew',
            BTCode: 'he',
            lang: '🇮🇱'
        },
        {
            name: 'Hindi',
            BTCode: 'hi',
            lang: '🇮🇳'
        },
        {
            name: 'Hungarian',
            BTCode: 'hu',
            lang: '🇭🇺'
        },
        {
            name: 'Indonesian',
            BTCode: 'id',
            lang: '🇮🇩'
        },
        {
            name: 'Italian',
            BTCode: 'it',
            lang: '🇮🇹'
        },
        {
            name: 'Japanese',
            BTCode: 'ja',
            lang: '🇯🇵'
        },
        {
            name: 'Korean',
            BTCode: 'ko',
            lang: '🇰🇷'
        },
        {
            name: 'Malay',
            BTCode: 'ms',
            lang: '🇲🇾'
        },
        {
            name: 'Polish',
            BTCode: 'pl',
            lang: '🇵🇱'
        },
        {
            name: 'Portuguese',
            BTCode: 'pt',
            lang: '🇵🇹'
        },
        {
            name: 'Portuguese (Brazil)',
            BTCode: 'pt_br',
            lang: '🇧🇷'
        },
        {
            name: 'Romanian',
            BTCode: 'ro',
            lang: '🇷🇴'
        },
        {
            name: 'Russian',
            BTCode: 'ru',
            lang: '🇷🇺'
        },
        {
            name: 'Spanish',
            BTCode: 'es',
            lang: '🇪🇸'
        },
        {
            name: 'Spanish (Latin America)',
            BTCode: 'es_419',
            lang: '🌎'
        },
        {
            name: 'Swedish',
            BTCode: 'sv',
            lang: '🇸🇪'
        },
        {
            name: 'Thai',
            BTCode: 'th',
            lang: '🇹🇭'
        },
        {
            name: 'Turkish',
            BTCode: 'tr',
            lang: '🇹🇷'
        },
        {
            name: 'Ukrainian',
            BTCode: 'uk',
            lang: '🇺🇦'
        },
        {
            name: 'Vietnamese',
            BTCode: 'vi',
            lang: '🇻🇳'
        },
        {
            name: 'Afrikaans',
            BTCode: 'af',
            lang: '🇿🇦'
        },
        {
            name: 'Albanian',
            BTCode: 'sq',
            lang: '🇦🇱'
        },
        {
            name: 'Amharic',
            BTCode: 'am',
            lang: '🇪🇹'
        },
        {
            name: 'Armenian',
            BTCode: 'hy',
            lang: '🇦🇲'
        },
        {
            name: 'Azerbaijani',
            BTCode: 'az',
            lang: '🇦🇿'
        },
        {
            name: 'Belarusian',
            BTCode: 'be',
            lang: '🇧🇾'
        },
        {
            name: 'Bengali',
            BTCode: 'bn',
            lang: '🇧🇩'
        },
        {
            name: 'Bosnian',
            BTCode: 'bs',
            lang: '🇧🇦'
        },
        {
            name: 'Burmese',
            BTCode: 'my',
            lang: '🇲🇲'
        },
        {
            name: 'Cambodian',
            BTCode: 'km',
            lang: '🇰🇭'
        },
        {
            name: 'Catalan',
            BTCode: 'ca',
            lang: '🇪🇸'
        },
        {
            name: 'Cebuano',
            BTCode: 'ceb',
            lang: '🇵🇭'
        },
        {
            name: 'Chinese (Cantonese)',
            BTCode: 'zh_hk',
            lang: '🇭🇰'
        },
        {
            name: 'Chinese (Traditional)',
            BTCode: 'zh_tw',
            lang: '🇹🇼'
        },
        {
            name: 'Croatian',
            BTCode: 'hr',
            lang: '🇭🇷'
        },
        {
            name: 'Esperanto',
            BTCode: 'eo',
            lang: '🌍'
        },
        {
            name: 'Estonian',
            BTCode: 'et',
            lang: '🇪🇪'
        },
        {
            name: 'Faroese',
            BTCode: 'fo',
            lang: '🇫🇴'
        },
        {
            name: 'Georgian',
            BTCode: 'ka',
            lang: '🇬🇪'
        },
        {
            name: 'Guarani',
            BTCode: 'gn',
            lang: '🇵🇾'
        },
        {
            name: 'Gujarati',
            BTCode: 'gu',
            lang: '🇮🇳'
        },
        {
            name: 'Haitian Creole',
            BTCode: 'ht',
            lang: '🇭🇹'
        },
        {
            name: 'Hausa',
            BTCode: 'ha',
            lang: '🇳🇬'
        },
        {
            name: 'Icelandic',
            BTCode: 'is',
            lang: '🇮🇸'
        },
        {
            name: 'Igbo',
            BTCode: 'ig',
            lang: '🇳🇬'
        },
        {
            name: 'Irish',
            BTCode: 'ga',
            lang: '🇮🇪'
        },
        {
            name: 'Javanese',
            BTCode: 'jv',
            lang: '🇮🇩'
        },
        {
            name: 'Kannada',
            BTCode: 'kn',
            lang: '🇮🇳'
        },
        {
            name: 'Kazakh',
            BTCode: 'kk',
            lang: '🇰🇿'
        },
        {
            name: 'Kurdish',
            BTCode: 'ku',
            lang: '🇮🇶'
        },
        {
            name: 'Kyrgyz',
            BTCode: 'ky',
            lang: '🇰🇬'
        },
        {
            name: 'Laothian',
            BTCode: 'lo',
            lang: '🇱🇦'
        },
        {
            name: 'Latvian',
            BTCode: 'lv',
            lang: '🇱🇻'
        },
        {
            name: 'Lithuanian',
            BTCode: 'lt',
            lang: '🇱🇹'
        },
        {
            name: 'Luxembourgish',
            BTCode: 'lb',
            lang: '🇱🇺'
        },
        {
            name: 'Macedonian',
            BTCode: 'mk',
            lang: '🇲🇰'
        },
        {
            name: 'Malagasy',
            BTCode: 'mg',
            lang: '🇲🇬'
        },
        {
            name: 'Malayalam',
            BTCode: 'ml',
            lang: '🇮🇳'
        },
        {
            name: 'Maltese',
            BTCode: 'mt',
            lang: '🇲🇹'
        },
        {
            name: 'Maori',
            BTCode: 'mi',
            lang: '🇳🇿'
        },
        {
            name: 'Marathi',
            BTCode: 'mr',
            lang: '🇮🇳'
        },
        {
            name: 'Moldavian',
            BTCode: 'mo',
            lang: '🇲🇩'
        },
        {
            name: 'Mongolian',
            BTCode: 'mn',
            lang: '🇲🇳'
        },
        {
            name: 'Nepali',
            BTCode: 'ne',
            lang: '🇳🇵'
        },
        {
            name: 'Norwegian',
            BTCode: 'no',
            lang: '🇳🇴'
        },
        {
            name: 'Nyanja',
            BTCode: 'ny',
            lang: '🇲🇼'
        },
        {
            name: 'Pashto',
            BTCode: 'ps',
            lang: '🇦🇫'
        },
        {
            name: 'Persian',
            BTCode: 'fa',
            lang: '🇮🇷'
        },
        {
            name: 'Romansh',
            BTCode: 'rm',
            lang: '🇨🇭'
        },
        {
            name: 'Samoan',
            BTCode: 'sm',
            lang: '🇼🇸'
        },
        {
            name: 'Serbian',
            BTCode: 'sr',
            lang: '🇷🇸'
        },
        {
            name: 'Serbo-Croatian',
            BTCode: 'sh',
            lang: '🇧🇦'
        },
        {
            name: 'Sesotho',
            BTCode: 'st',
            lang: '🇱🇸'
        },
        {
            name: 'Shona',
            BTCode: 'sn',
            lang: '🇿🇼'
        },
        {
            name: 'Sindhi',
            BTCode: 'sd',
            lang: '🇵🇰'
        },
        {
            name: 'Sinhalese',
            BTCode: 'si',
            lang: '🇱🇰'
        },
        {
            name: 'Slovak',
            BTCode: 'sk',
            lang: '🇸🇰'
        },
        {
            name: 'Slovenian',
            BTCode: 'sl',
            lang: '🇸🇮'
        },
        {
            name: 'Somali',
            BTCode: 'so',
            lang: '🇸🇴'
        },
        {
            name: 'Swahili',
            BTCode: 'sw',
            lang: '🇹🇿'
        },
        {
            name: 'Tajik',
            BTCode: 'tg',
            lang: '🇹🇯'
        },
        {
            name: 'Tamil',
            BTCode: 'ta',
            lang: '🇮🇳'
        },
        {
            name: 'Tigrinya',
            BTCode: 'ti',
            lang: '🇪🇷'
        },
        {
            name: 'Tonga',
            BTCode: 'to',
            lang: '🇹🇴'
        },
        {
            name: 'Turkmen',
            BTCode: 'tk',
            lang: '🇹🇲'
        },
        {
            name: 'Urdu',
            BTCode: 'ur',
            lang: '🇵🇰'
        },
        {
            name: 'Uzbek',
            BTCode: 'uz',
            lang: '🇺🇿'
        },
        {
            name: 'Yoruba',
            BTCode: 'yo',
            lang: '🇳🇬'
        },
        {
            name: 'Zulu',
            BTCode: 'zu',
            lang: '🇿🇦'
        },
        {
            name: 'Other',
            BTCode: '_t',
            lang: '🌍'
        },
        {
            name: 'Basque',
            BTCode: 'eu',
            lang: '🇪🇺'
        },
        {
            name: 'Portuguese (Portugal)',
            BTCode: 'pt-PT',
            lang: '🇵🇹'
        }
    ]

    constructor() {
        // Sorts the languages based on name
        this.Languages = this.Languages.sort((a, b) => a.name > b.name ? 1 : -1)
    }

    getBTCodeList(): string[] {
        return this.Languages.map(Language => Language.BTCode)
    }
    getName(BTCode: string): string {
        return this.Languages.filter(Language => Language.BTCode == BTCode)[0]?.name ?? 'Unknown'
    }
    getLangCode(BTCode: string): string {
        return this.Languages.filter(Language => Language.BTCode == BTCode)[0]?.lang ?? 'Unknown'
    }
    getDefault(): string[] {
        return this.Languages.filter(Language => Language.default).map(Language => Language.BTCode)
    }
}

export const BTLanguages = new BTLanguagesClass()

export interface Metadata {
    page: number;
}

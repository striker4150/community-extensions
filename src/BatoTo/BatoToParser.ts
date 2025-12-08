import {
    Chapter,
    ChapterDetails,
    HomeSection,
    HomeSectionType,
    PartialSourceManga,
    SourceManga,
    Tag,
    TagSection
} from '@paperback/types'

import {
    BTGenres,
    BTLanguages
} from './BatoToHelper'

import { CheerioAPI } from 'cheerio'
import CryptoJS from 'crypto-js'
import { Element } from 'domhandler'

import Url = require('url-parse')

import entities = require('entities')

const replaceImgServers = new Map([
    ['k00', 'n00'],
    ['k01', 'n03'],
    ['k02', 'n04'],
    ['k04', 'n07'],
    ['k05', 'n09'],
    ['k08', 'n12'],
    ['k09', 'n16'],
])

export const parseMangaDetails = ($: CheerioAPI, mangaId: string): SourceManga => {
    const titles: string[] = []

    titles.push(decodeHTMLEntity($('a', $('.item-title')).text().trim() ?? ''))
    const altTitles = $('.alias-set').text().trim().split('/')
    for (const title of altTitles) {
        titles.push(decodeHTMLEntity(title))
    }

    const description = decodeHTMLEntity($('.limit-html').text().trim() ?? '')

    const authorElement = $('div.attr-item b:contains("Authors")').next('span')
    const author = authorElement.length ? authorElement.children().map((_: number, e: Element) => {
        return $(e).text().trim()
    }).toArray().join(', ') : ''

    const artistElement = $('div.attr-item b:contains("Artists")').next('span')
    const artist = artistElement.length ? artistElement.children().map((_: number, e: Element) => {
        return $(e).text().trim()
    }).toArray().join(', ') : ''

    const arrayTags: Tag[] = []
    for (const tag of $('div.attr-item b:contains("Genres")').next('span').children().toArray()) {
        const label = $(tag).text().trim()
        const id = encodeURI(BTGenres.getParam(label) ?? label)

        if (!id || !label) continue
        arrayTags.push({ id: id, label: label })
    }
    const tagSections: TagSection[] = [App.createTagSection({ id: '0', label: 'genres', tags: arrayTags.map(x => App.createTag(x)) })]

    const rawStatus = $('div.attr-item b:contains("Upload status")').next('span').text().trim()
    let status = 'ONGOING'
    switch (rawStatus.toUpperCase()) {
        case 'ONGOING':
            status = 'Ongoing'
            break
        case 'COMPLETED':
            status = 'Completed'
            break
        case 'HIATUS':
            status = 'Hiatus'
            break
        default:
            status = 'Ongoing'
            break
    }

    return App.createSourceManga({
        id: mangaId,
        mangaInfo: App.createMangaInfo({
            titles: titles,
            image: `mangaId=${mangaId}`,
            status: status,
            author: author,
            artist: artist,
            tags: tagSections,
            desc: description
        })
    })
}

export const parseChapterList = ($: CheerioAPI, mangaId: string): Chapter[] => {
    const chapters: Chapter[] = []
    let sortingIndex = 0

    for (const chapter of $('div.episode-list div.main .item').toArray()) {
        const title = $('b', chapter).text().trim()
        const chapterId: string = $('a', chapter).attr('href')?.replace(/\/$/, '')?.split('/').pop() ?? ''
        const group: string = $('a.ps-3 > span', chapter).text().trim()
        if (!chapterId) continue

        let language = BTLanguages.getLangCode($('em').attr('data-lang') ?? '')
        if (language === 'Unknown') language = '🇬🇧'

        const timeAgo = $('i.ps-3', chapter).text().trim().split(' ')
        const chapNumRegex = title.match(/(\d+)(?:[-.]\d+)?/)
        let date = new Date(Date.now())

        if (timeAgo[1] == 'secs') date = new Date(Date.now() - 1000 * Number(timeAgo[0]))
        if (timeAgo[1] == 'mins') date = new Date(Date.now() - 1000 * 60 * Number(timeAgo[0]))
        if (timeAgo[1] == 'hours') date = new Date(Date.now() - 1000 * 3600 * Number(timeAgo[0]))
        if (timeAgo[1] == 'days') date = new Date(Date.now() - 1000 * 3600 * 24 * Number(timeAgo[0]))

        let chapNum = (chapNumRegex && chapNumRegex[1]) ? Number(chapNumRegex[1].replace('-', '.')) : 0
        if (isNaN(chapNum)) chapNum = 0

        chapters.push({
            id: chapterId,
            name: title,
            langCode: language,
            chapNum: chapNum,
            time: date,
            sortingIndex,
            volume: 0,
            group: group
        })
        sortingIndex--
    }

    if (chapters.length == 0) {
        throw new Error(`Couldn't find any chapters for mangaId: ${mangaId}!`)
    }

    return chapters.map(chapter => {
        chapter.sortingIndex += chapters.length
        return App.createChapter(chapter)
    })
}

export const parseChapterDetails = ($: CheerioAPI, mangaId: string, chapterId: string): ChapterDetails => {
    // Get all of the pages
    const scriptObj = $('script').toArray().find((obj: Element) => {
        const childObj = obj.children?.[0]
        if (childObj === undefined) {
            return false
        }

        const data = ('data' in childObj) ? childObj.data : ''
        return data.includes('batoPass') && data.includes('batoWord')
    })
    const childObj = scriptObj?.children[0]
    const script = (childObj !== undefined && 'data' in childObj) ? childObj.data : ''

    const batoPass = eval(script.match(/const\s+batoPass\s*=\s*(.*?);/)?.[1] ?? '')?.toString() ?? ''
    const batoWord = script.match(/const\s+batoWord\s*=\s*"(.*)";/)?.[1] ?? ''
    const imgHttps = script.match(/const\s+imgHttps\s*=\s*(.*?);/)?.[1] ?? ''

    const imgList: string[] = JSON.parse(imgHttps)
    const tknList: string[] = JSON.parse(CryptoJS.AES.decrypt(batoWord, batoPass).toString(CryptoJS.enc.Utf8))

    const fixedImgSources = imgList.map((value: string) => {
        const imgUrl = new Url(value)
        for (const [badImgServer, newImgServer] of replaceImgServers) {
            const invalidHostname = imgUrl.hostname
            const newHostname = invalidHostname.replace(badImgServer, newImgServer)

            imgUrl.set('hostname', newHostname)
        }

        return imgUrl.toString()
    })
    const pages = fixedImgSources.map((value: string, index: number) => `${value}?${tknList[index]}`)

    const chapterDetails = App.createChapterDetails({
        id: chapterId,
        mangaId: mangaId,
        pages: pages
    })
    return chapterDetails
}

export const parseHomeSections = ($: CheerioAPI, sectionCallback: (section: HomeSection) => void): void => {
    const popularSection = App.createHomeSection({
        id: 'popular_updates',
        title: 'Popular Updates',
        containsMoreItems: true,
        type: HomeSectionType.singleRowLarge
    })

    const latestSection = App.createHomeSection({
        id: 'latest_releases',
        title: 'Latest Releases',
        containsMoreItems: true,
        type: HomeSectionType.singleRowNormal
    })

    // Popular Updates
    const popularSection_Array: PartialSourceManga[] = []
    for (const manga of $('.home-popular .col.item').toArray()) {
        const image: string = $('img', manga).first().attr('src') ?? ''
        const title: string = $('.item-title', manga).text().trim() ?? ''
        const id = $('a', manga).attr('href')?.replace('/series/', '')?.trim().split('/')[0] ?? ''
        const btcode = $('em', manga).attr('data-lang')
        const lang: string = btcode ? BTLanguages.getLangCode(btcode) : '🇬🇧'
        const subtitle: string = lang + ' ' + $('.item-volch', manga).text().trim()

        if (!id || !title) continue
        popularSection_Array.push(App.createPartialSourceManga({
            image: image,
            title: decodeHTMLEntity(title),
            mangaId: id,
            subtitle: decodeHTMLEntity(subtitle)
        }))
    }
    popularSection.items = popularSection_Array
    sectionCallback(popularSection)

    // Latest Releases
    const latestSection_Array: PartialSourceManga[] = []
    for (const manga of $('.series-list .col.item').toArray()) {
        const image: string = $('img', manga).attr('src') ?? ''
        const title: string = $('.item-title', manga).text().trim() ?? ''
        const id = $('a', manga).attr('href')?.replace('/series/', '')?.trim().split('/')[0] ?? ''
        const btcode = $('em', manga).attr('data-lang')
        const lang: string = btcode ? BTLanguages.getLangCode(btcode) : '🇬🇧'
        const subtitle: string = lang + ' ' + $('.item-volch a', manga).text().trim()

        if (!id || !title) continue
        latestSection_Array.push(App.createPartialSourceManga({
            image: image,
            title: decodeHTMLEntity(title),
            mangaId: id,
            subtitle: decodeHTMLEntity(subtitle)
        }))
    }
    latestSection.items = latestSection_Array
    sectionCallback(latestSection)
}

export const parseViewMore = ($: CheerioAPI): PartialSourceManga[] => {
    const manga: PartialSourceManga[] = []
    const collectedIds: string[] = []

    for (const obj of $('.item', '#series-list').toArray()) {
        const id = $('a', obj).attr('href')?.replace('/series/', '').trim().split('/')[0] ?? ''
        const title = $('.item-title', obj).text()
        const btcode = $('em', obj).attr('data-lang')
        const lang: string = btcode ? BTLanguages.getLangCode(btcode) : '🇬🇧'
        const subtitle = lang + ' ' + $('.visited', obj).text().trim()
        const image = $('img', obj).attr('src') ?? ''

        if (!id || !title || collectedIds.includes(id)) continue
        manga.push(App.createPartialSourceManga({
            image: image,
            title: decodeHTMLEntity(title),
            mangaId: id,
            subtitle: decodeHTMLEntity(subtitle)
        }))
        collectedIds.push(id)
    }

    return manga
}

export const parseTags = (): TagSection[] => {
    const arrayTags: Tag[] = []
    for (const label of BTGenres.getGenresList()) {
        const id = encodeURI(BTGenres.getParam(label) ?? label)

        if (!id || !label) continue
        arrayTags.push({ id: id, label: label })
    }
    const tagSections: TagSection[] = [App.createTagSection({ id: '0', label: 'genres', tags: arrayTags.map(x => App.createTag(x)) })]
    return tagSections
}

export const parseSearch = ($: CheerioAPI, langFilter: boolean, langs: string[]): PartialSourceManga[] => {
    const mangas: PartialSourceManga[] = []
    for (const obj of $('.item', '#series-list').toArray()) {
        const id = $('.item-cover', obj).attr('href')?.replace('/series/', '')?.trim().split('/')[0] ?? ''
        const title: string = $('.item-title', obj).text() ?? ''
        const btcode = $('em', obj).attr('data-lang') ?? 'en,en_us'
        const lang: string = btcode ? BTLanguages.getLangCode(btcode) : '🇬🇧'
        const subtitle = lang + ' ' + $('.visited', obj).text().trim()
        const image = $('img', obj).attr('src') ?? ''

        if (!id || !title) continue
        if (langFilter && !langs.includes(btcode)) continue

        mangas.push(App.createPartialSourceManga({
            image: image,
            title: decodeHTMLEntity(title),
            mangaId: id,
            subtitle: subtitle
        }))
    }
    return mangas
}

export const parseThumbnailUrl = ($: CheerioAPI): string => {
    return $('div.attr-cover img').attr('src') ?? ''
}

export const isLastPage = ($: CheerioAPI): boolean => {
    return $('.page-item').last().hasClass('disabled')
}

const decodeHTMLEntity = (str: string): string => {
    return entities.decodeHTML(str)
}

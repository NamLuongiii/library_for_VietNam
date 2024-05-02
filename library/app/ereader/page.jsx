"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { ReactReader } from 'react-reader'
import { CloseButton, IconButton } from '@chakra-ui/react'
import Link from "next/link"
import ExpandIcon from '../components/icons/expand'
import HomeIcon from '../components/icons/home'
import ScrollSetting from '../components/ereader/ScrollSetting'
import ThemeSetting from '../components/ereader/themeSetting'
import FontSizeSetting from '../components/ereader/fontSizeSetting'
import PointingInIcon from '../components/icons/pointingIn'
import { darkReaderTheme, lightReaderTheme, paperReaderTheme, sepiaReaderTheme } from '../components/ereader/theme'

export default function Ereader() {
    const [page, setPage] = useState('')
    const rendition = useRef(undefined)
    const [location, setLocation] = useState(0)
    const toc = useRef([])

    const searchParams = useSearchParams()
    const file = searchParams.get("file")
    const book = searchParams.get("book")

    const [preference, setPreference] = useState({
        fontSize: 8,
        fullHeight: true,
        theme: 1,
        mode: 1,
    })

    const handleFullHeight = () => {
        setPreference({
            ...preference,
            fullHeight: !preference.fullHeight,
        })
    }

    // 1 2 3 4 5 6 7 8 9 0 => 60% 70% 80% 90% 100% 110% 120% 130% 140% 150%

    const handlePreferenceChange = (key, v) => {
        const t = { ...preference }
        t[key] = v
        setPreference(t)
    }

    useEffect(() => {
        const _rendition = rendition.current
        if (_rendition) {
            _rendition.themes.fontSize(caculFontSize())
            updateTheme(_rendition, preference.theme)
        }
    }, [preference])

    const caculFontSize = () => {
        return `${100 + 10 * (preference.fontSize - 5)}%`
    }

    const caculMode = () => {
        switch (preference.mode) {
            case 0:
                return {
                    flow: 'scrolled',
                    manager: 'continuous',
                }
            case 1:
                return {
                    flow: 'paginated',
                    manager: 'default',
                }
            default:
                break;
        }
    }

    const caculStyle = () => {
        switch (preference.theme) {
            case 1:
                return lightReaderTheme
            case 2:
                return darkReaderTheme
            case 3:
                return sepiaReaderTheme
            case 4:
                return paperReaderTheme
        }
    }

    const caculThemeColor = theme => {
        switch (theme) {
            case 1:
                return "#000"
            case 2:
                return "#fff"
            case 3:
                return "#8B4513"
            case 4:
                return "#696969"

        }
    }

    const caculThemeBg = theme => {
        switch (theme) {
            case 1:
                return "#fff"
            case 2:
                return "#000"
            case 3:
                return "#FFF8DC"
            case 4:
                return "#F8F8FF"

        }
    }

    function updateTheme(rendition, theme) {
        const themes = rendition.themes
        themes.override('color', caculThemeColor(theme))
        themes.override('background', caculThemeBg(theme))
    }

    return (
        <div 
            className="h-screen flex flex-col relative"
            style={{
                color: caculThemeColor(preference.theme),
                background: caculThemeBg(preference.theme),
            }}
            >
            <header
                className="px-4 py-2 flex flex-wrap lg:justify-end items-center gap-4"
                style={{ display: preference.fullHeight ? "none" : "flex" }}
            >
                <Link href="/">
                    <IconButton
                        colorScheme="teal"
                        icon={<HomeIcon></HomeIcon>}
                    ></IconButton>
                </Link>

                <ScrollSetting onchange={v => handlePreferenceChange("mode", v)}></ScrollSetting>
                <ThemeSetting onchange={v => handlePreferenceChange("theme", v)}></ThemeSetting>
                <FontSizeSetting
                    onchange={v => handlePreferenceChange("fontSize", v)}
                    defaultValue={preference.fontSize}></FontSizeSetting>

                <IconButton
                    onClick={handleFullHeight}
                    icon={<ExpandIcon></ExpandIcon>}
                ></IconButton>

                <Link href={`/books/${book}`}>
                    <CloseButton colorScheme="teal" size="lg"></CloseButton>
                </Link>
            </header>

            <div
                className="fixed right-4 top-4 z-20"
                style={{ display: preference.fullHeight ? "inline-block" : "none" }}
            >
                <IconButton
                    onClick={handleFullHeight}
                    icon={<PointingInIcon></PointingInIcon>}
                ></IconButton>
            </div>

            <main className="grow">
                <ReactReader
                    url={file}
                    location={location}
                    locationChanged={(loc) => {
                        setLocation(loc)
                        if (rendition.current && toc.current) {
                            const { displayed, href } = rendition.current.location.start
                            const chapter = toc.current.find((item) => item.href === href)
                            setPage(
                                `Page ${displayed.page} of ${displayed.total} in chapter ${chapter ? chapter.label : 'n/a'
                                }`
                            )
                        }
                    }}
                    getRendition={(_rendition) => {
                        rendition.current = _rendition
                        _rendition.hooks.content.register((contents) => {
                            const body = contents.window.document.querySelector('body')
                            if (body) {
                                body.oncontextmenu = () => {
                                    return false
                                }
                            }
                        })
                        rendition.current.themes.fontSize(caculFontSize())
                    }}
                    epubOptions={caculMode()}
                    showToc={true}
                    readerStyles={caculStyle()}
                // swipeable={true}
                />
            </main>
            <div className="text-center text-xs py-4">{page}</div>
        </div>
    )
}
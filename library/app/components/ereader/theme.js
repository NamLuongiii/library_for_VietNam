import { ReactReaderStyle } from "react-reader"

export const lightReaderTheme = {
    ...ReactReaderStyle,
    readerArea: {
        ...ReactReaderStyle.readerArea,
        transition: undefined,
    },
}

export const darkReaderTheme = {
    ...ReactReaderStyle,
    arrow: {
        ...ReactReaderStyle.arrow,
        color: 'white',
    },
    arrowHover: {
        ...ReactReaderStyle.arrowHover,
        color: '#ccc',
    },
    readerArea: {
        ...ReactReaderStyle.readerArea,
        backgroundColor: '#000',
        transition: undefined,
    },
    titleArea: {
        ...ReactReaderStyle.titleArea,
        color: '#ccc',
    },
    tocArea: {
        ...ReactReaderStyle.tocArea,
        background: '#111',
    },
    tocButtonExpanded: {
        ...ReactReaderStyle.tocButtonExpanded,
        background: '#222',
    },
    tocButtonBar: {
        ...ReactReaderStyle.tocButtonBar,
        background: '#fff',
    },
    tocButton: {
        ...ReactReaderStyle.tocButton,
        color: 'white',
    },
}

export const sepiaReaderTheme = {
    ...ReactReaderStyle,
    arrow: {
        ...ReactReaderStyle.arrow,
    },
    arrowHover: {
        ...ReactReaderStyle.arrowHover,
    },
    readerArea: {
        ...ReactReaderStyle.readerArea,
        backgroundColor: "#FFF8DC",
        transition: undefined,
    },
    titleArea: {
        ...ReactReaderStyle.titleArea,
    },
    tocArea: {
        ...ReactReaderStyle.tocArea,
    },
    tocButtonExpanded: {
        ...ReactReaderStyle.tocButtonExpanded,
    },
    tocButtonBar: {
        ...ReactReaderStyle.tocButtonBar,
    },
    tocButton: {
        ...ReactReaderStyle.tocButton,
    },
}

export const paperReaderTheme = {
    ...ReactReaderStyle,
    arrow: {
        ...ReactReaderStyle.arrow,
    },
    arrowHover: {
        ...ReactReaderStyle.arrowHover,
    },
    readerArea: {
        ...ReactReaderStyle.readerArea,
        backgroundColor: '#F8F8FF',
        transition: undefined,
    },
    titleArea: {
        ...ReactReaderStyle.titleArea,
    },
    tocArea: {
        ...ReactReaderStyle.tocArea,
    },
    tocButtonExpanded: {
        ...ReactReaderStyle.tocButtonExpanded,
    },
    tocButtonBar: {
        ...ReactReaderStyle.tocButtonBar,
    },
    tocButton: {
        ...ReactReaderStyle.tocButton,
    },
}
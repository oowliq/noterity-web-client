export type Block = 'noteTitle' | 'title' | 'subTitle' | 'blockQuote';

export type Inline = 'bold' | 'italic';

export interface StylesSchema {
    block: { [name in Block]: { style: string; css: string } };
    inline: { [name in Inline]: { style: string; css: string } };
}

const stylesSchema: StylesSchema = {
    block: {
        noteTitle: {
            style: 'note-title',
            css: 'RichEditor-note-title',
        },
        title: {
            style: 'title',
            css: 'RichEditor-title',
        },
        subTitle: {
            style: 'sub-title',
            css: 'RichEditor-sub-title',
        },
        blockQuote: {
            style: 'blockquote',
            css: 'RichEditor-blockquote',
        },
    },
    inline: {
        bold: {
            style: 'BOLD',
            css: 'sss',
        },
        italic: {
            style: 'ITALIC',
            css: 'ssss',
        },
    },
};

const nonClearStyles: string[] = [];

export { stylesSchema, nonClearStyles };

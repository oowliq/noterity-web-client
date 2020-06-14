export type Block = 'noteTitle' | 'title' | 'subTitle' | 'blockQuote';

export type Inline = 'bold' | 'italic';

export interface MappedStyleObject {
    [styleName: string]: string | number;
}

export interface StylesSchema {
    block: { [name in Block]: { style: string; css: string } };
    inline: { [name in Inline]: { style: string; cssObject: MappedStyleObject } };
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
            cssObject: {
                fontWeight: 600,
            },
        },
        italic: {
            style: 'ITALIC',
            cssObject: {
                fontStyle: 'italic',
            },
        },
    },
};

const getInlineStylesMapObject = (): { [inlineName: string]: MappedStyleObject } => {
    const mappedObject: { [inlineName: string]: MappedStyleObject } = {};

    for (const style in stylesSchema.inline) {
        const current = stylesSchema.inline[style as Inline];
        mappedObject[current.style] = current.cssObject;
    }

    return mappedObject;
};

const nonClearStyles: string[] = [];

export { stylesSchema, nonClearStyles, getInlineStylesMapObject };

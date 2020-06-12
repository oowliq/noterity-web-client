enum blocksSchema {
    noteTitle = 'note-title',
    title = 'title',
    subTitle = 'sub-title',
    blockQuote = 'blockquote',
}

enum inlineSchema {
    bold = 'BOLD',
    italic = 'ITALIC',
}

const nonClearStyles: string[] = [];

export { blocksSchema, inlineSchema, nonClearStyles };

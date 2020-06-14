import { RichUtils, EditorState } from 'draft-js';
import { stylesSchema } from '../styleSchema';

/**
 * First line force header (like medium)
 * @returns new editor state
 */
const createFirstLineHeader = () => ({
    onChange: (editorState: EditorState) => {
        const currentContent = editorState.getCurrentContent();
        const firstBlockKey = currentContent.getBlockMap().first().getKey();
        const currentBlockKey = editorState.getSelection().getAnchorKey();
        const isFirstBlock = currentBlockKey === firstBlockKey;
        const currentBlockType = RichUtils.getCurrentBlockType(editorState);
        const isHeading = currentBlockType === stylesSchema.block.noteTitle.style;
        if (isFirstBlock && !isHeading) {
            return RichUtils.toggleBlockType(editorState, stylesSchema.block.noteTitle.style);
        }
        return editorState;
    },
});

export { createFirstLineHeader };

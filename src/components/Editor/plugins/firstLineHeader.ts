// Import and add to your Editor's plugins

import { RichUtils, EditorState } from 'draft-js';
import { blocks } from '../styleSchema';

const createFirstLineHeader = () => ({
    onChange: (editorState: EditorState) => {
        const currentContent = editorState.getCurrentContent();
        const firstBlockKey = currentContent.getBlockMap().first().getKey();
        const currentBlockKey = editorState.getSelection().getAnchorKey();
        const isFirstBlock = currentBlockKey === firstBlockKey;
        const currentBlockType = RichUtils.getCurrentBlockType(editorState);
        const isHeading = currentBlockType === blocks.noteTitle;
        if (isFirstBlock !== isHeading) {
            return RichUtils.toggleBlockType(editorState, blocks.noteTitle);
        }
        return editorState;
    },
});

export { createFirstLineHeader };

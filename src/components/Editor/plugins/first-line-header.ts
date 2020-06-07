// Import and add to your Editor's plugins

import { RichUtils, EditorState } from 'draft-js';

const HEADING = 'note-title';

const createFirstLineHeader = () => ({
    onChange: (editorState: EditorState) => {
        const currentContent = editorState.getCurrentContent();
        const firstBlockKey = currentContent.getBlockMap().first().getKey();
        const currentBlockKey = editorState.getSelection().getAnchorKey();
        const isFirstBlock = currentBlockKey === firstBlockKey;
        const currentBlockType = RichUtils.getCurrentBlockType(editorState);
        const isHeading = currentBlockType === HEADING;
        if (isFirstBlock !== isHeading) {
            return RichUtils.toggleBlockType(editorState, HEADING);
        }
        return editorState;
    },
});

export { createFirstLineHeader };
import { RichUtils } from 'draft-js';
import { editorStore } from 'store/editorStore';
import { nonClearStyles, stylesSchema } from '../styleSchema';

/**
 * Get selection range
 * @returns selection range
 */
export const getSelectionRange = (): Range | null => {
    const selection = window.getSelection();
    if (!selection) return null;
    if (selection.rangeCount === 0) return null;
    return selection.getRangeAt(0);
};

/**
 * Get selection coords
 * @param selectionRange - selection range
 * @param width - width offset
 * @param height  - height offset
 * @returns block position
 */
export const getSelectionCoords = (
    selectionRange: Range,
    width: number,
    height: number
): { offsetLeft: number; offsetTop: number } | null => {
    const editorBounds = document.querySelector<HTMLDivElement>('.editor-container')?.getBoundingClientRect();
    if (!editorBounds) return null;
    const rangeBounds = selectionRange.getBoundingClientRect();
    const rangeWidth = rangeBounds.right - rangeBounds.left;
    const offsetLeft = rangeBounds.left - editorBounds.left + rangeWidth / 2 - width / 2;
    const offsetTop = rangeBounds.top - editorBounds.top - height;
    return { offsetLeft, offsetTop };
};

/**
 * Clear line styles
 */
export const newLineClearStyles = (): void => {
    if (window.requestAnimationFrame)
        window.requestAnimationFrame(() => {
            const styles = editorStore.editorData.getCurrentInlineStyle().toArray();
            styles.forEach((style) => {
                if (!nonClearStyles.includes(style)) {
                    editorStore.edit(RichUtils.toggleInlineStyle(editorStore.editorData, style));
                }
            });
            const currentBlockStyles = RichUtils.getCurrentBlockType(editorStore.editorData).toString();
            if (!nonClearStyles.includes(currentBlockStyles)) {
                editorStore.edit(RichUtils.toggleBlockType(editorStore.editorData, currentBlockStyles));
            }
        });
};

/**
 * Prohibition of title deletion
 */
export const prohibitionOfTitleDeletion = (): void => {
    if (window.requestAnimationFrame)
        window.requestAnimationFrame(() => {
            const currentContent = editorStore.editorData.getCurrentContent();
            const firstBlockKey = currentContent.getBlockMap().first().getKey();
            const currentBlockKey = editorStore.editorData.getSelection().getAnchorKey();
            const isFirstBlock = currentBlockKey === firstBlockKey;
            const currentBlockType = RichUtils.getCurrentBlockType(editorStore.editorData);
            const isHeading = currentBlockType === stylesSchema.block.noteTitle.style;
            if (isFirstBlock !== isHeading) {
                editorStore.edit(RichUtils.toggleBlockType(editorStore.editorData, stylesSchema.block.noteTitle.style));
            }
        });
};

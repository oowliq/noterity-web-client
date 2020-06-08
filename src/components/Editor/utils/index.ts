export const getSelectionRange = (): Range | null => {
    const selection = window.getSelection();
    if (!selection) return null;
    if (selection.rangeCount === 0) return null;
    return selection.getRangeAt(0);
};

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

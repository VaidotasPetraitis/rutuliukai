const CANVAS = document.getElementById('canvas');

export const CTX = CANVAS.getContext('2d');
export const UI = document.getElementById('ui');

export const CANVAS_SIZE = {
    Width: window.innerWidth,
    Height: window.innerHeight
};

CANVAS.width = CANVAS_SIZE.Width;
CANVAS.height = CANVAS_SIZE.Height;
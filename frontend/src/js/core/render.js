import { CANVAS_SIZE, CTX } from "./canvas.js";

export function canvas_clear() {
    CTX.clearRect(0, 0, CANVAS_SIZE.Width, CANVAS_SIZE.Height);
};

export function canvas_filled_rectangle(loc, dim, {fill_style = "black", hp = null} = {}) {
    CTX.save();
    CTX.globalAlpha = hp ? 1 * (hp.value / hp.value_max) : 1;
    CTX.fillStyle = fill_style;
    CTX.fillRect(loc.x, loc.y, dim.width, dim.height);
    CTX.restore();
};

export function canvas_filled_circle(loc, dim, {fill_style = "black", hp = null} = {}){
    CTX.save();
    CTX.globalAlpha = hp ? 1 * (hp.value / hp.value_max) : 1;
    CTX.fillStyle = fill_style;
    CTX.beginPath();
    CTX.arc(loc.x + dim.width / 2, loc.y + dim.height / 2, dim.radius, 0, Math.PI *2);
    CTX.fill();
    CTX.restore();
};

export function canvas_hollow_rectangle(loc, dim, {stroke_style = "black"} = {}) {
    CTX.save();
    CTX.strokeStyle = stroke_style;
    CTX.strokeRect(loc.x, loc.y, dim.width, dim.height);
    CTX.restore();
};

export function canvas_transformation(loc, scale, {fill_style = "black"} = {}) {
    CTX.scale(scale.factor, scale.factor);
    CTX.translate(scale.offset.x, scale.offset.y);
    CTX.translate(-loc.x, -loc.y);
    CTX.fillStyle = fill_style;
    CTX.fillRect(0, 0, CANVAS_SIZE.Width, CANVAS_SIZE.Height);
    canvas_gridlines(20, "RGBA(255,255,255,0.04)");
};

export function radial_gradient(loc, settings) {
    const gradient = CTX.createRadialGradient(
        loc.x, loc.y, 0,
        loc.x, loc.y, Math.min(CANVAS_SIZE.Width, CANVAS_SIZE.Height) / settings.size
    );
    gradient.addColorStop(settings.strength.from, `rgba(${settings.rgba.from.join(',')})`);
    gradient.addColorStop(settings.strength.to, `rgba(${settings.rgba.to.join(',')})`);
    return gradient;
};

function canvas_gridlines(spacing, color) {
    CTX.strokeStyle = color;
    CTX.lineWidth = 1;

    for (let x = 0; x < CANVAS_SIZE.Width; x += spacing) {
        CTX.beginPath();
        CTX.moveTo(x, 0);
        CTX.lineTo(x, CANVAS_SIZE.Height);
        CTX.stroke();
    };

    for (let y = 0; y < CANVAS_SIZE.Height; y += spacing) {
        CTX.beginPath();
        CTX.moveTo(0, y);
        CTX.lineTo(CANVAS_SIZE.Width, y);
        CTX.stroke();
    };
};

export function canvas_save(){
    CTX.save();
};

export function canvas_restore() {
    CTX.restore();
}

export function canvas_monster_health(loc, dim, hp, {fill_style = "red"} = {}) {
    const hp_bar_width = dim.width / hp.value_max;

    CTX.save();
    CTX.fillStyle = "black";
    CTX.fillRect(
        loc.x, 
        loc.y - 4, 
        hp.value_max * hp_bar_width, 
        2);
    CTX.fillStyle = fill_style;
    CTX.fillRect(
        loc.x, 
        loc.y - 4, 
        hp.value * hp_bar_width, 
        2);
    CTX.restore();
};

export function canvas_trail(positions, color, width) {
    if(positions.length) {
        CTX.save();
        const gradient = line_gradient(positions[0].x,positions[0].y,positions[positions.length - 1].x,positions[positions.length - 1].y,color);
        CTX.strokeStyle = gradient;
        CTX.lineWidth = width;
        CTX.lineJoin = "round";
        CTX.lineCap = "round";
        CTX.beginPath();
        CTX.moveTo(positions[0].x, positions[0].y);
        for (let i = 0; i < positions.length; i++) {
            const position = positions[i];
            CTX.lineTo(position.x,position.y);
        }
        CTX.stroke();
        CTX.restore();
    }
};

function line_gradient(start_x, start_y, end_x, end_y, color) {
    const gradient = CTX.createLinearGradient(start_x, start_y, end_x, end_y);
    gradient.addColorStop(color.from, "transparent");
    gradient.addColorStop(color.to, color.code);
    return gradient;
};

export function set_global_opacity(value) {
    CTX.save();
    CTX.fillStyle = `RGBA(0,0,0,${value})`;
    CTX.fillRect(0,0,CANVAS_SIZE.Width, CANVAS_SIZE.Height);
    CTX.restore();
};
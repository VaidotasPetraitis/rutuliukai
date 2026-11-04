import { UI } from "../../../core/canvas.js";

export class TimeBar {
    
    html_build_time() {
        UI.innerHTML += `
            <div id="time-header">
                <h3></h3>
            </div>
        `;
    };

    html_update_time(ts) {
        const el = document.getElementById('time-header');
        const h3 = el.querySelector('h3');
        h3.innerHTML = `${ts.m}:${ts.s}`;
    };

    html_remove_time() {
        UI.removeChild(document.getElementById('time-header'));
    };
};
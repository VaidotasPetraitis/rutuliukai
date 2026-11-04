import { UI } from "../../../core/canvas.js";

export class KillBar {
    
    html_build_kill() {
        UI.innerHTML += `
            <div id="kill-header">
                <h3></h3>
            </div>
        `;
    };

    html_update_kill(kills) {
        const el = document.getElementById('kill-header');
        const h3 = el.querySelector('h3');
        h3.innerHTML = `${kills} 💥`;
    };
    
    html_remove_kill() {
        UI.removeChild(document.getElementById('kill-header'));
    };
};
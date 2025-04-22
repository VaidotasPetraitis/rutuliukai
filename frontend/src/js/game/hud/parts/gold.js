import { UI } from "../../../core/canvas.js";

export class GoldBar {
    
    html_build_gold() {
        UI.innerHTML += `
            <div id="gold-header">
                <h3></h3>
            </div>
        `;
    };

    html_update_gold(gold) {
        const el = document.getElementById('gold-header');
        const h3 = el.querySelector('h3');
        h3.innerHTML = `${gold} 💳`;
    };
    
    html_remove_gold() {
        UI.removeChild(document.getElementById('gold-header'));
    };
};
import { UI } from "../../../core/canvas.js";
import { UPGRADE_DATA, HTML_PLAYER_DATA } from "../../../core/fetch.js";

export class UpgradeSlots {
    constructor() {
        this.scale = HTML_PLAYER_DATA.scale;
        this.width = HTML_PLAYER_DATA.width;
        this.rarity = UPGRADE_DATA.rarity;
        this.settings = UPGRADE_DATA.settings;
    };

    html_build_upgrade_slots(equipped_upgrades) {
        UI.innerHTML += `<div id="upgrade-slots-container">
            ${this.html_build_slots(equipped_upgrades)}
        </div>`;
    };

    html_build_slots(equipped_upgrades) {
        
        let section = ``;
        const size = equipped_upgrades.size();

        for (let i = 0; i < size; i++) {
            const upgrade = equipped_upgrades.get(i);
            section += `<div class="upgrade-slots" id="slot-${i}">${upgrade.name}</div>`
        };

        for (let i = size; i < this.settings.upgrades_slots_max; i++) {
            section += `<div class="upgrade-slots" id="slot-${i}"></div>`
        };

        return section;
    };

    html_update_upgrade_slots(equipped_upgrades) {
        const container = document.getElementById('upgrade-slots-container');
        const divs = container.querySelectorAll('div');
        divs.forEach((slot) => {
            const selected_slot_index = slot.attributes[1].value.split('-')[1];
            if(equipped_upgrades.get(selected_slot_index) != null) {
                const color = this.rarity[equipped_upgrades.get(selected_slot_index).tier.rarity].color;
                slot.style.backgroundColor = `rgba(${color}, 0.4)`;
                slot.style.border = `2px solid rgba(${color}, 1)`;
            };
        });
    };

    html_remove_upgrade_slots() {
        UI.removeChild(document.getElementById('upgrade-slots-container'));
    };
}
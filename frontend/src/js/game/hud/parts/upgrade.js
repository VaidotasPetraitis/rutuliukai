import { UI } from "../../../core/canvas.js";
import { HTML_PLAYER_DATA, UPGRADE_DATA, UPGRADE_TIER_HTML_DB_DATA } from "../../../core/fetch.js";

export class UpgradeCards {
    constructor() {
        this.scale = HTML_PLAYER_DATA.scale;
        this.width = HTML_PLAYER_DATA.width;
        this.rarity = UPGRADE_DATA.rarity;
        this.open = false;
        this.clicked = false;
        this.event_listeners = [];
    };

    html_build(upgrades) {
        if (!this.open) {
            this.clicked = false;
            this.open = true;
            this.html_build_upgrades(upgrades);
            this.add_event_select_upgrade(upgrades);
        };
    };

    html_build_upgrades(upgrades) {
        UI.innerHTML += `
            <div id="upgrade-header">
                <h1>LEVEL UP!</h1>
            </div>
            <div id="upgrade-container">
                ${this.html_add_upgrades_to_container(upgrades)}
            </div>
        `;
    };

    html_add_upgrades_to_container(upgrades) {
        let section = ``;
        for (let i = 0; i < upgrades.length; i++) {
            const upgrade = upgrades[i];
            section += `
                <div class="upgrade-card" id="upgrade-${i}">
                    <h2>${upgrade.name}</h2>
                    <h6>${upgrade.lv.current}/${upgrade.lv.max}</h6>
                    <h3>${upgrade.tier.rarity}</h3>
                    <p>${upgrade.description}</p>
                    <img src="${upgrade.img}"/>
            `;

            const tile_list = UPGRADE_TIER_HTML_DB_DATA[upgrade.id];
            
            if(tile_list.len > 1) {
                section += `<ul>`;
                for (let j = 0; j < tile_list.len; j++) {
                    section += `
                        <li>
                            ${tile_list.text[j]}: 
                            <strong style="color: ${tile_list.color[j]};"> 
                                ${tile_list.operator[j]} ${upgrade.tier.value[j] * tile_list.factor[j]} ${tile_list.sign[j]}
                            </strong>
                        </li>
                    `;
                };
                section += `</ul>`;
            } else if (tile_list.len == 1){
                section += `<ul>`
                section += `
                    <li>
                        ${tile_list.text}: 
                        <strong style="color: ${tile_list.color};"> 
                            ${tile_list.operator} ${upgrade.tier.value * tile_list.factor} ${tile_list.sign}
                        </strong>
                    </li>
                `;
                section += `</ul>`;
            };
            section += `</div>`;
        };
        return section;
    };

    add_event_select_upgrade(upgrades) {
        document.querySelectorAll('.upgrade-card').forEach(card => {
            const listener = () => this.event_click_card(card, upgrades);
            card.addEventListener('click', listener);
            this.event_listeners.push({ card, listener });
        });
    };

    event_click_card(card, upgrades) {
        const selected_card_index = card.attributes[1].value.split('-')[1];
        upgrades[selected_card_index].selected = true;
        this.clicked = true;
        this.open = false;
    };

    html_update(upgrades){
        const container = document.getElementById('upgrade-container');
        const divs = container.querySelectorAll('div');
        divs.forEach((card) => {
            const selected_card_index = card.attributes[1].value.split('-')[1];
            const color = this.rarity[upgrades[selected_card_index].tier.rarity].color;
            card.style.boxShadow = `0 0 10px rgba(${color}, 1)`;
            card.style.backgroundColor = `rgba(${color}, 0.4)`;
            card.style.border = `2px solid rgba(${color}, 1)`;
            
            const h3 = card.querySelector('h3');
            h3.style.color = `rgba(${color}, 1)`;

            const img = card.querySelector('img');
            img.style.border = `2px solid rgba(${color}, 1)`;
        });
    };

    html_decomission() {
        this.event_listeners.forEach(({ card, listener }) => { card.removeEventListener('click', listener); });
        this.event_listeners = [];
        UI.removeChild(document.getElementById('upgrade-header'));
        UI.removeChild(document.getElementById('upgrade-container'));
        this.clicked = false;
    };
};
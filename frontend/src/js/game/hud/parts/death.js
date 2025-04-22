import { UI } from "../../../core/canvas.js";
import { UPGRADE_DATA, fetch_post } from "../../../core/fetch.js";

export class DeathBar {
    constructor() {
        this.rarity = UPGRADE_DATA.rarity;
        this.settings = UPGRADE_DATA.settings;
        this.clicked = false;
    };

    html_build_death(report, upgrades) {
        this.clicked = false;

        UI.innerHTML += `
            <div id="death-screen">
                <div id="death-screen-header">
                    <h1>RESULT</h1>
                </div>

                <div id="death-screen-weapons-upgrades">
                    <div id="death-screen-weapons">
                        ${this.html_build_death_weapons(report)}
                    </div>
                    <div id="death-screen-upgrades">
                        ${this.html_build_death_upgrades(upgrades)}
                    </div>
                </div>

                <div id="death-screen-const">
                    <ul>
                        <li>Time: ${report.stats.time_formatted}</li>
                        <li>Level: ${report.stats.level}</li>
                        <li>Kills: ${report.stats.kills}</li>
                        <li>Gold Earned: ${report.stats.gold_earned}</li>
                        <li>Damage Taken: ${report.stats.damage_taken}</li>
                    </ul>
                </div>

                <button id ="game-over-button" > CONTINUE </button>
       
            </div>
        `;

        this.html_update_death_upgrades(upgrades);

        this.handler_click(report.stats.kills);
    };
    
    html_build_death_weapons(report) {
        let section = `
            <table>
                <tr>
                    <th>Weapon</th>
                    <th>Damage</th>
                    <th>Time</th>
                    <th>DPS</th>
                </tr>
        `;

        for (const key in report.weapons) {
            const weapon = report.weapons[key];
            if (weapon.damage > 0) {
                section += `
                    <tr>
                        <td>${key.toUpperCase()}</td>
                        <td>${weapon.damage}</td>
                        <td>${weapon.format_duration}</td>
                        <td>${weapon.dps}</td>
                    </tr>
                `;
            };
        };

        section += `</table>`;
        return section;
    };

    html_build_death_upgrades(upgrades) {
        let section = ``;

        const size = upgrades.size();

        for (let i = 0; i < size; i++) {
            const upgrade = upgrades.get(i);
            section += `
                <div class="death-screen-upgrade-slots" id="death-screen-upgrades-${i}">
                <h4>${upgrade.name}</h4>
                <p>${upgrade.lv.current}/${upgrade.lv.max}</p>
                </div>
            `;  
        };

        for (let i = size; i < this.settings.upgrades_slots_max; i++) {
            section += `
                <div class="death-screen-upgrade-slots" id="death-screen-upgrades-${i}"></div>
            `;  
        };

        return section;
    };

    html_update_death_upgrades(upgrades) {
        const container = document.getElementById('death-screen-upgrades');
        const divs = container.querySelectorAll('div');

        divs.forEach((slot) => {
            const selected_upgrade_index = slot.attributes[1].value.split('-')[3];
            if(upgrades.get(selected_upgrade_index)) {
                const color = this.rarity[upgrades.get(selected_upgrade_index).tier.rarity].color;
                slot.style.backgroundColor = `rgba(${color}, 0.4)`;
                slot.style.border = `2px solid rgba(${color}, 1)`;
            };
        });
    };

    handler_click(kills){
        const button = document.getElementById('game-over-button');

        const handle = () => {
            this.clicked = true;
            fetch_post({ score: kills }, "highscore/post");
            UI.removeChild(document.getElementById('death-screen'));
            button.removeEventListener('click', handle);
        };

        button.addEventListener('click', handle);
    };
};
import { UI } from "../../../core/canvas.js";
import { HTML_SKILL_DATA, UPGRADE_DATA } from "../../../core/fetch.js";

export class SkillBar {
    constructor() {
        this.scale = HTML_SKILL_DATA.scale;
        this.width = HTML_SKILL_DATA.width;
        this.slots = HTML_SKILL_DATA.slots;
        this.rarity = UPGRADE_DATA.rarity;
    }

    html_build_skills(skills) {
        const section = `
            <div id="skill-container">
                ${this.html_add_skills_to_container(skills)}
            </div>
        `;

        UI.insertAdjacentHTML( 'beforeend', section);
    };

    html_add_skills_to_container(skills) {
        let section = ``;
        for (let i = 0; i < this.slots; i++) {
            const skill = skills[i];
            if(skill.valid()) {
                section += `
                    <div class="skill-card" id="skill-${i}">
                        <p>${skill.cooldown.time.remaining}</p>
                        <img src="${skill.img}"/>
                    </div>
                `;

                continue;
            }
            section += `
                    <div class="skill-card" id="skill-${i}">
                        <p></p>
                        <img src="${skill.img}"/>
                    </div>
            `;
        };
        return section;
    };

    html_update_skills(skills){
        const container = document.getElementById('skill-container');
        const divs = container.querySelectorAll('div');
        divs.forEach((card) => {
            const selected_card_index = parseInt(card.attributes[1].value.split('-')[1], 10);
            const p = card.querySelector('p');
            const img = card.querySelector('img')
            if(skills[selected_card_index].valid()){
                if (skills[selected_card_index].cooldown.time.remaining == skills[selected_card_index].cooldown.time.max) {
                    p.innerHTML = ``;
                    img.style.opacity = 1;
                } else if (skills[selected_card_index].cooldown.time.remaining != skills[selected_card_index].cooldown.time.max) {
                    img.style.opacity = 0.2;
                    p.innerHTML = `${Math.floor(skills[selected_card_index].cooldown.time.remaining / 1000)} sec`;
                }
                const color = this.rarity[skills[selected_card_index].rarity].color;
                card.style.backgroundColor = `rgba(${color}, 0.3)`;
                card.style.borderColor = `rgba(${color}, 0.8)`;
            };
        });
    };

    html_remove_skills() {
        UI.removeChild(document.getElementById('skill-container'));
    };
};
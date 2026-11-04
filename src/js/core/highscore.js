export class Highscore {
    static #storageKey = "rutuliukai.highscore";
    static #best = 0;

    static get() {
        try {
            const stored = Number(localStorage.getItem(Highscore.#storageKey));
            if (Number.isSafeInteger(stored) && stored > Highscore.#best) {
                Highscore.#best = stored;
            }
        } catch (error) {
            console.warn("Could not read the saved high score", error);
        }
        return Highscore.#best;
    }

    static save(score) {
        if (!Number.isSafeInteger(score) || score <= Highscore.get()) {
            return;
        }
        Highscore.#best = score;
        try {
            localStorage.setItem(Highscore.#storageKey, String(score));
        } catch (error) {
            console.warn("Could not save the high score to browser storage", error);
        }
    }
}

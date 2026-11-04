export class Highscore {
    static #storageKey = "rutuliukai.highscore";
    static #best = 0;

    static get() {
        try {
            const stored = Number(localStorage.getItem(Highscore.#storageKey));
            if (Number.isSafeInteger(stored) && stored > Highscore.#best) {
                Highscore.#best = stored;
            }
        } catch {
            // Keep the current session's record when browser storage is unavailable.
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
        } catch {
            // The record is still available for the current session.
        }
    }
}

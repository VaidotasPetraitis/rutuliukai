class GameStartup {
    static async start() {
        try {
            const [{ Application }, { AudioManager }] = await Promise.all([
                import("./app.js"),
                import("./core/audio.js"),
                this.#preloadImages(),
                document.fonts.ready,
            ]);
            await this.#waitToContinue();
            AudioManager.startPlayback();
            const app = new Application();
            requestAnimationFrame(timestamp => {
                app.animate(timestamp);
                document.getElementById("loading-screen").remove();
            });
        } catch (error) {
            console.error("Game startup failed", error);
            document.getElementById("loading-label").textContent = "Could not load the game. Refresh to try again.";
            document.getElementById("loading-continue").hidden = true;
            document.getElementById("loading-bar").remove();
        }
    }

    static async #preloadImages() {
        const data = await import("./core/fetch.js");
        const items = [
            ...Object.values(data.ABILITIES_DATA),
            ...data.SHOP_CATALOG,
            ...data.UPGRADE_BASIC_DB_DATA,
            ...data.UPGRADE_LEGENDARY_DB_DATA,
            ...data.UPGRADE_WEAPON_DB_DATA,
        ];
        const paths = new Set(items.map(item => item.img));
        await Promise.all(Array.from(paths, path => {
            const image = new Image();
            image.src = path;
            return image.decode();
        }));
    }

    static #waitToContinue() {
        const prompt = document.getElementById("loading-continue");
        document.getElementById("loading-label").textContent = "READY";
        document.getElementById("loading-bar").classList.add("is-ready");
        prompt.hidden = false;

        return new Promise(resolve => {
            const input = new AbortController();
            const proceed = event => {
                if (event.repeat || navigator.userActivation?.isActive === false) {
                    return;
                }
                event.preventDefault();
                input.abort();
                resolve();
            };
            const options = { signal: input.signal };
            document.addEventListener("click", proceed, options);
            document.addEventListener("keydown", proceed, options);
        });
    }
}

GameStartup.start();

import { Application } from "./app.js";

(async () => {
    const APP = await new Application();
    APP.animate();
})()
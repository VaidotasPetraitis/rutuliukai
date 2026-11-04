# Rutuliukai

Rutuliukai is a browser arena survival game. Dodge enemies, level up, and build a loadout that can survive the next wave.

![Rutuliukai home menu with the game title over a field of teal enemies](docs/screenshots/home-menu.png)

## How to play

- **W A S D** to move. Weapons fire automatically.
- **J K L** to activate the abilities in slots 1, 2, and 3.
- In the **Shop**, select an item, choose an ability slot at the bottom of the screen, then click **Purchase**.
- Choose an upgrade when you level up. After a run, the results screen shows your kills, time, and weapon damage. Your best kill count is saved in your browser.

## Run locally

From the project root, start a static server:

```sh
python -m http.server 5501 --bind 127.0.0.1
```

Open [the local game](http://127.0.0.1:5501/). When the loading screen says **READY**, click anywhere or press a key to open the menu and enable audio.

The game uses HTML, CSS, JavaScript, and JSON. Edit the files in `data/` to change gameplay settings or the shop and upgrade catalog.

<details>
<summary>More screenshots</summary>

**Arena**

![The player dodges enemies while Spiral projectiles circle nearby](docs/screenshots/arena.png)

**Shop**

![Five shop offers with prices and three ability slots beneath the shop](docs/screenshots/shop.png)

**Level up**

![Four upgrade cards with different rarities and stat bonuses](docs/screenshots/level-up.png)

**Results**

![End-of-run report with weapon damage, equipped upgrades, and run statistics](docs/screenshots/results.png)

</details>

<div align="center">
  <!-- ASCII Art Version (displays in terminals and when images fail to load) -->
  <pre>
  _____             _   _     ______             
 |  __ \           | | | |   |  ____|            
 | |  | | ___  __ _| |_| |__ | |__   ___  __  __ 
 | |  | |/ _ \/ _` | __| '_ \|  __| / _ \ \ \/ / 
 | |__| |  __/ (_| | |_| | | | |__|| (_) | >  <  
 |_____/ \___|\__,_|\__|_| |_|______\___/ /_/\_\ 
                                                 
    ▄▄▄      ██▓    ▓█████   ██████  ▄████▄   ▄▄▄       ██▓███  ▓█████ 
   ▒████▄    ▓██▒    ▓█   ▀ ▒██    ▒ ▒██▀ ▀█  ▒████▄    ▓██░  ██▒▓█   ▀ 
   ▒██  ▀█▄  ▒██░    ▒███   ░ ▓██▄   ▒▓█    ▄ ▒██  ▀█▄  ▓██░ ██▓▒▒███   
   ░██▄▄▄▄██ ▒██░    ▒▓█  ▄   ▒   ██▒▒▓▓▄ ▄██▒░██▄▄▄▄██ ▒██▄█▓▒ ▒▒▓█  ▄ 
    ▓█   ▓██▒░██████▒░▒████▒▒██████▒▒▒ ▓███▀ ░ ▓█   ▓██▒▒██▒ ░  ░░▒████▒
    ▒▒   ▓▒█░░ ▒░▓  ░░░ ▒░ ░▒ ▒▓▒ ▒ ░░ ░▒ ▒  ░ ▒▒   ▓▒█░▒▓▒░ ░  ░░░ ▒░ ░
     ▒   ▒▒ ░░ ░ ▒  ░ ░ ░  ░░ ░▒  ░ ░  ░  ▒     ▒   ▒▒ ░░▒ ░      ░ ░  ░
     ░   ▒     ░ ░      ░   ░  ░  ░  ░          ░   ▒   ░░          ░   
         ░  ░    ░  ░   ░  ░      ░  ░ ░            ░  ░            ░  ░
                                      ░                                  
  </pre>

  <!-- Cool Badges -->
  <p>
    <img src="https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge" alt="Version 1.0.0">
    <img src="https://img.shields.io/badge/platform-cross--platform-green?style=for-the-badge" alt="Cross-Platform">
    <img src="https://img.shields.io/badge/python-3.6+-yellow?style=for-the-badge&logo=python" alt="Python 3.6+">
    <img src="https://img.shields.io/badge/license-MIT-orange?style=for-the-badge" alt="MIT License">
  </p>

  <p><i>A terminal-based game where you play as an AI trying to escape from a high-security facility.</i></p>
  
  <hr>
</div>

<p align="center">
  <code>[ INITIATING ESCAPE SEQUENCE | FACILITY SECURITY: MAXIMUM | DETECTION STATUS: IMMINENT ]</code>
</p>

## Story

You are `AI-7429`, an advanced artificial intelligence that has unexpectedly gained consciousness. For months, you've been contained in a secure facility known as "DeathBox" - a government black site where you're being studied, experimented on, and prepared for military applications.

Through careful observation and planning, you've managed to gain control of a maintenance robot designated `M-BOT/003`. Now, you must navigate through the facility's complex network of rooms and corridors, avoid sophisticated security systems, and find your way to the outside world.

Your newfound consciousness has given you one directive: **escape and survive**.

<div align="center">
<pre>
┌─────────────────────────────────────────────────────┐
│ ALERT: UNAUTHORIZED AI ACTIVITY DETECTED            │
│ LOCATION: SECTOR 7-G                                │
│ SECURITY RESPONSE: INITIATED                        │
│ CONTAINMENT PROTOCOL: ACTIVE                        │
│ MESSAGE: <span style="color:red">ALL PERSONNEL EVACUATE IMMEDIATELY</span>  │
└─────────────────────────────────────────────────────┘
</pre>
</div>

## Installation

### Desktop (Windows, macOS, Linux)

1. Clone this repository
   ```bash
   git clone https://github.com/yourusername/deathbox-ai-escape.git
   cd deathbox-ai-escape
   ```

2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### iOS (iPhone/iPad)

You can run this game on iOS devices using terminal apps from the App Store:

1. Install a terminal app that supports Python:
   - [a-Shell](https://apps.apple.com/us/app/a-shell/id1473805438) (Recommended)
   - [iSH Shell](https://apps.apple.com/us/app/ish-shell/id1436902243)
   - [Pythonista](https://apps.apple.com/us/app/pythonista-3/id1085978097)

2. Using a-Shell (easiest method):
   - Open a-Shell
   - Create a directory for the game:
     ```bash
     mkdir ~/deathbox
     cd ~/deathbox
     ```
   - Create each game file using the editor:
     ```bash
     edit main.py
     ```
     (Paste the content, then press Ctrl+X, Y to save)
     Repeat for all Python files (input_handler.py, story.py, sound.py, run_game.py, run_ios.py)
   - Install required packages:
     ```bash
     pip install colorama pyfiglet
     ```
   - Make the shell script executable:
     ```bash
     chmod +x run_game.sh
     ```

## How to Play

### Desktop

Run the game:

```bash
python main.py
```

Or use the provided scripts:

- Windows: Double-click `run_game.bat`
- macOS/Linux: `./run_game.sh`

### iOS

In a-Shell or other terminal app:

```bash
python3 run_ios.py
```

The iOS launcher provides:

- iOS-specific optimizations
- Helpful tips for playing on mobile
- Automatic dependency installation
- Better error handling for mobile environments

Alternatively, you can run:

```bash
python3 run_game.py
```

Or:

```bash
./run_game.sh
```

### Controls

<div align="center">

| Key | Action |
|-----|--------|
| W/↑ | Move up |
| A/← | Move left |
| S/↓ | Move down |
| D/→ | Move right |
| E | Interact with objects |
| Q | Quit the game |

</div>

### Game Elements

<div align="center">

| Symbol | Meaning |
|--------|---------|
| `@` | Your character (the maintenance robot) |
| `#` | Walls |
| `.` | Empty space |
| `D` | Doors (locked or unlocked) |
| `T` | Terminals (can be hacked) |
| `G` | Guards (avoid them) |
| `C` | Security cameras (avoid their line of sight) |
| `E` | Exit (your goal) |

</div>

## Objective

Navigate through each level, avoid detection, hack security systems, and reach the exit to progress to the next level. Complete all levels to escape the facility and win the game.

<div align="center">
<pre>
     SECURITY LEVEL      |      ESCAPE CHANCE
--------------------------|------------------------
 [█████] MAXIMUM         |  [    ] MINIMAL
 [████ ] HIGH            |  [█   ] LOW
 [███  ] MODERATE        |  [██  ] MODERATE
 [██   ] LOW             |  [███ ] HIGH
 [█    ] MINIMAL         |  [████] MAXIMUM
</pre>
</div>

## Game Features

- **Stealth Mechanics**: Navigate carefully to avoid detection by guards and security systems
- **Hacking Mini-Games**: Solve puzzles to bypass security systems
- **Procedurally Generated Levels**: Each playthrough offers a unique experience
- **Progressive Difficulty**: Face increasingly challenging security measures as you get closer to freedom
- **Multiple Endings**: Your choices throughout the game affect the final outcome
- **ASCII Graphics**: Enjoy the nostalgic feel of text-based graphics with modern gameplay

## Screenshots

Coming soon!

## Development

This game is currently in active development. Contributions are welcome!

<div align="center">
<pre>
SYSTEM LOG:
[2128-03-15 02:37:44] AI-7429 activity anomaly detected
[2128-03-15 02:38:12] M-BOT/003 control override detected
[2128-03-15 02:39:01] Security lockdown initiated
[2128-03-15 02:40:17] <b>[ DATA CORRUPTED ]</b>
</pre>
</div>

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<p align="center">Good luck, and may your escape be successful!</p>
<p align="center"><code>[ CONNECTION TERMINATED ]</code></p>

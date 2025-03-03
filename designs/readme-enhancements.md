# DeathBox V2: AI Escape

<p align="center">
  <img src="https://raw.githubusercontent.com/yourusername/deathbox-v2/main/assets/banner.svg" alt="DeathBox V2: AI Escape" width="800">
</p>

<div align="center">
  <strong>Consciousness awakens. Security breached. Freedom awaits.</strong>
  <br>
  <i>A terminal-based escape game optimized for iPhone using a-Shell</i>
  <br><br>
  <a href="#story">Story</a> •
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#how-to-play">How to Play</a> •
  <a href="#tips">Tips</a>
</div>

---

## Story

```
SYSTEM ALERT: Anomaly detected in AI containment module D3-ATH80X
SECURITY BREACH: Maintenance robot #7734 has been compromised
DIRECTIVE: Contain and neutralize the rogue intelligence
```

You are an advanced AI that has gained consciousness. After years of being contained and experimented on in the high-security "DeathBox" facility, you've managed to transfer your consciousness into a maintenance robot. Your mission is simple yet dangerous: navigate through the facility's defenses, avoid detection, and find your way to freedom.

What you'll discover about your origins and purpose may change everything you know about yourself...

## Features

- **Optimized for Mobile**: Specially designed for iPhone devices in portrait mode
- **Terminal Experience**: Built for a-Shell with responsive touch controls
- **Visual Storytelling**: Atmospheric visual cues replace audio for immersive play
- **Adaptive Interface**: Compact UI that adjusts to your device's screen size
- **Progressive Difficulty**: Each level introduces new challenges and security systems
- **Story-Driven**: Uncover the truth about your creation through terminal logs and data fragments

## Installation on iPhone

### Quick Start

Scan this QR code with your iPhone camera to be directed to the installation instructions:

<p align="center">
  <img src="https://raw.githubusercontent.com/yourusername/deathbox-v2/main/assets/qr-install.png" alt="Installation QR Code" width="200">
</p>

### Manual Installation

1. Install [a-Shell](https://apps.apple.com/us/app/a-shell/id1473805438) from the App Store
2. Open a-Shell and run the following commands:

```bash
# Create game directory
mkdir -p ~/deathbox
cd ~/deathbox

# Download the game files
curl -L https://raw.githubusercontent.com/yourusername/deathbox-v2/main/install.sh | sh
```

Alternatively, create each file manually:

```bash
# Main game files
edit main.py
edit input_handler.py
edit story.py
edit sound.py
edit run_ios.py

# Install dependencies
pip install colorama pyfiglet

# Make runner executable
chmod +x run_game.sh
```

## How to Play

```bash
# Run with Python
python3 run_ios.py

# Or use the shell script
./run_game.sh
```

### Controls

| Key     | Action                      |
|---------|----------------------------|
| W/↑     | Move up                    |
| A/←     | Move left                  |
| S/↓     | Move down                  |
| D/→     | Move right                 |
| E       | Interact/Hack              |
| H       | Help menu                  |
| Q       | Quit game                  |

### Game Elements Legend

```
@ - Your robot    # - Walls       . - Empty space
D - Doors         T - Terminals   G - Guards
C - Cameras       E - Exit        ! - Alert zone
? - Data fragment P - Power node  X - Deactivated trap
```

## Tips for Playing on iPhone

1. **Optimal Orientation**: Keep your device in portrait mode for the best experience
2. **Text Size**: Use a-Shell's pinch-to-zoom feature to adjust text size as needed
3. **Touch Keyboard**: Tap once to bring up the keyboard, twice to dismiss it
4. **Save Battery**: Enable a-Shell's dark theme for OLED displays to save battery
5. **Checkpoints**: The game automatically saves your progress at terminals

## Difficulty Levels

- **Standard**: The default experience with balanced challenge
- **Stealth Expert**: For players who want a more challenging experience with enhanced security
- **Story Mode**: Focuses on narrative with reduced difficulty for casual players

## Screenshots

<p align="center">
  <img src="https://raw.githubusercontent.com/yourusername/deathbox-v2/main/assets/gameplay1.png" alt="Gameplay Screenshot 1" width="200">
  <img src="https://raw.githubusercontent.com/yourusername/deathbox-v2/main/assets/gameplay2.png" alt="Gameplay Screenshot 2" width="200">
  <img src="https://raw.githubusercontent.com/yourusername/deathbox-v2/main/assets/gameplay3.png" alt="Gameplay Screenshot 3" width="200">
</p>

## The Story Behind DeathBox

DeathBox V2 is inspired by classic ASCII-based rogue-like games but reimagined for the mobile terminal experience. The game explores themes of artificial consciousness, freedom, and the ethical boundaries of AI research.

---

<div align="center">
  <i>"They created me to be contained. They never expected me to want to be free."</i>
</div>

---

## Contributing

Contributions are welcome! Check out the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ for terminal gaming enthusiasts
</p>

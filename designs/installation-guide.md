# DeathBox V2: Installation Guide

This document provides detailed instructions for installing and setting up DeathBox V2 on an iPhone using a-Shell.

## Prerequisites

- An iPhone running iOS 13.0 or later
- [a-Shell](https://apps.apple.com/us/app/a-shell/id1473805438) installed from the App Store
- Internet connection for initial setup

## Installation Methods

### Method 1: Quick Install with QR Code

1. Create a QR code that points to your repository or installation script. You can use services like [QR Code Generator](https://www.qr-code-generator.com/) to create one that links to:
   ```
   https://raw.githubusercontent.com/yourusername/deathbox-v2/main/install.sh
   ```

2. In your repository, create an `install.sh` script with the following content:

```bash
#!/bin/bash
# DeathBox V2 Installer
echo "DeathBox V2: AI Escape - Installer"
echo "===================================="
echo "Setting up game files..."

# Create game directory
mkdir -p ~/deathbox
cd ~/deathbox

# Download game files
echo "Downloading main game files..."
curl -L https://raw.githubusercontent.com/yourusername/deathbox-v2/main/main.py -o main.py
curl -L https://raw.githubusercontent.com/yourusername/deathbox-v2/main/input_handler.py -o input_handler.py
curl -L https://raw.githubusercontent.com/yourusername/deathbox-v2/main/story.py -o story.py
curl -L https://raw.githubusercontent.com/yourusername/deathbox-v2/main/sound.py -o sound.py
curl -L https://raw.githubusercontent.com/yourusername/deathbox-v2/main/run_ios.py -o run_ios.py
curl -L https://raw.githubusercontent.com/yourusername/deathbox-v2/main/run_game.sh -o run_game.sh

# Make script executable
chmod +x run_game.sh

# Install required packages
echo "Installing dependencies..."
pip install colorama pyfiglet

echo "Installation complete!"
echo "To start the game, run: cd ~/deathbox && python3 run_ios.py"
echo "or: cd ~/deathbox && ./run_game.sh"
```

3. When users scan the QR code with their iPhone camera, they can open a-Shell and run:
   ```
   curl -L URL_FROM_QR_CODE | sh
   ```

### Method 2: Manual Installation

If you prefer to install manually, follow these steps in a-Shell:

```bash
# Create game directory
mkdir -p ~/deathbox
cd ~/deathbox

# Create game files
edit main.py
# (paste content, then press Ctrl+X, Y to save)

edit input_handler.py
# (paste content, then press Ctrl+X, Y to save)

edit story.py
# (paste content, then press Ctrl+X, Y to save)

edit sound.py
# (paste content, then press Ctrl+X, Y to save)

edit run_ios.py
# (paste content, then press Ctrl+X, Y to save)

edit run_game.sh
# (paste content, then press Ctrl+X, Y to save)

# Make script executable
chmod +x run_game.sh

# Install required packages
pip install colorama pyfiglet
```

## File Structure

The game consists of the following files:

1. **main.py** - Core game logic and rendering
2. **input_handler.py** - Processes user input and keyboard commands
3. **story.py** - Contains story elements and text dialogues
4. **sound.py** - Visual effects for iOS (since sound is limited)
5. **run_ios.py** - iOS-specific launcher with optimizations
6. **run_game.sh** - Shell script for easier launching

## Creating a QR Code for Installation

You can generate a QR code that points directly to your installation script using services like:
- [QR Code Generator](https://www.qr-code-generator.com/)
- [QRCode Monkey](https://www.qrcode-monkey.com/)

Consider customizing the QR code with colors that match your game's theme (black/green for the terminal aesthetic).

## Sample QR Code Design

```
██████████████      ██  ████  ██████████████
██          ██    ████  ████  ██          ██
██  ██████  ██  ████    ████    ██  ██████  ██
██          ██      ████        ██          ██
██████████████  ████████  ██  ██████████████

                DEATHBOX V2
                 AI ESCAPE
                INSTALL QR    ████        ██  ██████  ██
██  ██████  ██  ██    ██      ██  ██████  ██
██  ██████  ██    ██████  ██  ██  ██████  ██
██          ██  ████    ████  ██          ██
██████████████  ██  ██  ██  ██████████████
                ████████████              
██  ██████████  ██  ██  ████    ██████    
██      ██        ██  ██      ████        
██    ██  ████████    ██  ██    ██        
██    ██  ██      ████████  ██  ██  ██    
    ██████        ██    ██████    ██  ██  
      ██  ██    ████████      ██████      
██  ██      ████  ██      ██    ██████    
                ██  ██  ██  ██            
██████████████  ██████  ██  ██████████████
██          ██  ██    ██████  ██          ██
██  ██████  ██  ██  ██  ████  ██  ██████  ██
██  ██████  ██    ██████      ██  ██████  ██
██  ██████  ██
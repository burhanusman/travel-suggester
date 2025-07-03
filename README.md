# TravelSmart - Uncrowded Destination Finder

A smart travel app that helps you find amazing destinations while avoiding crowds. Get personalized recommendations based on real-time crowd data and your budget.

## 🚀 Quick Setup Guide

Follow these steps to get the app running on your computer. Don't worry if you're new to this - we'll walk you through everything!

### Step 1: Install Required Software

Before we start, you'll need these tools installed on your computer:

#### 1.1 Install Git (for downloading the code)
- **Windows**: Download from [git-scm.com](https://git-scm.com/download/win) and run the installer
- **Mac**: Open Terminal and type `git --version`. If not installed, it will prompt you to install
- **Linux**: Run `sudo apt install git` (Ubuntu/Debian) or `sudo yum install git` (CentOS/RHEL)

#### 1.2 Install Node.js (for running the app)
- Go to [nodejs.org](https://nodejs.org/)
- Download the **LTS version** (recommended for most users)
- Run the installer and follow the setup wizard
- This will also install `npm` (package manager) automatically

#### 1.3 Install Cursor (code editor)
- Go to [cursor.sh](https://cursor.sh/)
- Download Cursor for your operating system
- Install and open Cursor

### Step 2: Download the Project from GitHub

#### 2.1 Copy the Repository URL
```
https://github.com/[username]/travel-suggester.git
```
*(Replace `[username]` with the actual GitHub username)*

#### 2.2 Clone the Repository
**Option A: Using Cursor (Recommended)**
1. Open Cursor
2. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
3. Type "Git: Clone" and select it
4. Paste the repository URL
5. Choose a folder where you want to save the project
6. Click "Open" when it's done downloading

**Option B: Using Terminal/Command Line**
1. Open Terminal (Mac/Linux) or Command Prompt (Windows)
2. Navigate to where you want the project: `cd Desktop` (for example)
3. Run: `git clone https://github.com/[username]/travel-suggester.git`
4. Open Cursor and open the `travel-suggester` folder

### Step 3: Open the Project in Cursor

1. If you haven't already, open Cursor
2. Go to `File > Open Folder`
3. Select the `travel-suggester` folder you just downloaded
4. You should see all the project files in the sidebar

### Step 4: Install Project Dependencies

1. In Cursor, open the **Terminal** panel:
   - Go to `View > Terminal` or press `Ctrl+`` (backtick)
2. Make sure you're in the project folder (you should see files like `package.json`)
3. Run this command:
   ```bash
   npm install --legacy-peer-deps
   ```
4. Wait for it to finish (this might take a few minutes)

### Step 5: Start the Development Server

1. In the same terminal, run:
   ```bash
   npm run dev
   ```
2. You should see a message like:
   ```
   ▲ Next.js 15.0.0
   - Local:        http://localhost:3000
   ```
3. Open your web browser and go to `http://localhost:3000`
4. You should see the TravelSmart app running! 🎉

## 🔧 Troubleshooting

### Common Issues and Solutions

**"git is not recognized" or "git command not found"**
- Git isn't installed. Go back to Step 1.1

**"npm is not recognized" or "npm command not found"**
- Node.js isn't installed. Go back to Step 1.2

**"Port 3000 is already in use"**
- Another app is using port 3000. The terminal will suggest an alternative port (like 3001)
- Just say "yes" when it asks if you want to use the alternative port

**Dependency installation fails**
- Try deleting the `node_modules` folder and `package-lock.json` file
- Run `npm install --legacy-peer-deps` again

**The app shows errors or doesn't load**
- Make sure you're running the latest Node.js LTS version
- Check the terminal for error messages
- Try stopping the server (Ctrl+C) and running `npm run dev` again

### Getting Help

If you run into issues:
1. Check that all software is properly installed
2. Make sure you're in the correct project folder
3. Look for error messages in the terminal
4. Try restarting Cursor and your terminal

## 📱 What You'll See

Once the app is running, you can:
- Search for travel destinations
- Filter by crowd levels and budget
- View crowd trend charts
- Get personalized travel recommendations
- Explore uncrowded destinations around the world

## 📚 Learn More

- See [PROJECT_DETAILS.md](./PROJECT_DETAILS.md) for detailed technical information
- Browse the code in the `src/` folder to understand how it works
- Check out the API endpoints in `src/app/api/`

---

**Happy travels!** 🌍 Now go discover some amazing uncrowded destinations!

# 🚦 Google Traffic Bot

Google Traffic Bot is a simple JavaScript tool designed to improve Google SEO by simulating organic traffic. Built with Electron for a user-friendly interface and Selenium for web automation.

---

## ✨ Features

- 🚗 **Automated Traffic Simulation:** Generate traffic to any website by simulating multiple visitors.
- 🎯 **Behavior Customization:** Define how bots interact with the site, including scrolling and clicking.
- 🌐 **Proxy Support:** Rotate through proxy servers to simulate traffic from different locations.
- 🕵️‍♂️ **Stealth Capabilities:** Include stealth settings to mimic human-like browsing and avoid bot detection mechanisms.

---

## 🛠️ Tech Stack

- **JavaScript**: Core scripting language for traffic simulation.
- **Node.js**: JavaScript runtime for executing the application.
- **Electron**: Framework for building the cross-platform desktop application.
- **Selenium**: Library for automating web browser interactions.
- **ChromeDriver**: WebDriver for controlling Chrome in Selenium.

---

## 🚨 Prerequisites

### 🖥️ Requires a Display
> ⚠️ **Note:** This application requires a display to run and **cannot run headless** for now.

### 🛑 Node.js 16 or Higher
Ensure Node.js 16 or higher is installed:

- **Windows**: Install Node.js using [Chocolatey](https://chocolatey.org/):
  ```bash
  choco install nodejs-lts
  ```

- **Ubuntu**: Install Node.js using the following commands:
  ```bash
  sudo apt update
  sudo apt install -y curl
  curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
  sudo apt install -y nodejs
  ```

### 🌟 ChromeDriver Installation
Install the version of ChromeDriver matching your Chrome browser version. For Chrome version `131`, use:
```bash
npm install chromedriver@131.0.0
```

---

## 📦 Installation

1. **Clone the Project**:
   ```bash
   git clone https://github.com/SoHeil-R/google-traffic-bot.git
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd google-traffic-bot
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Ensure the Proxy Folder Exists**:
   Create a `proxy` folder if it doesn’t exist:
   ```bash
   mkdir proxy
   ```

5. **Start the Application**:
   ```bash
   npm run start
   ```

---

## 🛑 Disclaimer

**Google Traffic Bot** is provided for educational purposes only. 🚫 Misuse of this tool to violate any website's terms of service is not recommended or endorsed. Use responsibly!

---

## 📃 License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

---

### 🎉 Enjoy using Google Traffic Bot! 🚀

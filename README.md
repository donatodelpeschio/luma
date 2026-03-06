<p align="center">
  <img src="demo/assets/luma-logo.svg" width="120" alt="Luma Logo">
</p>

<h1 align="center">Luma</h1>

<p align="center">
  Beautiful console logs & toast notifications for modern web apps.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/luma-console">
    <img src="https://img.shields.io/npm/v/luma-console.svg?color=blue&label=npm" alt="npm version">
  </a>
  <a href="https://github.com/donatodelpeschio/luma">
    <img src="https://img.shields.io/github/stars/donatodelpeschio/luma?style=social" alt="GitHub stars">
  </a>
  <a href="https://www.paypal.com/paypalme/mailboxporter">
    <img src="https://img.shields.io/badge/Donate-PayPal-blue.svg" alt="Donate">
  </a>
</p>

---

## ✨ Features

- 🎨 Beautiful, consistent console logs
- 🔥 Premium toast notifications (queue, progress bar, hover pause)
- 🌗 Light / Dark / Auto theme
- ⚡ Zero dependencies
- 📦 Tiny bundle size
- 🧩 Works with any frontend stack
- 🧪 Includes a full interactive demo

---

## 🚀 Demo

👉 **Live Demo:**  
https://donatodelpeschio.github.io/luma/demo/



---

## 📦 Installation

### **NPM**

```bash
npm install luma-console
import luma from "luma-console";
luma.success("Luma is ready!");
```
### **CDN**
```html
<script src="https://cdn.jsdelivr.net/npm/luma-console/dist/luma.min.js"></script>
<script>
  luma.success("Luma loaded from CDN!");
</script>
```

___

## 🧪 Usage

### Basic Logs
```js
luma.log("Hello world");
luma.success("Operation completed");
luma.error("Something went wrong");
luma.warn("Be careful");
luma.info("Useful information");
```
___

### Toast Notifications
```js
luma.toast.success("Saved!");
luma.toast.error("Error!");
luma.toast.warn("Warning!");
luma.toast.info("Info message");
```
___

### Box
```js
luma.box("This is a box message");
```
___

### Group
```js
luma.group("Loading data");
luma.log("Step 1");
luma.log("Step 2");
luma.groupEnd();
``` 
___

### Timer
```js
const t = luma.timer("Process");
setTimeout(() => t.end(), 500);
```
___

### 🎨 Themes
```js
luma.config({
  theme: "light" // "dark" | "auto"
});
```
___

### 🧱 File Structure
```bash
luma/
├── dist/
│   ├── luma.js
│   ├── luma.min.js
│   └── *.map
├── src/
│   └── luma.js
└── demo/
    ├── index.html
    ├── style.css
    └── script.js
```
___

## ❤️ Support the Project
If Luma helps you, consider supporting the project:

👉  [Buy me a coffee](https://www.paypal.com/paypalme/mailboxporter)

👉 [Sponsor on GitHub](https://github.com/sponsors/DonatoDelPeschio)

___

## 📄 License
MIT License — free for personal and commercial use.

___

## 👨‍💻 Author
Donato del Peschio

Freelance Technical Architect & Developer

[https://github.com/DonatoDelPeschio](https://github.com/donatodelpeschio) 


 


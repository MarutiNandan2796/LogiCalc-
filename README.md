# 🧮 All-in-One Calculator

A modern, responsive web application featuring multiple calculators and converters in one place. Built with vanilla JavaScript, Tailwind CSS, and pure HTML—no dependencies needed!

---

## ✨ Features

### 🔢 **Basic Calculator**
- Full arithmetic operations: addition, subtract, multiply, divide
- Keyboard support: type numbers and operators directly
  - Press **Enter** to evaluate
  - Press **Backspace** to delete last character
  - Press **Escape** to clear all
- **Calculation History**: Keep track of all calculations with one-click recall
- **Clear History** option to start fresh
- Real-time expression display

### 🔄 **Unit Converter**
Convert between multiple unit categories with **live conversion** as you type:

**Supported Categories:**
- **Length**: meters (m), kilometers (km), centimeters (cm), millimeters (mm), inches (in), feet (ft)
- **Weight**: kilograms (kg), grams (g), pounds (lb), ounces (oz)
- **Temperature**: Celsius (°C), Fahrenheit (°F), Kelvin (K)

**Features:**
- Real-time conversion as you type
- Easy unit switching with dropdowns
- Copy result to clipboard with one click
- Toast notification confirms copy action

### 📅 **Age Calculator**
Calculate your exact age in:
- Years
- Months
- Days

Simply select your birth date and instantly see your age breakdown. Perfect for quick age verification!

### 📆 **Date & Day Finder**
- Find what **day of the week** any date falls on
- View today's date and day with one click
- Display detailed date information
- Copy results to clipboard

---

## 📦 GitHub Repository

**Repository Name:** [Calculators](https://github.com/marutinandan/Calculators)

Clone this repository to get started:
```bash
git clone https://github.com/marutinandan/Calculators.git
cd Calculators
```

---

## �🚀 Getting Started

### How to Run
1. **Download or clone** this project to your computer
2. **Open `index.html`** in any modern web browser:
   - Windows: Double-click the file, or right-click → "Open with" → your browser
   - Mac: Double-click the file
   - Or drag it into your browser window

That's it! No server, build process, or installation needed.

---

## 📁 Project Structure

| File | Purpose |
|------|---------|
| **`index.html`** | Main HTML structure and layout (includes Tailwind CSS CDN) |
| **`script.js`** | All app logic: calculator, converters, calculations |
| **`styles.css`** | Custom styles: animations, gradients, dark mode support, responsive design |
| **`README.md`** | This documentation file |

---

## 🎨 Design & User Experience

### Visual Design
- **Modern UI** with glass-morphism cards and soft shadows
- **Colorful buttons** with gradients for visual appeal
- **Dark mode support** for comfortable late-night use
- **Fully responsive** layout that works on mobile, tablet, and desktop
- **Smooth animations** including ripple effects on button clicks

### Accessibility & Interaction
- ⌨️ **Keyboard shortcuts** for calculator power users
- 📋 **Copy-to-clipboard** buttons for quick sharing
- 🔔 **Toast notifications** for user feedback
- 🌙 **Theme toggle** to switch between light and dark modes
- Accessible button focus states and visual feedback

---

## ⌨️ Keyboard Shortcuts

**Calculator Only:**
- Type **0-9** to enter numbers
- Type **+, -, *, /** for operations
- Type **.** for decimals
- Press **Enter** to evaluate
- Press **Backspace** to delete
- Press **Escape** to clear

---

## 🔧 Technical Details

### Technologies Used
- **HTML5** for semantic markup
- **CSS3** with custom animations and gradients
- **Tailwind CSS** (via CDN) for responsive styling
- **Vanilla JavaScript** (no frameworks or libraries)

### Code Highlights
- **Safe JavaScript Evaluation**: Uses `Function()` with input validation to safely evaluate math expressions
- **Live Conversion**: Real-time unit conversion as user types
- **History Management**: Calculation history stored and displayed for quick access
- **Theme Persistence**: Dark mode preference can be tracked
- **Ripple Effects**: Professional button animations using vanilla JS

---

## 📝 Code Organization

### `script.js` Main Sections:
1. **Helper Functions**: `toast()`, `copyText()` for notifications and clipboard
2. **Calculator Logic**: Expression input, evaluation, history management
3. **Unit Converter**: Category management, conversion calculations, live updates
4. **Age Calculator**: Date parsing and age calculation
5. **Date/Day Finder**: Date information display

### `styles.css` Features:
- Button gradients and hover effects
- Toast animation keyframes
- Ripple effect animations
- Dark mode color variables
- Responsive grid layouts
- Glass effect backgrounds

---

## 🎯 How to Extend & Customize

### Add More Unit Categories
Edit the `categories` object in `script.js`:
```javascript
const categories = {
  length: ['m','km','cm','mm','in','ft'],
  weight: ['kg','g','lb','oz'],
  temperature: ['C','F','K'],
  // Add your new category here:
  area: ['m²','km²','cm²','in²','ft²']  // example
};
```

### Modify Colors & Styling
- Change button colors in `styles.css`
- Edit Tailwind utility classes in `index.html`
- Customize the gradient backgrounds and shadows

### Add Scientific Functions
The calculator can be extended with:
- Trigonometric functions (sin, cos, tan)
- Logarithmic functions (log, ln)
- Power operations (√, ^)

---

## 💡 Future Enhancement Ideas

- 📊 Add area and volume converters
- ⏱️ Add time and speed converters
- 📐 Add scientific calculator mode (trigonometry, logarithms)
- 💾 Add local storage for calculation history
- 🌍 Add currency converter (with live rates)
- 📊 Add statistics calculator (mean, median, standard deviation)
- 🎨 Add more theme options

---

## ✅ Browser Compatibility

Works on all modern browsers:
- ✅ Chrome / Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📄 License

This project is free to use and modify. Feel free to share and build upon it!

---

## 🎉 Enjoy!

Start calculating, converting, and exploring dates with this all-in-one tool. Perfect for students, professionals, and anyone who needs quick calculations!

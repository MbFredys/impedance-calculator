# 📏 PCB Impedance Calculator

> **Accurate. Visual. Real-time. Built for hardware designers.**

This tool calculates the **characteristic impedance** of **microstrip** and **stripline** PCB traces, featuring real-time visualization of the *stack-up*, bilingual support (EN/ES), and presets for common PCB materials.  
Built with **React + Tailwind CSS** and optimized for **GitHub Pages** deployment.

---

## 🎯 Purpose

- **Assist PCB designers** during the early layout phase  
- **Reduce human error** and speed up design iterations  
- **Educate beginners** on key impedance and trace geometry concepts  
- Runs **100% in the browser** — no servers, no external APIs

---

## 🤖 Built with AI Assistance

Yes — this project was **generated and structured with the help of artificial intelligence**:

- Initial codebase, formulas, UI design, and logical structure created using **Qwen** (web development mode)
- Reviewed, refined, and technically validated by **Fredys Matos Borges** (hardware designer based in Havana)
- Impedance formulas based on industry-standard models:
  - **Hammerstad–Jensen** for microstrip
  - **Wheeler** for stripline

> This is not “magic” — it’s applied engineering knowledge enhanced by AI to solve a real-world problem.

---

## 📦 Usage & License

Released under the **[MIT License](LICENSE)**:

- ✅ Free to **use, modify, and redistribute**
- ✅ Suitable for **personal, educational, or commercial projects**
- ✅ Ideal for **forks**, extensions, or integration into design tools

> Attribution is appreciated, but not required.

---

## 🚀 Deploying to GitHub Pages

1. **Clone or download** this repository  
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build for production:
   ```bash
   npm run build
   ```
4. Upload the contents of the `build/` directory to a GitHub repository.  
5. Go to Settings → Pages, enable GitHub Pages from:
   - Branch: `main`
   - Folder: `/root`.  
6. Done! Your app will be live at:  
   `https://tu-usuario.github.io/nombre-del-repo`

> ⚠️ If deploying under a subpath, ensure `"homepage"` is properly set in `package.json`.

---

### 👨‍🔧 Author

**Fredys Matos Borges**  
- Hardware Designer | PCB | IoT | RF  
- Based in Havana, Cuba — collaborating globally  
- [GitHub](https://github.com/fredysmatos) | [LinkedIn](https://linkedin.com/in/fredysmatos)

> Tools like this are born from real workshop needs — not from hype.

---

### 💡 Why This Exists

Because **manufacturing documentation is often incomplete**, and PCB designers deserve tools that are simple, accurate, and accessible — without relying on expensive software or complex simulators.

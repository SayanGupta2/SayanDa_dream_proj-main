# TaskSathi

TaskSathi is a modern IT solutions platform providing digital services such as web development, cybersecurity, content creation, SEO optimization, AI & ML model development, and more. The project is built with React, TypeScript, Tailwind CSS, and several other libraries to ensure a modern, responsive, and intuitive user experience.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview

TaskSathi empowers businesses and individual clients with comprehensive IT solutions. The application showcases a range of services, an interactive contact form, dynamic modals for confirmations, and an engaging team carousel—all designed with responsiveness and ease-of-use in mind.

---

## Features

- **Modern UI & Responsive Design**: Built using React and Tailwind CSS, ensuring an optimal experience on desktops, tablets, and mobile devices.
- **Service Portal**: Display service cards with icons, titles, and descriptions. New services (like AI & ML Model Development and Custom Solutions) integrate seamlessly.
- **Interactive Contact Form**: Users can submit service requests, with the form prefilled based on the service card selection.
- **Animated Modals**: Confirmation popups using Framer Motion that are optimized for all screen sizes.
- **Team Carousel**: A lazy-loaded carousel showcasing six team members with smooth sliding animations.
- **Internationalization (i18n)**: Multi-language support via react-i18next.
- **Reusable UI Components**: Modular and reusable components (e.g., Card, Button) in a well-organized structure.

---

## Tech Stack

- **React** & **TypeScript** for building robust, type-safe UI components.
- **Tailwind CSS** for utility-first styling and responsive layouts.
- **Framer Motion** for smooth animations and transitions.
- **react-i18next** for internationalization.
- **lucide-react** for high-quality icons.
- **React-Suspense** for lazy-loading components, such as the Team Carousel.
- **React-Slick** (if used) for carousel functionality.

---

## Project Structure

Below is a detailed breakdown of the project structure and descriptions of each key folder/file.

```
TaskSathi/
└── client/
    ├── public/
    │   └── index.html
    │       - The main HTML file containing meta tags, font imports, and the favicon.
    ├── src/
    │   ├── components/
    │   │   ├── Header.tsx
    │   │   │   - Contains the top navigation and branding.
    │   │   ├── Footer.tsx
    │   │   │   - Displays footer links (including Privacy Policy), contact info, and newsletter subscription.
    │   │   ├── ServiceCard.tsx
    │   │   │   - Renders each service card with an icon, title, and description. These cards get their content from translations or data fields.
    │   │   ├── ContactForm.tsx
    │   │   │   - Implements the interactive contact form with service selection, validations, and submission handling.
    │   │   ├── SuccessModal.tsx
    │   │   │   - A modal for confirmation messages on successful form submission, optimized for responsiveness.
    │   │   ├── LanguageSelector.tsx
    │   │   │   - Enables language switching using react-i18next and displays available languages.
    │   │   ├── TeamCarousel.tsx
    │   │   │   - A carousel component (lazy-loaded) for displaying team members.
    │   │   └── ui/
    │   │       └── card.tsx
    │   │           - Contains reusable Card components (CardHeader, CardTitle, CardDescription, CardContent, CardFooter).
    │   ├── data/
    │   │   ├── services.ts
    │   │   │   - Defines the array of service objects with icons, translation keys, titles, image keys, and, for new entries, descriptions.
    │   │   └── translations/
    │   │       └── en.json
    │   │           - Holds English translations for various sections of the app (meta, header, hero, services, about, process, contact, modal, footer, etc.).
    │   ├── pages/
    │   │   ├── home.tsx
    │   │   │   - The main landing page assembling Header, Hero, Services Section, About, Process, Team, and Contact sections.
    │   │   └── privacy.tsx
    │   │       - A dedicated page for the Privacy Policy.
    │   ├── i18n/
    │   │   └── [i18n configuration and additional language JSON files]
    │   └── main.tsx
    │       - The entry point for the React application that bootstraps the app.
    └── package.json
        - Lists project dependencies and scripts.
```

---

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Sayan-Maity-Code/SayanDa_dream_proj.git
   cd SayanDa_dream_proj
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Start the Development Server:**

   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn start
   ```

   By default, the app will run at [http://localhost:5000](http://localhost:5000).

---

## Usage

- **Home Page:**  
  Explore the hero section, service cards (clicking a service scrolls down to the contact form with the service preselected), team carousel, and about/process sections.

- **Service Cards:**  
  Displayed on the Services Section. They fetch their titles and descriptions from the `en.json` translation file via their `translationKey`. New services like "AI & ML Model" and "Others" are added in `services.ts` and appear alongside existing services.

- **Contact Form:**  
  Allows users to submit a service request. The form connects to the selected service and opens a responsive confirmation modal upon submission.

- **Language Selector:**  
  Present in the UI for switching between available languages.

- **Privacy Policy:**  
  Accessible from the Footer, redirecting to `privacy.tsx` which explains the data practices and policies. #yet to be implemented

---

## Contributing

Contributions are welcome! Follow these steps:

1. **Fork the Repository.**
2. **Create a New Branch:**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Commit Your Changes:**

   ```bash
   git commit -m "Add new feature"
   ```

4. **Push to the Branch:**

   ```bash
   git push origin feature/YourFeature
   ```

5. **Create a Pull Request.**

Please adhere to the project's coding style and make sure to test all changes across devices.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For questions or inquiries, please contact:

- **Email:** sayanmaity8001@gmail.com
- **LinkedIn:** [Your LinkedIn](https://www.linkedin.com/in/sayan-maity-756b8b244/)

---

TaskSathi is designed to transform ideas into digital reality with cutting-edge IT solutions. Enjoy exploring the project, and feel free to contribute!

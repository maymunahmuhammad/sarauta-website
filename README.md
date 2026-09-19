# Sarauta: Cold-pressed Juice and Fura

**Live website:** [ADD YOUR VERCEL LINK HERE](https://sarauta-website.vercel.app)
**GitHub repository:** [ADD YOUR REPOSITORY LINK HERE](https://github.com/maymunahmuhammad/sarauta-website)

## Project description

Sarauta is a **fictional** premium Nigerian beverage brand that sells cold-pressed fruit juices and yoghurt fura (*fura da nono*) in glass bottles. This website is its complete front end, built as the final project for a web development course (Digital Presence Project).

The design combines regal colours (deep maroon, burgundy and wine with cream and antique gold) with a dark, cinematic look, and takes its motifs from northern Nigerian embroidery, such as the eight-pointed star used in the logo and on the labels. The drinks stay at the centre of every page.

"Sarauta" is the Hausa word for chieftaincy. The business name, people, address, phone number, email and prices are all invented for this project.

## Features

- Five linked pages with the same navigation bar and footer on each
- Hero section with headline, description and call-to-action buttons
- Product catalogue of six drinks with a working **Juices / Fura filter**
- Services section (Palace Boxes, weekly delivery, events and tastings)
- Image gallery with a **lightbox** (keyboard arrows and Escape supported)
- Front-end contact form with validation and a confirmation message. Links such as "Order this" pre-fill the form.
- FAQ built with native `<details>` elements (no JavaScript needed)
- Footer with business information and social media links
- Gentle animations: hero entrance, fade-in on scroll, hover effects, page fade between pages, smooth scrolling. All are switched off automatically for visitors who prefer reduced motion.
- Accessible basics: skip link, visible keyboard focus, semantic HTML, alt text on images

## Pages included

| Page | File | What it contains |
| --- | --- | --- |
| Home | `index.html` | Hero, signature products, process, fura feature, services, testimonial |
| About | `about.html` | Brand story, values, timeline, where the fruit comes from |
| Products | `products.html` | Six products with filter, ways to order |
| Gallery | `gallery.html` | Ten pictures with lightbox |
| Contact | `contact.html` | Contact form, address and hours, FAQ |

## Technologies used

- **HTML5** for semantic page structure
- **CSS3** with custom properties, Flexbox, Grid, CSS columns, keyframe animations and media queries
- **Vanilla JavaScript** (no libraries or frameworks) for the mobile menu, filter, lightbox, form and scroll effects
- **Google Fonts**: Bodoni Moda (headings) and Jost (body text)
- **SVG** artwork drawn for this project: bottles, logo and gallery illustrations
- **Unsplash** for two royalty-free photographs in the gallery
- **Git and GitHub** for version control, and **Vercel** for hosting

## Responsive design

The layout was built and checked at three main sizes:

| Screen | Width | What changes |
| --- | --- | --- |
| Desktop | above 1000px | Full navigation bar, two-column hero, three-column product grid |
| Tablet | 700px to 1000px | Menu becomes a full-screen overlay opened by a button, two-column product grid, single-column sections |
| Mobile | below 700px | Single column, stacked buttons, one-column product grid and gallery, larger tap targets |

There is an extra adjustment for phones narrower than 420px. No page scrolls sideways at any size.

## AI-assisted development

This project was planned and written with the help of an AI assistant (Claude by Anthropic). The AI generated the initial code, artwork and copy from a written brief. I reviewed the result, tested it in the browser, and published it with GitHub and Vercel.

## How to run the project locally

No installation or build step is needed.

1. Download or clone the repository.
2. Open the folder and double-click `index.html`. It opens in your browser.
3. Optional: in VS Code, install the **Live Server** extension, right-click `index.html` and choose **Open with Live Server**.

An internet connection is needed to load the Google Fonts and the two Unsplash photos. Without it the site still works, using fallback fonts.

## Project structure

```
sarauta-website/
├── index.html
├── about.html
├── products.html
├── gallery.html
├── contact.html
├── style.css
├── script.js
├── README.md
└── assets/
    └── images/     (SVG bottles, logo, favicon and gallery artwork)
```

## Credits

- Photographs: Toa Heftiba and Riccardo Andolfo on [Unsplash](https://unsplash.com) (Unsplash License)
- Fonts: Bodoni Moda and Jost via Google Fonts (SIL Open Font License)
- All other artwork: created for this project

---

*Sarauta is a fictional brand. Nothing on this site can be ordered, and the contact form does not send data anywhere.*

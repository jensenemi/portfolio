console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// const navLinks = $$('nav a')
// navLinks.forEach(link => {
//     link.classList.remove('current');
// });

// let currentLink = navLinks.find(
//     (a) => a.host === location.host && a.pathname === location.pathname,
//   );

// if (currentLink) {
//     currentLink.classList.add('current');
// }

const existingNavs = $$('nav');
existingNavs.forEach(nav => nav.remove());

let pages = [
    { url: '', title: 'Home' },
    { url: 'projects/', title: 'Projects' },
    { url: 'contact/', title: 'Contact' },
    { url: 'resume/', title: 'Resume' },
    { url: 'https://github.com/jensenemi', title: 'Github' }
  ];

let nav = document.createElement('nav');
document.body.prepend(nav);

const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
? "/"                  // Local server
: "/portfolio/";         // GitHub Pages repo name

for (let p of pages) {
    let url = p.url;
    let title = p.title;
    if (!url.startsWith('http')) {
        url = !url.startsWith('http') ? BASE_PATH + url : url;
      }
    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
    nav.append(a);
  }

  
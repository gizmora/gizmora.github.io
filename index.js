(() => {
  let isRoot = false;
  const typeAnimation = function (title) {
    let ctr = 0;
    let isTag = false;
    let titleText = title.innerHTML;
    title.innerHTML = '';

    console.log(titleText)

    function type() {
      const char = titleText[ctr++];
      const text = titleText.slice(0,ctr);

      title.innerHTML = text + `<div class="blinker"></div>`;
      
      if (ctr >= titleText.length) {
        return;
      }

      if (char === "<") {
        isTag = true;
      }

      if (char === ">") {
        isTag = false;
      }

      if (isTag) {
        return type();
      }

      setTimeout(type, 80);
    }

    type();
  }

  const setActiveLink = function (page) {
    if (page.includes('/about')) {
      document.querySelector('a#about').classList.add('active');
    } else if (page.includes('/projects')) {
      document.querySelector('a#projects').classList.add('active');
    } else if (page.includes('/now')) {
      document.querySelector('a#now').classList.add('active');
    }
  }

  async function loadPage(page) {
    const app = document.getElementById('app');
    const routes = {
      '': { html: 'index.html' },
      'home': { html: 'index.html' },
      'about': { html: 'pages/about.html' },
      'projects': { html: 'pages/projects.html', script: '/js/projects.js' },
      'now': { html: 'pages/now.html' }
    };

    const path = routes[page] || routes['home'];
    setActiveLink(page);

    try {
      const res = await fetch(path.html);
      const html = await res.text();
      
      app.classList.add('fade-out');
      if (page !== 'home') {
        app.classList.remove('home');
        app.classList.add('other');
      } else {
        app.classList.remove('other');
        app.classList.add('home');
      }
      
      setTimeout(() => {
        app.innerHTML = html;
        app.classList.remove('fade-out');
        app.classList.add('fade-in');

        if (path.script) {
          const existingScript = document.getElementById('page-script');
          if (existingScript) existingScript.remove();

          if (path.script) {
            const script = document.createElement('script');
            script.src = path.script;
            script.id = 'page-script';
            document.body.appendChild(script);
          }
        }
      }, 200);
      
      setTimeout(() => app.classList.remove('fade-in'), 600);

    } catch (e) {
      app.innerHTML = `<h2>Page not found</h2>`;
    }
  }

  const toggleTheme = function () {
    const toggleBtn = document.getElementById("theme-toggle");
    const savedTheme = localStorage.getItem("theme");
    const root = document.documentElement;
    if (savedTheme) {
      root.setAttribute("data-theme", savedTheme);
    }


    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      });
    }
  }

  window.addEventListener('hashchange', () => {
    const page = location.hash.replace('#', '') || 'home';
    const bio = document.querySelector('div.bio');
    isRoot = page === 'home' ? true : false;

    if (bio && isRoot) {
      if (bio.classList.contains('minimize')) {
        bio.classList.replace('minimize', 'expanded');
      }
    } else {
      if (bio.classList.contains('expanded')) {
        bio.classList.replace('expanded', 'minimize');
      }
    }


    loadPage(page);
  });

  document.addEventListener("DOMContentLoaded", function () {
    const page = location.hash.replace('#', '') || 'home';
    isRoot = page === 'home' ? true : false;

    const headerHtml = `<div>
      <nav>
        <div class="profile">
          <div class="bio ${isRoot ? 'expanded' : 'minimize'}">
            <a href="#home">
              <img src="public/assets/avatar.jpeg" alt="My Avatar" class="avatar">
            </a>
            <h1 class="username">
              <a href="#home">@gizmora</a>
            </h1>
            <p class="current">web dev & design</p>
          </div>
        </div>
        <ul>
          <li><a href="#about" id="about">about</a></li>
          <li><a href="#projects" id="projects">projects</a></li>
          <li><a href="#now" id="now">/now</a></li>
        </ul>
        <div class="buttons">
          <button id="theme-toggle">&#9728;</button>
        </div>
      </nav>
    </div>`;

    const footerHtml = isRoot ? '' : `<div>
      <div class="links">
        <p><a href="https://github.com/gizmora" target="_blank"><img src="/public/assets/github_white.png" class="footer-icons"></a></p>
        <p><a href="#about">about</a> · <a href="#projects">projects</a> · <a href="#now">/now</a></p>
        <p class="sub">&copy; ${new Date().getFullYear()} Grace Irene Mora</p>
      </div>
    </div>`;
  
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const title = document.querySelector("span.heading");
  
    if (header) {
      document.querySelector("header").innerHTML = headerHtml;
    }
  
    if (footer) {
      document.querySelector("footer").innerHTML = footerHtml;
    }

    if (title) {
      typeAnimation(title);
    }

    setActiveLink(page);
    loadPage(page);
    toggleTheme();
  });
  
})();
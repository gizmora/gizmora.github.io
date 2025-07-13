(() => {
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

  const setActiveLink = function () {
    const currPath = window.location.pathname;
    console.log(currPath)

    if (currPath.includes('/about')) {
      document.querySelector('a#about').classList.add('active');
    } else if (currPath.includes('/projects')) {
      document.querySelector('a#projects').classList.add('active');
    } else if (currPath.includes('/now')) {
      document.querySelector('a#now').classList.add('active');
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const isRoot = window.location.pathname === '/' || window.location.pathname === '/index.html' ? true : false;
    const profile = ``

    const headerHtml = `<div>
      <nav>
        <div class="profile">
          <div class="bio ${isRoot ? 'expanded' : 'minimize'}">
            <a href="/">
              <img src="public/assets/avatar.jpeg" alt="My Avatar" class="avatar">
            </a>
            <h1 class="username">
              <a href="/">@gizmora</a>
            </h1>
            <p class="current">web developer @ <span>cognizant</span></p>
          </div>
        </div>
        <ul>
          <li><a href="/about/" id="about">about</a></li>
          <li><a href="/projects/" id="projects">projects</a></li>
          <li><a href="/now/" id="now">/now</a></li>
        </ul>
        <div class="buttons">
          <button id="theme-toggle">&#9728;</button>
        </div>
      </nav>
    </div>`;

    const footerHtml = isRoot ? '' : `<div>
      <div class="links">
        <p><a href="https://github.com/gizmora" target="_blank"><img src="/public/assets/github_white.png" class="footer-icons"></a></p>
        <p><a href="/about">about</a> · <a href="/projects">projects</a> · <a href="/now">/now</a></p>
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

    setActiveLink();
  });
  
})();
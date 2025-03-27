document.addEventListener("DOMContentLoaded", function () {
  const headerHtml = `<div>
    <nav>
      <a href="/"><span>gizmora</span></a>
      <ul>
        <li><a href="/about/">about</a></li>
        <li><a href="/projects/">projects</a></li>
        <li><a href="/contact/">contact</a></li>
        <li><a href="/now/">/now</a></li>
      </ul>
    </nav>
  </div>`;

  const footerHtml = `<div>
    <div class="links">
      <p><a href="https://github.com/gizmora" target="_blank"><img src="/public/assets/github_white.png" class="footer-icons"></a></p>
      <p><a href="/about">about</a> · <a href="/projects">projects</a> · <a href="/contact">contact</a> · <a href="/now">/now</a></p>
      <p class="sub">&copy; ${new Date().getFullYear()} Grace Irene Mora</p>
    </div>
  </div>`;

  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  if (header) {
    document.querySelector("header").innerHTML = headerHtml;
  }

  if (footer) {
    document.querySelector("footer").innerHTML = footerHtml;
  }  
});

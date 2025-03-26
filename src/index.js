const sections = [
  {
    "name": "Infrastructure",
    "subsections": [
      { "name": "PM2", "level": "novice" },
      { "name": "Docker", "level": "novice" },
      { "name": "Virtual Box", "level": "novice" },
      { "name": "AWS(S3,SQS)", "level": "competent" },
      { "name": "Firebase", "level": "recreational" }
    ]
  },
  {
    "name": "Ecommerce",
    "subsections": [
      { "name": "Shopify", "level": "recreational" },
      { "name": "Gadget", "level": "recreational" }
    ]
  },
  {
    "name": "APIs",
    "subsections": [
      { "name": "Postman", "level": "proficient" },
      { "name": "Google (Docs,Sheets,App Script, Mail)", "level": "proficient" },
      { "name": "Spotify", "level": "recreational" },
      { "name": "OpenWeather", "level": "recreational" }
    ]
  },
  {
    "name": "Frontend UI",
    "subsections": [
      { "name": "Javascript", "level": "proficient" },
      { "name": "HTML", "level": "proficient" },
      { "name": "CSS", "level": "proficient" },
      { "name": "SASS/SCSS", "level": "proficient" },
      { "name": "React", "level": "recreational" },
      { "name": "Angular", "level": "proficient" },
      { "name": "jQuery", "level": "proficient" },
      { "name": "Bootstrap", "level": "proficient" },
      { "name": "Handlebars", "level": "novice" }
    ]
  },
  {
    "name": "Versioning",
    "subsections": [
      { "name": "Git", "level": "competent" },
      { "name": "BitBucket", "level": "competent" },
      { "name": "Github", "level": "competent" }
    ]
  },
  {
    "name": "Databases",
    "subsections": [
      { "name": "MySQL", "level": "proficient" },
      { "name": "MongoDB", "level": "novice" },
      { "name": "JSON", "level": "proficient" },
      { "name": "PHPMyAdmin", "level": "proficient" }
    ]
  },
  {
    "name": "Backend",
    "subsections": [
      { "name": "Node", "level": "competent" },
      { "name": "PHP", "level": "proficient" },
      { "name": "Python", "level": "novice" },
      { "name": "CodeIgniter", "level": "proficient" }
    ]
  },
  {
    "name": "Text Editors",
    "subsections": [
      { "name": "VSCode", "level": "proficient" },
      { "name": "Atom", "level": "competent" },
      { "name": "Notepad++", "level": "competent" }
    ]
  },
  {
    "name": "Knowledge Management",
    "subsections": [
      { "name": "Slack", "level": "competent" },
      { "name": "JIRA", "level": "proficient" },
      { "name": "Confluence", "level": "proficient" },
      { "name": "Trello", "level": "recreational" }
    ]
  },
  {
    "name": "Misc",
    "subsections": [
      { "name": "Adobe Creative Cloud (Lightroom, Photoshop, Illustrator)", "level": "competent" },
      { "name": "Figma", "level": "recreational" },
      { "name": "Voicemeeter", "level": "competent" }
    ]
  }
];

const skillsContainer = document.getElementById('technologies');
let sectionList = document.createElement('ul');

sections.forEach((section) => {
  let subList = document.createElement('ul');
  let item = '';

  section.subsections.forEach(subsection => {
    item += `<li class="level ${subsection.level}">${subsection.name}</li>`;
  });

  subList.innerHTML = item;

  let li = `<li>
    <span class="area">${section.name}</span>
    ${subList.outerHTML}
  </li>`;

  sectionList.innerHTML += li;
});

skillsContainer.appendChild(sectionList);


const headerHtml = `<header>
  <nav>
    <a href="/"><span>gizmora</span></a>
    <ul>
      <li><a href="/about/">about</a></li>
      <li><a href="/projects/">projects</a></li>  
      <li><a href="/contact/">contact</a></li>
      <li><a href="/now/">/now</a></li>
    </ul>
  </nav>
</header>`;

const footerHtml = `<footer>
  <div class="links">
    <p><a href="https://github.com/gizmora" target="_blank"><img src="/public/assets/github_white.png" class="footer-icons"></a></p>
    <p><a href="/about">about</a> · <a href="/projects">projects</a> · <a href="/contact">contact</a> · <a href="/now">/now</a></p>
    <p class="sub">&copy; ${new Date().getFullYear()} Grace Irene Mora</p>
  </div>
</footer>`;


class MyHeader extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = headerHtml;
  }
}

class MyFooter extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = footerHtml;
  }
}

customElements.define('my-header', MyHeader);
customElements.define('my-footer', MyFooter);

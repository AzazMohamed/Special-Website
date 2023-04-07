// Select Setting Gear Icon
let gearBtn = document.querySelector(".setting-box > .icon");
// Select setting Box
let settingBox = document.querySelector(".setting-box");

gearBtn.addEventListener("click", () => {
  gearBtn.children[0].classList.toggle("fa-spin");
  settingBox.classList.toggle("open");
});

// Select Colors Elements
let colors = Array.from(document.querySelectorAll(".colors-list > li"));
let mainColor = window.localStorage.getItem("option_color");
if (mainColor !== null) {
  colors.forEach((color) => {
    color.dataset.color === mainColor
      ? color.classList.add("active")
      : color.classList.remove("active");
  });
  document.documentElement.style.setProperty("--main-color", mainColor);
}

colors.forEach((color) => {
  color.onclick = (e) => {
    // Set color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      color.dataset.color
    );
    handleActive(e);

    localStorage.setItem("option_color", e.target.dataset.color);
  };
});

// Select Button On Setting Random Backgrounds
let yesRandomBg = document.querySelector(".random-backgrounds > .yes");
let noRandomBg = document.querySelector(".random-backgrounds > .no");

// Getting Info From Local Storage
if (localStorage.getItem("background_option") !== null) {
  if (localStorage.getItem("background_option") === "yes") {
    yesRandomBg.classList.add("active");
    noRandomBg.classList.remove("active");
    backgroundChange();
  } else {
    yesRandomBg.classList.remove("active");
    noRandomBg.classList.add("active");
  }
}

// Yes On Click
yesRandomBg.addEventListener("click", () => {
  yesRandomBg.classList.add("active");
  noRandomBg.classList.remove("active");
  backgroundChange();

  // Saving On Local Storage
  localStorage.setItem("background_option", "yes");
});

// No On Click
noRandomBg.addEventListener("click", () => {
  noRandomBg.classList.add("active");
  yesRandomBg.classList.remove("active");

  // Saving To Local Storage
  localStorage.setItem("background_option", "no");
});

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array Of Images
let imagesUrl = [
  "./images/1.jpg",
  "./images/2.jpg",
  "./images/3.jpg",
  "./images/4.jpg",
  "./images/5.jpg",
];

// Set Interval For Changing Background
backgroundChange();

function backgroundChange() {
  let backgroundInterval = setInterval(() => {
    if (noRandomBg.classList.contains("active")) {
      clearInterval(backgroundInterval);
    }
    // Get Random Number
    let randomNumber = Math.floor(Math.random() * imagesUrl.length);
    // Change Background-image Url
    landingPage.style.backgroundImage = `url("${imagesUrl[randomNumber]}")`;
  }, 5000);
}

// Show Bullets Option Box
// Select Bullets
let bullets = document.querySelector(".nav-bullets");

// Select Show Bullets Buttons Option Box
let showBulletsOpt = document.querySelectorAll(
  ".setting-box .show-bullets span"
);

// Loop Buttons
showBulletsOpt.forEach((button) => {
  button.addEventListener("click", (e) => {
    handleActive(e);
    let showBulletBool;
    if (e.target.dataset.value === "yes") {
      bullets.style.display = "block";
      showBulletBool = true;
    } else {
      bullets.style.display = "none";
      showBulletBool = false;
    }
    localStorage.setItem("show_bullets", showBulletBool);
  });
});

// Getting Value From Local Storage
if (localStorage.getItem("show_bullets") !== null) {
  if (localStorage.getItem("show_bullets") == "false") {
    showBulletsOpt.forEach((button) => {
      if (button.dataset.value === "no") {
        button.click();
      }
    });
  }
}

// Reset Options
// Select button
let resetBtn = document.querySelector("button.reset-option");

resetBtn.addEventListener("click", () => {
  localStorage.removeItem("show_bullets");
  localStorage.removeItem("background_option");
  localStorage.removeItem("option_color");

  window.location.reload();
});

// Select Skills
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  // Get Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Let Window Height
  let windowHeight = this.innerHeight;

  // Window Scroll Top
  let windowScrollTop = this.scrollY;

  let skillScrollLimit =
    skillsOffsetTop + skillsOuterHeight - windowHeight - 100;

  if (windowScrollTop > skillScrollLimit) {
    // Get All Skill Boxs
    let allSkills = Array.from(
      document.querySelectorAll(".skill-box .skill-progress span")
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay Element
    let overlay = document.createElement("div");

    // Add Class To Overlay
    overlay.className = "popup-overlay";

    // Append To Body
    document.body.appendChild(overlay);

    // Create Popup
    let popupBox = document.createElement("div");

    // Add Class To The Popup Box
    popupBox.className = "popup-box";

    if (img.alt !== "") {
      // Create Heading
      let imageHeading = document.createElement("h3");
      // Create Text For Heading
      let imgText = document.createTextNode(img.alt);
      // append Text To Element
      imageHeading.appendChild(imgText);

      // Append Heading To Popup
      popupBox.appendChild(imageHeading);
    } else {
      // Create Heading
      let imageHeading = document.createElement("h3");

      imageHeading.appendChild(document.createTextNode("Gallery Image"));

      // Append Heading To Popup
      popupBox.appendChild(imageHeading);
    }

    // Create The Image
    let popupImage = document.createElement("img");
    // Set Image Source
    popupImage.src = img.src;
    // Append Image To Pupup Box
    popupBox.appendChild(popupImage);

    // Create Close Span
    let closeBtn = document.createElement("span");
    let closeBtnText = document.createTextNode("X");
    closeBtn.appendChild(closeBtnText);
    closeBtn.className = "close-button";

    // Add Close Button To Popup Box
    popupBox.appendChild(closeBtn);

    // Add popup Box To Body
    document.body.appendChild(popupBox);

    [closeBtn, overlay].forEach((item) => {
      item.onclick = () => {
        popupBox.remove();
        overlay.remove();
      };
    });
  });
});

// Select All Links
let allLinks = [
  ...document.querySelectorAll(".nav-bullets .bullet"),
  ...document.querySelectorAll(".header-area .links > li"),
];

allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Handle Active State
function handleActive(ev) {
  // Remove Active Class From All Childrens
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // Add Active Class On Self
  ev.target.classList.add("active");
}

// Toggle Menu
// Select
let toggleBtn = document.querySelector(".toggle-menu");
let links = document.querySelector(".links");

toggleBtn.addEventListener("click", () => {
  toggleBtn.classList.toggle("open");
  links.classList.toggle("open");
  if (toggleBtn.classList.contains("open")) {
    toggleBtn.dataset.open = true;
  } else {
    toggleBtn.dataset.open = false;
  }
});

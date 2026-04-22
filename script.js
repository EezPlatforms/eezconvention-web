const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 60, 280)}ms`;
  revealObserver.observe(item);
});

const waitlistForm = document.getElementById("waitlist-form");
const formNote = document.getElementById("form-note");

if (waitlistForm && formNote) {
  waitlistForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(waitlistForm);
    const email = String(formData.get("email") || "").trim();
    const name = String(formData.get("name") || "").trim();

    if (!email) {
      formNote.textContent = "Add an email address to join the waitlist.";
      formNote.style.color = "#cf4f00";
      return;
    }

    formNote.textContent = `Thanks${name ? `, ${name}` : ""}. You're on the list for eezconvention launch updates.`;
    formNote.style.color = "#116c34";
    waitlistForm.reset();
  });
}

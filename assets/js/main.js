(() => {
  "use strict";

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
      nav.classList.toggle("is-open", !isOpen);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.focus();
      }
    });
  }

  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  const productSelect = document.querySelector("#product-interest");
  document.querySelectorAll(".quote-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (productSelect && link.dataset.product) {
        const option = [...productSelect.options].find((item) => item.value === link.dataset.product);
        if (option) productSelect.value = option.value;
      }
    });
  });

  const form = document.querySelector("#inquiry-form");
  const status = document.querySelector("#form-status");
  const submitButton = document.querySelector("#email-submit");
  const formspreeAction = form?.getAttribute("action") || "";
  const formIsConfigured = formspreeAction.includes("formspree.io/f/") &&
    !formspreeAction.includes("YOUR_FORMSPREE_FORM_ID");

  if (form && status && submitButton) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      status.textContent = "";
      status.className = "form-status";

      if (!form.reportValidity()) return;

      if (!formIsConfigured) {
        status.textContent = "Email inquiry is not configured yet. Please add your Formspree form ID in index.html, or use WhatsApp after adding your business number.";
        status.classList.add("error");
        return;
      }

      if (form.querySelector('input[name="_gotcha"]')?.value) return;

      const originalLabel = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.setAttribute("aria-busy", "true");
      submitButton.textContent = "Sending…";

      try {
        const response = await fetch(formspreeAction, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });
        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
          const detail = Array.isArray(result.errors)
            ? result.errors.map((item) => item.message).filter(Boolean).join(" ")
            : "";
          throw new Error(detail || "The form service could not accept your inquiry. Please try again.");
        }

        form.reset();
        status.textContent = "Thank you. Your inquiry has been submitted successfully.";
        status.classList.add("success");
      } catch (error) {
        status.textContent = error instanceof Error
          ? error.message
          : "We could not submit your inquiry. Please try again or contact us through WhatsApp.";
        status.classList.add("error");
      } finally {
        submitButton.disabled = false;
        submitButton.removeAttribute("aria-busy");
        submitButton.innerHTML = originalLabel;
      }
    });
  }

  // Prevent the unconfigured WhatsApp placeholder from opening a broken chat.
  const whatsappLink = document.querySelector("#whatsapp-link");
  if (whatsappLink) {
    whatsappLink.addEventListener("click", (event) => {
      const href = whatsappLink.getAttribute("href") || "";
      if (href.includes("COUNTRYCODENUMBER")) {
        event.preventDefault();
        if (status) {
          status.textContent = "WhatsApp is not configured yet. Replace COUNTRYCODENUMBER with your full international number in index.html.";
          status.className = "form-status error";
          status.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }
    });
  }
})();

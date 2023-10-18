class BlackDisclosure extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const showedInfoWrap = this.querySelector(".showed-info-wrapper");
    const hiddenTextWrap = this.querySelector(".hidden-text-wrap");

    showedInfoWrap.style.display = "block";
    hiddenTextWrap.style.display = "none";

    showedInfoWrap.addEventListener("click", (e) => {
      console.log(e.currentTarget);

      if (hiddenTextWrap.style.display === "none") {
        hiddenTextWrap.style.display = "block";
      } else {
        hiddenTextWrap.style.display = "none";
      }
    });
  }
}

customElements.define("black-disclosure", BlackDisclosure);

import "./main.css";

for (const element of document.querySelectorAll("[data-audio]")) {
  const path = (element as HTMLElement).dataset.audio!;
  const audio = new Audio(path);

  let even = true;

  element.addEventListener("click", async () => {
    const parityClass = `playing--${even ? "even" : "odd"}`;

    element.classList.add("playing", parityClass);

    await new Promise((resolve) => {
      audio.onended = resolve;
      audio.play();
    });

    element.classList.remove("playing", parityClass);
    even = !even;
  });
}

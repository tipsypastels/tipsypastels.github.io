/* @refresh reload */
import { createSignal, onCleanup, onMount, type JSXElement } from "solid-js";
import { render } from "solid-js/web";
import "./app.css";

function App() {
  return (
    <div class="app">
      <Ocean>
        <div class="z-50 flex w-100 max-w-full flex-col gap-2 p-4 md:p-0">
          <div class="flex justify-center">
            <Pokemon name="poliwag" />
            <Pokemon name="quaxly" />
          </div>

          <div class="rounded-md border-8 border-stone-100 shadow-xl">
            <div class="relative rounded-lg border-8 border-emerald-950 bg-stone-100 p-8">
              <p class="mb-2">
                Welcome to my bog, stranger. I am{" "}
                <strong class="text-emerald-800">tipsypastels</strong>, feared and powerful swamp
                witch.
              </p>

              <p class="mb-2">
                But wait. You probably meant to get to{" "}
                <a href="https://tipsypastels.github.io/stardex">Stardex</a>, a tool I created for
                Pokémon fangame developers to build balanced Pokédexes.
              </p>

              <p class="mb-2">Or you could stay a while. Watch the waves. I won't tell.</p>

              <div class="flex justify-end gap-2 text-sm md:text-base">
                <a href="https://github.com/tipsypastels" target="_blank">
                  Github
                </a>

                <a href="https://bsky.app/profile/tipsypastels.bsky.social" target="_blank">
                  Bluesky
                </a>
              </div>
            </div>
          </div>
        </div>
      </Ocean>
    </div>
  );
}

function Ocean(props: { children: JSXElement }) {
  return (
    <div>
      <div class="ocean-layer ocean-swells" />
      <div class="ocean-layer ocean-big-ripples" />
      <div class="ocean-layer ocean-ripples" />
      <div class="ocean-layer ocean-cross-ripples" />
      <div class="ocean-layer ocean-rings" />
      <div class="ocean-layer ocean-flecks" />

      {props.children}
    </div>
  );
}

function Pokemon(props: { name: string }) {
  const [playing, setPlaying] = createSignal<"even" | "odd">();

  let img!: HTMLImageElement;

  onMount(() => {
    const audio = new Audio(`/${props.name}.mp3`);
    audio.volume = 0.25;

    let nextEven = true;

    function onClick() {
      audio.currentTime = 0;
      audio.play();
      audio.onended = () => setPlaying();

      setPlaying(nextEven ? "even" : "odd");

      nextEven = !nextEven;
    }

    img.addEventListener("click", onClick);

    onCleanup(() => {
      img.removeEventListener("click", onClick);
    });
  });

  return (
    <img
      ref={img}
      class="max-w-[50%] cursor-pointer transition-all hover:scale-105"
      classList={{
        "rotate-6": playing() === "even",
        "-rotate-6": playing() === "odd",
      }}
      src={`/${props.name.toLowerCase()}.png`}
      alt={`Art of ${props.name}`}
    />
  );
}

render(() => <App />, document.getElementById("root")!);

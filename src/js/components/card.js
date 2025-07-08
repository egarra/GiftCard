let player;

// Когда API загружено — создаём плеер
// window.onYouTubeIframeAPIReady = () => {
//   window.player = new YT.Player("ytPlayer", {
//     videoId: "C2LWupzMMYE",
//     playerVars: {
//       loop: 1,
//       playlist: "C2LWupzMMYE",
//       controls: 0,
//       modestbranding: 1,
//       disablekb: 1,
//     },
//   });
// };

const container = document.getElementById("scroll-wrapper");
const content = document.getElementById("content-wrapper");

const scrollTo = (content.scrollWidth - container.clientWidth) / 2;
container.scrollLeft = scrollTo;
content.scrollLeft = scrollTo;

const trigger = document.getElementById("trigger");
const card = document.getElementById("card");
const btnWrapper = document.querySelector(".trigger-wrapper");

trigger.addEventListener("click", () => {
  if (window.player && window.player.playVideo) {
    window.player.setVolume(50);
    window.player.playVideo();
  } else {
    console.warn("YouTube-плеер ещё не готов");
  }

  trigger.classList.add("trigger-rotate");

  setTimeout(() => {
    btnWrapper.style.display = "none";
    card.classList.add("open");

    setTimeout(() => {
      startCharacterSequence();
    }, 3000);
  }, 3000);
});

function startCharacterSequence() {
  const leftItems = document.querySelectorAll(
    ".card-left-backside-item .character-entry",
  );
  const rightItems = document.querySelectorAll(
    ".card-right-backside-item .character-entry",
  );
  const dialogues = document.querySelectorAll(".speech-bubble");

  const allCharacters = [...leftItems, ...rightItems];
  let delay = 0;

  allCharacters.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("animate"); // старт "походки"

      setTimeout(() => {
        dialogues[i].classList.add("dialog-show"); // появление текста
      }, 2000); // через 2 секунды после начала шагов
    }, delay);

    delay += 5000; // интервал между персонажами
  });

  const totalDuration = (allCharacters.length - 1) * 5000 + 5000;
  setTimeout(() => {
    document.querySelector(".speech-bubble-final").classList.add("dialog-show");
  }, totalDuration);
}

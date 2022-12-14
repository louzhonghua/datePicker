const icons = [`π¨`, `π`, `βοΈ`, `π»`, `π`, `π―`, `π€`, `πΌ`, `π`, `π`];

export const getDefaultTheme = () => {
  return {
    title: "ζθ§£ηηΎδΊδΈͺηΎ",
    desc: "ηηε―δ»₯ιε³~",
    dark: true,
    maxLevel: 20,
    backgroundColor: "#8dac85",
    icons: icons.map((icon) => ({
      name: icon,
      content: icon,
      clickSound: "button-click",
      tripleSound: "triple",
    })),
    sounds: [
      {
        name: "button-click",
        src: "https://minio.streakingman.com/solvable-sheep-game/sound-button-click.mp3",
      },
      {
        name: "triple",
        src: "https://minio.streakingman.com/solvable-sheep-game/sound-triple.mp3",
      },
    ],
    bgm: "https://minio.streakingman.com/solvable-sheep-game/sound-disco.mp3",
  };
};

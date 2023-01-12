import { onMounted, type Ref, ref } from "vue";

const toggleColorTheme = () => {
  const userTheme: Ref<string> = ref("prefer");

  const getTheme = () => localStorage.getItem("user-theme");

  const setTheme = (theme: string) => {
    localStorage.setItem("user-theme", theme);
    userTheme.value = theme;
    document.documentElement.className = theme;
  };

  const getMediaPreference = () => {
    const hasDarkPreference = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (hasDarkPreference) {
      return "prefer";
    }
  };

  // проверим, если

  const toggleTheme = (theme: string) => {
    // const activeTheme = localStorage.getItem("user-theme");
    setTheme(theme);
    // if (activeTheme === "prefer") {
    //   setTheme("prefer");
    //   userTheme.value = "prefer";
    // }
    // if (activeTheme === "light-theme") {
    //   setTheme("light-theme");
    //   userTheme.value = "light-theme";
    // }
    // if (activeTheme === "dark-theme") {
    //   setTheme("dark-theme");
    //   userTheme.value = "dark-theme";
    // }
  };

  onMounted(() => {
    const initUserTheme = getTheme() || getMediaPreference();
    setTheme(initUserTheme);
  });

  return { toggleTheme, userTheme };
};

export default toggleColorTheme;

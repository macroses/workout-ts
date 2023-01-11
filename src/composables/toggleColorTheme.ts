import { onMounted, type Ref, ref } from "vue";

const toggleColorTheme = () => {
  const userTheme: Ref<string> = ref("light-theme");

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
      return "dark-theme";
    } else {
      return "light-theme";
    }
  };

  const toggleTheme = () => {
    const activeTheme = localStorage.getItem("user-theme");
    if (activeTheme === "light-theme") {
      setTheme("dark-theme");
      userTheme.value = "dark-theme";
    } else {
      setTheme("light-theme");
      userTheme.value = "light-theme";
    }
  };

  onMounted(() => {
    const initUserTheme = getTheme() || getMediaPreference();
    setTheme(initUserTheme);
  });

  return { toggleTheme, userTheme };
};

export default toggleColorTheme;

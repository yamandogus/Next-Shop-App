import { Switch } from "@heroui/switch";
import { MoonIcon, SunIcon } from "./icons";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  const handleChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <Switch
      defaultSelected={theme === "light" || isSSR}
      color="success"
      size="sm"
      onChange={handleChange}
      thumbIcon={({ isSelected, className }) =>
        isSelected ? <SunIcon className={className} /> : <MoonIcon className={className} />
      }
      aria-label={`Switch to ${theme === "light" || isSSR ? "dark" : "light"} mode`}
    ></Switch>
  );
};


import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/hooks/use-theme"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center justify-between px-2 py-3">
      <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Dark Mode</span>
      <Switch
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        className="data-[state=checked]:bg-zinc-900"
      />
    </div>
  )
}

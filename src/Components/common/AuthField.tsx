import { useTheme } from "../../context/ThemeContext";

interface AuthFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

export default function AuthField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
}: AuthFieldProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="block">
      <label htmlFor={id} className={`mb-2 block text-sm font-medium ${isDark ? "text-white/80" : "text-mg-light-textSecondary"}`}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-2xl border px-4 py-3.5 text-sm outline-none transition-all duration-300 focus:border-mg-gold focus:ring-4 focus:ring-mg-gold/10 ${
          isDark
            ? "bg-white/5 text-white placeholder:text-white/30 hover:bg-white/10 focus:bg-black/40"
            : "bg-[#f9f7f1] text-mg-light-text placeholder:text-mg-light-textSecondary/40 hover:bg-white focus:bg-white"
        } ${
          error ? "border-red-400/70" : isDark ? "border-white/10" : "border-black/10"
        }`}
      />
      {error && <span className="mt-2 block text-xs font-medium text-red-500">{error}</span>}
    </div>
  );
}

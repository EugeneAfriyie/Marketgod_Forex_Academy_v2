// src/components/UI/SearchInput.tsx
import React from "react";
import { Search } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string; // optional extra classes
  width?: string; // optional width class
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  width = "w-full",
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`relative ${width} m-aut items-center flex`}>
      <Search
        className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
          isDark ? "text-mg-paper/50" : "text-mg-charcoal/50"
        }`}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          w-full pl-10 pr-4 py-3 rounded-full text-sm transition-all
          focus:outline-none focus:ring-2 focus:ring-mg-green/50
          ${isDark
            ? "bg-mg-charcoal/50 border border-mg-gold/20 text-mg-paper placeholder-mg-paper/40"
            : "bg-white/80 border border-mg-green/20 text-mg-charcoal placeholder-mg-charcoal/40"
          } ${className}
        `}
      />
    </div>
  );
};

export default SearchInput;




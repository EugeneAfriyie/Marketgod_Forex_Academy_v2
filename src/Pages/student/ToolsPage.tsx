import { Calculator, CandlestickChart, ShieldCheck } from "lucide-react";
import StudentFeaturePage from "../../Components/student/StudentFeaturePage";

const items = [
  {
    title: "Risk Calculator",
    description: "Help traders calculate position size, lot size, and account exposure before entering a trade.",
    icon: Calculator,
  },
  {
    title: "Forex Utilities",
    description: "Add practical trading helpers such as session timing, pip guides, and market condition tools.",
    icon: CandlestickChart,
  },
  {
    title: "Discipline Support",
    description: "Provide checklists and guardrails that help students stay within their trading rules.",
    icon: ShieldCheck,
  },
];

export default function ToolsPage() {
  return (
    <StudentFeaturePage
      title="Tools"
      description="A practical toolbox for traders, including calculators and other utilities that support better decision-making."
      items={items}
    />
  );
}

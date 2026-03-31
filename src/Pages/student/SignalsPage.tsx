import { BellRing, LineChart, Signal } from "lucide-react";
import StudentFeaturePage from "../../Components/student/StudentFeaturePage";

const items = [
  {
    title: "Signal Services",
    description: "Display all signal packages the academy offers, from entry-level access to premium delivery.",
    icon: Signal,
  },
  {
    title: "Delivery Channels",
    description: "Explain where members receive signals and what kind of trade context is included with each alert.",
    icon: BellRing,
  },
  {
    title: "Performance Context",
    description: "Provide clarity around setup style, risk mindset, and how signals fit into the broader learning journey.",
    icon: LineChart,
  },
];

export default function SignalsPage() {
  return (
    <StudentFeaturePage
      title="Signals"
      description="This area introduces the signal services available on the platform and how they connect to membership access."
      items={items}
    />
  );
}

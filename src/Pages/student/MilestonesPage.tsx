import { Award, BarChart3, Star } from "lucide-react";
import StudentFeaturePage from "../../Components/student/StudentFeaturePage";

const items = [
  {
    title: "Achievement Timeline",
    description: "Highlight the student's important wins, completions, and platform milestones over time.",
    icon: Award,
  },
  {
    title: "Growth Metrics",
    description: "Reflect activity and learning progress using performance-based milestone summaries.",
    icon: BarChart3,
  },
  {
    title: "Recognition",
    description: "Surface notable achievements that deserve visibility inside the mentorship ecosystem.",
    icon: Star,
  },
];

export default function MilestonesPage() {
  return (
    <StudentFeaturePage
      title="Milestones"
      description="This section will showcase how far the student has come through achievements, completions, and major progress moments."
      items={items}
    />
  );
}

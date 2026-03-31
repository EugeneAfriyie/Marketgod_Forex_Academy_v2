import { CheckSquare2, Gift, Trophy } from "lucide-react";
import StudentFeaturePage from "../../Components/student/StudentFeaturePage";

const items = [
  {
    title: "Current Challenges",
    description: "Display active giveaway campaigns, tasks, and participation rules for students.",
    icon: CheckSquare2,
  },
  {
    title: "Reward Pool",
    description: "Show what users can win after completing the required steps successfully.",
    icon: Gift,
  },
  {
    title: "Winners Board",
    description: "Celebrate fulfilled tasks, verified winners, and the community momentum around campaigns.",
    icon: Trophy,
  },
];

export default function GiveawaysPage() {
  return (
    <StudentFeaturePage
      title="Giveaways"
      description="This space will manage task-based campaigns where users complete actions and earn rewards from the academy."
      items={items}
    />
  );
}

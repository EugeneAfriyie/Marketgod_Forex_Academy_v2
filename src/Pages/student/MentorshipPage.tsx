import { BookOpen, GraduationCap, UsersRound } from "lucide-react";
import StudentFeaturePage from "../../Components/student/StudentFeaturePage";

const items = [
  {
    title: "Program Directory",
    description: "List all mentorship offerings, from beginner tracks to elite coaching programs.",
    icon: GraduationCap,
  },
  {
    title: "Mentor Access",
    description: "Show what each mentorship tier unlocks in terms of guidance, sessions, and content.",
    icon: UsersRound,
  },
  {
    title: "Learning Tracks",
    description: "Connect mentorship products to the relevant course journeys and expected outcomes.",
    icon: BookOpen,
  },
];

export default function MentorshipPage() {
  return (
    <StudentFeaturePage
      title="Mentorship"
      description="Students can review the mentorship offerings available on the platform and understand the access each level provides."
      items={items}
    />
  );
}

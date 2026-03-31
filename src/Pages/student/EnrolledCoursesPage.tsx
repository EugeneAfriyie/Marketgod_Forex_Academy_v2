import { LockKeyhole, PlayCircle, TrendingUp } from "lucide-react";
import StudentFeaturePage from "../../Components/student/StudentFeaturePage";

const items = [
  {
    title: "Active Learning Paths",
    description: "See every course the student has already purchased or been enrolled into.",
    icon: PlayCircle,
  },
  {
    title: "Protected Access",
    description: "Show which lessons are unlocked, in progress, or restricted by access level.",
    icon: LockKeyhole,
  },
  {
    title: "Progress Tracking",
    description: "Track completion, watch history, and the next lesson the student should continue.",
    icon: TrendingUp,
  },
];

export default function EnrolledCoursesPage() {
  return (
    <StudentFeaturePage
      title="Enrolled Courses"
      description="This page is focused only on courses the current user has joined, purchased, or been granted access to."
      items={items}
    />
  );
}

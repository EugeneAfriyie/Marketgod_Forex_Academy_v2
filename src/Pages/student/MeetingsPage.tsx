import { CalendarCheck2, Clock3, Video } from "lucide-react";
import StudentFeaturePage from "../../Components/student/StudentFeaturePage";

const items = [
  {
    title: "Mentor Sessions",
    description: "Book one-on-one or group sessions with mentors directly from the platform.",
    icon: Video,
  },
  {
    title: "Upcoming Schedule",
    description: "Keep the student's confirmed meeting times, reminders, and attendance details in one place.",
    icon: CalendarCheck2,
  },
  {
    title: "Session History",
    description: "Review past meetings, outcomes, and follow-up action points from each session.",
    icon: Clock3,
  },
];

export default function MeetingsPage() {
  return (
    <StudentFeaturePage
      title="Meetings"
      description="Students will use this area to manage mentor calls, live sessions, and any scheduled coaching meetings."
      items={items}
    />
  );
}

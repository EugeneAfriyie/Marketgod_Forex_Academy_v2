import { CalendarRange, MapPin, Users } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import StudentSectionCard from "../../Components/student/StudentSectionCard";

const events = [
  { title: "Weekly Market Breakdown", date: "Thursday, 7:00 PM GMT", venue: "Live stream room" },
  { title: "Student Strategy Clinic", date: "Saturday, 11:00 AM GMT", venue: "Mentorship call" },
  { title: "Accra Live Session", date: "April 18, 2026", venue: "Physical event" },
];

export default function EventsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <StudentSectionCard
      title="Events"
      description="This area will handle upcoming mentorship sessions, live breakdowns, and event participation."
    >
      <div className="space-y-4">
        {events.map((event) => (
          <article
            key={event.title}
            className={`rounded-[1.75rem] border p-5 ${
              isDark ? "border-white/10 bg-black/25" : "border-black/10 bg-[#faf7f0]"
            }`}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-mg-light-text"}`}>{event.title}</h3>
                <div className={`mt-3 flex flex-wrap gap-4 text-sm ${isDark ? "text-white/58" : "text-mg-light-textSecondary/78"}`}>
                  <span className="inline-flex items-center gap-2">
                    <CalendarRange size={16} className="text-mg-gold" />
                    {event.date}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin size={16} className="text-mg-gold" />
                    {event.venue}
                  </span>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-mg-gold/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-mg-gold">
                <Users size={14} />
                Open
              </span>
            </div>
          </article>
        ))}
      </div>
    </StudentSectionCard>
  );
}

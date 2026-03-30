import { MessageSquareMore, UsersRound, Video } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import StudentSectionCard from "../../Components/student/StudentSectionCard";

const spaces = [
  { title: "Peer Accountability Circle", detail: "Small student groups for discipline and weekly check-ins.", icon: UsersRound },
  { title: "Live Review Room", detail: "A future space for lesson discussions and chart feedback.", icon: Video },
  { title: "Student Conversation Hub", detail: "Channel for community questions, wins, and insight sharing.", icon: MessageSquareMore },
];

export default function CollaborationPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === "dark";
  const isFrench = language === "fr";

  return (
    <StudentSectionCard
      title={isFrench ? "Collaboration" : "Collaboration"}
      description={
        isFrench
          ? "Un espace dedie aux interactions entre etudiants, au soutien mutuel et aux futures fonctions collaboratives."
          : "A dedicated area for student interaction, peer support, and future collaboration features."
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {spaces.map((space) => {
          const Icon = space.icon;

          return (
            <article
              key={space.title}
              className={`rounded-[1.75rem] border p-5 ${
                isDark ? "border-white/10 bg-black/25" : "border-black/10 bg-[#faf7f0]"
              }`}
            >
              <Icon size={20} className="text-mg-gold" />
              <h3 className={`mt-4 text-lg font-bold ${isDark ? "text-white" : "text-mg-light-text"}`}>
                {isFrench
                  ? space.title === "Peer Accountability Circle"
                    ? "Cercle de Responsabilite"
                    : space.title === "Live Review Room"
                      ? "Salle de Revue Live"
                      : "Hub de Conversation"
                  : space.title}
              </h3>
              <p className={`mt-3 text-sm leading-6 ${isDark ? "text-white/58" : "text-mg-light-textSecondary/78"}`}>
                {isFrench
                  ? space.detail === "Small student groups for discipline and weekly check-ins."
                    ? "Petits groupes d'etudiants pour la discipline et les suivis hebdomadaires."
                    : space.detail === "A future space for lesson discussions and chart feedback."
                      ? "Un futur espace pour discuter des lecons et recevoir des retours sur les graphiques."
                      : "Canal pour les questions, les victoires et le partage d'idees."
                  : space.detail}
              </p>
            </article>
          );
        })}
      </div>
    </StudentSectionCard>
  );
}

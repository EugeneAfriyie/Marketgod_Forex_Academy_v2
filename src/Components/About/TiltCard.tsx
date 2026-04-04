// components/ui/TiltCard.tsx
import { motion, useMotionValue, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map pointer movement to rotation
  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - (rect.left + rect.width / 2);
        const offsetY = e.clientY - (rect.top + rect.height / 2);
        x.set(offsetX);
        y.set(offsetY);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={`transition-transform duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default TiltCard;




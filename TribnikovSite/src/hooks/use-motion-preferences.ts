import { useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export function useShouldReduceMotion() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  return isMobile || prefersReducedMotion;
}

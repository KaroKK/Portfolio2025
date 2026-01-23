// frontend/app/components/modi/ModusSkills.tsx
"use client";

import "../../styles/skillmap.css";
import SkillMap from "../skills/SkillMap";

type ModusSkillsProps = {
  markierteSkills: string[];
  onOpenBrain?: () => void;
};

export default function ModusSkills({ markierteSkills }: ModusSkillsProps) {
  return (
    <div className="scene-card">
      <SkillMap highlightedSkills={markierteSkills} />
    </div>
  );
}

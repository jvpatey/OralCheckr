import { useState } from "react";
import { QuestionnaireSection } from "../data/QuestionnaireSection";
import { HabitsSection } from "../data/HabitsSection";

// Data tab component
export function DataTab() {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <>
      <QuestionnaireSection
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
      />
      <HabitsSection isDeleting={isDeleting} setIsDeleting={setIsDeleting} />
    </>
  );
}

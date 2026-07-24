import { ContentProps } from "@optimizely/cms-sdk";
import { HomeExperienceType } from "./HomeExperience.model";
import { VisualExperiencePage } from "../VisualExperiencePage/VisualExperiencePage";

type Props = {
  content: ContentProps<typeof HomeExperienceType>;
};

export function HomeExperience({ content }: Props) {
  return <VisualExperiencePage content={content} />;
}

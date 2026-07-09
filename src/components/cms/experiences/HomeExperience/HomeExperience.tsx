import { ContentProps } from "@optimizely/cms-sdk";
import { HomeExperienceType } from "./HomeExperience.model";
import { GenericExperience } from "../GenericExperience/GenericExperience";

type Props = {
  content: ContentProps<typeof HomeExperienceType>;
};

export function HomeExperience({ content }: Props) {
  return <GenericExperience content={content} />;
}

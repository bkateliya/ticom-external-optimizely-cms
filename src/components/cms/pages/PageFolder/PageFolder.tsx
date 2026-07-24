import { ContentProps } from "@optimizely/cms-sdk";
import { PageFolderType } from "./PageFolder.model";

type Props = {
  content: ContentProps<typeof PageFolderType>;
};

export async function PageFolder({}: Props) {
  return <div>This is a folder that should redirect</div>;
}

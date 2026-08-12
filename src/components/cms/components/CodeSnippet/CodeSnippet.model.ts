import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants";
import { PropertyTypes } from "@/lib/property-types";
import { AllComponentTypeKeyMap } from "../keys";
import { AllowIn } from "../../contracts/component-contracts/allow-in.model";

export const CodeSnippetComponentType = contentType({
  key: AllComponentTypeKeyMap.CodeSnippetComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Code Snippet`,
  baseType: "_component",
  extends: [...AllowIn.Groupings.Common],
  properties: {
    language: {
      type: "string",
      displayName: "Language",
      isRequired: true,
      description: "Syntax highlighting language for the code block",
      format: "selectOne",
      group: PropertyTypes.Content,
      enum: [
        { value: "bash", displayName: "Bash" },
        { value: "csharp", displayName: "C#" },
        { value: "java", displayName: "Java" },
        { value: "json5", displayName: "JSON" },
        { value: "powershell", displayName: "PowerShell" },
        { value: "python", displayName: "Python" },
        { value: "vbnet", displayName: "VB.NET" },
        { value: "xml", displayName: "XML" },
      ],
    },
    text: {
      type: "richText",
      isRequired: true,
      displayName: "Code Block",
      description: "Raw code to display; stored and rendered verbatim",
      group: PropertyTypes.Content,
    },
  },
});

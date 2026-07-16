import { PromoContentElementType } from "./PromoContent.model";

import { OptiComponentProps } from "@/lib/ts/component-props";

import { fieldFactory } from "@/components/ui/cms";

import styles from "./styles.module.css";
import { ButtonAppearance } from "@/components/ui/ti/enums";

type Props = OptiComponentProps<typeof PromoContentElementType> & {};

export function PromoContentElement({ content, parentField }: Props) {
  if (!content) {
    return null;
  }

  const { WrappedTextField, WrappedRichTextField, WrappedLinkField } =
    fieldFactory<typeof PromoContentElementType>(content, parentField);

  return (
    <div className={styles.base}>
      <div className={styles.container}>
        <WrappedTextField as="p" className={styles.eyebrow} field="eyebrow" />

        <WrappedTextField
          as="h2"
          className={styles.headline}
          field="headline"
        />

        <WrappedTextField
          as="p"
          className={styles.subheadline}
          field="subheadline"
        />

        <WrappedRichTextField
          field="description"
          className={styles.description}
        />
        {content.link ? (
          <WrappedLinkField field="link" appearance={ButtonAppearance.link} />
        ) : null}
      </div>
    </div>
  );
}

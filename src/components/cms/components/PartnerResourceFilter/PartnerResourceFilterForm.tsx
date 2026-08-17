"use client";

import { useRef } from "react";
import { TiButton } from "@/components/ui/ti/TiButton/TiButton";
import {
  ButtonAppearance,
  ButtonColor,
  ComponentSize,
} from "@/components/ui/ti/enums";

type TiSelectElement = HTMLElement & { value?: string };

export interface PartnerResourceFilterField {
  facet: string;
  label: string;
  options: string[];
}

export interface PartnerResourceFilterFormProps {
  fields: PartnerResourceFilterField[];
  baseUrl: string;
  provider: string;
  placeholderLabel: string;
  submitLabel: string;
}

function toSelectCsv(values: string[]) {
  return values.map((value) => value.replace(/,/g, "\\,")).join(",");
}

export function PartnerResourceFilterForm({
  fields,
  baseUrl,
  provider,
  placeholderLabel,
  submitLabel,
}: PartnerResourceFilterFormProps) {
  const selectRefs = useRef<(TiSelectElement | null)[]>([]);

  function search() {
    const preFilter = [
      ...fields.map(
        (field, index) =>
          [field.facet, selectRefs.current[index]?.value ?? ""] as const,
      ),
      ["designResourceProvider", provider] as const,
    ]
      .map(
        ([facet, value]) =>
          [
            encodeURIComponent(facet),
            encodeURIComponent(value.trim()),
          ] as const,
      )
      .filter(([, value]) => !!value)
      .map(([facet, value]) => `${facet}_${value}`)
      .join(";");

    window.open(`${baseUrl}&preFilter=${preFilter}`, "_self");
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        search();
      }}
      className="grid grid-cols-1 items-end gap-4 md:grid-cols-4"
    >
      {fields.map((field, index) => (
        <ti-form-element key={field.facet} label-text={field.label}>
          <ti-select
            ref={(element: TiSelectElement | null) => {
              selectRefs.current[index] = element;
            }}
            className="u-fullWidth block w-full"
            options={toSelectCsv(["", ...field.options])}
            labels={toSelectCsv([placeholderLabel, ...field.options])}
            value=""
          ></ti-select>
        </ti-form-element>
      ))}
      <TiButton
        appearance={ButtonAppearance.solid}
        color={ButtonColor.primary}
        size={ComponentSize.small}
        className="w-full md:mt-6"
        onClick={(event) => {
          event.preventDefault();
          search();
        }}
      >
        {submitLabel}
      </TiButton>
    </form>
  );
}

"use client";

import { useRef } from "react";
import { TifForm, TifFieldset, TifSelect } from "@ticom/form-components/react";
import { TiButton } from "@/components/ui/ti/TiButton/TiButton";

import {
  ButtonAppearance,
  ButtonColor,
  ComponentSize,
} from "@/components/ui/ti/enums";

type SelectElement = HTMLElement & { value?: string };

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

function selectedValue(element: SelectElement | null) {
  if (!element) {
    return "";
  }
  if (typeof element.value === "string") {
    return element.value;
  }
  return element.querySelector<HTMLSelectElement>("select")?.value ?? "";
}

export function PartnerResourceFilterForm({
  fields,
  baseUrl,
  provider,
  placeholderLabel,
  submitLabel,
}: PartnerResourceFilterFormProps) {
  const selectRefs = useRef<(SelectElement | null)[]>([]);

  function search() {
    const preFilter = [
      ...fields.map(
        (field, index) =>
          [field.facet, selectedValue(selectRefs.current[index])] as const,
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
    <TifForm
      method="get"
      name="getForm"
      className="[&_.tifForm-layout]:grid-cols-1 [&_.tifForm-layout]:items-start [&_.tifForm-layout]:gap-4! [&_.tifForm-layout]:md:grid-cols-4 [&_.tifForm-layout]:md:gap-14!"
    >
      {fields.map((field, index) => (
        <TifFieldset key={field.facet}>
          <span slot="label">{field.label}</span>
          <TifSelect
            ref={(element: SelectElement | null) => {
              selectRefs.current[index] = element;
            }}
            name={field.facet}
          >
            {/* A real option, not the `placeholder` prop, so the default stays
                selectable and the facet can be cleared again. */}
            <option value="">{placeholderLabel}</option>
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TifSelect>
        </TifFieldset>
      ))}
      <TiButton
        appearance={ButtonAppearance.solid}
        color={ButtonColor.primary}
        size={ComponentSize.medium}
        className="mt-2 w-full md:mt-8"
        onClick={(event) => {
          event.preventDefault();
          search();
        }}
      >
        {submitLabel}
      </TiButton>
    </TifForm>
  );
}

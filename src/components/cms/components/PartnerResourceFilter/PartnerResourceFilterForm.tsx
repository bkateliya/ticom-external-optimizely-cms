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
      use-custom-layout
      className="
        [&_.tifForm-layout-custom]:flex
        [&_.tifForm-layout-custom]:flex-col
        [&_.tifForm-layout-custom]:items-start
        [&_.tifForm-layout-custom]:gap-6
        [&_.tifForm-layout-custom]:md:grid
        [&_.tifForm-layout-custom]:md:items-end
        [&_.tifForm-layout-custom]:md:grid-cols-[repeat(3,minmax(0,1fr))_auto]
        [&_.tifForm-layout-custom]:md:gap-7
      "
    >
      {fields.map((field, index) => (
        <TifFieldset key={field.facet} className="w-full">
          <span slot="label">{field.label}</span>
          <TifSelect
            ref={(element: SelectElement | null) => {
              selectRefs.current[index] = element;
            }}
            name={field.facet}
            size={ComponentSize.small}
            className="w-full"
          >
            <option value="" selected>
              {placeholderLabel}
            </option>
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
        size={ComponentSize.small}
        className="w-full self-end"
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

import { getContextData } from "@optimizely/cms-sdk/react/server";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { Breadcrumb } from "@/components/global/Breadcrumb/Breadcrumb";
import { CommonPageContractType } from "@/components/cms/contracts/common";
import { OptiComponentProps } from "@/lib/ts/component-props";

type Props = OptiComponentProps<CommonPageContractType> & React.PropsWithChildren;
export async function SiteFrame({ children }: Props) {
  const siteSettings = getContextData("siteSettings");

  return (
    <>
      {siteSettings?.header && (
        <ExtendedOptimizelyComponent content={siteSettings.header} />
      )}
      <main className="overflow-hidden">
        <Breadcrumb />
        {children}
      </main>
      {siteSettings?.footer && (
        <ExtendedOptimizelyComponent content={siteSettings.footer} />
      )}
    </>
  );
}

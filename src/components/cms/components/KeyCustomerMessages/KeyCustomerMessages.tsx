import { type OptiComponentProps } from "@/lib/ts/component-props";
import { type KeyCustomerMessagesComponentType } from "./KeyCustomerMessages.model";
import { TiSvgIcon } from "@/components/ui/ti/TiSvgIcon";

export function KeyCustomerMessages({
  content,
}: OptiComponentProps<typeof KeyCustomerMessagesComponentType>) {
  if (!content) {
    return null;
  }
  const { messages } = content;

  return (
    <div className="flex flex-row flex-wrap justify-between">
      {messages?.map(({ benefit, description }) => (
        <KeyCustomerMessageItem
          benefit={benefit!}
          description={description!}
          key={`${benefit}|${description}`}
        />
      ))}
    </div>
  );
}

interface KeyCustomerMessageItemProps {
  benefit: string;
  description: string;
}

function KeyCustomerMessageItem({
  benefit,
  description,
}: KeyCustomerMessageItemProps) {
  return (
    <div className="flex flex-row pt-4 border-t flex-nowrap border-text-color mx-7">
      <div className="mr-4">
        <TiSvgIcon icon="checkmark" size="l" />
      </div>
      <div>
        <p className="mb-2 text-2xl">{benefit}</p>
        <p className="text-base">{description}</p>
      </div>
    </div>
  );
}

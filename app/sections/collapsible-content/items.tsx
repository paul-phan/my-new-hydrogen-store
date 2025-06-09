import type {
  HydrogenComponentProps,
  HydrogenComponentSchema,
} from "@weaverse/hydrogen";
import * as Accordion from "@radix-ui/react-accordion";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { forwardRef } from "react";

let variants = cva("w-full", {
  variants: {
    gap: {
      0: "space-y-0",
      4: "space-y-1",
      8: "space-y-2",
      12: "space-y-3",
      16: "space-y-4",
      20: "space-y-5",
      24: "space-y-6",
      28: "space-y-7",
      32: "space-y-8",
    },
  },
  defaultVariants: {
    gap: 8,
  },
});

interface CollapsibleContentItemsProps
  extends VariantProps<typeof variants>,
    HydrogenComponentProps {
  allowMultiple: boolean;
}

let CollapsibleContentItems = forwardRef<
  HTMLDivElement,
  CollapsibleContentItemsProps
>((props, ref) => {
  let { children, gap, allowMultiple, ...rest } = props;

  return (
    <div ref={ref} {...rest} className={variants({ gap })}>
      {allowMultiple ? (
        <Accordion.Root type="multiple" className="w-full">
          {children}
        </Accordion.Root>
      ) : (
        <Accordion.Root type="single" collapsible className="w-full">
          {children}
        </Accordion.Root>
      )}
    </div>
  );
});

export default CollapsibleContentItems;

export let schema: HydrogenComponentSchema = {
  type: "collapsible-content--items",
  title: "Collapsible items",
  settings: [
    {
      group: "Collapsible items",
      inputs: [
        {
          type: "range",
          name: "gap",
          label: "Items gap",
          configs: {
            min: 0,
            max: 32,
            step: 4,
            unit: "px",
          },
          defaultValue: 8,
        },
        {
          type: "switch",
          name: "allowMultiple",
          label: "Allow multiple items open",
          defaultValue: false,
          helpText:
            "Allow multiple accordion items to be open at the same time",
        },
      ],
    },
  ],
  childTypes: ["collapsible-content--item"],
  presets: {
    gap: 8,
    allowMultiple: false,
    children: [
      {
        type: "collapsible-content--item",
        heading: "What is your return policy?",
        content:
          "We offer a 30-day return policy on all items. Items must be in original condition with tags attached.",
      },
      {
        type: "collapsible-content--item",
        heading: "How long does shipping take?",
        content:
          "Standard shipping takes 3-5 business days. Express shipping options are available at checkout.",
      },
      {
        type: "collapsible-content--item",
        heading: "Do you ship internationally?",
        content:
          "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.",
      },
    ],
  },
};

import { CaretDown } from "@phosphor-icons/react";
import type {
  HydrogenComponentProps,
  HydrogenComponentSchema,
} from "@weaverse/hydrogen";
import * as Accordion from "@radix-ui/react-accordion";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import { forwardRef } from "react";

let variants = cva("w-full border-b border-line-subtle", {
  variants: {
    style: {
      default: "border-b border-line-subtle",
      bordered: "border border-line-subtle rounded-md mb-2",
      simple: "border-none",
    },
  },
  defaultVariants: {
    style: "default",
  },
});

interface CollapsibleContentItemProps
  extends VariantProps<typeof variants>,
    HydrogenComponentProps {
  heading: string;
  content: string;
}

let CollapsibleContentItem = forwardRef<
  HTMLDivElement,
  CollapsibleContentItemProps
>((props, ref) => {
  let { heading, content, style, ...rest } = props;
  // Generate a unique value based on heading to ensure uniqueness
  let value = `item-${heading.toLowerCase().replace(/\s+/g, "-").slice(0, 20)}`;

  return (
    <Accordion.Item
      ref={ref}
      {...rest}
      value={value}
      className={variants({ style })}
    >
      <Accordion.Trigger className="flex w-full justify-between items-center py-4 text-left hover:no-underline group focus-visible:outline-hidden">
        <span className="font-medium text-base md:text-lg pr-4">{heading}</span>
        <CaretDown className="w-5 h-5 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </Accordion.Trigger>
      <Accordion.Content
        style={
          {
            "--expand-to": "var(--radix-accordion-content-height)",
            "--expand-duration": "0.25s",
            "--collapse-from": "var(--radix-accordion-content-height)",
            "--collapse-duration": "0.25s",
          } as React.CSSProperties
        }
        className={clsx([
          "overflow-hidden text-base text-body-subtle",
          "data-[state=closed]:animate-collapse",
          "data-[state=open]:animate-expand",
        ])}
      >
        <div className="pb-4 pr-8">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
});

export default CollapsibleContentItem;

export let schema: HydrogenComponentSchema = {
  type: "collapsible-content--item",
  title: "Collapsible item",
  settings: [
    {
      group: "Content",
      inputs: [
        {
          type: "text",
          name: "heading",
          label: "Heading",
          placeholder: "Enter question or heading",
          defaultValue: "Sample heading",
        },
        {
          type: "richtext",
          name: "content",
          label: "Content",
          placeholder: "Enter answer or content",
          defaultValue:
            "Add your content here. You can use rich text formatting.",
        },
      ],
    },
    {
      group: "Style",
      inputs: [
        {
          type: "select",
          name: "style",
          label: "Item style",
          defaultValue: "default",
          configs: {
            options: [
              { value: "default", label: "Default (bottom border)" },
              { value: "bordered", label: "Bordered" },
              { value: "simple", label: "Simple (no border)" },
            ],
          },
        },
      ],
    },
  ],
};

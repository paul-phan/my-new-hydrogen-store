import type { HydrogenComponentSchema } from "@weaverse/hydrogen";
import { forwardRef } from "react";
import type { SectionProps } from "~/components/section";
import { Section, sectionSettings } from "~/components/section";

type CollapsibleContentProps = SectionProps;

let CollapsibleContent = forwardRef<HTMLElement, CollapsibleContentProps>(
  (props, ref) => {
    let { children, ...rest } = props;
    return (
      <Section ref={ref} {...rest}>
        {children}
      </Section>
    );
  },
);

export default CollapsibleContent;

export let schema: HydrogenComponentSchema = {
  type: "collapsible-content",
  title: "Collapsible content",
  settings: sectionSettings,
  childTypes: [
    "heading",
    "subheading",
    "paragraph",
    "collapsible-content--items",
  ],
  presets: {
    gap: 32,
    children: [
      {
        type: "heading",
        content: "Frequently Asked Questions",
      },
      {
        type: "paragraph",
        content: "Find answers to commonly asked questions below.",
      },
      {
        type: "collapsible-content--items",
      },
    ],
  },
};

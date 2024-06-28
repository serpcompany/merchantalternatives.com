import { type VariantProps, cva } from "class-variance-authority";

export { default as Avatar } from "./Avatar.vue";
export { default as AvatarImage } from "./AvatarImage.vue";
export { default as AvatarFallback } from "./AvatarFallback.vue";
export { default as CompanyLogo } from "./CompanyLogo.vue";

export const avatarVariant = cva(
  "inline-flex shrink-0 select-none items-center justify-center overflow-hidden font-normal text-foreground border",
  {
    variants: {
      size: {
        sm: "size-10 text-xs",
        base: "size-16 text-2xl",
        lg: "size-32 text-5xl",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-md",
      },
    },
  },
);

export type AvatarVariants = VariantProps<typeof avatarVariant>;

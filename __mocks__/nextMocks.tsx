// __mocks__/nextMocks.ts
import React from "react";

export const mockNextImage = ({
  src,
  alt,
  className,
  ...props
}: {
  src: string;
  alt: string;
  className?: string;
  [key: string]: any;
}) => (
  <img
    src={src}
    alt={alt}
    className={className}
    data-testid="next-image"
    {...props}
  />
);

export const mockNextLink = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  href: string;
  [key: string]: any;
}) => <a {...props}>{children}</a>;

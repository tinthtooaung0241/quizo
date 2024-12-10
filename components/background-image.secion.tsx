import { getBackgroundImageStyle } from "@/lib/utils";

interface BackgroundImageSectionProps {
  imageSrc: string;
  width: number;
  height: number;
  children: React.ReactNode;
}

export default function BackgroundImageSection({
  imageSrc,
  width,
  height,
  children,
}: BackgroundImageSectionProps) {
  const backgroundStyle = getBackgroundImageStyle({
    src: imageSrc,
    width,
    height,
  });

  return (
    <section
      style={{
        ...backgroundStyle,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      {children}
    </section>
  );
}

type LogoProps = {
  className?: string;
  priority?: boolean;
};

/**
 * Official Elisha Bay lockup. The transparent WebP variants are the primary
 * asset; the PNG `src` is the fallback for browsers without WebP support.
 * Intrinsic dimensions match the widest asset's aspect ratio to prevent layout
 * shift while the browser picks a smaller source.
 */
export function Logo({ className = '', priority = false }: LogoProps) {
  return (
    <img
      src="/logo/elisha-bay-logo-512.png"
      srcSet="/logo/elisha-bay-logo-256.webp 256w, /logo/elisha-bay-logo-512.webp 512w, /logo/elisha-bay-logo-1024.webp 1024w"
      sizes="128px"
      width={512}
      height={401}
      alt="Elisha Bay Dagupan Bangus and Seafoods"
      className={`w-auto ${className}`}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
    />
  );
}

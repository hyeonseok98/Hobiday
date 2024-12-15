export default function LoadingSpinner({ size = 80 }: { size?: number }) {
  return (
    <div
      className="spinner relative rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
}

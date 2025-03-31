interface PerformanceInfoProps {
  title: string;
  content?: string | null;
  placeholder?: string;
  children?: React.ReactNode;
}

export default function PerformanceInfo({ title, content, placeholder, children }: PerformanceInfoProps) {
  return (
    <section>
      <h3 className="px-4 py-3 text-lg font-bold shadow-sm">{title}</h3>
      <div className="px-5 py-4 leading-normal">
        {children || <p className="text-sm text-textColor">{content?.trim() || placeholder}</p>}
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
};

export function Input({ label, name, type = "text", required, placeholder }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-ink transition-colors placeholder:text-ink-muted/60 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
      />
    </div>
  );
}

export function Textarea({ label, name, required, placeholder, rows = 4 }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={rows}
        placeholder={placeholder}
        className="w-full resize-none rounded-xl border border-line bg-bg px-4 py-3 text-sm text-ink transition-colors placeholder:text-ink-muted/60 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
      />
    </div>
  );
}

export function Select({
  label, name, required, placeholder, options, defaultValue,
}: FieldProps & { options: string[]; defaultValue?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue ?? ""}
        className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-ink transition-colors focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

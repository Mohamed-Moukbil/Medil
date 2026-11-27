import { Icon } from "@/components/icons";

type StarRowProps = {
  count: number;
  max?: number;
  label?: boolean;
};

export function StarRow({ count, max = 5, label = true }: StarRowProps) {
  return (
    <span className="star-row" aria-label={`${count} étoiles sur ${max}`}>
      {Array.from({ length: max }, (_, index) => (
        <span key={index} className={`star ${index < count ? "is-on" : ""}`}>
          <Icon name="star" />
        </span>
      ))}
      {label ? <span className="star-label">{count}/{max}</span> : null}
    </span>
  );
}

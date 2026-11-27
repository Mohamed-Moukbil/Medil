const AVATARS = [
  { initials: "LB", color: "lime" },
  { initials: "AK", color: "lilac" },
  { initials: "SM", color: "peach" },
  { initials: "YR", color: "mint" },
];

export function AvatarStack({ extra = "", count = 4 }: { extra?: string; count?: number }) {
  return (
    <div className={`avatar-stack ${extra}`.trim()}>
      {AVATARS.slice(0, count).map((avatar) => (
        <span key={avatar.initials} className={`avatar avatar--${avatar.color}`}>
          {avatar.initials}
        </span>
      ))}
      <span className="avatar avatar--more">+2k</span>
    </div>
  );
}

export type MenuItem = {
  label: React.ReactNode;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
};

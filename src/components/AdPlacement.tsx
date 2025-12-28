interface AdPlacementProps {
  height: string;
  label?: string;
  className?: string;
  vertical?: boolean;
}

const AdPlacement = ({ height, label, className = '', vertical = false }: AdPlacementProps) => {
  const isDev = import.meta.env.DEV;

  return (
    <div className={`ad-placeholder ${height} flex items-center justify-center ${className}`}>
      {isDev && label && (
        <span className={`text-xs uppercase tracking-wider ${vertical ? 'writing-mode-vertical' : ''}`}>
          {label}
        </span>
      )}
    </div>
  );
};

export default AdPlacement;

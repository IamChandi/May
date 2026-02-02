import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

const confidenceConfig = {
  HIGH: {
    icon: ShieldCheck,
    label: 'High Confidence',
    bgColor: 'bg-sage-100',
    textColor: 'text-sage-700',
    borderColor: 'border-sage-300',
    progressColor: 'bg-sage-500',
    progressWidth: 'w-[85%]',
    description: 'Multiple high-quality RCTs with consistent results'
  },
  MEDIUM: {
    icon: Shield,
    label: 'Medium Confidence',
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-300',
    progressColor: 'bg-amber-400',
    progressWidth: 'w-[55%]',
    description: 'Limited RCTs or observational data'
  },
  LOW: {
    icon: ShieldAlert,
    label: 'Low Confidence',
    bgColor: 'bg-coral-100',
    textColor: 'text-coral-700',
    borderColor: 'border-coral-300',
    progressColor: 'bg-coral-500',
    progressWidth: 'w-[25%]',
    description: 'Limited evidence or conflicting results'
  }
};

export default function ConfidenceBadge({
  level = 'MEDIUM',
  showProgress = true,
  showDescription = false,
  size = 'default',
  className = ''
}) {
  const config = confidenceConfig[level] || confidenceConfig.MEDIUM;
  const Icon = config.icon;

  const sizeClasses = {
    small: 'text-xs px-2 py-0.5',
    default: 'text-sm px-2.5 py-1',
    large: 'text-base px-3 py-1.5'
  };

  const iconSizes = {
    small: 'w-3 h-3',
    default: 'w-4 h-4',
    large: 'w-5 h-5'
  };

  return (
    <div className={`inline-flex flex-col ${className}`}>
      <div
        className={`
          inline-flex items-center gap-1.5 rounded-lg border
          ${config.bgColor} ${config.textColor} ${config.borderColor}
          ${sizeClasses[size]}
          font-medium
        `}
      >
        <Icon className={iconSizes[size]} />
        <span>{config.label}</span>
      </div>

      {showProgress && (
        <div className="mt-1.5 w-full">
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${config.progressColor} ${config.progressWidth} rounded-full transition-all duration-500`}
            />
          </div>
        </div>
      )}

      {showDescription && (
        <p className={`mt-1 text-xs ${config.textColor} opacity-80`}>
          {config.description}
        </p>
      )}
    </div>
  );
}

export function ConfidenceBar({ level = 'HIGH', className = '' }) {
  const config = confidenceConfig[level] || confidenceConfig.MEDIUM;

  const segments = level === 'HIGH' ? 8 : level === 'MEDIUM' ? 5 : 2;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className={`
            w-2 h-3 rounded-sm transition-all duration-300
            ${i < segments ? config.progressColor : 'bg-gray-200'}
          `}
        />
      ))}
    </div>
  );
}

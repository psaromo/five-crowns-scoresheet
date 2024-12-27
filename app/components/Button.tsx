import classNames from 'classnames';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
}

export const PrimaryButton = ({
  text,
  onClick,
  disabled,
  type = 'button',
  className,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        { 'opacity-50 cursor-not-allowed': disabled },
        'bg-secondary text-primary font-semibold rounded-md p-2 hover:text-white',
        className,
      )}
      type={type}
    >
      {text}
    </button>
  );
};

export const SecondaryButton = ({
  text,
  onClick,
  disabled,
  type = 'button',
  className,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        { 'opacity-50 cursor-not-allowed': disabled },
        'border-2 border-secondary text-white font-semibold rounded-md p-2 hover:bg-secondary hover:text-primary',
        className,
      )}
      type={type}
    >
      {text}
    </button>
  );
};

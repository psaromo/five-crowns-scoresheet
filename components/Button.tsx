import classNames from 'classnames';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
}
const PrimaryButton = ({ text, onClick, disabled, type = 'button' }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        { 'opacity-50 cursor-not-allowed': disabled },
        'bg-secondary text-primary font-semibold rounded-md p-2',
      )}
      type={type}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;

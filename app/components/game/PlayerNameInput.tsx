import { FaRegTrashAlt } from 'react-icons/fa';
import { MAX_PLAYERS, MIN_PLAYERS } from 'lib/constants';
import { Player } from 'types/Players';
import { PrimaryButton, SecondaryButton } from 'components/Button';
import { useFieldArray, useFormContext } from 'react-hook-form';
import classNames from 'classnames';

interface PlayerNameInputProps {
  nextFormStep: () => void;
  resetForm: () => void;
}

export const PlayerNameInput = ({ nextFormStep, resetForm }: PlayerNameInputProps) => {
  const {
    control,
    register,
    formState: { errors, isValid },
  } = useFormContext<{ players: Player[] }>();

  const {
    fields: playerNamesFields,
    append,
    remove,
  } = useFieldArray<{ players: Player[] }>({
    control,
    name: 'players',
    rules: { minLength: 2 },
  });

  return (
    <div className="flex flex-col justify-center items-center space-y-4 w-72">
      <div className="flex flex-col space-y-4">
        {playerNamesFields.map((field, index) => (
          <div className="space-y-1">
            <div key={field.id} className="flex items-center space-x-4">
              <input
                className={classNames(
                  { 'border-red-700': errors.players?.[index]?.name },
                  'font-bold text-primary outline-none focus:ring-offset-0 focus:border-secondary focus:ring-0 focus:ring-secondary rounded-md border w-full py-2 px-4',
                )}
                type="text"
                maxLength={10}
                {...register(`players[${index}].name` as 'players', {
                  required: true,
                })}
                placeholder={`Player ${index + 1}`}
              />
              <button
                className={classNames({ 'opacity-50': playerNamesFields.length === MIN_PLAYERS })}
                type="button"
                onClick={() => remove(index)}
                disabled={playerNamesFields.length === MIN_PLAYERS}
              >
                <FaRegTrashAlt />
              </button>
            </div>
            {errors.players?.[index]?.name && <p className="text-xs">Player name is required.</p>}
          </div>
        ))}
        <PrimaryButton
          text="Add Player"
          onClick={() =>
            append({
              name: null,
              scores: {
                level3: undefined,
                level4: undefined,
                level5: undefined,
                level6: undefined,
                level7: undefined,
                level8: undefined,
                level9: undefined,
                level10: undefined,
                level11: undefined,
                level12: undefined,
                level13: undefined,
              },
            })
          }
          disabled={playerNamesFields.length === MAX_PLAYERS}
        />
        <div className="flex space-x-4">
          <SecondaryButton text="Reset" onClick={resetForm} />
          <PrimaryButton text="Start Game" onClick={nextFormStep} disabled={!isValid} />
        </div>
      </div>
    </div>
  );
};

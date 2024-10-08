import { Player } from 'app/types/Players';
import classNames from 'classnames';
import { PrimaryButton, SecondaryButton } from 'components/Button';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaRegTrashAlt } from 'react-icons/fa';

interface PlayerNameInputProps {
  nextFormStep: () => void;
  resetForm: () => void;
}

const MIN_PLAYERS = 2;
const MAX_PLAYERS = 21;

export const PlayerNameInput = ({ nextFormStep, resetForm }: PlayerNameInputProps) => {
  const {
    register,
    getValues,
    setValue,
    formState: { isValid },
  } = useFormContext();

  const [inputList, setInputList] = useState<string[]>(['', '']);

  // Function to handle adding a new input box
  const handleAddInput = () => {
    const newIndex = inputList.length;
    setInputList([...inputList, '']);
    setValue(`players[${newIndex}]`, ''); // Register a new input in the form state
  };

  const handleDeleteInput = (index: number) => {
    const newInputList = [...inputList];
    newInputList.splice(index, 1); // Remove the input at the specified index
    setInputList(newInputList);

    // Remove the corresponding input value from the form state
    setValue(`players[${index}]`, undefined);
  };

  const startGame = () => {
    const currentPlayers: Player[] = getValues('players');
    const updatedPlayers = currentPlayers
      .filter((player) => player && player.name)
      .map((player, index) => ({
        id: `${player.name}+${index + 1}`,
        ...player, // Keep all existing properties (in this case, just `name`)
        scores: {
          level3: NaN,
          level4: NaN,
          level5: NaN,
          level6: NaN,
          level7: NaN,
          level8: NaN,
          level9: NaN,
          level10: NaN,
          level11: NaN,
          level12: NaN,
          level13: NaN,
        },
      }));
    setValue('players', updatedPlayers);
    nextFormStep();
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4 w-72">
      <div className="flex flex-col space-y-4">
        {inputList.map((input, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div key={index}>
              <input
                className="font-bold text-primary outline-none focus:ring-offset-0 focus:border-secondary focus:ring-0 focus:ring-secondary rounded-md border w-full py-2 px-4"
                type="text"
                maxLength={10}
                {...register(`players[${index}].name`, {
                  required: index < MIN_PLAYERS, // Only required for the first two inputs
                })}
                placeholder={`Player ${index + 1}`}
              />
            </div>
            <button
              className={classNames({ 'opacity-50': inputList.length === MIN_PLAYERS })}
              type="button"
              onClick={() => handleDeleteInput(index)}
              disabled={inputList.length === MIN_PLAYERS}
            >
              <FaRegTrashAlt />
            </button>
          </div>
        ))}
        <PrimaryButton
          text="Add Player"
          onClick={handleAddInput}
          disabled={inputList.length === MAX_PLAYERS}
        />
        <div className="flex space-x-4">
          <SecondaryButton text="Reset" onClick={resetForm} />
          <PrimaryButton text="Start Game" onClick={startGame} disabled={!isValid} />
        </div>
      </div>
    </div>
  );
};

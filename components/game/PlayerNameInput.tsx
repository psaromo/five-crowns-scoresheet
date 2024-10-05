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

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputList = [...inputList];
    newInputList[index] = event.target.value;
    setInputList(newInputList);

    // Update the form state with the new value
    setValue(`players[${index}]`, event.target.value);
  };

  const startGame = () => {
    const currentPlayers = getValues('players');
    const updatedPlayers = currentPlayers
      .filter((player: any) => player && player.name)
      .map((player: any, index: number) => ({
        id: `${player.name}+${index + 1}`,
        ...player, // Keep all existing properties (in this case, just `name`)
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
                value={input}
                {...register(`players[${index}].name`, { required: index < MIN_PLAYERS })}
                onChange={(event) => handleInputChange(index, event)}
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

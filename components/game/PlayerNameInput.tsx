'use client';

import { Dispatch, SetStateAction } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { PlayersRecord } from 'app/types/Players';
import { PrimaryButton, SecondaryButton } from 'components/Button';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

interface PlayerNameInputProps {
  inputs: PlayersRecord;
  setInputs: Dispatch<SetStateAction<PlayersRecord>>;
  completeFormStep: () => void;
  resetForm: () => void;
}
export const PlayerNameInput = ({
  inputs,
  setInputs,
  completeFormStep,
  resetForm,
}: PlayerNameInputProps) => {
  const {
    register,
    formState: { isValid },
    setValue,
  } = useFormContext();

  const obj = Object.keys(inputs);

  // Handle click to add a new input field
  const addInput = () => {
    const nextIndex = Object.keys(inputs).length + 1;
    const newPlayerKey = `player${nextIndex}`;
    const newPlayer = {
      name: '',
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
    };

    // Update the state with the new player
    setInputs((prevInputs) => ({
      ...prevInputs,
      [newPlayerKey]: newPlayer,
    }));
  };

  // Handle removing an input field by index
  const removeInput = (index: number) => {
    const newInputs = { ...inputs };
    delete newInputs[`player${index + 1}`]; // Delete the player key
    setInputs(newInputs);
  };
  const startGame = () => {
    // Iterate over each player and ensure the scores are set
    Object.keys(inputs).forEach((key) => {
      // Set scores if they are not present in the form
      setValue(
        `${key}.scores`,
        {
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
        { shouldValidate: true, shouldDirty: true },
      );
    });

    completeFormStep(); // Proceed to next form step
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-4">
        <div className="flex flex-col space-y-4">
          {Object.keys(inputs).map((val, index) => (
            <div key={index} className="flex items-center space-x-4">
              <input
                className="font-bold text-primary outline-none focus:ring-offset-0 focus:border-secondary focus:ring-0 focus:ring-secondary rounded-md border w-full py-2 px-4"
                type="text"
                maxLength={10}
                placeholder={`Player ${index + 1}`}
                {...register(`player${index + 1}.name`, { required: index < 3 })}
              />
              <button
                className={classNames({ 'opacity-50': obj.length === 3 })}
                type="button"
                onClick={() => removeInput(index)}
                disabled={obj.length === 3}
              >
                <FaRegTrashAlt />
              </button>
            </div>
          ))}
          <PrimaryButton text="Add Player" onClick={addInput} disabled={obj.length === 7} />
          <div className="flex space-x-4">
            <PrimaryButton
              text="Start Game"
              disabled={!isValid}
              type="button"
              onClick={startGame} // Call the custom function
            />
            <SecondaryButton text="Reset" onClick={resetForm} />
          </div>
        </div>
      </div>
    </>
  );
};

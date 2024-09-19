'use client';

import { Dispatch, SetStateAction } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { PrimaryButton, SecondaryButton } from '../Button';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

interface PlayerNameInputProps {
  inputs: PlayersRecord;
  setInputs: Dispatch<SetStateAction<PlayersRecord>>;
  completeFormStep: any;
  resetForm: any;
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
    getValues,
    watch,
  } = useFormContext();
  const obj = Object.keys(inputs);
  // Handle click to add a new input field
  const addInput = () => {
    const nextIndex = Object.keys(inputs).length + 1;
    const newPlayerKey = `player${nextIndex}`;
    const newPlayer = {
      name: '',
      scores: {
        level3: 0,
        level4: 0,
        level5: 0,
        level6: 0,
        level7: 0,
        level8: 0,
        level9: 0,
        level10: 0,
        level11: 0,
        level12: 0,
        level13: 0,
      },
    };

    // Update the state with the new player
    setInputs((prevInputs: any) => ({
      ...prevInputs,
      [newPlayerKey]: newPlayer,
    }));
  };

  // Handle removing an input field by index
  const removeInput = (index: number) => {
    setInputs((prevInputs: any) => {
      return prevInputs.filter((_: any, i: any) => i !== index);
    });
  };

  const startGame = (data: any) => {
    console.log('Form Data:', data);
  };

  console.log(inputs, 'Object.keys(inputs)');

  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-4">
        <div className="flex flex-col space-y-4">
          {Object.keys(inputs).map((val, index) => (
            <div key={index} className="flex items-center space-x-4">
              <input
                className="text-primary outline-none focus:ring-offset-0 focus:border-secondary focus:ring-0 focus:ring-secondary rounded-md border w-full py-2 px-4"
                type="text"
                maxLength={30}
                placeholder={`Player ${index + 1}`}
                {...register(`player${index + 1}.name`, { required: index < 3 })}
              />
              <button
                className={classNames({ 'opacity-50': obj.length == 3 })}
                type="button"
                onClick={() => removeInput(index)}
                disabled={obj.length == 3}
              >
                <FaRegTrashAlt />
              </button>
            </div>
          ))}
          <PrimaryButton text="Add Player" onClick={addInput} disabled={obj.length == 7} />
          <div className="flex space-x-4">
            <PrimaryButton
              text="Start Game"
              disabled={!isValid}
              type="button"
              onClick={completeFormStep}
            />
            <SecondaryButton text="Reset" onClick={resetForm} />
          </div>
        </div>
      </div>
    </>
  );
};

'use client';

import { FaRegTrashAlt } from 'react-icons/fa';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';
import { PrimaryButton } from '../Button';
import { Dispatch, SetStateAction } from 'react';

interface PlayerNameInputProps {
  inputs: string[];
  setInputs: Dispatch<SetStateAction<string[]>>;
}
export const PlayerNameInput = ({ inputs, setInputs }: PlayerNameInputProps) => {
  const { register, setValue, getValues, watch } = useFormContext();

  // Handle click to add a new input field
  const addInput = () => {
    setInputs((prevInputs) => [
      ...prevInputs,
      `input_${prevInputs.length}`, // Add new input key
    ]);
  };

  // Handle removing an input field by index
  const removeInput = (index: number) => {
    setInputs((prevInputs) => {
      console.log(prevInputs, 'prev');
      return prevInputs.filter((_, i) => i !== index);
    });
  };

  const startGame = (data: any) => {
    console.log('Form Data:', data);
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <div className="flex flex-col space-y-4">
        {inputs.map((_, index) => (
          <div key={index} className="flex items-center space-x-4">
            <input
              className="text-primary outline-none focus:ring-offset-0 focus:border-secondary focus:ring-0 focus:ring-secondary rounded-md border w-full py-2 px-4"
              type="text"
              maxLength={30}
              placeholder={`Player ${index + 1}`}
              {...register(`player${index + 1}.name`, { required: index < 3 })}
            />
            <button
              className={classNames({ 'opacity-50': inputs.length == 3 })}
              type="button"
              onClick={() => removeInput(index)}
              disabled={inputs.length == 3}
            >
              <FaRegTrashAlt />
            </button>
          </div>
        ))}
        <PrimaryButton text="Add Player" onClick={addInput} disabled={inputs.length == 7} />
      </div>
    </div>
  );
};

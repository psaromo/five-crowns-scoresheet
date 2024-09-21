import { Dispatch, SetStateAction } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { PlayersRecord } from 'app/types/Players';
import { PrimaryButton, SecondaryButton } from 'components/Button';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

interface PlayerNameInputProps {
  playerNameInputs: PlayersRecord;
  setPlayerNameInputs: Dispatch<SetStateAction<PlayersRecord>>;
  setDefaultValues: Dispatch<SetStateAction<PlayersRecord>>;
  completeFormStep: () => void;
  resetForm: () => void;
}

export const PlayerNameInput = ({
  playerNameInputs,
  setPlayerNameInputs,
  setDefaultValues,
  completeFormStep,
  resetForm,
}: PlayerNameInputProps) => {
  const {
    getValues,
    register,
    formState: { isValid },
  } = useFormContext();
  const playerKeys = Object.keys(playerNameInputs);

  // Handle click to add a new input field
  const addPlayerNameInput = () => {
    const nextIndex = Object.keys(playerNameInputs).length + 1;
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
    setPlayerNameInputs((prevInputs) => ({
      ...prevInputs,
      [newPlayerKey]: newPlayer,
    }));
  };

  // Handle removing an input field by index
  const removePlayerNameInput = (index: number) => {
    const newInputs = { ...playerNameInputs };
    delete newInputs[`player${index + 1}`];
    setPlayerNameInputs(newInputs);
  };

  const startGame = () => {
    const registeredPlayers = getValues();
    console.log(registeredPlayers, 'registered');
    setPlayerNameInputs(registeredPlayers);
    setDefaultValues(registeredPlayers);
    completeFormStep();
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <div className="flex flex-col space-y-4">
        {Object.keys(playerNameInputs).map((val, index) => (
          <div key={index} className="flex items-center space-x-4">
            <input
              className="font-bold text-primary outline-none focus:ring-offset-0 focus:border-secondary focus:ring-0 focus:ring-secondary rounded-md border w-full py-2 px-4"
              type="text"
              maxLength={10}
              placeholder={`Player ${index + 1}`}
              {...register(`player${index + 1}.name`, { required: index < 2 })}
            />
            <button
              className={classNames({ 'opacity-50': playerKeys.length === 2 })}
              type="button"
              onClick={() => removePlayerNameInput(index)}
              disabled={playerKeys.length === 2}
            >
              <FaRegTrashAlt />
            </button>
          </div>
        ))}
        <PrimaryButton
          text="Add Player"
          onClick={addPlayerNameInput}
          disabled={playerKeys.length === 7}
        />
        <div className="flex space-x-4">
          <SecondaryButton text="Reset" onClick={resetForm} />
          <PrimaryButton text="Start Game" onClick={startGame} disabled={!isValid} />
        </div>
      </div>
    </div>
  );
};

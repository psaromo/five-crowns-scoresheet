'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { PlayerNameInput } from 'components/game/PlayerNameInput';
import { PlayersRecord } from 'app/types/Players';
import { PrimaryButton, SecondaryButton } from 'components/Button';
import { Scoresheet } from 'components/game/Scoresheet';
import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';

const defaultValues = {
  player1: {
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
  },
  player2: {
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
  },
  player3: {
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
  },
};

interface SortedPlayers {
  name: string;
  totalScore: any;
}
export default function Dashboard() {
  const methods = useForm<PlayersRecord>({
    mode: 'all',
    defaultValues,
  });

  const {
    getValues,
    formState: { isValid },
    handleSubmit,
    reset,
  } = methods;

  const [formStep, setFormStep] = useState(0);
  const formStates = ['start', 'scoresheet', 'end'];
  const currentAndPrevSteps = formStates.slice(0, formStep + 1);

  const completeFormStep = useCallback(() => {
    setFormStep((cur) => cur + 1);
  }, [setFormStep]);
  const previousFormStep = useCallback(() => {
    setFormStep((cur) => cur - 1);
  }, [setFormStep]);

  const initialInputs = defaultValues;
  const [inputs, setInputs] = useState<PlayersRecord>(initialInputs);

  const resetForm = useCallback(() => {
    reset();
    setInputs(initialInputs);
  }, [reset, initialInputs]);

  const [sortedPlayers, setSortedPlayers] = useState<SortedPlayers[]>([]);
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);
  const submitGame = () => {
    setIsGameFinished(true);
    completeFormStep();
  };

  const results = getValues();

  useEffect(() => {
    if (isGameFinished) {
      setSortedPlayers(
        Object.entries(results)
          .map(([key, result]) => ({
            name: result.name,
            totalScore: Object.values(result.scores).reduce((acc, score) => acc + (score || 0), 0),
          }))
          .sort((a, b) => b.totalScore - a.totalScore),
      );
    }
  }, [isGameFinished, results]);

  console.log(sortedPlayers);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submitGame)} className="flex justify-center items-center">
        {currentAndPrevSteps.includes('start') && (
          <div
            className={classNames(
              { hidden: formStep != formStates.indexOf('start') },
              'flex flex-col justify-center items-start space-y-4',
            )}
          >
            <PlayerNameInput {...{ inputs, setInputs, completeFormStep, resetForm }} />
          </div>
        )}
        {currentAndPrevSteps.includes('scoresheet') && (
          <div
            className={classNames(
              { hidden: formStep != formStates.indexOf('scoresheet') },
              'flex flex-col justify-center items-start space-y-4',
            )}
          >
            <Scoresheet />
            <div className="flex space-x-4">
              <SecondaryButton text="Back" onClick={previousFormStep} />
              <SecondaryButton text="Clear" onClick={resetForm} />
              <PrimaryButton text="Finish Game" disabled={!isValid} onClick={submitGame} />
            </div>
          </div>
        )}
        {currentAndPrevSteps.includes('end') && (
          <div
            className={classNames(
              { hidden: formStep != formStates.indexOf('end') },
              'flex flex-col justify-center items-start space-y-4',
            )}
          >
            {isGameFinished && (
              <div>
                <div className="flex">{`Winner: ${sortedPlayers[0].name}`} 🎉</div>
                <div>Total Scores: </div>
                {sortedPlayers.map((player, index) => (
                  <div key={index}>
                    {player.name}: {player.totalScore}
                  </div>
                ))}
                <div className="flex space-x-4">
                  <SecondaryButton text="Back" onClick={previousFormStep} />
                  <SecondaryButton text="Play again" onClick={resetForm} />
                </div>
              </div>
            )}
          </div>
        )}
      </form>
    </FormProvider>
  );
}

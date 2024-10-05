'use client';

import { calculateScoresAndSort, rank } from 'app/utils/utils';
import { FormProvider, useForm } from 'react-hook-form';
import { Player } from 'app/types/Players';
import { PlayerNameInput } from 'components/game/PlayerNameInput';
import { PrimaryButton, SecondaryButton } from 'components/Button';
import { Scoresheet } from 'components/game/Scoresheet';
import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';

interface SortedPlayers {
  name: string;
  totalScore: number;
}

export default function Dashboard() {
  const methods = useForm({
    mode: 'all',
    defaultValues: { players: [] },
  });

  const {
    getValues,
    setValue,
    formState: { isValid },
    handleSubmit,
    reset,
  } = methods;

  const [formStep, setFormStep] = useState<number>(0);
  const formStates = ['start', 'scoresheet', 'end'];
  const currentAndPrevSteps = formStates.slice(0, formStep + 1);

  const nextFormStep = useCallback(() => {
    setFormStep((cur) => cur + 1);
  }, [setFormStep]);
  const previousFormStep = useCallback(() => {
    setFormStep((cur) => cur - 1);
  }, [setFormStep]);

  const resetForm = useCallback(() => {
    reset();
  }, [reset]);

  const submitGame = useCallback(() => {
    setIsGameFinished(true);
    nextFormStep();
  }, []);

  const [sortedPlayers, setSortedPlayers] = useState<SortedPlayers[]>([]);
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);

  useEffect(() => {
    const results = getValues('players');
    if (isGameFinished) {
      const calculation = calculateScoresAndSort(results);
      setSortedPlayers(calculation);
    }
  }, [isGameFinished]);

  const playAgain = () => {
    const allPlayers: Player[] = getValues('players');
    const updatedPlayers = allPlayers.map((player) => ({
      ...player,
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
    setValue('players', updatedPlayers as any);
    previousFormStep();
  };

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
            <PlayerNameInput
              {...{
                nextFormStep,
                resetForm,
              }}
            />
          </div>
        )}
        {currentAndPrevSteps.includes('scoresheet') && (
          <div
            className={classNames(
              { hidden: formStep != formStates.indexOf('scoresheet') },
              'flex flex-col justify-center items-start space-y-4 overflow-x-auto',
            )}
          >
            <Scoresheet />
            <div className="flex space-x-4 absolute bottom-0">
              <SecondaryButton text="Back" onClick={previousFormStep} />
              <PrimaryButton
                text="Finish Game"
                disabled={!isValid}
                onClick={() => {
                  setIsGameFinished(true);
                  nextFormStep();
                }}
              />
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
              <div className="space-y-4">
                <div className="space-x-2 text-2xl">
                  <span className="font-bold">Winner:</span>
                  <span>{sortedPlayers[0]?.name} 🎉</span>
                </div>
                <table>
                  <thead className="font-bold text-xl">
                    <th className="">RANK</th>
                    <th className="px-10">NAME</th>
                    <th className="">SCORE</th>
                  </thead>
                  <tbody>
                    {sortedPlayers.map((player, index) => (
                      <tr>
                        <td className="text-center">{rank[index]}</td>
                        <td className="text-center">{player.name}</td>
                        <td className="text-center">{player.totalScore}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex space-x-4">
                  <SecondaryButton
                    text="Back"
                    onClick={() => {
                      setIsGameFinished(false);
                      previousFormStep();
                    }}
                  />
                  <PrimaryButton text="Play again" onClick={playAgain} />
                </div>
              </div>
            )}
          </div>
        )}
      </form>
    </FormProvider>
  );
}

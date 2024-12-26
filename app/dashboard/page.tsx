'use client';

import { calculateScoresAndSort } from 'lib/utils';
import { FormProvider, useForm } from 'react-hook-form';
import { Player } from 'types/Players';
import { PlayerNameInput } from 'components/game/PlayerNameInput';
import { PrimaryButton, SecondaryButton } from 'components/Button';
import { rank } from 'lib/constants';
import { Scoresheet } from 'components/game/Scoresheet';
import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';

export default function Dashboard() {
  const methods = useForm<{ players: Player[] }>({
    mode: 'all',
    defaultValues: {
      players: [
        {
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
        },
        {
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
        },
      ],
    },
  });

  const {
    setValue,
    getValues,
    formState: { isValid },
    handleSubmit,
    reset,
  } = methods;

  const [sortedPlayers, setSortedPlayers] = useState<
    {
      name: string | null;
      totalScore: number;
    }[]
  >([]);
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);

  useEffect(() => {
    const results = getValues('players');
    if (isGameFinished) {
      const calculation = calculateScoresAndSort(results);
      setSortedPlayers(calculation);
    }
  }, [isGameFinished]);

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
  }, [setIsGameFinished, nextFormStep]);

  const resetScores = useCallback(() => {
    const players = getValues('players');
    const updatedPlayersScores = players.map((player) => {
      return {
        name: player.name,
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
    });
    setValue('players', updatedPlayersScores);
    setIsGameFinished(false);
    previousFormStep();
  }, [setValue, getValues, setIsGameFinished, previousFormStep]);

  const restartGame = useCallback(() => {
    reset();
    setIsGameFinished(false);
    setFormStep(0);
  }, [reset, setIsGameFinished, setFormStep]);

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
              <PrimaryButton type="submit" text="Finish Game" disabled={!isValid} />
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
                      <tr key={player.name}>
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
                  <PrimaryButton text="Reset scores" onClick={resetScores} />
                  <PrimaryButton text="Restart game" onClick={restartGame} />
                </div>
              </div>
            )}
          </div>
        )}
      </form>
    </FormProvider>
  );
}

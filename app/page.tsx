'use client';

import { calculateScoresAndSort } from 'lib/utils';
import { FormProvider, useForm } from 'react-hook-form';
import { GameFormValues } from 'types/Players';
import { PlayerNameInput } from 'components/game/PlayerNameInput';
import { PrimaryButton, SecondaryButton } from 'components/Button';
import { rank } from 'lib/constants';
import { Scoresheet } from 'components/game/Scoresheet';
import { useCallback, useState } from 'react';
import classNames from 'classnames';
import Head from 'next/head';
import Image from 'next/image';
import RulesAndInfo from 'components/RulesAndInfo';

export default function Home() {
  const methods = useForm<GameFormValues>({
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

  const submitForm = useCallback(
    async (values: GameFormValues) => {
      const { players } = values;
      const calculation = calculateScoresAndSort(players);
      setSortedPlayers(calculation);
      nextFormStep();
    },
    [calculateScoresAndSort, setSortedPlayers, nextFormStep],
  );

  const resetScores = useCallback(() => {
    const players = getValues('players');
    const updatedPlayersScores = players.map((player) => {
      return {
        name: player.name,
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
    });
    setValue('players', updatedPlayersScores);
    previousFormStep();
  }, [getValues, setValue, previousFormStep]);

  const restartGame = useCallback(() => {
    resetForm();
    setFormStep(0);
  }, [reset, setFormStep]);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <main>
        <div className="flex flex-col items-center justify-center space-y-5 my-5">
          <Image alt="five-crowns-logo" src={'/five-crowns-logo.jpg'} width={230} height={100} />
          <p className="font-bold text-xl md:text-3xl">Scoresheet Calculator</p>
        </div>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(submitForm)}
            className="flex flex-col justify-center items-center space-y-5"
          >
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
                  'flex flex-col justify-center items-center space-y-4 w-full',
                )}
              >
                <div className="overflow-auto overscroll-contain w-full flex justify-center items-center">
                  <Scoresheet />
                </div>
                <div className="flex space-x-4">
                  <SecondaryButton text="Back" onClick={previousFormStep} />
                  <PrimaryButton type="submit" text="Finish Game" disabled={!isValid} />
                </div>
              </div>
            )}
            {currentAndPrevSteps.includes('end') && (
              <div
                className={classNames(
                  { hidden: formStep != formStates.indexOf('end') },
                  'flex flex-col justify-center items-center space-y-4',
                )}
              >
                <div className="space-x-2 text-3xl">
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
                      <tr key={player.name} className="border-b text-lg">
                        <td className="text-center p-2">{rank[index]}</td>
                        <td className="text-center p-2">{player.name}</td>
                        <td className="text-center p-2">{player.totalScore}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex flex-col md:flex-row gap-4">
                  <SecondaryButton text="Back" onClick={previousFormStep} />
                  <PrimaryButton
                    text="Reset scores"
                    onClick={resetScores}
                    className="whitespace-nowrap"
                  />
                  <PrimaryButton
                    text="Restart game"
                    onClick={restartGame}
                    className="whitespace-nowrap"
                  />
                </div>
              </div>
            )}
            <RulesAndInfo />
          </form>
        </FormProvider>
      </main>
    </>
  );
}

'use client';

import { PrimaryButton, SecondaryButton } from '@/components/Button';
import { FormProvider, useForm } from 'react-hook-form';
import { PlayerNameInput } from '@/components/game/PlayerNameInput';
import { Scoresheet } from '@/components/game/Scoresheet';
import { useCallback, useState } from 'react';
import classNames from 'classnames';

const defaultValues = {
  player1: {
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
  },
  player2: {
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
  },
  player3: {
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
  },
};

export default function Dashboard() {
  const methods = useForm<any>({
    mode: 'all',
    defaultValues,
  });

  const {
    formState: { isValid },
    handleSubmit,
    reset,
    getValues,
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
  }, [reset, setFormStep]);

  const submitGame = () => {};

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submitGame)}>
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
            <Scoresheet {...{ setInputs }} />
            <div className="flex space-x-4">
              <SecondaryButton text="Back" onClick={previousFormStep} />
              <PrimaryButton text="Finish Game" disabled={!isValid} type="submit" />
            </div>
          </div>
        )}
      </form>
    </FormProvider>
  );
}

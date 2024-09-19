'use client';

import { PrimaryButton, SecondaryButton } from '@/components/Button';
import { FormProvider, useForm } from 'react-hook-form';
import { PlayerNameInput } from '@/components/game/PlayerNameInput';
import { Scoresheet } from '@/components/game/Scoresheet';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import classNames from 'classnames';

export default function Dashboard() {
  const methods = useForm<any>({
    mode: 'all',
    defaultValues: { players: [] },
  });

  const {
    formState: { isValid },
    handleSubmit,
    reset,
    getValues,
  } = methods;

  const router = useRouter();

  const [formStep, setFormStep] = useState(0);
  const formStates = ['start', 'scoresheet', 'end'];
  const currentAndPrevSteps = formStates.slice(0, formStep + 1);

  const completeFormStep = useCallback(() => {
    setFormStep((cur) => cur + 1);
  }, [setFormStep]);
  const previousFormStep = useCallback(() => {
    setFormStep((cur) => cur - 1);
  }, [setFormStep]);

  const initialInputs = ['input1', 'input2', 'input3'];
  const [inputs, setInputs] = useState(initialInputs);

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
            <PlayerNameInput {...{ inputs, setInputs }} />
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
              <PrimaryButton text="Finish Game" disabled={!isValid} type="submit" />
            </div>
          </div>
        )}
      </form>
    </FormProvider>
  );
}

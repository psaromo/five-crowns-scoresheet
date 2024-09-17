'use client';

import { FormProvider, useForm } from 'react-hook-form';
import PrimaryButton from '@/components/Button';
import { useRouter } from 'next/navigation';

interface PlayersField {
  player1: string | '';
  player2: string | '';
  player3: string | '';
  player4?: string | '';
  player5?: string | '';
  player6?: string | '';
  player7?: string | '';
  player8?: string | '';
}

export const Players = () => {
  const methods = useForm<PlayersField>({
    mode: 'all',
    defaultValues: {
      player1: undefined,
      player2: undefined,
      player3: undefined,
      player4: undefined,
      player5: undefined,
      player6: undefined,
      player7: undefined,
      player8: undefined,
    },
  });

  const {
    register,
    formState: { isValid },
    handleSubmit,
  } = methods;

  const router = useRouter();

  const startGameHandler = () => {
    router.push('/scoresheet');
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(startGameHandler)}>
        <div className="flex flex-col justify-center items-center space-y-4">
          <div className="flex flex-col space-y-4">
            <input
              className="text-primary outline-none focus:ring-offset-0 focus:border-secondary focus:ring-0 focus:ring-secondary rounded-md border w-full py-2 px-4"
              type="text"
              placeholder="Player 1 Name"
              {...register('player1', { required: true })}
            />
            <input
              className="text-primary outline-none focus:ring-offset-0 focus:border-secondary focus:ring-0 focus:ring-secondary rounded-md border w-full py-2 px-4"
              type="text"
              placeholder="Player 2 Name"
              {...register('player2', { required: true })}
            />
            <input
              className="text-primary outline-none focus:ring-offset-0 focus:border-secondary focus:ring-0 focus:ring-secondary rounded-md border w-full py-2 px-4"
              type="text"
              placeholder="Player 3 Name"
              {...register('player3', { required: true })}
            />
            <input
              className="text-primary outline-none focus:ring-offset-0 focus:border-secondary focus:ring-0 focus:ring-secondary rounded-md border w-full py-2 px-4"
              type="text"
              placeholder="Player 4 Name"
              {...register('player4', { required: false })}
            />
            <input
              className="text-primary outline-none focus:ring-offset-0 focus:border-secondary focus:ring-0 focus:ring-secondary rounded-md border w-full py-2 px-4"
              type="text"
              placeholder="Player 5 Name"
              {...register('player5', { required: false })}
            />
            <input
              className="text-primary outline-none focus:ring-offset-0 focus:border-secondary focus:ring-0 focus:ring-secondary rounded-md border w-full py-2 px-4"
              type="text"
              placeholder="Player 6 Name"
              {...register('player6', { required: false })}
            />
            <input
              className="text-primary outline-none focus:ring-offset-0 focus:border-secondary focus:ring-0 focus:ring-secondary rounded-md border w-full py-2 px-4"
              type="text"
              placeholder="Player 7 Name"
              {...register('player7', { required: false })}
            />
            <input
              className="text-primary outline-none focus:ring-offset-0 focus:border-secondary focus:ring-0 focus:ring-secondary rounded-md border w-full py-2 px-4"
              type="text"
              placeholder="Player 8 Name"
              {...register('player8', { required: false })}
            />
          </div>
          <PrimaryButton text="Start Game" disabled={!isValid} type="submit" />
        </div>
      </form>
    </FormProvider>
  );
};

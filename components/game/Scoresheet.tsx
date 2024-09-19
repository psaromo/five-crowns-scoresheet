import { useFormContext } from 'react-hook-form';

export const Scoresheet = () => {
  const { register, getValues } = useFormContext();
  console.log(getValues());
  const players = getValues('players');
  return (
    <div className="flex">
      <div className="flex flex-col justify-center items-center w-28 bg-white">
        <div>Wild Card</div>
        <div className="font-semibold text-2xl">3</div>
        <div className="font-semibold text-2xl">4</div>
        <div className="font-semibold text-2xl">5</div>
        <div className="font-semibold text-2xl">6</div>
        <div className="font-semibold text-2xl">7</div>
        <div className="font-semibold text-2xl">8</div>
        <div className="font-semibold text-2xl">9</div>
        <div className="font-semibold text-2xl">10</div>
        <div className="font-semibold text-2xl">11</div>
        <div className="font-semibold text-2xl">12</div>
        <div className="font-semibold text-2xl">13</div>
      </div>
      <div>
        {/* {players.map((player) => {
          return <div>{player}</div>;
        })} */}
      </div>
    </div>
  );
};

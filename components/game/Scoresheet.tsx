import { useFormContext } from 'react-hook-form';
import { FaCrown, FaMagic } from 'react-icons/fa';

export const Scoresheet = ({ setInputs }: any) => {
  const { register, getValues } = useFormContext();
  console.log(getValues());
  const values = getValues();
  const scoreIndices = Object.keys(values.player1.scores);
  return (
    <div className="flex h-full">
      <section className="flex flex-col items-center p-4 border-r">
        <div className="flex flex-col justify-center items-center space-y-1">
          <FaMagic />
          <h2 className="text-lg font-bold">Wild Card</h2>
        </div>
        {scoreIndices.map((level, index) => (
          <div key={index} className="font-bold p-3">
            {index + 3}
          </div>
        ))}
      </section>
      {Object.entries(values).map(([key, player]) => (
        <section className="flex flex-col items-center p-4">
          <div className="flex flex-col justify-center items-center space-y-1">
            <FaCrown />
            <h2 className="text-lg font-bold">{player.name}</h2>
          </div>
          {Object.entries(player.scores).map(([level, score]) => (
            <div className="p-3">
              <input type="number" className="border rounded-md w-24" />
            </div>
          ))}
        </section>
      ))}
    </div>
  );
};

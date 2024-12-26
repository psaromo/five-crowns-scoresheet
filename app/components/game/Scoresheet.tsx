import { FaCrown, FaMagic } from 'react-icons/fa';
import { Player } from 'types/Players';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { wildCards } from 'lib/constants';

export const Scoresheet = () => {
  const { control, register } = useFormContext<{ players: Player[] }>();
  const { fields: playerFields } = useFieldArray<{ players: Player[] }>({
    control,
    name: 'players',
  });

  return (
    <table>
      <thead>
        <tr>
          <th className="sticky left-0 bg-primary whitespace-nowrap z-20">
            <div className="flex flex-col justify-center items-center space-y-1">
              <FaMagic />
              <h2 className="text-lg font-bold">Wild Card</h2>
            </div>
          </th>
          {playerFields.map(({ id, name }) => (
            <th key={id} className="sticky top-0 bg-primary z-10 w-36">
              <div className="flex flex-col justify-center items-center space-y-1">
                <FaCrown />
                <h2 className="text-lg font-bold">{name}</h2>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {wildCards.map(({ id: level, display }) => (
          <tr key={level}>
            <td className="font-bold text-xl text-center p-2 sticky left-0 bg-primary border-b z-20">
              {display}
            </td>
            {playerFields.map(({ id }, index: number) => (
              <td key={id} className="p-2 border-b text-center w-36">
                <input
                  type="number"
                  className="outline-none focus:ring-offset-0 focus:border-secondary focus:ring-0 focus:ring-secondary rounded-md border w-24 text-center font-bold text-primary"
                  {...register(`players[${index}].scores.${level}` as 'players', {
                    required: true,
                    valueAsNumber: true,
                    min: 0,
                    max: 50,
                  })}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

import { useFormContext } from 'react-hook-form';
import { FaCrown, FaMagic } from 'react-icons/fa';

export const Scoresheet = () => {
  const { register, getValues } = useFormContext();
  const values = getValues();
  const scoreIndices = Object.keys(values.player1.scores);

  return (
    <div className="overflow-x-auto w-96 md:w-full max-w-4/5">
      <table>
        <thead>
          <tr>
            <th className="sticky left-0 bg-primary whitespace-nowrap z-20">
              <div className="flex flex-col justify-center items-center space-y-1">
                <FaMagic />
                <h2 className="text-lg font-bold">Wild Card</h2>
              </div>
            </th>
            {Object.entries(values).map(([key, player]) => (
              <th key={key} className="sticky top-0 bg-primary z-10 w-36">
                <div className="flex flex-col justify-center items-center space-y-1">
                  <FaCrown />
                  <h2 className="text-lg font-bold">{player.name}</h2>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scoreIndices.map((level, index) => (
            <tr key={index}>
              <td className="font-bold text-xl text-center p-2 sticky left-0 bg-primary border-b z-20">
                {index + 3}
              </td>
              {Object.entries(values).map(([key, value]) => (
                <td key={key} className="p-2 border-b text-center w-36">
                  <input
                    type="number"
                    className="outline-none focus:ring-offset-0 focus:border-secondary focus:ring-0 focus:ring-secondary rounded-md border w-24 text-center font-bold text-primary"
                    {...register(`${key}.scores.${level}`, { valueAsNumber: true })}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

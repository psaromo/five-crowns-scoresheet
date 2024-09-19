import { useFormContext } from 'react-hook-form';
import { FaCrown, FaMagic } from 'react-icons/fa';

export const Scoresheet = ({ setInputs }: any) => {
  const { register, getValues } = useFormContext();
  const values = getValues();
  const scoreIndices = Object.keys(values.player1.scores);

  return (
    <table>
      <thead>
        <tr>
          <th className="sticky left-0 bg-primary whitespace-nowrap">
            <div className="flex flex-col justify-center items-center space-y-1">
              <FaMagic />
              <h2 className="text-lg font-bold">Wild Card</h2>
            </div>
          </th>
          {Object.entries(values).map(([key, player]) => (
            <th>
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
          <tr key={index} className="overflow-auto">
            <td className="font-bold text-xl text-center p-2 sticky left-0 bg-primary">
              {index + 3}
            </td>
            {Object.entries(values).map(([key, player]) => (
              <td key={key} className="p-2">
                <input
                  type="number"
                  className="outline-none focus:ring-offset-0 focus:border-secondary focus:ring-0 focus:ring-secondary rounded-md border w-24 text-center font-bold text-primary"
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

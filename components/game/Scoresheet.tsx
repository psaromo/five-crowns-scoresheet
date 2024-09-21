import { useFormContext } from 'react-hook-form';
import { FaCrown, FaMagic } from 'react-icons/fa';

const wildCards = [
  { id: 'level3', display: '3' },
  { id: 'level4', display: '4' },
  { id: 'level5', display: '5' },
  { id: 'level6', display: '6' },
  { id: 'level7', display: '7' },
  { id: 'level8', display: '8' },
  { id: 'level9', display: '9' },
  { id: 'level10', display: '10' },
  { id: 'level11', display: 'J' },
  { id: 'level12', display: 'Q' },
  { id: 'level13', display: 'K' },
];

export const Scoresheet = () => {
  const { register, getValues } = useFormContext();
  const values = getValues();

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
          {wildCards.map(({ id: level, display }) => (
            <tr key={level}>
              <td className="font-bold text-xl text-center p-2 sticky left-0 bg-primary border-b z-20">
                {display}
              </td>
              {Object.entries(values).map(([key, value]) => (
                <td key={key} className="p-2 border-b text-center w-36">
                  <input
                    type="number"
                    className="outline-none focus:ring-offset-0 focus:border-secondary focus:ring-0 focus:ring-secondary rounded-md border w-24 text-center font-bold text-primary"
                    {...register(`${key}.scores.${level}`, {
                      min: 0,
                      valueAsNumber: true,
                    })}
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

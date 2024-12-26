import { wildCards } from 'lib/constants';
import { FaCrown, FaMagic } from 'react-icons/fa';
import { GameFormValues } from 'types/Players';
import { useFieldArray, useFormContext } from 'react-hook-form';
import classNames from 'classnames';

export const Scoresheet = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<GameFormValues>();

  const { fields: playersFields } = useFieldArray<GameFormValues>({
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
          {playersFields.map((field, index) => (
            <th key={field.id} className="sticky top-0 bg-primary z-10 w-36">
              <div className="flex flex-col justify-center items-center space-y-1">
                <FaCrown />
                <h2 className="text-lg font-bold">{field.name}</h2>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {wildCards.map(({ level, display }) => (
          <tr key={level}>
            <td className="py-2 font-bold text-xl text-center sticky left-0 bg-primary border-b z-20">
              {display}
            </td>
            {playersFields.map((field, index) => {
              return (
                <td key={field.id} className="p-2 border-b text-center w-36">
                  <input
                    type="number"
                    className={classNames(
                      errors.players?.[index]?.scores?.[level]
                        ? 'border-red-700'
                        : 'border-secondary',
                      'font-bold text-primary outline-none border-2 focus:border-secondary rounded-md w-24 text-center',
                    )}
                    {...register(`players[${index}].scores.${level}` as 'players', {
                      valueAsNumber: true,
                      min: 0,
                      max: 50,
                    })}
                  />
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

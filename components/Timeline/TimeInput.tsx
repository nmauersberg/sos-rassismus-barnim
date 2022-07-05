import { SetStateAction } from 'react';

type TimeInputProps = {
  day?: number;
  month?: number;
  year?: number;
  setDay: React.Dispatch<SetStateAction<number | undefined>>;
  setMonth: React.Dispatch<SetStateAction<number | undefined>>;
  setYear: React.Dispatch<SetStateAction<number | undefined>>;
};

export const TimeInput = ({
  day,
  month,
  year,
  setDay,
  setMonth,
  setYear,
}: TimeInputProps) => {
  const handleCappedInput = (
    val: number,
    max: number,
    set: React.Dispatch<SetStateAction<number | undefined>>
  ) => {
    if (!val) {
      return set(undefined);
    }
    if (val <= max) {
      return set(val);
    }
    return set(max);
  };

  return (
    <div className='w-full flex'>
      <input
        placeholder='TT'
        value={day}
        onChange={(e) =>
          handleCappedInput(parseInt(e.target.value), 31, setDay)
        }
        type='number'
        className='text-lg w-16 mr-2'
      />
      <input
        placeholder='MM'
        value={month}
        onChange={(e) =>
          handleCappedInput(parseInt(e.target.value), 12, setMonth)
        }
        type='number'
        className='text-lg w-16 mr-2'
      />
      <input
        placeholder='JJJJ'
        value={year}
        onChange={(e) =>
          handleCappedInput(parseInt(e.target.value), 2100, setYear)
        }
        type='number'
        className='text-lg w-24'
      />
    </div>
  );
};

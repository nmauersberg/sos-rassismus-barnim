import s from './style.module.scss';

export const tagColors: TagColor[] = [
  '#3A3042',
  '#539987',
  '#0B6E4F',
  '#B22222',
  '#6279B8',
  '#011638',
  '#A188A6',
  '#FF8600',
  '#363537',
  '#071013',
];

export type TagColor =
  | '#3A3042'
  | '#539987'
  | '#B22222'
  | '#0B6E4F'
  | '#6279B8'
  | '#011638'
  | '#A188A6'
  | '#FF8600'
  | '#363537'
  | '#071013';

type TagProps = {
  label: string;
  color?: TagColor;
};

export const Tag = ({ label, color }: TagProps) => {
  const colorScheme = {
    color: color || 'lightblue',
    text: 'white', // color ? mapTextColor(color) : 'black',
  };

  return (
    <span
      style={{ background: colorScheme.color, color: colorScheme.text }}
      className={s.categoryTag}>
      {label}
    </span>
  );
};

// const mapTextColor = (color: TagColor) => {
//   switch (color) {
//     case '#A188A6':
//       return 'black';
//     case '#6279B8':
//     case '#539987':
//     case '#3A3042':
//     case '#B22222':
//       return 'white';
//   }
// };

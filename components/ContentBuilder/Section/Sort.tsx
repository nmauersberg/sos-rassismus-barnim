import React, { FC, ReactElement, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { Section } from '.';

type SortSectionsProps = {
  sections: Section[];
};

export const SortSections = (props: SortSectionsProps): ReactElement => {
  const [state, setState] = useState<Section[]>(props.sections);

  return (
    <ReactSortable list={state} setList={setState}>
      {state.map((section) => (
        <Section key={section.id} section={section} />
      ))}
    </ReactSortable>
  );
};

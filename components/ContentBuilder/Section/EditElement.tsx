import { ReactElement } from 'react';
import { OverrideLayout, Section, SectionElement, SectionsText } from '.';
import { EditIcon } from './EditIcon';
import s from './style.module.scss';

import {
  mdiPageLayoutHeader,
  mdiPageLayoutHeaderFooter,
  mdiDockLeft,
  mdiTablet,
  mdiBackspaceOutline,
  mdiPlaylistEdit,
  mdiEjectOutline,
  mdiViewCompactOutline,
  mdiDrag,
} from '@mdi/js';

import { NoSsr } from '../Util/NoSsr';
import ReactTooltip from 'react-tooltip';
import cN from 'classnames';

type EditElementProps = {
  modifiedSection: Section;
  setModifiedSection: (section: Section) => void;
  element: SectionElement;
};

export const EditElement = ({
  modifiedSection,
  setModifiedSection,
  element,
}: EditElementProps): ReactElement => {
  const updateElementLayout = (
    overrideLayout: OverrideLayout,
    index: number
  ): void => {
    // Get and update the edited element
    const updatedElement: SectionElement = {
      ...modifiedSection.render[index],
      overrideLayout,
    };
    // Update renderlist in section
    const updated = {
      ...modifiedSection,
      render: modifiedSection.render.map((element, elIndex) => {
        if (elIndex === index) {
          return updatedElement;
        }
        return element;
      }),
    };
    setModifiedSection(updated);
  };

  const updateElementGrouping = (
    groupElement: boolean,
    index: number
  ): void => {
    // Get and update the edited element
    const updatedElement: SectionElement = {
      ...modifiedSection.render[index],
      groupElement,
    };
    // Update renderlist in section
    const updated = {
      ...modifiedSection,
      render: modifiedSection.render.map((element, elIndex) => {
        if (elIndex === index) {
          return updatedElement;
        }
        return element;
      }),
    };
    setModifiedSection(updated);
  };

  const editElement = (edit: boolean, index: number): void => {
    const origElement = modifiedSection.render[index] as SectionsText;
    // Get and update the edited element
    const updatedElement: SectionsText = {
      ...origElement,
      edit,
    };
    // Update renderlist in section
    const updated = {
      ...modifiedSection,
      render: modifiedSection.render.map((element, elIndex) => {
        if (elIndex === index) {
          return updatedElement;
        }
        return element;
      }),
    };
    setModifiedSection(updated);
  };

  return (
    <div className={s.editElement}>
      <NoSsr>
        <ReactTooltip backgroundColor={'black'} className='z-500' />
      </NoSsr>

      {/* <EditIcon
        path={mdiDrag}
        action={() => console.log('DRAG!')}
        size={1.25}
        rotate={0}
        tooltip="Sortieren"
      /> */}

      <EditIcon
        path={mdiEjectOutline}
        action={() =>
          updateElementGrouping(!element.groupElement, element.index)
        }
        size={1.25}
        rotate={0}
        tooltip='An letztes Element anheften'
        isActive={element.groupElement}
      />

      <div className={s.dropdownEditRow}>
        <EditIcon
          path={mdiViewCompactOutline}
          action={() => {}}
          size={1.25}
          rotate={0}
          tooltip='Layout überschreiben'
          isActive={!!element.overrideLayout}
        />
        <div className={cN(s.dropdownEditRowContent)}>
          <EditIcon
            path={mdiDockLeft}
            action={() => updateElementLayout('25', element.index)}
            size={1.25}
            tooltip='Layout überschreiben: 25%'
            isActive={element.overrideLayout === '25'}
          />

          <EditIcon
            path={mdiPageLayoutHeaderFooter}
            action={() => updateElementLayout('50', element.index)}
            size={1.25}
            rotate={90}
            tooltip='Layout überschreiben: 50%'
            isActive={element.overrideLayout === '50'}
          />

          <EditIcon
            path={mdiPageLayoutHeader}
            action={() => updateElementLayout('75', element.index)}
            size={1.25}
            rotate={90}
            tooltip='Layout überschreiben: 75%'
            isActive={element.overrideLayout === '75'}
          />

          <EditIcon
            path={mdiTablet}
            action={() => updateElementLayout('100', element.index)}
            size={1.25}
            rotate={0}
            tooltip='Layout überschreiben: 100%'
            isActive={element.overrideLayout === '100'}
          />

          <EditIcon
            path={mdiBackspaceOutline}
            action={() => updateElementLayout(null, element.index)}
            size={1.25}
            rotate={0}
            tooltip='Element Layout entfernen'
          />
        </div>
      </div>

      {element.collection === 'sectionsText' && (
        <EditIcon
          path={mdiPlaylistEdit}
          action={() => editElement(element.edit ? false : true, element.index)}
          size={1.25}
          rotate={0}
          tooltip='Text bearbeiten'
          flipHorizontal
        />
      )}
    </div>
  );
};

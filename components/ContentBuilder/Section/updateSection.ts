import { Section } from '.';
import firebase from '../../../firebase/clientApp';
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from 'firebase/firestore';

const db = getFirestore(firebase);
const addEntry = async (section: Omit<Section, 'id'>) => {
  await addDoc(collection(db, 'sections'), section);
};

const updateEntry = async (section: Section) => {
  section.render = section.render.map((e) => {
    switch (e.collection) {
      case 'sectionsText':
        e.edit = false;
      default:
        console.log(e);
        return e;
    }
  });

  await setDoc(doc(db, 'sections', section.id), section);
};

export const updateSection = async (section: Section) => {
  updateEntry(section);

  // addEntry({
  //   title: section.title,
  //   sort: section.sort,
  //   status: section.status,
  //   layout: section.layout,
  //   colorScheme: section.colorScheme,
  //   render: section.render,
  // });
};

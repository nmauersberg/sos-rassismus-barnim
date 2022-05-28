import type { GetServerSideProps, NextPage } from 'next';
import { FadeIn, getIncrementor } from 'anima-react';
import { Section } from '../components/ContentBuilder/Section';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, getFirestore } from 'firebase/firestore';
import firebase from '../firebase/clientApp';
import { LoadingAnimation } from '../components/LoadingAnimation';

const Home: NextPage = () => {
  const { editPage } = useContext(AuthContext);
  const [documents, loading, error] = useCollection(
    collection(getFirestore(firebase), 'sections'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const getBodyDelay = getIncrementor(0, 0.15);

  const sections = documents
    ? documents.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
        } as Section;
      })
    : null;

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <>
      {!error &&
        !loading &&
        sections &&
        sections.map((section) => {
          return (
            <FadeIn
              key={section.id}
              delay={getBodyDelay()}
              orientation='up'
              duration={0.5}
              distance={100}>
              <Section section={section} editSections={editPage} />
            </FadeIn>
          );
        })}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      test: 'Hello',
    },
  };
};

export default Home;

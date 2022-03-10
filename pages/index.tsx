import type { NextPage } from 'next';
import { Tiptap } from '../components/Editor/Tiptap';
import { FadeIn, getIncrementor } from 'anima-react';

const Home: NextPage = () => {
  const getDelay = getIncrementor(0, 0.15);
  return (
    <>
      <FadeIn delay={getDelay()}>
        <h1>SOS Rassismus Barnim</h1>
      </FadeIn>

      <FadeIn delay={getDelay()}>
        <Tiptap />
      </FadeIn>
    </>
  );
};

export default Home;

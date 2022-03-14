import type { NextPage } from 'next';
import { Tiptap } from '../components/Editor/Tiptap';
import { FadeIn, getIncrementor } from 'anima-react';

const Home: NextPage = () => {
  const getBodyDelay = getIncrementor(0.15, 0.15);
  return (
    <FadeIn delay={getBodyDelay()}>
      <Tiptap />
    </FadeIn>
  );
};

export default Home;

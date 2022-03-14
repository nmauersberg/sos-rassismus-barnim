import type { NextPage } from 'next';
import { Tiptap } from '../components/Editor/Tiptap';
import { FadeIn, getIncrementor } from 'anima-react';
import { Layout } from '../components/Layout';

const Home: NextPage = () => {
  const getBodyDelay = getIncrementor(0.15, 0.15);
  return (
    <Layout>
      <FadeIn delay={getBodyDelay()}>
        <Tiptap />
      </FadeIn>
    </Layout>
  );
};

export default Home;

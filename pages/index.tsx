import type { NextPage } from 'next';
import { Tiptap } from '../components/Editor/Tiptap';

const Home: NextPage = () => {
  return (
    <>
      <h1>SOS Rassismus Barnim</h1>
      <Tiptap />
    </>
  );
};

export default Home;

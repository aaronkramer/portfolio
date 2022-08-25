import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import ResponsiveAppBar from "./components/AppBar";

const admin = [
  'Jira Software',
  'Confluence',
  'Youtrack',
  'Smartsheet',

]

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{
        textAlign: 'center'
      }}>
        <ResponsiveAppBar></ResponsiveAppBar>
        <p>Administration</p>
        <ul style={{textAlign: 'left', marginTop: '2rem'}}>
          {admin.map((item) => <li>{item}</li>)}
        </ul>
      </div>
    </>
  );
};

export default Home;
import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import ResponsiveAppBar from "./components/AppBar";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import parse from 'html-react-parser';
import Article from './components/Article'


const projects = [
  {
    key: 1,
    title: "The Service Request Workflow",
    article: `<p>The Service Request (SR) process had a number of issues. These mainly related to proper handoffs, ownership and defining the boundaries of what is a service request from other organizations. Service requests were often conflated with bug reporting and updates related to Professional Services. To help improve this process we started by sitting down and interviewing all internal stakeholders that were impacted downstream by SRs.</p>
    <img
      style={textAlign: 'center'}
      src="/AllasFonso_project_management_article_image_people_standing_aro_c0b43c36-0103-4c29-8580-15adfcff5b19.png"
      alt="The Service Request Workflow"
      loading="lazy"
      height=450
    />
    <p>We found that these groups fell into four categories and were able to define requests off of those types from there. Using Smartsheet forms, we created a service request intake form with branching logic related to the type of request being performed. Branching logic was very beneficial because it allowed us to gather more information from the client end and drastically reduce the number of back and forth required to close out their request.
    By the end of the project, we were able to reduce the number of average handoffs from 3 / request to less than one. We found that every handoffs would add anywhere between half a day and a few days each request, so this effectively reduced service request turnaround time by about half of a week. Seeing as we receive about 20 to 40 service requests a week, this reduced service request total open time by about a year every month.
    
    We also saw drastic improvements in the quality of service requests. Before, because there was no clear definition of what a service request was, we would often get requests that were really bugs that should have been reported elsewhere. By defining the boundaries of what a service request is, and what it is not, we were able to funnel those requests to the proper channels and increase the overall quality of service requests.
    </p>`,
    image: "/AllasFonso_project_management_article_image_people_standing_aro_c0b43c36-0103-4c29-8580-15adfcff5b19.png",
    shown: true
  },
  {
    key: 2,
    title: "Professional Service Work Package Workflow (v1, v2, v3)",
    article: `The platform we provide is highly configurable and can be customized to meet the specific needs of a client. However, this also means that there is a lot of work that needs to be done in order to set up the platform for a new client, including developing new integrations, setting up infrastructure, and sometimes adding new screens. Because of this, a significant portion of our revenue still comes from professional services and implementations.

    In order to mature the process for creating new pieces of work and implementing things that our customers need, we developed a system of "work packages." This allowed us to better understand the entire workflow and provided clarity across all teams. We started by talking to all stakeholders, including clients, to properly understand the entire workflow. In doing this research, we found that we could describe the entire workflow as a set of phases. These included analysis, in which scoping for the work package was done and workflows were described in the system; design, where the product manager would write the specification so that this new workflow would be in line with the product design philosophy; and development, where the engineer would create the future and collaborate with the product manager whenever unknowns came up.
    
    Once we had a workflow described, we were then able to determine that the best way to describe each piece of work would be for each milestone and phase to be considered a sub step in the overall piece of work. This would allow us to talk about work at several levels very easily. We would be able to describe all work packages and the status of an overall project while also speaking about specific elements within a work package like a phase or a task.
    
    Because there were too many unknowns, we first built this out in Smartsheet, with each row being a work package. But after about a year of use, we found that there were problems with both scale and flexibility/customization. This was due to the fact that phases were columns, which made it difficult to add new phases or make changes to existing phases. As a result, we decided to move to Jira, which is a task management tool that is more flexible and can be easily customized. We also determined that Jira was insufficient for content management, so we opted for Confluence, which is a tool that is highly integrated with Jira and has better content management features.
     
    
    Overall, we were able to greatly improve the Work Package process and ensure that all teams are on the same page. We performed extensive research to define the end-to-end workflow and describe it in a combination of phases and milestones. With these, we were then able to use Smartsheet to manage their work packages. However, after a year, we upgraded the system to Jira and Confluence, which are more flexible and have better content management features.
    `,
    image: "/AllasFonso_None_7d90eaaa-45d1-43f9-bcf4-f3f73e397adf.png",
    shown: true

  },
  {
    key: 3,
    title: "Release Notes Handoffs",
    article: ``,
    image: "",
    shown: true

  },
  {
    key: 4,
    title: "Engineering Jira Design",
    article: ``,
    image: "",
    shown: true

  },
  {
    key: 5,
    title: "FHIR Implementation Design",
    article: ``,
    image: "",
    shown: true

  },
]

const newArt = {
  key: 1,
  title: "The Service Request Workflow",
  article: `<p>The Service Request (SR) process had a number of issues. These mainly related to proper handoffs, ownership and defining the boundaries of what is a service request from other organizations. Service requests were often conflated with bug reporting and updates related to Professional Services. To help improve this process we started by sitting down and interviewing all internal stakeholders that were impacted downstream by SRs.</p>
  <img
    style={textAlign: 'center'}
    src="/AllasFonso_project_management_article_image_people_standing_aro_c0b43c36-0103-4c29-8580-15adfcff5b19.png"
    alt="The Service Request Workflow"
    loading="lazy"
    height=450
  />
  <p>We found that these groups fell into four categories and were able to define requests off of those types from there. Using Smartsheet forms, we created a service request intake form with branching logic related to the type of request being performed. Branching logic was very beneficial because it allowed us to gather more information from the client end and drastically reduce the number of back and forth required to close out their request.
  By the end of the project, we were able to reduce the number of average handoffs from 3 / request to less than one. We found that every handoffs would add anywhere between half a day and a few days each request, so this effectively reduced service request turnaround time by about half of a week. Seeing as we receive about 20 to 40 service requests a week, this reduced service request total open time by about a year every month.
  
  We also saw drastic improvements in the quality of service requests. Before, because there was no clear definition of what a service request was, we would often get requests that were really bugs that should have been reported elsewhere. By defining the boundaries of what a service request is, and what it is not, we were able to funnel those requests to the proper channels and increase the overall quality of service requests.
  </p>`,
  image: "/AllasFonso_project_management_article_image_people_standing_aro_c0b43c36-0103-4c29-8580-15adfcff5b19.png",
  shown: true
},


const exampleDev = ``

const Home: NextPage = () => {

  const validProjects = projects.filter(p => p.shown)
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
        <p>Projects</p>
      <Article id={"12"} title={"A Test"} article={"<p>is this working?</p>"} />
      
      <p>old below</p>
        <div style={{ textAlign: 'center', alignItems: 'center', display: 'inline-block', width: '60%' }}>
          {parse(exampleDev)}
          {projects.map((project) =>
            <Box key={project.key}>
              <Typography variant='h3' style={{ textAlign: 'center' }}>{project.title}</Typography>
              {
                project.image ?
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    height={450}
                  /> : null
              }
              <Typography variant='h6' style={{ textAlign: 'left' }}>{parse(project.article)}</Typography>
            </Box>)}
        </div>
      </div>
    </>
  );
};

export default Home;

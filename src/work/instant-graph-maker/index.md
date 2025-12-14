---
layout: layouts/work.njk
order: 1
featured: true
categories:
  - pet-projects
slug: instant-graph-maker
title: Instant Graph Maker
role: Author
client: Hyper Island
url: https://instant-graph-maker.streamlit.app/
coverImage: cover.jpg
type: Chart creator for Data Analysts
shortDescription: >
  <p>Create charts by simply describing what you want to see. The tool automatically selects the right data and suggests a chart, which you can customize further.</p>
introSection:
  title: What is it?
  text: >
    <ul>
      <li>Lets users explore datasets using natural language.</li>
      <li>Uses an LLM to analyze and interpret data.</li>
      <li>Provides an easy workflow for creating and saving charts.</li>
    </ul>
screensSection:
  - media: cover.jpg
    text: The official site (link above)
  - media: 2.jpg
    text: Scenes of the app in action
  - media: 3.jpg
    text: Scenes of the app in action
  - media: 4.jpg
    text: Scenes of the app in action
  - media: 5.jpg
    text: Scenes of the app in action
  - media: 6.jpg
    text: Scenes of the app in action
backstorySection:
  text: >
    <p>When I started this project, I had three main learning goals: learning to perform data analysis with LLM aid, integrating LLM calls into traditional development workflows, and exploring software architecture within a data engineering pipeline. Beyond these technical goals, I wanted to develop a better understanding of the entire tech stack surrounding LLMs – concepts like RAG, vector databases, embeddings, and the difference between local and cloud deployments.</p>
    <p>The project aimed to solve a real problem: organizations usually rely on static dashboards that require coding teams and data analysis experts to make any changes. I set out to develop a tool that would let users explore datasets using natural language and generate visual charts on demand. The vision was to democratize data access, allowing non-technical users to ask questions about their data and immediately see relevant visualizations without waiting for a developer to write custom code.</p>
    <p>The development process taught me a lot about balancing ambition with reality. My initial research phase led me down a rabbit hole of possibilities, and I quickly noticed my first plan was way too ambitious and completely unrealistic. I had to go through several (frustrating, I must say) rounds of scaling down before arriving at something actually achievable in the timeframe. But this scaling process itself was valuable – sometimes the best ideas come from having limitations.</p>
    <p>I built the tool with Python and Streamlit as the foundation, using Pandas for data manipulation and OpenAI's API for the LLM components. The stack also included ChromaDB for vector storage, various visualization libraries like Matplotlib and Altair, and specialized tools like Prophet for time series analysis. The final product has several differentiators I'm rather proud of: it can process large datasets locally which mitigates common LLM token limit issues, has a streamlined workflow for chart creation, includes history and saving capabilities, and features a nice clean design.</p>
    <p>There are many standing issues, though. LLM calls occasionally fail for no apparent reason. Privacy is a concern – without a local LLM engine, all queries go through external APIs, which doesn't work for sensitive data. I also found that LLM responses weren't always reliable for generating correct code or interpreting queries correctly, and the latency made the tool feel slower than it would have been ideal.</p>
    <p>Throughout development, I made testing and iteration core to my workflow. I tested frequently at every stage, which helped catch issues as early as possible. To this end, getting feedback from multiple peers was really valuable – they pointed out usability issues and suggested features I hadn't considered.</p>
    <p>Looking back, there are a few things I'd do differently. I'd spend a bit more time on software architecture before diving into coding. I'd also start user testing earlier rather than waiting for a "complete" version, since earlier input would have saved me from building features that didn't matter. I'd also explore local LLM options - it was maybe too easy to switch to a cloud model since it was so much faster.</p>
    <p>I think this project has prepared me for the workplace in several concrete ways. I've learned how to work with technologies while they're still evolving – the AI/AI tooling landscape offers many options and changes really fast, and one needs to adapt quickly. I've gotten comfortable with agile methodology, which is used in most tech companies, and made me feel more prepared to participate in sprints and take in account stakeholder feedback. The experience of scaling down an ambitious idea into something deliverable is also applicable to professional environments where you're always balancing ideal solutions against time and financial constraints. </p>
    <p>Maybe most valuable is that I now understand both the potential and limitations of LLM-powered applications. I can see where they add genuine value and where they're still unreliable. This realistic perspective will help me make better decisions and set better expectations about what AI tools can and cannot do at the moment. This project pushed me out of my comfort zone and gave me both technical skills and practical wisdom I'll carry into my career.</p>
---

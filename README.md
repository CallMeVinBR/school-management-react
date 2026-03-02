# school-management-react
React project I developed in 7 days to take on a technical test for an Internship opportunity, at Evolucional.

> [!TIP]
> The file `autoStart.bat` has the script needed to start the project properly, in case you're in need of orientation!

# What is this project about?
This project takes on a JSON database, located in the directory `src/data`, and manages data using `localStorage` and states in React.
<p>I had 7 days to build such system, with a language I'm not that experienced, but even so I managed to learn a lot by doing my best.</p>

<p>My objective was to make a system where the user could:</p>
<ol>
    <li><b>Manage, filter and view</b> students & teachers;</li>
    <li><b>Edit or delete</b> students;</li>
    <li><b>View</b> all students related to a teacher's degree;</li>
    <li>Randomly <b>generate 300 entities, either students or teachers</b>;</li>
    <li>Have a dashboard separated by entities' types (<code>students/teachers</code>), considering post-change data.</li>
</ol>

### What was used in this project?
- React - `useMemo, useState, useEffect`
- Javascript - `data retrieval, data interpretation, localStorage`
- Tailwind - styling in general, simple styling made for Desktop
- Chart.js (`react-chartjs-2`) - live dashboard generation

# What did I learn working on this project?
Previously, I had never used React that much, being a beginner at it. With this test, I was able to learn how to optimize data queries with `useMemo()`, which only re-renders when an observed parameter has changed.
<p>It's undoubtfully a very handy method to optimize database rendering.</p>

> [!NOTE]
> I wish I could also make a responsive design, but due to the lack of time remaining, I couldn't work on it properly.
> I chose to make all data management in `localStorage` because I sought knowledge regarding React. It'd be a proper approach to use an API to handle data directly from the files.

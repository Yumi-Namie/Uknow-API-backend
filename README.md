<p align="center"><img src="assets/uknow.png" align="center"></p>

<h2>Table of Contents</h2>

* [Project Description](#descripcion-del-proyecto)
* [Key Features](#key-features)
* [Swagger](#swagger)
* [Logical Data Model](#ddbb-model)
* [Unit Test](#test)
* [Technologies](#tecnologias)
* [Project Developers](#autores)
* [Links to Resources](#links)
---

<h2 align="center" class="descripcion-del-proyecto">Project Description</h2>

U-Know is the new collaborative learning platform. Our goal is to create a community for learning and sharing knowledge. To access our community, you will need to register with your name, email, password, and create a unique username. Upon accessing your new account, you will receive 1000 knowlitos, which are the coins you can use to acquire the published courses. You can also publish your own modules on our platform and earn knowlitos, allowing you to continue learning.<br></br>

<h2 align="center" class="key-features">Key Features</h2>

### <b>User Registration:</b>
* Can view the list of contents sorted by rating.
* Can search for contents by keywords in the description.
* Can register for an account.

### <b>Registered User:</b>
* Can log in to their account.
* Can view the list of contents sorted by rating.
* Can search for contents by keywords.
* Can update their profile (except for name, email, and wallet).
* Can create content.
* Can edit their own content.
* Can delete their own content if it has not been purchased.
* Can view the list of their created content.
* Can purchase content.
* Can view the list of purchased content.
* Can view a purchased content.
* Can rate a purchased content (only once).
* Can comment on a purchased content (only once).

### <b>Administrator:</b>
* Can view the list of contents.
* Can search for contents by keywords.
* Can delete content.
* Can view the list of users.
* Can delete a user.
* Can update a user's information.

### <b>System:</b>
* Updates the user's wallet upon registration.
* Updates the user's wallet upon purchasing content.
* Updates the price of content upon publishing.
* Notifies the user if their wallet balance is insufficient to purchase content.
* Adjusts the course rating with each user rating.
* The first four ratings will only count if they are >= 4.8.
* From the 5th rating onwards, the average rating is calculated.
* Communicates the course rating in real-time.
* Updates the price of content when the average rating falls below or equal to 3.
* Can update a user's information.

<h2 align="center" class="swagger">Swagger</h2>
<p align="center">
<img src="assets/swagger1.JPG">
<img src="assets/swagger-course.JPG">
<img src="assets/swagger-purchase.JPG">
</p>

<h2 align="center" class="ddbb-model">Logical Data Model</h2>
<p align="center">
<img src="assets/logical%20data%20model.png" align="center">
</p>

<h2 align="center" class="test">Unit Testing</h2>
<p align="center">
<img src="assets/testing.jpg">
</p>

<h2 align="center" class="tecnologias">Tools and Technologies</h2>

* <b>NestJS:</b> A framework for building efficient and scalable server-side applications with Node.js.
* <b>Node.js:</b> A JavaScript runtime environment used for server-side development.
* <b>MySQL:</b> Relational database management system used for storing and managing data.
* <b>Visual Studio Code:</b> Integrated development environment (IDE) used for coding.
* <b>GitHub:</b> Version control system for managing and sharing code repositories.
* <b>Trello:</b> Project management tool for organizing tasks and workflows.
* <b>Discord:</b> Communication platform for team collaboration and discussions.
* <b>WhatsApp:</b> Instant messaging application for team communication and coordination.
* <b>Slack:</b> Team communication and collaboration platform.




<h2 align="center" class="autores">Project Developers</h2>

* Ana Pozo
* Deniz Ozedorgan
* Diego Cruz
* Roxana Raduta
* Renata Yumi

<h2 align="center" class="links">Links to Resources</h2>

* Presentation: https://www.canva.com/design/DAFmL8jctnE/FUvgYciYGCayfKbFkqPuVQ/edit
* Trello: https://trello.com/invite/b/1ayGpBfw/ATTIe5b8416899e11aff79a3daf3e129aa3d258160DD/u-know-api
* Swagger: http://localhost:3000/docs


---

<br></br>
[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/J7rdw0MP)<br></br>
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11333344&assignment_repo_type=AssignmentRepo)


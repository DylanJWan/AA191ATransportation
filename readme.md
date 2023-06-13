# Westwood Reimagined
### by Sage Luong and Dylan Wan
The live demo can be found [here](https://dylanjwan.github.io/AA191ATransportation/index.html).

## Table of Contents ##
* [Background](#-background-)
* [Objectives](#-objectives-)
* [Empowered Community](#-empowered-community-)
* [Technology Used](#-technology-used-)
* [Future Repurposing](#-future-repurposing-)
* [Web Features and Screenshots](#-web-features-and-screenshots-)

## 🌐 Background <a name="background"></a> ##
Westwood is a critical neighborhood in Los Angeles for UCLA students, business owners, and commuters. However, transportation organizations such as Streets for All have highlighted how the current infrastructure neglects the safety of those who do not own cars and offers them few comfortable alternatives. Even the supposedly walkable, student-friendly Westwood Village is suffering from the current car-optimized setup with a 32% business vacancy rate. Even worse, 4 of its main streets are all on the City of LA’s High Injury Network. To help shift the weight off of car dependency, UCLA Transportation has offered subsidized public transit passes for services such as Metro and the Big Blue Bus in the Westwood area. However, there has not been a substantial increase in students and employees using public transit in 2021. It is evident that car-alternative incentives do not change the core issue - the current infrastructure has made any other form of transportation besides driving inconvenient, uncomfortable, and dangerous.

## 📌 Objectives <a name="objectives"></a> ##
The objective project is to advocate for non-motorized transportation by partnering with the Westwood Connected initiative to provide insight into travel experiences into Westwood Village. This includes information such as departure locations and thoughts about not driving into Westwood. We also seek to empower the Westwood community by offering a platform to talk about their transportation concerns with the current infrastructure in a way that humanizes and highlights their unique perspectives and desires. We plan to achieve this goal by conducting a community outreach survey with Westwood community members and integrating their stories in an interactive map showcasing their geographic diversity and interconnectedness.

## 🙌 Empowered Community <a name="community"></a> ##
The communities we hope to empower through our project include those who live in Westwood, those who work in Westwood, and those who drive into Westwood. These consist of UCLA students, business owners, business employees, business patrons, and campus visitors to name a few. We also hope to empower the often-overlooked voices in the car-dependent infrastructure discussion, specifically students and those who take alternative forms of transportation. This is especially important since most of these groups don’t own a car, which increases their risk of being victims of car-related accidents and discomfort. To reach out to UCLA students and frequent visitors, we will be distributing our online survey through popular messaging platforms such as GroupMe and Discord. For business owners and employees, we will visit the businesses in-person to distribute after receiving their contact information.

## 💻 Technology Used <a name="technology"></a> ##
Westwood Reimagined was created using HTML as the base for the website, Javascript for interactivity and data integration, as well as CSS for styling. Leaflet, a Javascript library, was used to create the interactive map. Google Forms was used to create our survey, while Google Sheets was used to collect and organize the survey data. Custom geocode was then added to Google Sheets App Script to populate location data. Papa Parse, a CSV Parser for Javascript was used to fetch our Google Sheets data and integrate it into our site. Finally, we used the [v2-sidebar](https://github.com/Turbo87/sidebar-v2/tree/master) plugin to display Westwood community members' transportation stories.

## ❓ Future Repurposing <a name="future"></a> ##

The impact of our project aims to provide future transportation advocates such as Westwood Connected with the personal experiences of various groups in the Westwood community. As a result, these organizations can better understand the unique perspectives and stories of students, business owners, and visitors as they begin to identify and address transportation issues. Since our final deliverables will include a map of businesses and community members supporting our initiative along with discussions and anecdotes, transportation organizations can access more publicly available information regarding the real needs of Westwood enthusiasts. By mapping the diverse geographic locations of residencies and businesses, advocates can better showcase how any improvements to Westwood’s transportation architecture would result in far-reaching benefits for those who live both near and far the Westwood area.

We hope that our website can continue to empower Westwood community members for years to come by continuing to collect stories as the transportation environment in Westwood Village as it grows and develops. We would love for community members to continue visiting our website as it updates with stories from new members, which will provide a communal history of how people view the traffic infrastructure in the area. We also hope to iterate over our website in the future by adding better functionality to better showcase the stories of community members as well as to improve our website in order to increase user satisfaction.

Our project was built with the intention of distributing our knowledge and data freely, so our survey and survey data is made publicly available to anyone with a Google account. Creators can use any and all snippets of code for their own purposes will incur no financial cost. This way, innovators who want to make a project similar or different than ours can have a basis to aid in their developmental process. Organizations, such as Westwood Connected, that are interested in repurposing our project to fit their needs will also incur no financial cost. We hope that any projects that are derived from this one remain open source and visible to the public to continue the free distribution of knowledge.

## 🗺️ Web Features and Screenshots <a name="screenshots"></a> ##
### An overview of our website ###
When a user first visits our website, there is a popup message with a brief description of our overall project and its objectives, who we want to empower, how to use the website, and where to find the survey.
![image](https://github.com/DylanJWan/AA191ATransportation/assets/83676556/21a60f52-d7cf-44a8-900e-2a35e68de150)

### An overview of our homepage ###
On the top left of our website, we have the name of our project, Westwood Connected. On the top right, we have a navigation menu that takes the user to 1.) the homepage (Home) which contains the map, community stories, and survey button, 2.) the about page (About) which explains the background info, objectives, empowered community, and long-term impacts of our project, 3.) the team page (Our Team) which explains more about us as the creators of the project, and 4.) a contact button (Contact Us) which redirects the user to their default email application to send us an email. A collapsible sidebar contains an initial overview of the 5 zipcodes which have the highest percent of support for sustainable transportation initiatives. Upon clicking on a zipcode, the sidebar will populate with community stories from that zipcode. Near the bottom of the page is a survey button which will allow Westwood community members to add their experiences to the website by taking our survey.
![image](https://github.com/DylanJWan/AA191ATransportation/assets/83676556/bb766bed-3598-4bd2-a154-f2622d70e083)

### An overview of hovering over a zipcode ###
Hovering over a zipcode displays what zipcode a user is hovering over.
![image](https://github.com/DylanJWan/AA191ATransportation/assets/83676556/82902f7b-58b8-498b-8ca8-57f66261d1ba)
Clicking on a zipcode displays the community's transportation stories associated with that zipcode in the sidebar. This is an example of a story that shows when clicking on the zipcode 90024. We can see their main connection to Westwood, whether they have experienced any transportation-related issues in Westwood Village, whether they support sustainable transportation installments and their reasoning, and if they have any other thoughts about sustainable transportation.
![image](https://github.com/DylanJWan/AA191ATransportation/assets/83676556/f5988e4d-a7bc-4bfb-898c-1ae88f0c0506)

## 👥 Acknowledgements ##
This project was created for ASIA AM 191A: Web Development and GIS for Social Change: Critical Data for Transforming Civil Society with the guidance and support of Albert Kochaphum. We thank you for helping us make this website a reality!

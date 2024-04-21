# Conducting Load Testing on AI Code Translator Application: A Step-by-Step Guide

## Introduction
Load testing is a crucial aspect of software development and deployment, aimed at evaluating how a system performs under normal and peak usage conditions. It involves simulating real-world user activity to assess an application's ability to handle concurrent user interactions, data processing, transaction volumes, and response times.

## Tools and Software
  - Thread Group
  - HTTP Request Sampler
  - Listeners (e.g., View Results Tree, Summary Report, Aggregate Report)

## Setting Up Apache JMeter Guide
  - Provide instructions on downloading and installing Apache JMeter.
  - Download Apache JMeter from the official website
  - https://jmeter.apache.org/download_jmeter.cgi
  - Extract the file using Linux Terminal below:
  ```bash
    wget https://dlcdn.apache.org//jmeter/binaries/apache-jmeter-5.6.3.tgz

    tar -xvf apache-jmeter-5.6.3.tgz
  ```
## Creating a Test:
  1) In this test plan, we will create a Thread Group. In the Thread Group, we will create a HTTP Request for each page we want to test. We will also create a Listener to get the results
  - Here is format below:
    - Test
      - Thread Group
        - Home page
        - Translate page
        - FAQ page
        - Resources page
        - Realease Notes page
        - Homepage
        - Listener
  2) Configuring Load Test:
     - Default test plan in created. Rename it to "LoadTesting"
     - Right Click on it. Select -> Add -> Threads(User) -> Thread Groups  (We create a Thread Group)
       - Edit the Thread Properties Sections:
       - Set the number of users (Most likely you'll increase this)
       - Set the number of ramp up periods
       - Set the number of loops (how many times to run the test)
       - Check -> Same user on each iteration
        
  3) Right Click on Thread Group to make one or multiple HTTP request (each http request tests one page), Select -> Add -> Sampler -> HTTP Request
     - Edit the HTTP Request Sections
       - Name the HTTP request something similiar to the page its testing 
       - Set Server Name or IP =  "www.example.com" (the site url without the http)
       - Set HTTP Request = GET
       - Set Path = "/" (landing-page) or "/profile/" (if ur testing another page thats not the landing page)
  4) Create a Listener under the Thread Group  
   - Right Click on the Thread Group, Select -> Add, Listner -> View Results Tree
   - Rename the View Results Tree to "Listener". Makes it easier for you

## Running the Load Test:
  - To run the test, Click the Green arrow 
  - Check results in Listener

## Unit Tests Integration:
  Explain the process of analyzing load testing results and identifying bottlenecks.
  Describe how to optimize the application based on identified issues.
  Provide guidance on verifying optimizations through subsequent load tests.
## Conclusion:
  Summarize the importance of load testing and the benefits of following the steps outlined in the guide.

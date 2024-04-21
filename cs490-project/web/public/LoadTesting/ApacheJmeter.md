Title: Conducting Load Testing on AI Code Translator Application: A Step-by-Step Guide

Introduction:
  Briefly introduce the purpose of load testing and its importance for assessing application performance.
Tools and Software:
  Mention the tools and software required for load testing (e.g., Apache JMeter).
Step-by-Step Installation Guide:
  Provide instructions on downloading and installing Apache JMeter.
Creating a Test:
  1) In this test plan, we will create a Thread Group. In the Thread Group, we will create a HTTP Request for each page we want to test. We will also create a Listener to get the results
    - LoadTesting
      - Thread Group
        - Home page
        - Translate page
        - FAQ page
        - Resources page
        - Realease Notes page
        - Homepage
        - Listener
  2 )Configuring Load Test Parameters Tutorial:
      1) Default test plan in created. Rename it to "LoadTesting"
      2) Right Click on it, Select -> Add -> Threads(User) -> Thread Groups
      - We create a Thread Group
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
        - Rename the View Results Tree to "Listner". Make it easier for you

Running the Load Test:
  - To run the test, Click the Green arrow 
  - Check results in Listener

Unit Tests Integration:
  Explain the process of analyzing load testing results and identifying bottlenecks.
  Describe how to optimize the application based on identified issues.
  Provide guidance on verifying optimizations through subsequent load tests.
Conclusion:
  Summarize the importance of load testing and the benefits of following the steps outlined in the guide.

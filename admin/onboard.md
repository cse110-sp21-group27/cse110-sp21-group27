Our [CI / CD pipeline](cipipeline/phase1.drawio.png) is set up with GitHub Actions. One may find a document generator, linting, and Jest testing within the workflows directory. 
Each workflow is designated to the [./source](../source) directory. First, our document generator (via JSDocs) will work for our script.js file 
and store the documentation in [./docs](../docs). Second, linting (via EsLint) is set up for any javascript file to cover code quality and styling issues.
Third, testing (via Jest) is utilized for our testing of code. 

The next steps will include cloning the repo, building and deploying the app, running our unit tests, and accessing the code and internal documentation.


## Getting Started . . . 

Before getting started, make sure to have been assigned a [GitHub issue](https://github.com/cse110-sp21-group27/cse110-sp21-group27/issues).
In your Visual Studio code, clone the GitHub repository. For any changes / additions to code, make a new branch with a proper name relevant to the GitHub issue.
The next step is to start building your code.

You can use `npm -v` to check if you have npm installed. Otherwise you need to download the Node Package Manager in order to utilize test cases. 


## Pushing to GitHub . . . 

Once you have completed the GitHub issue, add and commit with a proper message. Push the branch to the repo. The three workflows will appear
and should take a bit to complete their checks. Once all three have passed, link your GitHub issue to your branch and finally merge your branch to the main for deployment. 
Otherwise, close the pull request and make the necessary changes to get passing marks. 




## Testing Code . . . 

To test the BUJO implementation with unit and end-to-end testing, you can use the command `npm test` while in the [./source](../source) directory after adding in relevant tests to your issue. 
This will run the *test.js files and generate code coverage using our Jest and Puppeteer scripts. 



## Accessing Documentation . . .

You can find the code documentation in the [./docs](../docs) directory. Our JSDocs uses this as the working directory. In addition, any html, css, and javascript files will 
contain documentation that describes the reason for its existence.

Our internal team docs resides in the [./admin](../admin) directory. There you will find:

- [Daily Stand Ups](../specs/adrs)

- [Meeting Minutes](meetings)

- [Individual Member Responsibilies](misc/rules.md)

- [Team Background](team.md)




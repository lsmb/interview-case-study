# Case study for interview

## Usage:
You can either run the npm commands locally, i.e. in the ./app folder by running:


```npm install```

and then

```npm start```

```npm run test```

```npm run testAndRun```

Or you can build and start the docker container.
The best method of doing so would be

```docker-compose build```

followed by

```docker-compose up```


## Issues not addressed
#### Authorization / User account
This implementation is intentionally naive, and therefore lacks any authorization. There is also no user account schemas or functionality.

#### Multiple companies under one account?
In the mobile view given, there is a dropdown which has 'Company AB' selected. If the use-case is such that a single user account can have multiple companies, then this implementation does not account for this.

#### Resource creation and modification
There are no resource creation or modification endpoints, as it would technically be out-of-scope. Also time constraints.

#### Testing
I developed this API in a semi-TDD fashion; however the test cases are very minimal. They were largely used to streamline ensuring the API endpoints function as expected, and to provide a quick way to have test-data at hand.

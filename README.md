# Code challenge

## Assignment 1

baupal is using sophisticated forms to collect user information to calculate energy consumption. Build an API that our frontend app would implement to retrieve and submit forms. Submitted data should be stored in a database. Authentication is not required and the raw form structure can be hardcoded.

### Requirements

- set up a Node Express.js repository in TypeScript
- set up a PostgreSQL database on your local machine
- set up endpoints to get a form’s structure, submit data and validate it
    
    → keep in mind that this system needs to be built for scale
    
- use TypeORM as ORM (optional)


### The trip of the form service idea

The first problem I found is that my installed postrgresql was not working and I had to deal to find why and at the end the upgrade solved it. (this was a personal issue, not with the challenge itself)

I wrote a kind of basic concept of a possible solution to the problem of serving complex and multiple type of forms.

#### Disclaimer:

Is my second time I use TypeORM after some years.

Any CSFR or security checks are ignored here.

I tried to avoid extra dependencies, only TypeORM that is great (much better now)

No DB optimization or table constraints. Generic SQL except for json type pgsql specific.

Error handling is not final.

### Idea (sorry for the long text)

The main idea is to have versioned forms and provide some flexibility with serialization, and have a kind of chain of validators for the forms. Keep the UI design decoupled providing data structure but not style. 

Maybe building a form designer UI or using Contentful or other already made tool as a tool to create forms. It depends on how many times we have to add/modify forms and how many forms do we have to handle for different houses or solutions.

For the conversation we had I can guess that providing a form builder for the operations team could be an good improvement, maybe this exists already.

There's a lot of challenges here but it depends on the requirements and the way of how the forms are being presented to the user. Typoform style (nice one), OnePage (nice for the lazy developer), MultiStep Form, could lead to a more complex solution.

The validations in the form is a interesting part, considering async backend validations, and group of fields validations.

Resuming the form completion is another nice challenge.

Important: I just started back with ORM now after some years working with NOSQL so maybe I missed some hacks or tricks.


```
POST http://localhost:3000/forms/smart/1.0/

body: {
  sourceId: string
}
```

Will return the data to render the form and the URL to submit it.
On the backend it will create a new FormEntry with status 'created' considering that we won't create a new entry for every page reload, but per user session or similar and have the user intent to complete the form.
The form in general is a part of a funnel process or a bigger process in general, sourceId provides a placeholder for an external reference.

```
POST http://localhost:3000/persist/smart/1.0/
```

Will receive the submitted data. Parse the serialized fields, apply the validation chain and return the results and change the FormEntry state accordingly.

So, we will have a table with all form entries with the state of created, valid, invalid.
Another service can subscribe to valid formEntries and extract required data for other processes.

Form table/model contains the design of a form, fields and validations, this has to be defined based on the scope.

Versioning could be important for long running processes, because it can be that we have 100 users with form version 1.0 that some steps are not completed and we have some new changes to the 1.1 form that new
users can apply to.

A lot of guessing here 🤔

### Setting up the environment

```
cp .local.env .env.development
```

This will copy the sample env file to your environment, edit the file with the matching parameters for your pgsql db.

### Seed the db with the first form

To seed the db with the first form:

```
npm run seed
```

note: please run once npm run dev to have the db and the tables created first.

## Assignment 2

1. When thinking about what makes an **excellent software engineer**, what comes to mind for you?

Who is able to identify well all the parts of a complex problem to solve.

2. How do you decide the trade off between **development speed** and **code quality**? Please elaborate how this applies to **early stage startups**.

Code quality sometimes can be oppinionated, I think code readability (naming things) is the most important thing to have, even if the quality is not optimal you can navigate through the code when you have to solve a problem. I don't have any problem with differnt code styles I support diversity on code style, but readability has to be there, not matter how is your code style.

3. Please describe in the shortest way possible what (team) **culture means to you**.
Culture is environment, values, and how people identifies themselves with being a part group of people, culture is something shared.

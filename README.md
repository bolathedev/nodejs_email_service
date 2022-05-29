# NODEJS EMAIL SERVICE

Hey there, here are the steps required to use this package.

## Getting Started

First off, let's start by installing the npm package by running

```
npm i nodejs-email-service
```
After installing the package, let's move on to initializing the package in our server root directory or desired file of your choice.

To initialize it, we write the following;

```javascript
const nodejs_email_service = require('nodejs-email-service');

const email_service = new nodejs_email_service(config, properties)
```

### Arguments Explained

CONFIG: The config object consists the parameters required to setup your mailing service. These parameters include;

`service`: This is the service you want to use. This could be gmail, mailgun e.t.c.

`host`: The host required by your mail service provider. Should be in your service provider instructions. E.g smtp.mailgun.org for mailgun e.t.c

`user <required>`: The user provided by your mail service provider.

`pass <required>`: The password provided by your mail service provider.

`port`: The host required by your mail service provider. Should be in your service provider instructions. E.g 587 for mailgun e.t.c

Note: Your user and pass should be private and therefore be set as an environment variable

#

PROPERTIES: The properties object consisits the parameters required to configure your custom templating system for the package to use. These parameters include;

`extensionName`: This is the extension name of your template file. E.g .handlebars or .hbs

`partialsDir`: This is the relative path to your partials directory.

`layoutsDir`: This is the relative path to your layouts directory.

`viewPath`: This is the relative path to your templates directory.

When used with the parameters, we have something like this:

```javascript
const nodejs_email_service = require('nodejs-email-service');

const email_service = new nodejs_email_service(
    {
        host: 'smtp.mailgun.org',
        service: 'Mailgun',
        user: process.env.MAILGUN_USERNAME,
        pass: process.env.MAILGUN_PASSWORD
    },
    {
        partialsDir: './mock-templates-1/partials',
        layoutsDir: './mock-templates-1/layouts',
        viewPath: './mock-templates-1/templates',
        extensionName: '.handlebars'
    }
)
```

Note: To use the default template to check if it works, do not pass in the properties argument as it is optional.


# SENDING EMAILS

To start sending emails, all you have to do is call our `sendEmail` function with the necessary parameters.

```javascript
 email_service.sendEmail(parameters)
```

These parameters include;

`to <required>` :  This is the recipient of the email. Pass in an array for multiple recipients.

`sender`: This is the sender of the email. This is a string and can be written how ever you want.

`subject`: This is the subject of the email.

`template`: This is the template to use and is only required if you passed in `layoutsDir` and `viewPath` during initialization.

When use with it's parameters, we have;

```javascript
email_service.sendMail({
        to: "example@gmail.com",
        sender: 'hello@businessfirm.co',
        subject: 'First Time User',
        template:  'dummy-2'
     })
```

And that's it, that's all you need to start sending emails from your server. Thanks for using our package.

Notice something wrong? Reach out via [email](mailto:godswillchibuzororie@gmail.com), [twitter](https://twitter.com/bolathedev), [medium](https://bolathedev.medium.com)


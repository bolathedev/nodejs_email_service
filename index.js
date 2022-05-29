const nodemailer = require('nodemailer');
const hbs = require("nodemailer-express-handlebars");
const path = require('path');

class NODEJS_EMAIL_SERVICE {
    constructor({ host, user, pass, service, port }, properties) {
        if (!user) throw new Error('service username is required');
        if (!pass) throw new Error('service password is required');
        this.options = properties ? properties : {};

        this.transporter = nodemailer.createTransport({
            service: service ? service : 'Mailgun',
            host: host ? host : 'smtp.mailgun.org',
            port: port ? port : 587,
            auth: {
                user: user,
                pass: pass
            }
        });

        // CHECK FOR NULL OPTIONS
        if (!this.options?.extensionName) this.options.extensionName = '.handlebars';
        if (!this.options?.partialsDir) this.options.partialsDir = './';
        if (!this.options?.layoutsDir) this.options.layoutsDir = './mock-templates/layouts';
        if (!this.options?.viewPath) this.options.viewPath = './mock-templates/templates';
        // CHECK FOR NULL OPTIONS

        const handlebarOptions = {
            viewEngine: {
                extName: this.options.extensionName,
                partialsDir: this.options.partialsDir,
                layoutsDir: this.options.layoutsDir,
                defaultLayout: '',
            },
            viewPath: this.options.viewPath,
            extName: this.options.extensionName,
        };
        this.transporter.use('compile', hbs(handlebarOptions));
    }
    async sendEmail({ to, subject, template, sender }) {
        if (!to) throw new Error('Recipient is required');
        if (this.options.layoutsDir !== './mock-templates/layouts' || this.options.viewPath !== './mock-templates/templates' && !template) {
            throw new Error('When setting custom layouts and viewpath, Template is required');
        }
        if (template && this.options.layoutsDir === './mock-templates/layouts' || this.options.viewPath === './mock-templates/templates') {
            throw new Error('To use a custom template, pass in layoutsDir and viewPath as properties in the constructor');
        }
        const response = await this.transporter.sendMail({
            from: sender ? sender : '"Nodejs Email Service" <nodejsemailservice@gmail.com>',
            to: to,
            subject: subject ? subject : 'Thank you for using us',
            template: template ? template : 'dummy',
        });
        return response;
    }
};

module.exports = NODEJS_EMAIL_SERVICE;
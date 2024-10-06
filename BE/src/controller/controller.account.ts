import { NextFunction, Request, Response } from 'express';
import AccountService from '../service/service.account';
import { CREATED, OK } from '../utils/response.success';
import { Conflict, INTERNAL_SERVER_ERROR, UnAuthorized } from '../utils/response.error';
import { Timestamp, db, messaging } from '../db/firebase';
class AccountController {
    async login(req: Request, res: Response): Promise<any> {
        const data = await AccountService.login(req, res);
        if (data) {
            return new OK(data).send(res);
        } else {
            return new UnAuthorized('Incorrect username or password').send(res);
        }
    }
    async handleLoginWithGoogle(req: Request, res: Response): Promise<any> {
        const data = await AccountService.handleLoginWithGoogle(req, res);
        return new OK(data).send(res);
    }

    async handleLoginWithGithub(req: Request, res: Response): Promise<any> {
        const data = await AccountService.handleLoginWithGithub(req, res);
        return new OK(data).send(res);
    }

    async getAllAccount(req: Request, res: Response): Promise<void | Response> {
        const data = await AccountService.getAllAccount(req, res);
        if (data) {
            return new OK(data).send(res);
        }
        return;
    }

    async create(req: Request, res: Response): Promise<void | Response> {
        const data = await AccountService.create(req, res);
        if (data.Id) {
            return new CREATED(data).send(res);
        }
        return;
    }

    async changePassword(req: Request, res: Response): Promise<any> {
        const data = await AccountService.changePassword(req, res);
        if (data) {
            return new OK(data, 'change password success').send(res);
        } else {
            return new Conflict('Incorrect password').send(res);
        }
    }
    async update(req: Request, res: Response): Promise<any> {
        const data = await AccountService.update(req, res);

        return new OK(data, 'update success').send(res);
    }
    async confirmCode(req: Request, res: Response): Promise<any> {
        const data = await AccountService.confirmCode(req, res);

        if (data) {
            return new OK(data, 'get code success, pleas check you email').send(res);
        } else {
            return new Conflict('Email does not exist').send(res);
        }
    }

    async forgetPassword(req: Request, res: Response): Promise<any> {
        const data = await AccountService.forgetPassword(req, res);
        if (data) {
            return new OK().send(res);
        } else {
            return new Conflict('Incorrect code').send(res);
        }
    }

    async registerNotify(req: Request, res: Response) {
        const newToken: string = req.body.token;
        await messaging
            .subscribeToTopic(newToken, process.env.TOPIC)
            .then(() => {
                console.log('Successfully subscribed to topic:', process.env.TOPIC);
            })
            .catch((e: Error) => {
                console.log('Error subscribing to topic:', e);
            });

        return new OK().send(res);
    }
    async unsubscribeFromTopic(req: Request, res: Response) {
        const listTopic: string[] = [];
        await messaging
            .unsubscribeFromTopic(
                [
                    'dzs_-q9xvavV3ZvPwD6ZWe:APA91bELGR7DKUK-xUYK1fSF3Adzbpe5s4joDC9nI7GCIRljYqrSZPfqpj8cqrAYhmxk8g1Ckk8gltEcviSGjitIOrHFK-O1cg1UG7hiwEkqnSH2UFylRN_Hf32AXV-UeyHMCKA6KnNv',
                ],
                process.env.TOPIC,
            )
            .then(() => {
                console.log('Successfully subscribed to topi:', process.env.TOPIC);
            })
            .catch((e: Error) => {
                console.log('Error subscribing to topic:', e);
            });

        return new OK().send(res);
    }
    async notifyAll(req: Request, res: Response): Promise<any> {
        const { title, body } = req.body;
        const message = {
            data: {
                title: title,
                body: body,
            },
            topic: process.env.TOPIC,
        };
        const messageSend = await messaging.send(message);
        const notifyQuery = db.collection('notify');
        const querySnapshot = await notifyQuery.add({
            deleted: false,
            description: body,
            icon: 'www',
            isAll: true,
            isRead: false,
            link: 'string',
            time: Timestamp.fromDate(new Date()),
            title: title,
            user_id: [],
        });
        await Promise.all([messageSend, querySnapshot])
            .then(() => {
                return new OK([], 'send notify success').send(res);
            })
            .catch(() => {
                return false;
            });
    }
}

export default AccountController;

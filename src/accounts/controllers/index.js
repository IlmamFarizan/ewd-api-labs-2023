import Account from "../entities/Account";
import accountService from "../services";

export default (dependencies) => {

    const createAccount = async (request, response, next) => {
        // Input
        const { firstName, lastName, email, password } = request.body;
        // Treatment
        const account = await accountService.registerAccount(firstName, lastName, email, password, dependencies);
        //output
        response.status(201).json(account)
    };

    const getAccount = async (request, response, next) => {
        //input
        const accountId = request.params.id;
        // Treatment
        const account = await accountService.getAccount(accountId, dependencies);
        //output
        response.status(200).json(account);
    };

    const listAccounts = async (request, response, next) => {
        // Treatment
        const accounts = await accountService.find(dependencies);
        //output
        response.status(200).json(accounts);
    };

    const updateAccount = async (request, response, next) => {
        // Input
        const id = request.params.id;
        const firstName = request.body.firstName;
        const lastName = request.body.lastName;
        const email = request.body.email;
        const password = request.body.password;
        // Treatment
        const account = new Account(id, firstName, lastName, email, password);
        const updatedAccount = await accountService.updateAccount(account, dependencies);
        // Output
        response.status(200).json(updatedAccount);
    };


    return {
        createAccount,
        getAccount,
        listAccounts,
        updateAccount,
    };
};

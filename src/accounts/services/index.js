import Account from '../entities/Account';

export default {
  registerAccount: async  (firstName, lastName, email, password, {accountsRepository}) => {
    const account = new Account(undefined, firstName, lastName, email, password);
    return accountsRepository.persist(account);
  },
  
  getAccount: (accountId, {accountsRepository}) => {
    return accountsRepository.get(accountId);
  },

  find: ({accountsRepository})=>{
    return accountsRepository.find();
  },

  findByEmail: (email, {accountsRepository})=>{
    return accountsRepository.getByEmail(email);
  },

  updateAccount: (account, {accountsRepository}) => {
    return accountsRepository.merge(account);
  },

  authenticate: async (email, password, {accountsRepository, authenticator}) => {
    const account = await accountsRepository.getByEmail(email);
    const result = await authenticator.compare(password, account.password);
    if (!result) {
        throw new Error('Bad credentials');
    }
    const token = JSON.stringify({ email: account.email });//JUST Temporary!!! TODO: make it better
    return token;
  },

  getFavourites: async (accountId, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    return account.favourites;
  },

  addFavourite: async (accountId, movieId, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
  
    if (account.favourites.includes(movieId)) {
      throw new Error('Movie already exists in favourites');
    }
  
    account.favourites.push(movieId);
    return await accountsRepository.merge(account);
  }
  
};

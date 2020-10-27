import User from "../entity/User";

export default {
  getUserByLogin: async (login: String): Promise<User> => {
    const user = await User.findOneOrFail({ where: { login } });
    return user;
  },
};

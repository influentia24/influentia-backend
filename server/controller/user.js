const UserDao = require('../dao/user_dao.js');
const PortfolioDao = require('../dao/portfolio_dao.js');

const getUsers = async (req, res) => {
    const { currentPage, perPage, role, isAll,sort } = req.query;
    try {
        const users = await UserDao.getUsers(currentPage, perPage, role, isAll,sort);
        const usersCount = await UserDao.getUsersCount(role, isAll);
        res.status(200).json({ users, usersCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createUser = async (req, res) => {
    const userData = req.body;
    try {
        const user = await UserDao.createUser(userData);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUser = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await UserDao.findByUserName(username);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const updateUser = async (req, res) => {
    const { userId } = req.params.userId;
    const userData = req.body;
    try {
        const user = await UserDao.updateUser(userId, userData);
        res.status(200).json({message:'User updated successfully',username:user.username});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const deleteUser = async (req, res) => {
    const { userId } = req.query;
    try {
        const user = await UserDao.deleteUser(userId);
        res.status(200).json({message:'User updated successfully',username:user.username});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const addPortFolioForUser = async (req, res) => {
    const { userId, portfolioId } = req.body;
    try {
        const user = await UserDao.addPortFolioForUser(userId, portfolioId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const createPortfolio = async (req, res) => {
    const portfolioData = req.body;
    try {
        const portfolio = await PortfolioDao.createPortfolio(portfolioData);
        const connected = await UserDao.addPortFolioForUser(portfolioData.userId, portfolio._id);
        console.log(portfolio,connected);
        res.status(201).json(portfolio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getAllPortfolios = async (req, res) => {
    try {
        const portfolios = await PortfolioDao.getAllPortfolios();
        res.status(200).json(portfolios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getPortfolios = async (req, res) => {
    try {
        const portfolios = await PortfolioDao.getPortfolios(req.body.currentPage, req.body.perPage, req.body.niche);
        const portfoliosCount = await PortfolioDao.getPortfoliosCount(req.body.niche);
        res.status(200).json({ portfolios, portfoliosCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getPortfolioById = async (req, res) => {
    const { id } = req.params;
    try {
        const portfolio = await PortfolioDao.getPortfolioById(id);
        res.status(200).json(portfolio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const updatePortfolio = async (req, res) => {
    const { id } = req.params;
    const portfolioData = req.body;
    try {
        const portfolio = await PortfolioDao.updatePortfolio(id, portfolioData);
        res.status(200).json(portfolio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const deletePortfolio = async (req, res) => {
    const { id } = req.params;
    try {
        const portfolio = await PortfolioDao.deletePortfolio(id);
        res.status(200).json(portfolio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getPortfolioByUserName = async (req, res) => {
    const { username } = req.params;
    try {
        const portfolio = await PortfolioDao.getPortfolioByUserName(username);
        res.status(200).json(portfolio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getPortfoliosWithUserRole = async (req, res) => {
    console.log(req.params);
    try {
        const role = req.params.role;
        const currentPage = req.query.currentPage || 1;
        const perPage = req.query.perPage || 10;
        const sortBy = req.query.sortBy || 'recent'
        const portfolio = await UserDao.getPortfoliosWithUserRole(currentPage, perPage, role,sortBy);
        res.status(200).json({ portfolio });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const searchUsers = async (req, res) => {
    console.log(req.query,req.params);

    try {
        const role = req.params.role;
        const search  = req.query.search || '';
        const currentPage = req.query.currentPage || 1;
        const perPage = req.query.perPage || 10;
        const categories = req.query.categories || null
        const minFollowers = req.query.minFollowers || 0;
        const maxFollowers = req.query.maxFollowers
        const avgMinPostLikes = req.query.avgMinPostLikes
        const avgMaxPostLikes = req.query.avgMaxPostLikes
        console.log(req.query);
        const users = await UserDao.searchUsers(currentPage, perPage,search, role,categories,minFollowers,maxFollowers,avgMinPostLikes,avgMaxPostLikes);
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { searchUsers, getUsers, createUser, getUser, updateUser, deleteUser, addPortFolioForUser ,createPortfolio, getPortfolios, getPortfolioById, updatePortfolio, deletePortfolio, getPortfolioByUserName, getAllPortfolios,getPortfoliosWithUserRole};

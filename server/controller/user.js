const UserDao = require('../dao/user_dao.js');
const PortfolioDao = require('../dao/portfolio_dao.js');

const getUsers = async (req, res) => {
    const { currentPage, perPage, role, isAll } = req.query;
    try {
        const users = await UserDao.getUsers(currentPage, perPage, role, isAll);
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
    const { userId } = req.query;
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
        await UserDao.addPortFolioForUser(portfolioData.userId, portfolio._id);
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



module.exports = { getUsers, createUser, getUser, updateUser, deleteUser, addPortFolioForUser ,createPortfolio, getPortfolios, getPortfolioById, updatePortfolio, deletePortfolio, getPortfolioByUserName, getAllPortfolios};

const PortfolioModel = require('../models/portfolio_model');

module.exports.createPortfolio = async (portfolioData) => {
    return await PortfolioModel.create(portfolioData);
}
module.exports.getAllPortfolios = async () => {
    return await PortfolioModel.find();
}
module.exports.getPortfolios = async (currentPage, perPage,niche) => {
    let query = {};
    if(niche){
        query.niche = niche;
    }
    return await PortfolioModel.find(query).skip((currentPage - 1) * perPage).limit(perPage).sort({ createdAt: -1 });
}
module.exports.getPortfoliosCount = async (niche) => {
    let query = {};
    if(niche){
        query.niche = niche;
    }
    return await PortfolioModel.countDocuments(query);
}
module.exports.getPortfolioById = async (id) => {
    return await PortfolioModel.findById(id);
}
module.exports.updatePortfolio = async (id, portfolioData) => {
    return await PortfolioModel.findByIdAndUpdate
        (id, portfolioData, { new: true });
}
module.exports.deletePortfolio = async (id) => {
    return await PortfolioModel.findByIdAndDelete(id);
}
module.exports.getPortfolioByUserName = async (username) => {
    return await PortfolioModel.find({ username });
}
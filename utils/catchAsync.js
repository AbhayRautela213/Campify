module.exports = func => { //func pass in
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}
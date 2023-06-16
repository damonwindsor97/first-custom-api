function log(req, res, next){
    console.log('Middleware is being ran')
    next()
    
}

module.exports = log;
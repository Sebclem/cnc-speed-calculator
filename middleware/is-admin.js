
module.exports = function (req, res, next){
    if(req.user !== null && req.user.is_admin){
        next()
    }
    else{
        res.redirect('/')
    }

}
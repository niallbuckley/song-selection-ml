const loginView = (req, res) => {
    // This is looking at views diretory and looking for login name
    res.render("login.ejs", {
    });
}

module.exports = loginView;

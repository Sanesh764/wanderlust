const User = require("../models/user");

// Render Signup Page
module.exports.renderSignUpForm = (req, res) => {
    res.render("users/signup.ejs");
};

// Handle User Registration
module.exports.signUp = async (req, res, next) => {
    try {
        // Get user data from form
        let { username, email, password } = req.body;

        // Create new user object
        const newUser = new User({
            email,
            username,
        });

        // Register user and hash password using passport-local-mongoose
        const registeredUser = await User.register(newUser, password);

        console.log(registeredUser);

        // Automatically log in user after successful signup
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }

            // Success message
            req.flash("success", "Welcome to Wanderlust!");

            // Redirect to listings page
            return res.redirect("/listings");
        });
    } catch (err) {
        // Show error message if registration fails
        req.flash("error", err.message);
        return res.redirect("/signup");
    }
};

// Render Login Page
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

// Handle Login Success
module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");

    // Redirect user to requested page or listings page
    let redirectUrl = res.locals.redirectUrl || "/listings";

    res.redirect(redirectUrl);
};

// Handle Logout
module.exports.logOut = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        // Logout success message
        req.flash("success", "You are successfully logged out!");

        // Redirect to listings page
        res.redirect("/listings");
    });
};
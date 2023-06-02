app.post('/login', (req,res) => {
    const [email, password] = req.body;
})
const user = authenticateUser(email, password);

if(user) {
    const token = generateAccessToken(user);
    res.json({token});
} else {
    res.status(401).json({message: 'invalid email or password'})
}
const app = require('./src');

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

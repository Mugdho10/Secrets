import express from 'express';
import axios from 'axios';
import { render } from 'ejs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get("/", async (req, res) => {
    try {
        const result = await axios.get("https://secrets-api.appbrewery.com/random");
        res.render('index.ejs', {
            secret: result.data.secret,
            user: result.data.username
        });
    } catch (error) {
        console.error(error.response.data);
        res.status(500).send("Internal Server Error");
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
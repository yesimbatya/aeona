const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(cors());


const uri = 'ВАША_СТРОКА_ПОДКЛЮЧЕНИЯ';


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));


const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    registrationDate: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);


app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

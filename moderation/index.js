const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/posts', async (req, res) => {
    
})
app.post('/events', async (req, res) => {
    const {type, data} = req.body;

    if (type === 'CommentCreated') {
        const status = data.content.includes('rudeness') ? 'rejected' : 'approved';

        await axios.post('http://localhost:5005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        });
    };
    res.send({});
})

app.listen(5003, () => {
    console.log('listening on port 5003');
})
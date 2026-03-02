const express = require('express');
const app = express();
const path= require('path');
const {v4: uuid } = require('uuid');

const comments = [
  { id: uuid(),
    username: "CodeMaster21", 
    comment: "Just finished my first JavaScript project!"
    },
  { id: uuid(),
    username: "PixelNinja",
     comment: "CSS is finally starting to make sense."
    },
  { id: uuid(),
    username: "BugHunter",
     comment: "Why does my loop keep running forever?"
    },
  { id: uuid(),
    username: "DevDreamer", 
    comment: "Learning arrays today — pretty cool stuff!"
    },
  { id: uuid(),
    username: "StackBuilder", 
    comment: "Anyone else love solving coding challenges?"
    },
  { id: uuid(),
    username: "SyntaxSam",
    comment: "Semicolons always trip me up."
    },
  { id: uuid(),
    username: "BinaryBecca",
    comment: "Debugging feels like detective work."
    },
  { id: uuid(),
    username: "LogicLion", 
    comment: "Functions make everything so much cleaner."
    },
  { id: uuid(),
    username: "FrontendFred", 
    comment: "Finally centered a div without help!"
    },
  { id: uuid(),
    username: "BackendBella",
    comment: "APIs are confusing but exciting."}
];

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/tacos', (req,res) => {
    res.send('GET /tacos response')
})

app.post('/tacos', (req,res) => {
    const { meat, qty } = req.body;
    res.send(`Ok, here are your ${qty} ${meat} tacos`);
})




app.get('/comments', (req,res) => {
    res.render('comments/index.ejs', {comments})
})
app.get('/comments/new', (req,res) => {
    res.render('comments/new')
})
app.post('/comments', (req,res) => {
    const {username, comment} = req.body;
    comments.push({username, comment, id: uuid()})
    res.redirect('/comments');
})
app.get('/comments/:id', (req,res) => {
  const { id } = req.params;
  const comment = comments.find(c => c.id === id);
  res.render('comments/show', {comment})
})
app.patch('/comments/:id', (req,res) => {
  const { id } = req.params;
  const newCommentText=req.body.comment;
  const foundComment = comments.find(c => c.id === id);
  foundComment.comment= newCommentText;
  res.redirect('/comments');
})



app.listen(3000, () => {
    console.log('On port 3000');
})


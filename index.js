let express = require('express')
let app = express()
let posts = require('./posts.json')
let fs = require('fs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req,res) {
    res.send('hello world')
})

app.post('/', function (req, res) {
    res.send("this is a post a request")
})

app.get('/posts', (req, res) => {
    return res.json({posts})
})

app.post('/posts', (req, res) => {
       
    posts.push(req.body.newPost);
    console.log({posts})

    let stringedData = JSON.stringify(posts, null, 2);
    fs.writeFile('posts.json', stringedData, (err) => {
        if(err) {
            return res.status(500).json({message: err})
        }
    })
    return res.status(200).json({message: "new post created" })
})
// fetch single post
app.get('/posts/:id', (req, res) => {
    console.log(req.params.id);

    let id = req.params.id;

    let foundPost = posts.find(post => {
        return String(post.id) === id
    })


    if(foundPost){
        return res.status(200).json({posts: foundPost})
    } else {
        return res.status(404).json({message: "not identified"})
    }
    })
    
  

  
  app.put('/posts/:id', (req, res) => {
      //fetch req.params.id
      console.log(req.params.id)

       let id = req.params.id;
       let updatedPost = req.body.updatedPost;

       let updatePost = posts.find(post => String(post.id) === id)
       if(updatePost) {
        updatePost.title = updatedPost.title;
        updatePost.body = updatedPost.body;  

       let indexId = posts.indexOf(updatePost);
       posts[indexId] = updatePost;
       
       let stringedData = JSON.stringify(posts, null, 2)
       fs.writeFile('posts.json', stringedData, (err)=> {
           if(err) {
               return res.status(500).json({message:err});
           } 
        })
       return res.status(200).json({post:updatePost})
    }else {
        return res.status(404).json({message: " non updated files"})
    }
    
  })


let port = 3002;


app.listen(port, function() {
    console.log("server is running on port:", port)
})
let posts = [];  // In-memory storage for posts

// Create a new post
exports.createPost = (req, res) => {
  const { title, content } = req.body;

  const post = {
    id: posts.length + 1,
    title,
    content,
    author: req.user.id,  // The author is the logged-in user
  };

  posts.push(post);
  res.status(201).json(post);
};

// Get all posts
exports.getPosts = (req, res) => {
  res.json(posts);
};

// Get a single post by ID
exports.getPostById = (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
};

// Update a post
exports.updatePost = (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (post && post.author === req.user.id) {
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    res.json(post);
  } else {
    res.status(401).json({ message: "Not authorized to update this post" });
  }
};

// Delete a post
exports.deletePost = (req, res) => {
  const postIndex = posts.findIndex((p) => p.id === parseInt(req.params.id));
  const post = posts[postIndex];

  if (post && post.author === req.user.id) {
    posts.splice(postIndex, 1);
    res.json({ message: "Post deleted" });
  } else {
    res.status(401).json({ message: "Not authorized to delete this post" });
  }
};

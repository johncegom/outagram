const posts = [
  {
    name: "Vincent van Gogh",
    username: "vincey1853",
    location: "Zundert, Netherlands",
    avatar: "images/avatar-vangogh.webp",
    post: "images/post-vangogh.webp",
    comment: "just took a few mushrooms lol",
    likes: 21,
    isLiked: false,
  },
  {
    name: "Gustave Courbet",
    username: "gus1819",
    location: "Ornans, France",
    avatar: "images/avatar-courbet.webp",
    post: "images/post-courbet.webp",
    comment: "i'm feelin a bit stressed tbh",
    likes: 4,
    isLiked: false,
  },
  {
    name: "Joseph Ducreux",
    username: "jd1735",
    location: "Paris, France",
    avatar: "images/avatar-ducreux.webp",
    post: "images/post-ducreux.webp",
    comment:
      "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
    likes: 152,
    isLiked: false,
  },
  {
    name: "Leonardo Da Vinci",
    username: "ldv1452",
    location: "Amboise, France",
    avatar: "images/avatar-vinci.webp",
    post: "images/post-vinci.webp",
    comment: "Just want to draw a new pppppppppicture!",
    likes: 523,
    isLiked: false,
  },
];

const articlesEl = document.getElementById("articles");

let postsFromLocalStorage = JSON.parse(localStorage.getItem("posts"));

if (!postsFromLocalStorage) {
  localStorage.setItem("posts", JSON.stringify(posts));
  let articles = makeArticleElements(posts);
  renderArticle(articles);
  addClickEvent(posts);
} else {
  let articles = makeArticleElements(postsFromLocalStorage);
  renderArticle(articles);
  addClickEvent(postsFromLocalStorage);
}

function makeArticleElements(posts) {
  let Elements = [];
  for (let i = 0; i < posts.length; i++) {
    let element = `
    <article>
      <div class="container">
        <div class="article__user">
          <img
            class="user__avatar"
            src=${posts[i].avatar}
            alt="Portrait of Van Gogh"
          />
          <div class="user__information">
            <h3 class="user__name">${posts[i].name}</h3>
            <p class="user__location">${posts[i].location}</p>
          </div>
        </div>
      </div>
      <img class="article__image" src=${posts[i].post} alt="" />
      <div class="container">
        <div class="article__icon">
          <img class="icon--heart ${
            posts[i].isLiked ? "d-none" : "d-inline"
          }" id=${
      posts[i].username + "like"
    } src="images/icon-heart-empty.webp" alt="" />
          <img class="icon--heart ${
            posts[i].isLiked ? "d-inline" : "d-none"
          }" id=${
      posts[i].username + "unlike"
    } src="images/icon-heart-full.webp" alt="" />
          <img
            class="icon--comment"
            src="images/icon-comment.webp"
            alt=""
          />
          <img class="icon--dm" src="images/icon-dm.webp" alt="" />
        </div>
        <p class="article__like" id="${posts[i].username}-liked">${
      posts[i].likes
    } likes</p>
        <div class="article__comment">
          <p class="comment__user">${posts[i].username}</p>
          <p class="comment__content">${posts[i].comment}</p>
        </div>
      </div>
    </article>
  `;

    Elements += element;
  }
  return Elements;
}

function renderArticle(articles) {
  articlesEl.innerHTML = articles;
}

function addClickEvent(posts) {
  for (let i = 0; i < posts.length; i++) {
    let likeEl = document.getElementById(`${posts[i].username + "like"}`);
    let unlikeEl = document.getElementById(`${posts[i].username + "unlike"}`);
    likeEl.addEventListener("click", function () {
      let newInfo = increaseLike(posts[i]);
      posts[i] = newInfo;
      localStorage.setItem("posts", JSON.stringify(posts));
      likeEl.style.display = "none";
      unlikeEl.style.display = "inline";
    });
    unlikeEl.addEventListener("click", function () {
      let newInfo = decreaseLike(posts[i]);
      posts[i] = newInfo;
      localStorage.setItem("posts", JSON.stringify(posts));
      likeEl.style.display = "inline";
      unlikeEl.style.display = "none";
    });
  }
}

function increaseLike(postInfo) {
  let likeDisplayEl = document.getElementById(postInfo.username + "-liked");
  postInfo.likes += 1;
  postInfo.isLiked = true;
  likeDisplayEl.innerText = `${postInfo.likes} likes`;
  return postInfo;
}

function decreaseLike(postInfo) {
  let likeDisplayEl = document.getElementById(postInfo.username + "-liked");
  postInfo.likes -= 1;
  postInfo.isLiked = false;
  likeDisplayEl.innerText = `${postInfo.likes} likes`;
  return postInfo;
}

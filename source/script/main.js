function AJAX(url) {
    if(!(this instanceof AJAX)) {
        return new AJAX(url);
    }

    this._xhr = new XMLHttpRequest();
    this._xhr.open("GET", url, true);
    this._assignEvents();
    this._xhr.send()

}

AJAX.prototype._assignEvents = function() {

    this._xhr.addEventListener('readystatechange', this._handleResponse.bind(this), false);

};

AJAX.prototype._handleResponse = function() {

    if(this._xhr.readyState === 4 && this._xhr.status === 200) {

        var data = JSON.parse(this._xhr.responseText);
        console.log(data);

        for(var key in data) {
            var articles = data['articles'];

            if(key === 'articles') {

            for(var prop in articles) {
                    console.log(prop)
                    var articlesProp = articles[prop];
                    this._createHTML(articlesProp.title, articlesProp.urlToImage, articlesProp.description )
                }
            }
        }
    }
};

AJAX.prototype._createHTML = function (text,imgUrl,content) {
    var posts = document.getElementsByClassName('posts');

    var postBlock = document.createElement('div')
    , postSingle = document.createElement('div')
    , postIMG = document.createElement('img')
    , postText = document.createElement('div')
    , postTextTitle = document.createElement('h1')
    , postTextBlock = document.createElement('div')
    , postTextBlockText = document.createElement('p');

    postTextBlockText.classList = 'post-text-block__content post-text-block__content--data';
    postTextBlock.classList = 'post-text-block post-text-block--data';
    postTextTitle.classList ='post-text__title';
    postText.classList = 'caption post-text';
    postBlock.classList = 'post-block';
    postIMG.classList = 'post__img';
    postSingle.classList = 'thumbnail post-single';


    postTextTitle.innerText = text;
    postIMG.setAttribute('src', imgUrl);

    postTextBlock.appendChild(postTextBlockText);
    postText.appendChild(postTextTitle);
    postText.appendChild(postTextBlock);
    postText.appendChild(this._createPostContent(content));
    postSingle.appendChild(postIMG);
    postSingle.appendChild(postText);
    postBlock.appendChild(postSingle);
    posts[0].appendChild(postBlock)
};

AJAX.prototype._createPostContent = function (content) {
    var postTextBlock = document.createElement('div')
    , postTextBlockText = document.createElement('p');

    postTextBlockText.classList = 'post-text-block__content';
    postTextBlock.classList = 'post-text-block';

    postTextBlockText.innerText = content;

    postTextBlock.appendChild(postTextBlockText);

    return postTextBlock;
};


var urlCategory = function () {
  var category
    ,url
    ,form = document.getElementById('form')
    ,select = document.getElementsByTagName('select')
    ,posts = document.getElementsByClassName('posts');

  select[0].addEventListener('change', function (e) {
  category = form.value;
  url = 'https://newsapi.org/v2/top-headlines?category='+ category + '&language=en&apiKey=3b5251a70f204fee93d94419f0b1626f';
console.log(url)

    posts[0].innerHTML = '';
    while (posts[0].firstChild) {
      posts[0].removeChild(posts.firstChild);
    }

    var selectedCategory = AJAX(url);
  });
};


var firstView = AJAX("https://newsapi.org/v2/top-headlines?sources=cnn&apiKey=3b5251a70f204fee93d94419f0b1626f");
urlCategory();



















// function AJAX2(url) {
//   if(!(this instanceof AJAX2)) {
//     return new AJAX2(url);
//   }
//
//   this._xhr = new XMLHttpRequest();
//   this._xhr.open("GET", url, true);
//   this._assignEvents();
//   this._xhr.send();
//
//   console.log('gggg')
// }
//
// AJAX2.prototype = Object.create(AJAX.prototype);
// AJAX2.prototype.constructor = AJAX2;
//
// AJAX2.prototype._handleResponse = function() {
//
//   if(this._xhr.readyState === 4 && this._xhr.status === 200) {
//
//     var data = JSON.parse(this._xhr.responseText);
//     console.log(data);
//
//     for(var key in data) {
//       var articles = data['articles'];
//
//       if(key === 'articles') {
//
//         for(var prop in articles) {
//           var articlesProp = articles[prop];
//           this._createHTML(articlesProp.title, articlesProp.urlToImage, articlesProp.description )
//         }
//       }
//     }
//   }
// };

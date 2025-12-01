const posts = [];

const postTitleInputNode = document.querySelector('.js-post-title-input');
const postTextInputNode = document.querySelector('.js-post-text-input');
const newPostBtnNode = document.querySelector('.js-new-post-btn');
const postNode = document.querySelector('.js-posts')
const errorNode = document.querySelector('.js-error')

newPostBtnNode.addEventListener('click', function() {
    const postFromUser = getPostFromUser ();
    const dateString = getCurrentDate ();

    const title = postFromUser.title;
    const text  = postFromUser.text;

    errorNode.innerText = ''

     if (title === ''){
        errorNode.innerText = 'Напишите заголовок';

        return;
     }

      if (text === '') {
        errorNode.innerText = 'Напишите текст поста' 
        
        return
     }

     if (title.length > 100) {
        errorNode.innerText = 'Заголовок больше 100 символов'

        return;       
     }

     if (text.length > 200) {
        errorNode.innerText = 'Пост больше 200 символов' 
        
        return
     }



    addPost({
        title: postFromUser.title,
        text: postFromUser.text,
        date: dateString
    });

    renderPosts();
});

function getPostFromUser() {
    const title = postTitleInputNode.value
    const text = postTextInputNode.value 

    return {
        title: title ,
        text: text ,          
    };

    
    
}


function getCurrentDate() {
    const now = new Date ();

    let day = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    let hours = now.getHours();
    let minutes = now.getMinutes()

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    if (minutes < 10) minutes = '0' + minutes;

    return `${day}.${month}.${year} ${hours}:${minutes}`;

}




function addPost({title, text, date}) {
    posts.push({
        title,
        text,
        date
    }) ; 
}

function getPosts() {
    return posts;
}

function renderPosts() {
    const posts = getPosts();


    if (posts.length === 0) {
        postNode.innerText = 'Тут пока что пусто...';
        postNode.classList.add('posts--empty'); 
        return;
    }


    postNode.classList.remove('posts--empty');

    let postsHTML = '';

    posts.forEach(post => {
        postsHTML += `
        <div class="post">
            <p class="post__date">${post.date}</p>
            <p class="post__title">${post.title}</p>
            <p class="post__text">${post.text}</p>          
        </div>
        `;
    });

    postNode.innerHTML = postsHTML;
}



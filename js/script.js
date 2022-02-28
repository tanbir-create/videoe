///currently not required as page is static



let testComments =  [


    {
        image: 'images/comment1.jpg',
        name: 'Leo Mango',
        time: '2days ago',
        comment: 'Whle it’s always amusing to talk about this topic the     reality is that they do no such thing.',
        comment_likes: '221', 
    },

    {
        image: 'images/comment1.jpg',
        name: 'John Doe',
        time: '1 week ago',
        comment: 'Whle it’s always amusing to talk about this topic the     reality is that they do no such thing.',
        comment_likes: '221', 
    },

    {
        image: 'images/comment1.jpg',
        name: 'New Name',
        time: '2 weeks ago',
        comment: 'Whle it’s always amusing to talk about this topic the     reality is that they do no such thing.',
        comment_likes: '221', 
    }


]

let comments_container = $('#comments');

testComments.map( comment => {
    let comment_element = `
                <div class="comment">
                <div class="comment-img">
                    <div class="comment-like-btn">
                        <img src="${comment.image}" alt="${comment.name}">
                    </div>
                </div>

                <div class="comment-texts">
                    <p>${comment.name}</p>
                    <p class="color-light">${comment.time}</p>

                    <p class="the-comment">
                        ${comment.comment}
                    </p>

                    <div class="article-like">
                        <img src="images/comment-like-button.svg" alt=""> 
                        <p>${comment.comment_likes}</p>
                    </div>
                </div>
            </div>
    `
//todo import jquery
    //comments_container.append(comment_element);
} )





let video = document.querySelector('.video')


if(video) {
    let btn =  $('.play-pause')
    let t;
    let openFirst = true;
    $('.play-pause').click(function() {

        if(openFirst) {
            $('#controls').removeClass('hide');
            openFirst = false;
            $('.button button').fadeOut();

        }

        if(video.paused) {
            $('.button button').fadeOut();

            btn.removeClass('play')

            btn.addClass('pause')
            $('.button button').removeClass('pause')
            video.play();
            if(t){
                clearTimeout(t)
            }
            $('.controls').fadeIn();

            //$('.button button').fadeIn();
        }
        else {
            btn.removeClass('pause')
            btn.addClass('play')
            video.pause();
        }
    })

    $('#video-container').click(function() {

    
    
        
            
            $('.controls').fadeIn();
            //$('.button button').fadeIn();

            if(t){
                clearTimeout(t)
            }
            if(video.paused) {
                return;
            }

            t = setTimeout(() => {
                $('.controls').fadeOut();
                $('.button button').fadeOut();
            }, 3000);


    
    })


    video.addEventListener('timeupdate', function() {
        let progress = video.currentTime / video.duration;
        $('.progress').css('width', `${progress * 100 + '%'}`)
        let distance = video.duration - video.currentTime;
        
        let {mins, sec} = getTimeLeft(distance);


        $('#time-remaining').text(mins + ':' + sec)
    
    
    
        if(video.ended){

            if(t){
                clearInterval(t)
            }

            $('.controls').fadeIn();
            $('.button button').fadeIn();   
            btn.removeClass('pause')
            btn.addClass('play')      
            let {mins, sec} = getTimeLeft(video.duration);
            $('#time-remaining').text(mins + ':' + sec)
        }

    })

    $('.progress-bar').click(function(e) {
        var rt =  $('.progress-bar').outerWidth();
    
        var xPos = e.pageX - $(this).offset().left;
        $('.progress').css('width', xPos)
    


        video.currentTime = xPos *  (video.duration/rt)
    
    })

    video.addEventListener('loadedmetadata', function() {
        
        let {mins, sec} = getTimeLeft(video.duration);
        $('#time-remaining').text(mins + ':' + sec)

    });


    function getTimeLeft(distance) {
        let mins = Math.floor((distance % ( 60 * 60)) / ( 60));
        let seconds = Math.floor((distance % ( 60)));
        let sec = seconds < 10 ? '0' + seconds : seconds

        const obj = {
            mins,
            sec
        }
        return obj;
    }
}
    
    /*---------NEW JAVASCRIPT HERE---------------------------- */


let el  = document.getElementById('comments-container')

if(isScrolledIntoView(el)){
        
    $('#post-comment').addClass('post-comment-show')
    
}




$(window).scroll(function() {

    let el  = document.getElementById('comments-container')

    if(isScrolledIntoView(el)){
        
        $('#post-comment').addClass('post-comment-show')
        return;
        
    }
 
    else if($("#post-comment").hasClass('post-comment-show')) {
        $('#post-comment').removeClass('post-comment-show')
        
    }

    

  
})


function isScrolledIntoView(el) {
    let rect = el.getBoundingClientRect();
    let elemTop = rect.top;
    let elemBottom = rect.bottom;
    
  
    let isVisible = elemTop <= window.innerHeight - 40
    
    
    return isVisible;
}

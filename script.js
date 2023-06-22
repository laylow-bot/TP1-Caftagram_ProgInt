  document.getElementById("closePopup").addEventListener("click", function() {
    document.getElementById("popup").style.display = "none";
    location.reload();
  });
  


// Publications la plus recentes
fetch('https://insta-api-api.0vxq7h.easypanel.host/posts?limit=1000000')
.then(resPosts=>resPosts.json())
.then(resPosts=>{

    fetch('https://insta-api-api.0vxq7h.easypanel.host/users')
  .then(resUsers=>resUsers.json())
  .then(resUsers=>{


    // liste publications 
    let j = resPosts.length - 1
    let cmpIteration = 0

    function displayPosts() {
      if (j < 0 || cmpIteration === 10) {
        return; // Exit condition for the loop
      }

      const i = j;

      displayPostsElements(i,resPosts,resUsers,false);
      displayPostsElements(i-1,resPosts,resUsers,false);
      displayPostsElements(i-2,resPosts,resUsers,false);

      j -= 3
      cmpIteration++

      setTimeout(displayPosts, 3000) // Delay of 3000 milliseconds (3 seconds)
    }

    displayPosts();

  })

})

function displayPostsElements(i,resPosts,resUsers,descriptionDetails){
          
      const divContainer = document.createElement('div')
      const divCart = document.createElement('div')
      const imagePost = document.createElement('img')
      const divCardBody = document.createElement('div')
      const linkUsername = document.createElement('a')
      const h5Username = document.createElement('h5')
      const hr = document.createElement('hr')
      const divButton = document.createElement('div')
      const buttonLike = document.createElement('button')
      const buttonComment = document.createElement('button')
      const pCommentsContainer = document.createElement('p')
      const divCommentsContainer = document.createElement('div')
      const divCardFooter = document.createElement('div')
      const divFormFloating = document.createElement('div')
      const textareaFormControl = document.createElement('textarea')
      const pAddCommentButton = document.createElement('p')
      const buttonAddComment = document.createElement('button')

      divContainer.setAttribute("id", "container")
      divContainer.setAttribute("class", "container border aligns-items-center mb-3")
      divContainer.setAttribute("style", "width: 42rem;")

      divCart.setAttribute("class", "card mb-3")
      divCart.setAttribute("style", "width: 40rem;")

      imagePost.setAttribute("src", resPosts[i].pictureUrl)
      imagePost.setAttribute("alt", "aucune image existe")

      divCardBody.setAttribute("class", "card-body")

      h5Username.setAttribute("class", "card-title")
      h5Username.textContent=cherchUserName(resPosts[i].userId,resUsers)
      linkUsername.setAttribute("href", "userProfilQ3.html?"+resPosts[i].userId)

      divButton.setAttribute("class", "mb-3")

      buttonLike.setAttribute("class", "btn btn-outline-secondary btn-sm")
      buttonLike.setAttribute("type", "button")
      buttonLike.setAttribute("onclick", "createLikes("+resPosts[i].id+")")
      buttonLike.textContent= 'Likes  ' + resPosts[i].likes.length

      buttonComment.setAttribute("class","btn btn-outline-primary float-end btn-sm mb-3")
      buttonComment.setAttribute("type", "button")
      buttonComment.setAttribute("data-bs-toggle", "collapse")
      buttonComment.setAttribute("data-bs-target", "#commentsContainer"+resPosts[i].id)
      buttonComment.setAttribute("aria-expanded", "true")
      buttonComment.setAttribute("aria-controls", "commentsContainer")
      buttonComment.textContent= 'Commentaires  ' + resPosts[i].comments.length

      divCommentsContainer.setAttribute("class", "collapse")
      divCommentsContainer.setAttribute("id", "commentsContainer"+resPosts[i].id)

      divCardFooter.setAttribute("class", "card-footer")

      divFormFloating.setAttribute("class", "form-floating mb-3")

      textareaFormControl.setAttribute("class", "form-control")
      textareaFormControl.setAttribute("placeholder", "Leave a comment here")
      textareaFormControl.setAttribute("id", "floatingTextarea"+resPosts[i].id)

      buttonAddComment.setAttribute("type", "button")
      buttonAddComment.setAttribute("class", "btn btn-primary float-end")
      buttonAddComment.setAttribute("onclick", "createComments("+resPosts[i].id+")")
      buttonAddComment.setAttribute("style", "--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;")
      buttonAddComment.textContent= 'Ajouter un commentaire'
    
      divButton.appendChild(buttonComment)
      divButton.appendChild(buttonLike)
      
      for (let l = 0; l < resPosts[i].comments.length; l++) {
        const divListComments = document.createElement('div')
        divListComments.setAttribute("class", "form-floating mb-3")
        const textareaListComments = document.createElement('textarea')
        textareaListComments.setAttribute("class", "form-control")
        textareaListComments.setAttribute("readOnly", "true")
        textareaListComments.value = resPosts[i].comments[l].content
        divListComments.appendChild(textareaListComments)
        divCommentsContainer.appendChild(divListComments)
      }
      
      pCommentsContainer.appendChild(divCommentsContainer)         
      linkUsername.appendChild(h5Username)
      divCardBody.appendChild(linkUsername)
      divCardBody.appendChild(hr)

      if(descriptionDetails == true) {

        const hrDescription = document.createElement('hr')
        const descriptionPosts = document.createElement('p')

        descriptionPosts.setAttribute("class", "card-text")
        descriptionPosts.textContent = resPosts[i].description

        divCardBody.appendChild(descriptionPosts)
        divCardBody.appendChild(hrDescription)

      } 

      divCardBody.appendChild(buttonLike)
      divCardBody.appendChild(buttonComment)
      divCardBody.appendChild(divButton)
      divCardBody.appendChild(pCommentsContainer)

      pAddCommentButton.appendChild(buttonAddComment)
      divFormFloating.appendChild(textareaFormControl)
      divCardFooter.appendChild(divFormFloating)
      divCardFooter.appendChild(pAddCommentButton)

      divCart.appendChild(imagePost)
      divCart.appendChild(divCardBody)
      divCart.appendChild(divCardFooter)
                     
      divContainer.appendChild(divCart)    
      document.body.appendChild(divContainer)
  }


// chercher une /des publications
const btn = document.getElementById('clickButton')
btn.addEventListener('click',handleClick)
function handleClick(){

      fetch('https://insta-api-api.0vxq7h.easypanel.host/posts?limit=1000000')
      .then(resPosts=>resPosts.json())
      .then(resPosts=>{

            fetch('https://insta-api-api.0vxq7h.easypanel.host/users')
            .then(resUsers=>resUsers.json())
            .then(resUsers=>{
 
                            const inputSearch= document.getElementById('inputSearch')

                            while(document.getElementById("container")!= null) {
                              document.getElementById("container").remove()
                            }

                            const newDivCard = document.createElement('div')
                            const newDescription = document.createElement('p')
                            
                            newDivCard.setAttribute("id", "container")
                            newDivCard.setAttribute("class", "container border aligns-items-center mb-3")
                            newDivCard.setAttribute("style", "width: 42rem;")
                            newDescription.setAttribute("class", "card-text")

                            cmpt = 0 
                            for ( index = 0; index < resPosts.length; index++) {
                                  if (resPosts[index].description.includes(inputSearch.value)){                                       
                                    cmpt++
                                    displayPostsElements(index,resPosts,resUsers,true)
                                  }                  
                              }

                          if (cmpt==0) {
                            const newDescription = document.createElement('p')
                            newDescription.textContent = "Aucune publication disponible. Refaire la rechercher svp"
                            newDivCard.appendChild(newDescription)
                            document.body.appendChild(newDivCard)
                          } 
                })

        })
}


// create comments
function createComments(postIdComments){


      const floatingTextarea = document.getElementById("floatingTextarea"+postIdComments)
      const postId = postIdComments;
      const content = floatingTextarea.value;
      const popup = document.getElementById("popup") 
      const popupContent = document.getElementById("popup-content")
      if(content.length==0){
        popupContent.textContent = "Vous pouvez pas ajouter une commentaire vide";
        popup.style.display = "block";
      }else{

        fetch("https://insta-api-api.0vxq7h.easypanel.host/comments", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              postId: postId,
              content: content,
            }),
          })
            .then(response => response.json())
            .then(data => {
              popupContent.textContent = "Le commentaire '"+content+"' a ete ajoute a la publication";
              popup.style.display = "block";
           //   location.reload();
            })
            .catch(error => {
              console.error("Error:", error);
              popupContent.textContent = error;
              popup.style.display = "block";
            });
    
      }

}

// create likes
function createLikes(postIdLike){
 

      const postId = postIdLike;
      const popup = document.getElementById("popup") 
      const popupContent = document.getElementById("popup-content")


      fetch("https://insta-api-api.0vxq7h.easypanel.host/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: postId,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data); // Process the response data
          popupContent.textContent = "vous avez ajoute un like sur cet publication";
          popup.style.display = "block";

         
        })
        .catch(error => {
          console.error("Error:", error);
          popupContent.textContent = error;
          popup.style.display = "block";
        });

}

function cherchUserName(userId,resUsers){
          
          for (i = 0; i < resUsers.length; i++) {
              if (userId==resUsers[i].id){
                username  = resUsers[i].username
                    break
                }           
          }
          return username
    }


function createDivCardPosts(userId,resUsers){
      
      for (i = 0; i < resUsers.length; i++) {
          if (userId==resUsers[i].id){
            username  = resUsers[i].username
                break
            }           
      }
      return username
}

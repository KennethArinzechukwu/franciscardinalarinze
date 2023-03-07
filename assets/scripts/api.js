/**
 * Created by obulaworld on 8/8/18.
 */
const newsContainer = document.getElementById('newsPost');
const Blog = document.getElementById('blog');
newsContainer.style.display = 'none';
Blog.style.display = 'none';
const url = 'http://charlesdale.educare.school/server/public/newsfeed/api/posts';
// const url = 'http://lmslite.test/server/public/newsfeed/api/posts';

(function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.response);
            if (data.success) {
                if (data.posts.length < 1) {
                    Blog.style.display = 'none';
                } else {
                    const allPosts = data.posts;
                    let htmlValue = '';
                    for (const post of allPosts) {
                        const content = post.description.substring(1, 100) + '...';
                        const date = new Date(post.updated_at);
                        const newDate = date.toDateString();
                        htmlValue += `  <div class="col-lg-3 col-md-6">
                            <div class="single-publish">
                                <img src="http://charlesdale.educare.school/${post.image_url}" class="img-fluid" alt="">
                                <div class="top">
                                    <div class="mb-15 d-flex" style="color: gray">
                                        <a href="#" style="color: gray">${newDate}</a>
                                        <span class="line">|</span>
                                        <a href="#" style="color: gray">By ${post.author}</a>
                                    </div>
                                    <h6 class="text-uppercase"><a href="#">${post.title}</a></h6>
                                </div>
                                <p class="mb-30">${content}</p>
                                <button type="button" class="btn btn-info" data-toggle="modal" data-target="#modal_${post.id}">Read More</button>
                            </div>
                        </div><!-- Modal -->
                        <div class="modal fade" id="modal_${post.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div class="modal-dialog" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">${post.title}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body" style="color: black !important;">${post.description}</div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                              </div>
                            </div>
                          </div>
                        </div>`;
                    }
                    newsContainer.innerHTML = htmlValue; newsContainer.style.display = 'block';
                    Blog.style.display = 'block';
                }
            } else if (data.error) {
                Blog.style.display = 'none';
            }
        }
    };
    xhttp.open("GET",url, true);
    xhttp.send();
}());
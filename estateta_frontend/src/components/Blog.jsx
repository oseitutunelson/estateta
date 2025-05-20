const Blog = () =>{
    return(
        <section className="blog" id="blog">
        <div className="container">

          <p className="section-subtitle">News & Blogs</p>

          <h2 className="h2 section-title">Leatest News Feeds</h2>

          <ul className="blog-list has-scrollbar">

            <li>
              <div className="blog-card">

                <figure className="card-banner">
                  <img src="/images/blog-1.png" alt="The Most Inspiring Interior Design Of 2021" className="w-100"/>
                </figure>

                <div className="blog-content">

                  <div className="blog-content-top">

                    <ul className="card-meta-list">

                      <li>
                        <a href="#" className="card-meta-link">
                          <ion-icon name="person"></ion-icon>

                          <span>by: Admin</span>
                        </a>
                      </li>

                      <li>
                        <a href="#" className="card-meta-link">
                          <ion-icon name="pricetags"></ion-icon>

                          <span>Interior</span>
                        </a>
                      </li>

                    </ul>

                    <h3 className="h3 blog-title">
                      <a href="#">The Most Inspiring Interior Design Of 2021</a>
                    </h3>

                  </div>

                  <div className="blog-content-bottom">
                    <div className="publish-date">
                      <ion-icon name="calendar"></ion-icon>

                      <time>Apr 27, 2022</time>
                    </div>

                    <a href="#" className="read-more-btn">Read More</a>
                  </div>

                </div>

              </div>
            </li>

            <li>
              <div className="blog-card">

                <figure className="card-banner">
                  <img src="/images/blog-2.jpg" alt="Recent Commercial Real Estate Transactions" className="w-100"/>
                </figure>

                <div className="blog-content">

                  <div className="blog-content-top">

                    <ul className="card-meta-list">

                      <li>
                        <a href="#" className="card-meta-link">
                          <ion-icon name="person"></ion-icon>

                          <span>by: Admin</span>
                        </a>
                      </li>

                      <li>
                        <a href="#" className="card-meta-link">
                          <ion-icon name="pricetags"></ion-icon>

                          <span>Estate</span>
                        </a>
                      </li>

                    </ul>

                    <h3 className="h3 blog-title">
                      <a href="#">Recent Commercial Real Estate Transactions</a>
                    </h3>

                  </div>

                  <div className="blog-content-bottom">
                    <div className="publish-date">
                      <ion-icon name="calendar"></ion-icon>

                      <time>Apr 27, 2022</time>
                    </div>

                    <a href="#" className="read-more-btn">Read More</a>
                  </div>

                </div>

              </div>
            </li>

            <li>
              <div className="blog-card">

                <figure className="card-banner">
                  <img src="/images/blog-3.jpg" alt="Renovating a Living Room? Experts Share Their Secrets"
                    className="w-100"/>
                </figure>

                <div className="blog-content">

                  <div className="blog-content-top">

                    <ul className="card-meta-list">

                      <li>
                        <a href="#" className="card-meta-link">
                          <ion-icon name="person"></ion-icon>

                          <span>by: Admin</span>
                        </a>
                      </li>

                      <li>
                        <a href="#" className="card-meta-link">
                          <ion-icon name="pricetags"></ion-icon>

                          <span>Room</span>
                        </a>
                      </li>

                    </ul>

                    <h3 className="h3 blog-title">
                      <a href="#">Renovating a Living Room? Experts Share Their Secrets</a>
                    </h3>

                  </div>

                  <div className="blog-content-bottom">
                    <div className="publish-date">
                      <ion-icon name="calendar"></ion-icon>

                      <time>Apr 27, 2022</time>
                    </div>

                    <a href="#" className="read-more-btn">Read More</a>
                  </div>

                </div>

              </div>
            </li>

          </ul>

        </div>
      </section>
    )
}
export default Blog;
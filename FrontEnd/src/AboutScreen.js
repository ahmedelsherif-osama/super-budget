import { Fragment } from "react";



function AboutScreen() {
  const styles = {
    body: {
      margin: 0,
      fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      webkitFontSmoothing: 'antialiased',
      mozOsxFontSmoothing: 'grayscale'
    },
    code: {
    
      fontFamily: 'source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace',
    },
  };
  return (    
    <Fragment>
  
      <body>
        <div className="intro">
          <header className="blog-header lh-1 py-3">
            <div className="row flex-nowrap justify-content-between align-items-center">
              <div className="col-4 pt-1"></div>
              <div className="col-4 text-center">
                <a className="blog-header-logo" href="#"
                  >PLAN YOUR BUDGET WITH BUDGET-PLANNER</a
                >
              </div>
              <div className="col-4 d-flex justify-content-end align-items-center">
                <a className="link-secondary" href="#" aria-label="Search">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="mx-3"
                    role="img"
                    viewBox="0 0 24 24"
                  >
                    <title>Search</title>
                    <circle cx="10.5" cy="10.5" r="7.5"></circle>
                    <path d="M21 21l-5.2-5.2"></path>
                  </svg>
                </a>
                <nav className="blog-pagination" aria-label="Pagination">
                  <a className="btn btn rounded-pill" href="#">Sign up</a>
                  <a className="btn btn-outline-primary rounded-pill">Sign in</a>
                </nav>
              </div>
            </div>
          </header>
    
          <div className="nav-scroller py-1 mb-2">
            <nav className="nav d-flex justify-content-between">
              <a className="p-2" href="#">HOME</a>
              <a className="p-2" href="#">BUDGET-PLANNER</a>
              <a className="p-2" href="#">MANAGE EXPENSES</a>
              <a className="p-2" href="#">CONTACT</a>
            </nav>
          </div>
        </div>
        <div className="container col-xxl-8 px-8 py-5">
          <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
              <img
                src="2.jpeg"
                className="d-block mx-lg-auto img-fluid"
                alt="Bootstrap Themes"
                width="700"
                height="500"
                loading="lazy"
              />
            </div>
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold lh-1 mb-3">
                Become financially stable by using our budget-planner!
              </h1>
              <p className="lead">
                Most people need some way of seeing where their money is going each
                month. A budget can help you feel more in control of your finances
                and make it easier to save money for your goals.Record your daily
                spending with our web-app.
              </p>
            </div>
          </div>
        </div>
        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-5 text-bg-light rounded-5">
              <h2>Manage your expenses</h2>
              <p>
                Once you know how much money you have coming in, the next step is to
                figure out where it’s going. Tracking and categorizing your expenses
                can help you determine what you are spending the most money on and
                where it might be easiest to save.
              </p>
              <button className="btn btn-outline-dark" type="button">
                Get started
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 p-5 bg-light border rounded-5">
              <h2>Plan your budget</h2>
              <p>
                This is where everything comes together: What you’re actually
                spending vs. what you want to spend. Use the variable and fixed
                expenses you compiled to get a sense of what you’ll spend in the
                coming months. Then compare that to your net income and priorities.
                Consider setting specific—and realistic—spending limits for each
                category of expenses.
              </p>
              <button className="btn btn-outline-dark" type="button">
                Get started
              </button>
            </div>
          </div>
        </div>
        <div
          className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border"
        >
          <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
            <h1 className="display-4 fw-bold lh-1">Why you need a budget</h1>
            <p className="lead">
              A budget is important for taking control of your money. Without a
              budget in place, it's easy to overspend and end up in debt if you're
              always turning to credit cards or loans to fill the gaps.Regularly
              review your budget to adjust as needed, should your income or expenses
              change.
            </p>
          </div>
          <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden">
            <img className="rounded-lg-3" src="budget.svg" alt="" width="500" />
          </div>
        </div>
        <div
          className="modal modal-signin position-static d-block py-5"
          tabindex="-1"
          role="dialog"
          id="modalSignin"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content rounded-4">
              <div className="modal-header p-5 pb-4 border-bottom-0">
                
                <h1 className="fw-bold mb-0 fs-2">Sign up for free</h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
    
              <div className="modal-body p-5 pt-0">
                <form className="">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control rounded-3"
                      id="floatingInput"
                      placeholder="name@example.com"
                    />
                    <label for="floatingInput">Email address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control rounded-3"
                      id="floatingPassword"
                      placeholder="Password"
                    />
                    <label for="floatingPassword">Password</label>
                  </div>
                  <button
                    className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                    type="submit"
                  >
                    Sign up
                  </button>
                  <small className="text-muted"
                    >By clicking Sign up, you agree to the terms of use.</small
                  >
                  <hr className="my-4" />
                  <h2 className="fs-5 fw-bold mb-3">Or use a third-party</h2>
                  <button
                    className="w-100 py-2 mb-2 btn btn-outline-dark rounded-3"
                    type="submit"
                  >
                    <svg className="bi me-1" width="16" height="16">
                      <use xlinkHref="#twitter"></use>
                    </svg>
                    Sign up with Google
                  </button>
                  <button
                    className="w-100 py-2 mb-2 btn btn-outline-primary rounded-3"
                    type="submit"
                  >
                    <svg className="bi me-1" width="16" height="16">
                      <use xlinkHref="#facebook"></use>
                    </svg>
                    Sign up with Facebook
                  </button>
                  <button
                    className="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3"
                    type="submit"
                  >
                    <svg className="bi me-1" width="16" height="16">
                      <use xlinkHref="#github"></use>
                    </svg>
                    Sign up with Twitter
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <footer className="py-3 my-4">
            <p className="text-center text-muted">© 2022 Budget-planner, Inc</p>
          </footer>
        </div>
      </body>
      </Fragment>
    
  );
}

export default AboutScreen;



import React from "react";
const NotFound = () => {
  return (
    <div>
      <div class="d-lg-flex half">
        <div className="bg order-1 order-md-1"></div>

        <div class="contents order-2 order-md-2">
          <div class="container">
            <div class="row align-items-center justify-content-center">
              <div class="col-md-7">
                <div class="log_title">
                  <div class="logo">
                    <img src="./image/logo/logo_partie1.png" alt="error" />
                  </div>

                  <h2>Not Found !!</h2>
                </div>
                <div class="form-group first success"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

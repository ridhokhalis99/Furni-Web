import {
  CATEGORIES_FETCH_SUCCESS,
  CATEGORY_FETCH_SUCCESS,
  PRODUCTS_FETCH_SUCCESS,
  PRODUCT_FETCH_SUCCESS,
} from "./actionType";

function fetchProducts() {
  return (dispatch) => {
    fetch("https://p3-challenge-ridhokhalis.herokuapp.com/products", {
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Internal Server Error");
        return response.json();
      })
      .then((data) => dispatch(productsFetchSuccess(data)))
      .catch((err) => console.log(err));
  };
}

function productsFetchSuccess(payload) {
  return {
    type: PRODUCTS_FETCH_SUCCESS,
    payload,
  };
}

function fetchProduct(productId) {
  return (dispatch) => {
    fetch(
      `https://p3-challenge-ridhokhalis.herokuapp.com/products/${productId}`,
      {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      }
    )
      .then((response) => {
        if (!response.ok) throw new Error("Internal Server Error");
        return response.json();
      })
      .then((data) => dispatch(productFetchSuccess(data)))
      .catch((err) => console.log(err));
  };
}

function productFetchSuccess(payload) {
  return {
    type: PRODUCT_FETCH_SUCCESS,
    payload,
  };
}

function createProduct(productInput) {
  return (dispatch) => {
    fetch("https://p3-challenge-ridhokhalis.herokuapp.com/products/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        access_token: localStorage.getItem("access_token"),
      },
      body: JSON.stringify(productInput),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Internal Server Error");
      })
      .then(() => dispatch(fetchProducts()))
      .catch((err) => console.log(err));
  };
}

function updateProduct(productInput, productId) {
  return (dispatch) => {
    fetch(
      `https://p3-challenge-ridhokhalis.herokuapp.com/products/${productId}/edit`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(productInput),
      }
    )
      .then((response) => {
        if (!response.ok) throw new Error("Internal Server Error");
      })
      .then(() => dispatch(fetchProducts()))
      .catch((err) => console.log(err));
  };
}

function deleteProduct(productId) {
  return (dispatch) => {
    fetch(
      `https://p3-challenge-ridhokhalis.herokuapp.com/products/${productId}/delete`,
      {
        method: "DELETE",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      }
    )
      .then((response) => {
        if (!response.ok) throw new Error("Internal Server Error");
      })
      .then(() => dispatch(fetchProducts()))
      .catch((err) => console.log(err));
  };
}

function fetchCategories() {
  return (dispatch) => {
    fetch("https://p3-challenge-ridhokhalis.herokuapp.com/categories", {
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Internal Server Error");
        return response.json();
      })
      .then((data) => dispatch(CategoriesFetchSuccess(data)))
      .catch((err) => console.log(err));
  };
}

function CategoriesFetchSuccess(payload) {
  return {
    type: CATEGORIES_FETCH_SUCCESS,
    payload,
  };
}

function fetchCategory(categoryId) {
  return (dispatch) => {
    fetch(
      `https://p3-challenge-ridhokhalis.herokuapp.com/categories/${categoryId}`,
      {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      }
    )
      .then((response) => {
        if (!response.ok) throw new Error("Internal Server Error");
        return response.json();
      })
      .then((data) => dispatch(CategoryFetchSuccess(data)))
      .catch((err) => console.log(err));
  };
}

function CategoryFetchSuccess(payload) {
  return {
    type: CATEGORY_FETCH_SUCCESS,
    payload,
  };
}

function createCategory(name) {
  return (dispatch) => {
    fetch("https://p3-challenge-ridhokhalis.herokuapp.com/categories/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        access_token: localStorage.getItem("access_token"),
      },
      body: JSON.stringify({ name }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Internal Server Error");
      })
      .then(() => dispatch(fetchCategories()))
      .catch((err) => console.log(err));
  };
}

function updateCategory(name, categoryId) {
  return (dispatch) => {
    fetch(
      `https://p3-challenge-ridhokhalis.herokuapp.com/categories/${categoryId}/edit`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify({ name }),
      }
    )
      .then((response) => {
        if (!response.ok) throw new Error("Internal Server Error");
      })
      .then(() => dispatch(fetchCategories()))
      .catch((err) => console.log(err));
  };
}

function deleteCategory(categoryId) {
  return (dispatch) => {
    fetch(
      `https://p3-challenge-ridhokhalis.herokuapp.com/categories/${categoryId}/delete`,
      {
        method: "DELETE",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      }
    )
      .then((response) => {
        if (!response.ok) throw new Error("Internal Server Error");
      })
      .then(() => dispatch(fetchCategories()))
      .catch((err) => console.log(err));
  };
}

export {
  fetchProducts,
  fetchProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchCategories,
  fetchCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
